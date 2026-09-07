import uuid
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.core.config import get_settings
from api.routes import auth

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Government innovation-procurement platform backend. Exclusively manages user authentication, accounts, and session data.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Standardized error handlers synced with frontend PrayogApiError / ApiResponse contracts
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    now_iso = datetime.now(timezone.utc).isoformat()
    if isinstance(exc.detail, dict):
        error_payload = exc.detail
    else:
        code_map = {
            401: "SIGN_IN_FAILED",
            403: "FORBIDDEN",
            404: "NOT_FOUND",
            409: "ALREADY_REGISTERED",
            422: "VALIDATION_FAILED",
        }
        code = code_map.get(exc.status_code, "HTTP_ERROR")
        error_payload = {
            "code": code,
            "message": str(exc.detail),
            "details": [],
            "reference": f"ERR-{uuid.uuid4().hex[:6].upper()}",
        }

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": error_payload,
            "servedAt": now_iso,
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    now_iso = datetime.now(timezone.utc).isoformat()
    details = [f"{err.get('loc', ['field'])[-1]}: {err.get('msg', 'invalid')}" for err in exc.errors()]
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_FAILED",
                "message": "Registration or request validation failed.",
                "details": details,
                "reference": f"ERR-{uuid.uuid4().hex[:6].upper()}",
            },
            "servedAt": now_iso,
        },
    )


# Configure CORS for frontend integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount only the authentication and user signup/signin router
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "data": {
            "platform": settings.PROJECT_NAME,
            "status": "operational",
            "scope": "signup_signin_auth_only",
            "docs": "/docs",
            "endpoints": {
                "register": f"{settings.API_V1_PREFIX}/auth/register",
                "login": f"{settings.API_V1_PREFIX}/auth/login",
                "me": f"{settings.API_V1_PREFIX}/auth/me",
                "accounts": f"{settings.API_V1_PREFIX}/auth/accounts",
                "logout": f"{settings.API_V1_PREFIX}/auth/logout",
            },
        },
        "servedAt": now_iso,
    }


@app.get("/api/health")
async def health_check():
    now_iso = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "data": {"ok": True, "service": "prayog-auth-api"},
        "servedAt": now_iso,
    }

