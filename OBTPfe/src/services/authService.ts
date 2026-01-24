// OBTPfe/src/services/authService.ts
import api from './api';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;

    // Lưu token + user (nếu có)
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    if (data?.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  register: async (data: { email: string; password: string; name: string; phone?: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },
};
