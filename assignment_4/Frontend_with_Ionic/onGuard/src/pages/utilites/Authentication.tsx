import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:3000";

export const login = async (
  email: string,
  password: string,
  setToken: (token: string) => void,
  setUserId: (id: string) => void,
  setRoles: (roles: string[]) => void) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid email or password');
  }

  const data = await response.json();
  const payload = JSON.parse(atob(data.access_token.split('.')[1]));

  setToken(data.access_token);
  setUserId(payload.sub);
  setRoles(payload.roles);
};


export const signup = async (name: string, email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/admin/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error('Signup failed. Please try again.');
  }

  const data = await response.json();

  return data.message;
};

