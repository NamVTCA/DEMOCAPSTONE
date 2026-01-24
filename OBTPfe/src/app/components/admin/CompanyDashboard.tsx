// OBTPfe/src/app/components/admin/CompanyDashboard.tsx
import { useState, useEffect } from 'react';
import { Bus, Route, Users, DollarSign, TrendingUp, FileText, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { adminService } from '../../../services/adminService';

export function CompanyDashboard({ adminType = 'company' as 'company' | 'system' }) {
  const [showReportModal, setShowReportModal] = useState(false);
  const { t } = useLanguage();
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Nếu adminType không có quyền, BE sẽ trả 403 — chúng ta catch và hiển thị message
        const res = await adminService.listCompanies();
        if (mounted) setCompanies(res || []);
      } catch (e: any) {
        console.error('Failed loading companies', e);
        if (mounted) {
          if (e?.response?.status === 403) {
            setError('Không có quyền xem danh sách công ty (yêu cầu system-admin).');
          } else {
            setError('Không thể tải danh sách công ty');
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Stats render như trước, nhưng lấy dữ liệu companies khi có
  const stats = [
    { label: t('totalVehicles'), value: String(companies.reduce((s, c) => s + ((c.vehicles && c.vehicles.length) || 0), 0) || '0'), icon: Bus, color: 'from-blue-500 to-blue-600', change: '' },
    { label: t('todayTrips'), value: '—', icon: Route, color: 'from-green-500 to-green-600', change: '' },
    { label: t('totalPassengers'), value: '—', icon: Users, color: 'from-purple-500 to-purple-600', change: '' },
    { label: t('monthlyRevenue'), value: '—', icon: DollarSign, color: 'from-orange-500 to-orange-600', change: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 dark:text-white mb-1">{t('companyDashboard')}</h1>
              <p className="text-gray-600 dark:text-gray-400">DemoTrans</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{t('report')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-gray-900 dark:text-white">{t('topCompanies')}</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={t('search')}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <button onClick={() => setShowReportModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm">
                <Plus className="w-4 h-4" />
                <span>{t('addCompany')}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('companyColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('vehiclesColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('tripsColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('revenueColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('ratingColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('statusColumn')}</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">{t('actionsColumn')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-4 text-center">Đang tải...</td></tr>
                ) : error ? (
                  <tr><td colSpan={7} className="px-6 py-4 text-center text-red-600">{error}</td></tr>
                ) : (companies.length === 0) ? (
                  <tr><td colSpan={7} className="px-6 py-4 text-center">Không có dữ liệu</td></tr>
                ) : (
                  companies.map((company: any) => (
                    <tr key={company._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{company.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{(company.vehicles && company.vehicles.length) || '-'}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">-</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">-</td>
                      <td className="px-6 py-4">{/* rating */}</td>
                      <td className="px-6 py-4">{/* status */}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">{t('viewDetails')}</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showReportModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setShowReportModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl text-gray-900 dark:text-white mb-4">Xuất Báo Cáo</h3>
              <button onClick={() => setShowReportModal(false)} className="w-full mt-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl">Đóng</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
