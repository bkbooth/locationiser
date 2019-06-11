import { getAuthHeader } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getPins() {
  const res = await fetch(`${API_BASE_URL}/pins`, { headers: getAuthHeader() });
  if (res.status !== 200) throw new Error('Not logged in');
  const { data } = await res.json();
  return data;
}
