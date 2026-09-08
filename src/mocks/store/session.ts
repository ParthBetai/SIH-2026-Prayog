import type { Role } from '@/config/rbac';
import type { User } from '@/types/models';
import { getDb } from './db';

/**
 * The signed-in identity, held in memory on the mock server side.
 * The demo role switcher changes it through POST /api/auth/login, exactly as a
 * real sign-in would; the client never asserts its own role to the API.
 */

const DEFAULT_BY_ROLE: Record<Role, string> = {
  public: '',
  startup: 'USR-STP-001',
  department_officer: 'USR-D01-OFF',
  department_admin: 'USR-D01-ADM',
  procurement_officer: 'USR-D01-PRO',
  evaluator: 'USR-EVAL-01',
  validator: 'USR-VAL-01',
  pmu: 'USR-PMU-01',
};

/**
 * Where the signed-in identity is kept between page loads.
 *
 * It used to be module state and nothing else, which meant a reload signed you
 * out. That is not a small annoyance in this product: the shell still routed
 * you to /s, and every panel on it then came back 403 "Only a startup account
 * can open this dashboard" — an authorisation failure reported for what was
 * really a lost session. Opening a portal link in a new tab did the same.
 *
 * So the mock server keeps its session where a real server keeps one: in a
 * cookie on the client, holding nothing but an opaque id it looks up in its own
 * store. The rest of the code is unchanged — the client still never asserts its
 * own role, and `currentUser()` still resolves against the database.
 *
 * NOT localStorage, sessionStorage or indexedDB. Those are banned in this
 * product and the ban is machine-checked; they are also the wrong tool. A
 * cookie is the transport a session actually travels on, it dies with the
 * browser session, and writing it here is exactly what a `Set-Cookie` on the
 * login response would do.
 */
const COOKIE = 'prayog_demo_session';

function readCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const hit = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
  return hit ? decodeURIComponent(hit.slice(COOKIE.length + 1)) || null : null;
}

function writeCookie(userId: string | null): void {
  if (typeof document === 'undefined') return;
  document.cookie = userId
    ? `${COOKIE}=${encodeURIComponent(userId)}; path=/; SameSite=Lax`
    : `${COOKIE}=; path=/; SameSite=Lax; max-age=0`;
}

/*
 * Nobody, until somebody signs in.
 *
 * This used to open the session on the Pune nodal officer, which meant the
 * product booted already inside a department: the public site showed the
 * document room, 'Sign in' appeared to sign you in as a stranger, and signing
 * out and reloading put you back at that stranger's desk. A demonstration
 * dataset is not a reason to start a session as somebody.
 */
let currentUserId: string | null = readCookie();

export function signIn(userId: string): User | null {
  const user = getDb().users.find((u) => u.id === userId) ?? null;
  currentUserId = user ? user.id : null;
  writeCookie(currentUserId);
  return user;
}

export function signInAs(role: Role): User | null {
  if (role === 'public') {
    currentUserId = null;
    writeCookie(null);
    return null;
  }
  return signIn(DEFAULT_BY_ROLE[role]);
}

export function signOut(): void {
  currentUserId = null;
  writeCookie(null);
}

export function currentUser(): User | null {
  if (!currentUserId) return null;
  const user = getDb().users.find((u) => u.id === currentUserId) ?? null;
  /* A cookie from an older seed names somebody who no longer exists. Clear it
     rather than answering "signed in as nobody" on every request forever. */
  if (!user) {
    currentUserId = null;
    writeCookie(null);
  }
  return user;
}

export function currentRole(): Role {
  return currentUser()?.role ?? 'public';
}
