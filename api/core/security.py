from datetime import datetime, timezone
from enum import Enum
from typing import List, Optional, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from api.core.config import get_supabase_client, get_supabase_admin_client


class Role(str, Enum):
    PUBLIC = "public"
    STARTUP = "startup"
    DEPARTMENT_OFFICER = "department_officer"
    DEPARTMENT_ADMIN = "department_admin"
    PROCUREMENT_OFFICER = "procurement_officer"
    EVALUATOR = "evaluator"
    VALIDATOR = "validator"
    PMU = "pmu"


# Backward compatibility alias
UserRole = Role


class CurrentUser(BaseModel):
    id: str
    name: str
    initials: str
    email: str
    role: str
    departmentId: Optional[str] = None
    startupId: Optional[str] = None
    designation: Optional[str] = "Registered User"
    active: bool = True
    lastActiveAt: Optional[str] = None
    department_name: Optional[str] = None
    dpiit_number: Optional[str] = None
    legal_name: Optional[str] = None
    trade_name: Optional[str] = None
    cin: Optional[str] = None
    state: Optional[str] = None
    affiliation: Optional[str] = None
    expertise: List[str] = []
    is_verified: bool = False


security = HTTPBearer(auto_error=False)


def generate_initials(name: str) -> str:
    parts = [p.strip() for p in name.split() if p.strip()]
    if len(parts) >= 2:
        return f"{parts[0][0].upper()}{parts[1][0].upper()}"
    elif len(parts) == 1 and len(parts[0]) >= 2:
        return parts[0][:2].upper()
    elif len(parts) == 1:
        return parts[0][0].upper()
    return "PR"


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> CurrentUser:
    """
    Validates Bearer token. Supports both Supabase Auth JWTs and session tokens.
    """
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    # 1. Handle demonstration / direct session token (demo_<role>_<id> or session_<role>_<id>)
    if token.startswith("demo_") or token.startswith("session_") or token.startswith("prayog_"):
        from api.routes.auth import get_user_by_id
        parts = token.split("_", 2)
        user_id = parts[-1] if len(parts) > 1 else token
        user_data = get_user_by_id(user_id)
        if not user_data and len(parts) > 2:
            user_data = get_user_by_id(parts[2])
        if user_data:
            return CurrentUser(**user_data)
        
        # Fallback for arbitrary demo token
        role_str = parts[1] if len(parts) > 1 else "startup"
        return CurrentUser(
            id=user_id,
            name=f"Demo {role_str.replace('_', ' ').title()}",
            initials=role_str[:2].upper(),
            email=f"{role_str}@nexus.gov.in",
            role=role_str,
            designation="Demonstration User",
            active=True,
            lastActiveAt=datetime.now(timezone.utc).isoformat(),
            is_verified=True,
        )

    # 2. Supabase Auth token validation
    try:
        supabase = get_supabase_client()
        if supabase:
            auth_response = supabase.auth.get_user(token)
            if auth_response and auth_response.user:
                auth_user = auth_response.user
                from api.routes.auth import get_user_by_id
                user_data = get_user_by_id(auth_user.id)
                if user_data:
                    return CurrentUser(**user_data)

                name = auth_user.user_metadata.get("full_name") or auth_user.email or "User"
                role = auth_user.user_metadata.get("role") or "startup"
                return CurrentUser(
                    id=auth_user.id,
                    name=name,
                    initials=generate_initials(name),
                    email=auth_user.email or "",
                    role=role,
                    designation="Verified User",
                    active=True,
                    lastActiveAt=datetime.now(timezone.utc).isoformat(),
                    is_verified=True,
                )
    except Exception:
        pass

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication token is expired or invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Optional[CurrentUser]:
    """
    Retrieves the current user if a valid token is provided; otherwise returns None without raising 401.
    """
    if not credentials or not credentials.credentials:
        return None
    try:
        return await get_current_user(credentials)
    except Exception:
        return None


def require_role(*allowed_roles: Role):
    """
    Factory dependency to enforce role-based access control.
    """
    async def role_checker(current_user: CurrentUser = Depends(get_current_user)) -> CurrentUser:
        if current_user.role not in [r.value for r in allowed_roles]:
            role_names = ", ".join([r.value for r in allowed_roles])
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: requires one of [{role_names}]. Current role: {current_user.role}",
            )
        return current_user

    return role_checker


# Convenient role shortcut dependencies
require_government = require_role(
    Role.DEPARTMENT_OFFICER,
    Role.DEPARTMENT_ADMIN,
    Role.PROCUREMENT_OFFICER,
    Role.PMU,
)
require_startup = require_role(Role.STARTUP)
require_evaluator = require_role(Role.EVALUATOR, Role.VALIDATOR)

