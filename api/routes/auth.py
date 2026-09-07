import json
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from api.core.config import get_supabase_admin_client, get_supabase_client
from api.core.security import CurrentUser, Role, generate_initials, get_optional_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Local persistence directory for robust fallback and offline development.
# On serverless platforms (Vercel / AWS Lambda), the deployment root is read-only.
# We safely use /tmp in serverless environments, or local api/data in standard environments.
if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"):
    DATA_DIR = Path("/tmp") / "prayog_data"
else:
    DATA_DIR = Path(__file__).resolve().parent.parent / "data"

try:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    DATA_DIR = Path("/tmp") / "prayog_data"
    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
    except Exception:
        pass

USERS_FILE = DATA_DIR / "users.json"

# Default seed accounts matching the frontend demonstration accounts
DEFAULT_ACCOUNTS = [
    {
        "id": "usr-startup-1",
        "name": "Kavita Rao",
        "initials": "KR",
        "email": "kavita@aerosense.in",
        "role": "startup",
        "designation": "CTO & Co-founder, AeroSense Technologies Pvt Ltd",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "legal_name": "AeroSense Technologies Pvt Ltd",
        "trade_name": "AeroSense",
        "cin": "U72900KA2020PTC134567",
        "state": "Karnataka",
        "dpiit_number": "DIPP123456",
        "is_verified": True,
    },
    {
        "id": "usr-dept-officer",
        "name": "Rajesh Kumar",
        "initials": "RK",
        "email": "rajesh.kumar@gov.in",
        "role": "department_officer",
        "department_name": "Department of Water Resources & Sanitation",
        "departmentId": "dep-1",
        "designation": "Director (Operations), Department of Water Resources",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
    {
        "id": "usr-dept-admin",
        "name": "Sunita Verma",
        "initials": "SV",
        "email": "sunita.verma@gov.in",
        "role": "department_admin",
        "department_name": "Ministry of Housing and Urban Affairs",
        "departmentId": "dep-2",
        "designation": "Joint Secretary, Ministry of Housing and Urban Affairs",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
    {
        "id": "usr-procurement",
        "name": "Amit Sharma",
        "initials": "AS",
        "email": "amit.sharma@gov.in",
        "role": "procurement_officer",
        "department_name": "Central Public Procurement Portal",
        "departmentId": "dep-3",
        "designation": "Chief Procurement Officer, Central Public Procurement Portal",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
    {
        "id": "usr-evaluator-1",
        "name": "Dr. Aris Thorne",
        "initials": "AT",
        "email": "aris.thorne@iitd.ac.in",
        "role": "evaluator",
        "affiliation": "Indian Institute of Technology Delhi",
        "designation": "Professor & Technical Chair, IIT Delhi",
        "expertise": ["AI/ML", "IoT", "Sensors"],
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
    {
        "id": "usr-validator-1",
        "name": "Meera Sen",
        "initials": "MS",
        "email": "meera.sen@audit.org",
        "role": "validator",
        "affiliation": "National Quality & Standards Council",
        "designation": "Lead Quality Auditor, National Quality & Standards Council",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
    {
        "id": "usr-pmu-1",
        "name": "Vikas Patel",
        "initials": "VP",
        "email": "vikas.patel@pmu.gov.in",
        "role": "pmu",
        "department_name": "National Innovation Mission PMU",
        "departmentId": "dep-pmu",
        "designation": "Senior Programme Manager, National Innovation Mission PMU",
        "active": True,
        "lastActiveAt": "2026-09-07T12:00:00Z",
        "is_verified": True,
    },
]


# In-memory user cache as primary resilient fallback
_IN_MEMORY_USERS: Dict[str, Dict[str, Any]] = {acc["id"]: acc.copy() for acc in DEFAULT_ACCOUNTS}


def load_local_users() -> Dict[str, Dict[str, Any]]:
    if not USERS_FILE.exists():
        save_local_users(_IN_MEMORY_USERS)
        return _IN_MEMORY_USERS.copy()
    try:
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            disk_users = json.load(f)
            _IN_MEMORY_USERS.update(disk_users)
            return _IN_MEMORY_USERS.copy()
    except Exception:
        return _IN_MEMORY_USERS.copy()


def save_local_users(users: Dict[str, Dict[str, Any]]) -> None:
    _IN_MEMORY_USERS.update(users)
    try:
        if not DATA_DIR.exists():
            DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=2, ensure_ascii=False)
    except Exception:
        # Gracefully continue with in-memory persistence if disk is inaccessible
        pass


def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    users = load_local_users()
    if user_id in users:
        return users[user_id]

    try:
        admin_supabase = get_supabase_admin_client()
        if admin_supabase:
            res = admin_supabase.table("users").select("*").eq("id", user_id).limit(1).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
    except Exception:
        pass

    return None


def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    users = load_local_users()
    for u in users.values():
        if u.get("email", "").lower() == email.lower():
            return u

    try:
        admin_supabase = get_supabase_admin_client()
        if admin_supabase:
            res = admin_supabase.table("users").select("*").eq("email", email).limit(1).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
    except Exception:
        pass

    return None


def sync_user_to_db(user_data: Dict[str, Any]) -> None:
    users = load_local_users()
    users[user_data["id"]] = user_data
    save_local_users(users)

    try:
        admin_supabase = get_supabase_admin_client()
        if admin_supabase:
            admin_supabase.table("users").upsert(user_data).execute()
    except Exception:
        pass


# -----------------------------------------------------------------------------
# Request & Response Schemas Synced with Frontend
# -----------------------------------------------------------------------------

class RegisterRequest(BaseModel):
    kind: Optional[str] = "startup"  # 'startup' | 'expert' | 'government'
    email: str
    name: Optional[str] = None
    full_name: Optional[str] = None
    legalName: Optional[str] = None
    legal_name: Optional[str] = None
    tradeName: Optional[str] = None
    trade_name: Optional[str] = None
    cin: Optional[str] = None
    state: Optional[str] = None
    dpiitRecognitionNumber: Optional[str] = None
    dpiit_number: Optional[str] = None
    acceptsTerms: Optional[bool] = False
    affiliation: Optional[str] = None
    expertise: Optional[List[str]] = []
    declaresIndependence: Optional[bool] = False
    departmentName: Optional[str] = None
    department_name: Optional[str] = None
    designation: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None


class LoginRequest(BaseModel):
    userId: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


class UserResponse(BaseModel):
    id: str
    name: str
    initials: str
    email: str
    role: str
    departmentId: Optional[str] = None
    startupId: Optional[str] = None
    designation: str
    active: bool = True
    lastActiveAt: str


# -----------------------------------------------------------------------------
# Authentication Endpoints
# -----------------------------------------------------------------------------

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest):
    """
    Stores signup registration data for startups, experts/evaluators, and department officers.
    Directly compatible with frontend registration flows.
    """
    kind = (payload.kind or "startup").lower()
    email_clean = payload.email.strip().lower()

    # Check duplicate
    existing = get_user_by_email(email_clean)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account already exists for that address. Sign in instead, or use a different work address.",
        )

    # Determine display name
    raw_name = (
        payload.legalName
        or payload.legal_name
        or payload.name
        or payload.full_name
        or payload.tradeName
        or payload.trade_name
        or email_clean.split("@")[0].capitalize()
    )

    # Determine role
    if payload.role:
        assigned_role = payload.role.lower()
    elif kind == "startup":
        assigned_role = "startup"
    elif kind == "expert":
        assigned_role = "evaluator"
    elif kind == "government":
        assigned_role = "department_officer"
    else:
        assigned_role = "startup"

    # Determine designation
    if payload.designation:
        designation = payload.designation
    elif assigned_role == "startup":
        trade = payload.tradeName or payload.trade_name or raw_name
        designation = f"Founder, {trade}"
    elif assigned_role == "evaluator":
        affil = payload.affiliation or "Independent Panel"
        designation = f"Evaluator, {affil}"
    elif assigned_role == "department_officer":
        dept = payload.departmentName or payload.department_name or "Department"
        designation = f"Officer, {dept}"
    else:
        designation = "Registered Member"

    user_id = f"usr-{assigned_role}-{uuid.uuid4().hex[:8]}"
    initials = generate_initials(raw_name)
    now_iso = datetime.now(timezone.utc).isoformat()

    new_user: Dict[str, Any] = {
        "id": user_id,
        "name": raw_name,
        "initials": initials,
        "email": email_clean,
        "role": assigned_role,
        "designation": designation,
        "active": True,
        "lastActiveAt": now_iso,
        "kind": kind,
        "legal_name": payload.legalName or payload.legal_name,
        "trade_name": payload.tradeName or payload.trade_name,
        "cin": payload.cin,
        "state": payload.state,
        "dpiit_number": payload.dpiitRecognitionNumber or payload.dpiit_number,
        "affiliation": payload.affiliation,
        "expertise": payload.expertise or [],
        "department_name": payload.departmentName or payload.department_name,
        "is_verified": bool(
            payload.dpiitRecognitionNumber
            or payload.dpiit_number
            or kind == "government"
        ),
        "created_at": now_iso,
        "updated_at": now_iso,
    }

    # Store user signup data
    sync_user_to_db(new_user)

    success_msg = (
        "Registration received. Verify your entity details to see which challenges you are eligible for."
        if kind == "startup"
        else "Registration received. The programme management unit reviews expert registrations before assignment."
    )

    reference_id = f"REG-{('STP' if kind == 'startup' else 'EXP')}-{uuid.uuid4().hex[:6].upper()}"

    receipt = {
        "registered": True,
        "kind": kind,
        "email": email_clean,
        "reference": reference_id,
        "user": new_user,
    }

    return {
        "success": True,
        "data": receipt,
        "servedAt": now_iso,
        "message": success_msg,
    }


@router.post("/login")
async def login(payload: LoginRequest):
    """
    Authenticates a user via userId, demonstration role, or email/password.
    Returns session token and User object matching frontend models.
    """
    matched_user = None
    now_iso = datetime.now(timezone.utc).isoformat()

    # 1. Direct sign-in by userId (Used by demo role cards)
    if payload.userId:
        matched_user = get_user_by_id(payload.userId)

    # 2. Sign-in by role
    if not matched_user and payload.role:
        target_role = payload.role.lower()
        users = load_local_users()
        for u in users.values():
            if u.get("role") == target_role:
                matched_user = u
                break

    # 3. Sign-in by email
    if not matched_user and payload.email:
        matched_user = get_user_by_email(payload.email.strip().lower())

    # 4. If still not matched, fallback or return 401
    if not matched_user:
        if payload.role == "public":
            return {
                "success": True,
                "data": {
                    "user": None,
                    "token": None,
                },
                "servedAt": now_iso,
                "message": "Signed out. You are browsing as a member of the public.",
            }
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="That email address and password do not match an account.",
        )

    # Update lastActiveAt
    matched_user["lastActiveAt"] = now_iso
    sync_user_to_db(matched_user)

    # Generate session access token
    token = f"session_{matched_user['role']}_{matched_user['id']}"

    return {
        "success": True,
        "data": {
            "user": matched_user,
            "token": token,
            "access_token": token,
            "token_type": "bearer",
        },
        "servedAt": now_iso,
        "message": f"Signed in as {matched_user['name']}.",
    }


@router.get("/me")
async def get_me(current_user: Optional[CurrentUser] = Depends(get_optional_current_user)):
    """
    Returns current authenticated session payload.
    Matches frontend SessionPayload contract exactly.
    """
    now_iso = datetime.now(timezone.utc).isoformat()

    if not current_user:
        return {
            "success": True,
            "data": {
                "user": None,
                "role": "public",
                "department": None,
                "startup": None,
            },
            "servedAt": now_iso,
        }

    user_dict = current_user.model_dump()

    # Department payload for government roles
    is_gov = current_user.role in [
        "department_officer",
        "department_admin",
        "procurement_officer",
        "pmu",
    ]
    dept_obj = None
    if is_gov or current_user.department_name:
        dept_obj = {
            "id": current_user.departmentId or "dep-1",
            "name": current_user.department_name or "Department of Innovation",
            "shortName": "DOI",
            "state": "Delhi",
            "district": "New Delhi",
            "sector": "Governance",
            "nodalOfficerId": current_user.id,
            "openChallenges": 3,
            "livePilots": 2,
            "committedPaise": 50000000,
            "releasedPaise": 25000000,
        }

    # Startup payload for startup role
    startup_obj = None
    if current_user.role == "startup":
        startup_obj = {
            "id": current_user.startupId or current_user.id,
            "legalName": current_user.legal_name or current_user.name,
            "tradeName": current_user.trade_name or current_user.name,
            "cin": current_user.cin or "U72900KA2020PTC134567",
            "dpiitStatus": "recognised" if current_user.dpiit_number else "unverified",
            "dpiitRecognitionNumber": current_user.dpiit_number,
            "state": current_user.state or "Delhi",
        }

    return {
        "success": True,
        "data": {
            "user": user_dict,
            "role": current_user.role,
            "department": dept_obj,
            "startup": startup_obj,
        },
        "servedAt": now_iso,
    }


@router.get("/accounts")
async def get_accounts():
    """
    Returns available demonstration accounts across all portals,
    including newly registered users from sign-up.
    """
    users = load_local_users()
    accounts_list = list(users.values())
    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "data": accounts_list,
        "servedAt": now_iso,
    }


@router.post("/logout")
async def logout():
    """
    Terminates the current session.
    """
    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "data": {
            "user": None,
        },
        "servedAt": now_iso,
        "message": "Signed out.",
    }


@router.post("/refresh")
async def refresh(current_user: Optional[CurrentUser] = Depends(get_optional_current_user)):
    """
    Refreshes the active session.
    """
    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "data": {
            "user": current_user.model_dump() if current_user else None,
        },
        "servedAt": now_iso,
    }

