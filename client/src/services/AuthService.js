import { api } from './Api';

export const authService = {
  register: payload => api.post('/auth/register', payload),
  login: payload => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  deleteAccount: token =>
    api.delete('/auth/deleteaccount', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  me: token =>
    api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
