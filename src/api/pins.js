import { getAuthHeader } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getPins() {
  const res = await fetch(`${API_BASE_URL}/pins`, { headers: getAuthHeader() });
  if (res.status !== 200) throw new Error('Not logged in');
  const { data } = await res.json();
  return data;
}

export async function createPin(pin) {
  const res = await fetch(`${API_BASE_URL}/pins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ pin }),
  });
  if (res.status === 422) {
    const { errors } = await res.json();
    console.error({ errors });
  }
  if (res.status !== 201) throw new Error('Failed creating pin');

  const { data: createdPin } = await res.json();
  return createdPin;
}
