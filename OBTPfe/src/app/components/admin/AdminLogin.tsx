// OBTPfe/src/app/components/admin/AdminLogin.tsx
import { useState } from 'react';
import { User, Lock, Shield, Building2, ArrowLeft } from 'lucide-react';
import { ForgotPasswordModal } from '../ForgotPasswordModal';
import { useLanguage } from '../LanguageContext';
import { authService } from '../../../services/authService';

interface AdminLoginProps {
  onLoginSuccess: (adminData: { name: string; id: string; email: string }) => void;
  onBack: () => void;
  adminType: 'company' | 'system';
}

export function AdminLogin({ onLoginSuccess, onBack, adminType }: AdminLoginProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const config = {
    company: {
      icon: Building2,
      title: t('companyAdminTitle'),
      subtitle: t('companyLoginSubtitle'),
      gradient: 'from-indigo-600 to-blue-500',
      shadowColor: 'indigo'
    },
    system: {
      icon: Shield,
      title: t('systemAdminTitle'),
      subtitle: t('systemLoginSubtitle'),
      gradient: 'from-slate-700 to-slate-600',
      shadowColor: 'slate'
    }
  };

  const currentConfig = config[adminType];
  const Icon = currentConfig.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Gọi authService.login (POST /auth/login)
      const data = await authService.login({ email: username, password });
      const accessToken = data?.accessToken;
      const user = data?.user;

      if (!accessToken || !user) {
        alert('Đăng nhập thất bại: server trả về không đúng format.');
        setIsLoading(false);
        return;
      }

      // Kiểm tra role để đảm bảo quyền truy cập admin
      const roles: string[] = user.roles || [];
      if (adminType === 'system' && !roles.includes('system-admin')) {
        alert('Tài khoản không có quyền System Admin.');
        setIsLoading(false);
        return;
      }
      if (adminType === 'company' && !(roles.includes('company-admin') || roles.includes('system-admin'))) {
        alert('Tài khoản không có quyền Company Admin.');
        setIsLoading(false);
        return;
      }

      // Lưu token + user cho interceptor api.ts
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Callback lên AdminApp
      onLoginSuccess({
        name: user.name || user.email || 'Admin',
        id: user._id || user.id || '',
        email: user.email || ''
      });
    } catch (err: any) {
      console.error('Login error', err);
      alert(err?.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentConfig.gradient} flex items-center justify-center p-4`}>
      {/* ... giữ nguyên UI hiện tại (copy từ file gốc) ... */}
      <div className="relative w-full max-w-md">
        <button onClick={onBack} className="mb-4 flex items-center space-x-2 text-white hover:text-opacity-80 transition-all">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('backToHome')}</span>
        </button>

        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${currentConfig.gradient} rounded-3xl mb-4 shadow-lg`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl text-gray-900 dark:text-white mb-2">{currentConfig.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{currentConfig.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('username')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('enterUsername')}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">{t('rememberMe')}</span>
              </label>
              <button type="button" onClick={() => setShowForgotPassword(true)} className={`bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent hover:underline`}>
                {t('forgotPassword')}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={`w-full py-4 bg-gradient-to-r ${currentConfig.gradient} text-white rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}>
              {isLoading ? <span>{t('loggingIn')}</span> : t('login')}
            </button>
          </form>
        </div>
      </div>

      {showForgotPassword && <ForgotPasswordModal userType={adminType} onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
}
