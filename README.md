# PRAYOG — Public Procurement Platform for Government Innovation Pilots

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg?logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg?logo=vercel&logoColor=white)](https://vercel.com)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB.svg?logo=python&logoColor=white)](https://python.org)

**PRAYOG** (*"From challenge to contract"*) is an open public procurement and innovation pilot management platform. It bridges the gap between government departments and verified startups through:
- **AI Problem Crafter**: Automatically transforms unstructured departmental pain points into formal public procurement challenges with quantifiable KPIs and technical domain tags (powered by Google Gemini & OpenAI).
- **Smart Matchmaking**: Ranks and matches verified startups based on technical skill overlaps and DPIIT recognition.
- **Milestone State Machine**: Tranche-based pilot milestone management, automated financial payout calculations, evidence upload to Supabase Storage, and immutable audit logging.
- **Independent Validation & Scale-Up Readiness**: Enables evaluators to score pilots and generates standardized Scale-Up Readiness Reports.

---

## 1. Tech Stack
- **Framework:** FastAPI (Python 3.9+)
- **Database & Auth:** Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security)
- **File Storage:** Supabase Storage (`milestone-evidence` bucket)
- **AI Integrations:** Google Gemini API (`gemini-1.5-flash`) & OpenAI API (`gpt-4o-mini`)
- **Deployment:** Vercel Serverless Functions (`@vercel/python`)

---

## 2. Project Structure
```text
.
├── api/
│   ├── __init__.py
│   ├── index.py                  # FastAPI app & Vercel entrypoint
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py             # Settings, Pydantic BaseSettings, Supabase clients
│   │   └── security.py           # Supabase Auth JWT validation & RBAC dependencies
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py               # /api/auth (Register, Login, Me)
│   │   ├── challenges.py         # /api/challenges (AI generate, CRUD, Matchmaking)
│   │   ├── pilots.py             # /api/pilots (Award pilots, Upload evidence, Approve tranche)
│   │   └── validation.py         # /api/validation (Score pilots, Scale-Up Report)
│   └── services/
│       ├── __init__.py
│       ├── ai_service.py         # LLM Problem Crafter (Gemini / OpenAI / Fallback)
│       ├── matching_service.py   # Tag intersection matchmaking engine
│       └── payment_service.py    # Milestone state machine & audit logger
├── schema.sql                    # Full PostgreSQL schema, enums, RLS, storage bucket
├── requirements.txt              # Production Python dependencies
├── vercel.json                   # Serverless routing and build configuration
├── .env.example                  # Environment configuration template
├── .env                          # Local environment variables (kept in .gitignore)
├── .gitignore                    # Python, virtualenv, and secrets ignore rules
└── README.md
```

---

## 3. Database Setup (Supabase)

1. Navigate to your [Supabase Dashboard](https://app.supabase.com).
2. Go to the **SQL Editor** in your project.
3. Paste the contents of `schema.sql` and run it. This script sets up:
   - **Enums**: `user_role` (`GOVERNMENT`, `STARTUP`, `EVALUATOR`), `challenge_status`, `milestone_status`.
   - **Tables**: `users`, `challenges`, `pilots`, `milestones`, `audit_logs`.
   - **Indexes**: GIN indexes for fast array tag searching.
   - **Storage Bucket**: `milestone-evidence` with access policies.
   - **Row Level Security (RLS)**: Fine-grained security policies on all tables.

---

## 4. Local Development Setup

### 1. Create and activate a virtual environment
```bash
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment variables
Ensure your `.env` file is present in the project root (configured from `.env.example`):
```env
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
STORAGE_BUCKET_NAME=milestone-evidence

# AI Provider Keys
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

ENVIRONMENT=development
```

### 4. Run local server
```bash
uvicorn api.index:app --reload --port 8000
```

Interactive API documentation:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 5. API Endpoints & Role-Based Access Control

| Method | Endpoint | Allowed Roles | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register user in Supabase Auth & `public.users` |
| `POST` | `/api/auth/login` | Public | Login with password, returns session token & profile |
| `GET` | `/api/auth/me` | Authenticated | Fetch authenticated user profile |
| `POST` | `/api/challenges/generate` | `GOVERNMENT` | AI generates problem statement, KPIs, and tags from pain point |
| `POST` | `/api/challenges` | `GOVERNMENT` | Save drafted or published challenge to database |
| `GET` | `/api/challenges/{id}/matches` | `GOVERNMENT` | Get top 5 verified startups matched by technical tags |
| `GET` | `/api/challenges` | Authenticated | List challenges (Government sees all, others see published) |
| `POST` | `/api/pilots` | `GOVERNMENT` | Award pilot to startup and define milestone tranches |
| `POST` | `/api/pilots/{id}/milestones/{mid}/upload` | `STARTUP` | Upload evidence (PDF/Images) to Supabase Storage |
| `PATCH`| `/api/pilots/{id}/milestones/{mid}/approve`| `GOVERNMENT` | Approve milestone, calculate payout, write audit log |
| `POST` | `/api/validation/{id}/score` | `EVALUATOR` | Submit pilot technical score (0-100) and KPI evaluations |
| `GET` | `/api/validation/{id}/report` | Authenticated | Generate JSON Scale-Up Readiness Report |

---

## 6. Vercel Deployment

1. The repository includes `vercel.json` configuring serverless rewrites to `api/index.py`.
2. When deploying to Vercel, set the following environment variables under **Project Settings → Environment Variables**:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY` (and/or `OPENAI_API_KEY`)
   - `STORAGE_BUCKET_NAME`
