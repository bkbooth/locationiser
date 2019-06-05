const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_TOKEN_KEY = 'locationiser.authToken';

export function getAuthHeader() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function getUser() {
  const res = await fetch(`${API_BASE_URL}/user`, { headers: getAuthHeader() });
  if (res.status !== 200) throw new Error('Not logged in');
  const { data } = await res.json();
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (res.status !== 200) throw new Error('Failed logging in');

  const {
    data: { token },
  } = await res.json();
  localStorage.setItem(AUTH_TOKEN_KEY, token);

  return getUser();
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
