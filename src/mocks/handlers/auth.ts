import { http, passthrough } from 'msw';

/**
 * Authentication mock handlers.
 *
 * Configured to pass through to the real FastAPI backend for user
 * signup, signin, session, and accounts data.
 */
export const authHandlers = [
  http.get('/api/auth/me', () => passthrough()),
  http.post('/api/auth/login', () => passthrough()),
  http.post('/api/auth/logout', () => passthrough()),
  http.post('/api/auth/refresh', () => passthrough()),
  http.post('/api/auth/register', () => passthrough()),
  http.get('/api/auth/accounts', () => passthrough()),
];

