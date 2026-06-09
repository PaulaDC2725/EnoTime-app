import type { AuthResponse, RegisterPayload } from '../domain/authTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const authGateway = {
  loginLocal: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/api/auth/login/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Incorrect credentials.');
    return data;
  },

  register: async (payload: RegisterPayload): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.error || 'Registration failed.');
    return resData;
  }
};