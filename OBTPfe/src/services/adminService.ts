// OBTPfe/src/services/adminService.ts
import api from './api';

export interface SystemStats {
  totalUsers: number;
  totalCompanies: number;
  totalTrips: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  pendingBookings: number;
}

export const adminService = {
  async getDashboardStats(): Promise<SystemStats> {
    const res = await api.get<SystemStats>('/admin/dashboard');
    return res.data;
  },

  async listUsers() {
    const res = await api.get('/admin/users');
    return res.data;
  },

  async listCompanies() {
    const res = await api.get('/admin/companies');
    return res.data;
  },
};
