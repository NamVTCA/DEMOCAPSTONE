# 📱 Hướng Dẫn Xem Preview Mobile App

Có **3 cách** để xem preview mobile app VeXe.com:

---

## ✅ Cách 1: Xem Web Preview (Dễ nhất - Ngay lập tức)

### Bước 1: Mở ứng dụng web
1. Chạy ứng dụng web trong Figma Make Preview
2. Trang web sẽ mở ở chế độ Customer (trang chủ)

### Bước 2: Mở Mobile Preview
1. Nhìn góc **phải dưới** màn hình, bạn sẽ thấy nút tròn màu xanh **⚙️ Settings** (có hiệu ứng pulse)
2. Click vào nút đó
3. Menu sẽ hiện ra với 4 options:
   - 🚗 **Driver Portal** (Cổng Tài Xế)
   - 🏢 **Company Admin** (Quản Lý Nhà Xe)
   - ⚙️ **System Admin** (Quản Trị Hệ Thống)
   - 📱 **Mobile Preview** ← Click vào đây!

### Bước 3: Khám phá Mobile UI
Bạn sẽ thấy:
- **iPhone 14 Pro frame** với notch
- **3 màn hình** có thể chuyển đổi:
  1. **Trang chủ** - Search form + Popular routes + Features
  2. **Tìm kiếm** - Danh sách chuyến xe
  3. **Chọn ghế** - Seat selection grid

### Bước 4: Tương tác
- Click các nút navigation phía trên để chuyển màn hình
- Nhập thông tin search
- Click vào chuyến xe để xem seat selection
- Chọn ghế ngồi
- **Dark mode tự động** theo theme web app
- **Đa ngôn ngữ** tự động theo language setting (VI/EN)

---

## 🚀 Cách 2: Chạy trên Expo Go App (Thật nhất)

### Yêu cầu:
- Smartphone (iOS hoặc Android)
- App **Expo Go** ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Computer và điện thoại cùng mạng WiFi

### Bước 1: Cài đặt
```bash
# Di chuyển vào folder mobile-app
cd mobile-app

# Cài đặt dependencies
npm install

# Nếu chưa có Expo CLI
npm install -g expo-cli
```

### Bước 2: Chạy app
```bash
npm start
```

### Bước 3: Quét QR code
- Terminal sẽ hiển thị QR code
- Mở **Expo Go** app trên điện thoại
- iOS: Dùng Camera app quét QR
- Android: Dùng Expo Go app quét QR
- App sẽ tự động load lên điện thoại

### Bước 4: Test thực tế
- Tương tác như app thật
- Hot reload khi sửa code
- Test dark mode, language switcher
- Test trên nhiều kích thước màn hình

---

## 💻 Cách 3: Chạy trên Emulator/Simulator

### Android Emulator (Windows/Mac/Linux)

**Yêu cầu:** Android Studio installed

```bash
cd mobile-app
npm start

# Trong terminal hiện ra, nhấn "a" để mở Android emulator
# Hoặc
npm run android
```

### iOS Simulator (macOS only)

**Yêu cầu:** Xcode installed

```bash
cd mobile-app
npm start

# Trong terminal hiện ra, nhấn "i" để mở iOS simulator
# Hoặc
npm run ios
```

---

## 🎯 So sánh các cách

| Cách | Ưu điểm | Nhược điểm | Thời gian |
|------|---------|------------|-----------|
| **Web Preview** | Nhanh nhất, không cần cài gì | Không có touch gestures thật | 0 giây |
| **Expo Go** | Gần với app thật nhất, test gestures | Cần cài Expo Go app | 2-3 phút |
| **Emulator** | Đầy đủ tính năng | Nặng, chậm, cần tools | 5-10 phút |

---

## 🎨 Tính năng có sẵn

### ✅ Đã implement:
- [x] Home Screen với search form
- [x] Popular routes carousel
- [x] Features grid
- [x] Search results list
- [x] Trip cards với rating
- [x] Seat selection grid
- [x] Selected seats tracking
- [x] Price calculation
- [x] Dark mode support
- [x] Language switcher (VI/EN)
- [x] Responsive layout
- [x] Gradient buttons
- [x] Modern UI với rounded corners

### 🔄 Coming soon:
- [ ] Booking form
- [ ] Payment screen
- [ ] E-Ticket với QR code
- [ ] User profile
- [ ] Trip history
- [ ] Notifications
- [ ] API integration

---

## 💡 Tips

### Web Preview:
- Phóng to/thu nhỏ browser để xem responsive
- Toggle dark mode từ header
- Switch language để test translations

### Expo Go:
- Shake điện thoại để mở Developer Menu
- Enable Fast Refresh trong settings
- Test trên nhiều devices khác nhau

### Development:
- Code trong `/mobile-app/screens/` để thêm screens mới
- Translations trong `/mobile-app/contexts/LanguageContext.tsx`
- Colors trong `/mobile-app/contexts/ThemeContext.tsx`

---

## 📞 Troubleshooting

### Web Preview không hiện nút Mobile Preview?
- Refresh page
- Check console for errors
- Make sure bạn đang ở trang chủ (Customer portal)

### Expo Go không connect được?
- Check WiFi: computer và phone cùng mạng
- Restart Expo server: Ctrl+C rồi `npm start` lại
- Clear Expo cache: `expo start -c`

### Emulator quá chậm?
- Giảm RAM của emulator
- Dùng Expo Go app thay vì emulator
- Hoặc dùng Web Preview

---

## 🚀 Next Steps

Sau khi preview xong, bạn có thể:

1. **Thêm screens mới** - Tạo files trong `/mobile-app/screens/`
2. **Customize UI** - Sửa colors, fonts trong contexts
3. **Add navigation** - Thêm screens vào Navigator
4. **Integrate API** - Connect với backend
5. **Build APK/IPA** - Deploy lên stores

---

**Enjoy your mobile app preview! 🎉**

Nếu có vấn đề, check README.md trong folder `/mobile-app/` để biết thêm chi tiết.
