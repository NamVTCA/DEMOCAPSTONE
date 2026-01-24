// OBTPfe/src/app/components/admin/UserManagement.tsx
import { useState, useEffect } from 'react';
import { Search, Ban, CheckCircle, Eye, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { adminService } from '../../../services/adminService';

interface User {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  roles?: string[];
  totalTrips?: number;
  totalSpent?: number;
  status?: 'active' | 'banned';
  role?: string;
}

export function UserManagement() {
  const { t, language } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await adminService.listUsers();
        if (mounted) {
          const mapped = (res || []).map((u: any) => ({
            _id: u._id,
            name: u.name || u.email,
            email: u.email,
            phone: u.phone || '',
            createdAt: u.createdAt,
            roles: u.roles || [],
            totalTrips: u.totalTrips || 0,
            totalSpent: u.totalSpent || 0,
            status: 'active',
            role: u.roles && u.roles.includes('company-admin') ? 'company-admin' : (u.roles && u.roles.includes('driver') ? 'driver' : 'user')
          }));
          setUsers(mapped);
        }
      } catch (e: any) {
        console.error('Failed to load users', e);
        if (mounted) setError('Không thể tải danh sách người dùng (kiểm tra quyền)');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phone || '').includes(searchQuery);
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US').format(price) + (language === 'vi' ? 'đ' : ' VND');
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      user: t('userRole'),
      driver: t('driverRole'),
      'company-admin': t('companyAdminRoleLabel')
    };
    return roleMap[role] || role;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-gray-900 dark:text-white mb-1">{t('userManagementTitle')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('userManagementDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-2xl text-gray-900 dark:text-white mb-1">{users.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalUsersStats')}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-2xl text-green-600 mb-1">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('activeUsers')}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-2xl text-red-600 mb-1">{users.filter(u => u.status === 'banned').length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('bannedUsers')}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="text-2xl text-blue-600 mb-1">{users.reduce((sum, u) => sum + (u.totalTrips || 0), 0)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalTripsColumn')}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchByNameEmailPhone')}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
          >
            <option value="all">{t('allRoles')}</option>
            <option value="user">{t('userRole')}</option>
            <option value="driver">{t('driverRole')}</option>
            <option value="company-admin">{t('companyAdminRoleLabel')}</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl"
          >
            <option value="all">{t('allStatus')}</option>
            <option value="active">{t('activeLabel')}</option>
            <option value="banned">{t('bannedStatus')}</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('userNameColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('contactColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('roleColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('joinDateColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('tripsColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('totalSpentColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('statusColumn')}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('actionsColumn')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={8} className="px-6 py-4 text-center">Đang tải...</td></tr>
              ) : error ? (
                <tr><td colSpan={8} className="px-6 py-4 text-center text-red-600">{error}</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-4 text-center">{t('noData')}</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id || user.email} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div className="text-gray-900 dark:text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                        {getRoleLabel(user.role || 'user')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.totalTrips}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{formatPrice(user.totalSpent || 0)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {user.status === 'active' ? t('activeLabel') : t('bannedStatus')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title={t('viewDetails')}>
                          <Eye className="w-4 h-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title={t('banUser')}>
                            <Ban className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title={t('unbanUser')}>
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
