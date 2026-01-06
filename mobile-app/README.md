# VeXe.com - Mobile App (React Native Expo)

## 📱 Tổng quan

Ứng dụng di động VeXe.com được xây dựng bằng **React Native** với **Expo**, cho phép người dùng đặt vé xe khách một cách nhanh chóng và tiện lợi trên thiết bị iOS và Android.

---

## 🚀 Tính năng

### Customer App
- ✅ Tìm kiếm chuyến xe theo tuyến đường và ngày
- ✅ Xem danh sách chuyến xe với thông tin chi tiết
- ✅ Chọn ghế ngồi/giường nằm
- ✅ Đặt vé và thanh toán
- ✅ Xem vé điện tử với QR code
- ✅ Quản lý chuyến đi (upcoming, completed, cancelled)
- ✅ Hồ sơ người dùng
- ✅ Chuyển đổi ngôn ngữ (VI/EN)
- ✅ Dark mode

### Upcoming Features
- 🔄 Driver App
- 🔄 Push notifications
- 🔄 Real-time trip tracking
- 🔄 Payment gateway integration
- 🔄 Review & ratings

---

## 📁 Cấu trúc thư mục

```
mobile-app/
├── screens/                 # Các màn hình
│   ├── HomeScreen.tsx       # Trang chủ
│   ├── SearchResultsScreen.tsx  # Kết quả tìm kiếm
│   ├── TripDetailScreen.tsx     # Chi tiết chuyến + chọn ghế
│   ├── BookingScreen.tsx    # Điền thông tin đặt vé
│   ├── PaymentScreen.tsx    # Thanh toán
│   ├── TicketScreen.tsx     # Vé điện tử với QR
│   ├── ProfileScreen.tsx    # Hồ sơ người dùng
│   └── LoginScreen.tsx      # Đăng nhập
│
├── contexts/               # React Contexts
│   ├── LanguageContext.tsx # Đa ngôn ngữ (VI/EN)
│   └── ThemeContext.tsx    # Dark/Light mode
│
├── components/             # Shared components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Header.tsx
│
├── services/              # API services
│   └── api.ts
│
├── utils/                # Utilities
│   └── helpers.ts
│
├── assets/               # Hình ảnh, fonts
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
│
├── App.tsx              # Main app component
├── app.json             # Expo config
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

---

## 🛠️ Cài đặt

### Prerequisites
- Node.js 18+
- npm hoặc yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app trên điện thoại (iOS/Android)

### Installation Steps

```bash
# 1. Di chuyển vào folder mobile-app
cd mobile-app

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm start

# Hoặc chạy trực tiếp trên:
npm run android  # Android
npm run ios      # iOS (chỉ trên macOS)
npm run web      # Web browser
```

### Scan QR Code
1. Mở Expo Go app trên điện thoại
2. Quét QR code từ terminal
3. App sẽ tự động load

---

## 📦 Dependencies chính

```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.5",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "expo-linear-gradient": "~13.0.2",
  "react-native-qrcode-svg": "^6.3.0",
  "axios": "^1.6.2"
}
```

---

## 🎨 Design System

### Colors
```typescript
// Light Mode
primary: '#3B82F6'
secondary: '#14B8A6'
background: '#FFFFFF'
text: '#1F2937'

// Dark Mode
primary: '#60A5FA'
secondary: '#2DD4BF'
background: '#111827'
text: '#F9FAFB'
```

### Typography
- Heading: 24-32px, font-weight: 700
- Body: 14-16px, font-weight: 400
- Small: 12px, font-weight: 400

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

---

## 🌍 Đa ngôn ngữ (i18n)

App hỗ trợ Tiếng Việt và English:

```typescript
// Usage trong component
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <Text>{t('searchTickets')}</Text> // "Tìm vé" hoặc "Search Tickets"
  );
}
```

**Lưu ý**: Hiện tại chỉ có translations cơ bản. Cần import full translations từ web app (2190+ keys) vào `LanguageContext.tsx`.

---

## 🔌 API Integration

### Setup API Base URL

```typescript
// services/api.ts
export const API_BASE_URL = 'https://api.vexe.com/v1';

// Example API call
import axios from 'axios';

export const searchTrips = async (from: string, to: string, date: string) => {
  const response = await axios.get(`${API_BASE_URL}/routes/search`, {
    params: { from, to, date }
  });
  return response.data;
};
```

### Authentication

```typescript
// Lưu token
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('auth_token', token);

// Gửi token trong requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

## 📱 Build Production

### Android APK
```bash
# Build APK cho testing
expo build:android

# Hoặc sử dụng EAS Build (recommended)
eas build --platform android
```

### iOS IPA
```bash
# Build IPA (cần Apple Developer Account)
expo build:ios

# Hoặc sử dụng EAS Build
eas build --platform ios
```

### Publish to Stores

**Google Play Store:**
1. Tạo Google Play Console account
2. Build signed APK/AAB
3. Upload và publish

**Apple App Store:**
1. Tạo Apple Developer Account
2. Build IPA với certificates
3. Upload qua App Store Connect

---

## 🧪 Testing

### Manual Testing
```bash
# Chạy app trên Expo Go
npm start

# Test trên emulator
npm run android  # Android Studio Emulator
npm run ios      # iOS Simulator (macOS only)
```

### Unit Tests (TODO)
```bash
npm test
```

---

## 🔐 Environment Variables

Tạo file `.env`:
```env
API_BASE_URL=https://api.vexe.com/v1
GOOGLE_MAPS_API_KEY=your_google_maps_key
PAYMENT_GATEWAY_KEY=your_payment_key
```

Load trong code:
```typescript
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

---

## 📸 Screenshots

### Light Mode
- Home Screen: Trang chủ với search form
- Search Results: Danh sách chuyến xe
- Seat Selection: Chọn ghế ngồi/giường nằm
- Booking: Điền thông tin hành khách
- Payment: Thanh toán
- Ticket: Vé điện tử với QR code

### Dark Mode
- Tất cả các màn hình hỗ trợ dark mode

---

## 🐛 Known Issues

1. **QR Scanner**: Chưa implement camera permission
2. **Payment Gateway**: Chưa tích hợp VNPay/MoMo
3. **Push Notifications**: Chưa setup
4. **Offline Mode**: Chưa hỗ trợ

---

## 🚧 Roadmap

### Phase 1 (Current)
- [x] Basic UI screens
- [x] Navigation
- [x] Language switcher
- [x] Dark mode
- [ ] API integration

### Phase 2
- [ ] Authentication (Login/Register)
- [ ] Booking flow với real API
- [ ] Payment integration
- [ ] QR code generation

### Phase 3
- [ ] Driver App
- [ ] Push notifications
- [ ] Real-time tracking
- [ ] Offline support

### Phase 4
- [ ] Admin dashboard mobile
- [ ] Analytics
- [ ] Performance optimization
- [ ] App Store release

---

## 📞 Support

- **Email**: dev@vexe.com
- **Documentation**: https://docs.vexe.com/mobile
- **GitHub**: https://github.com/your-org/vexe-mobile

---

## 📝 License

Copyright © 2024 VeXe.com. All rights reserved.

---

**Last Updated**: December 17, 2024  
**Version**: 1.0.0  
**Status**: In Development 🚧
