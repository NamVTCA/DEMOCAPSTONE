import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'vi' | 'en';

// Định nghĩa kiểu dữ liệu cho object translations dựa trên tiếng Việt
type TranslationKeys = keyof typeof translations.vi;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKeys | string) => string;
}

const translations = {
  vi: {
    // Header
    home: 'Trang chủ',
    routes: 'Tuyến đường',
    ticketLookup: 'Tra cứu vé',
    contact: 'Liên hệ',
    hotline: 'Hotline',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    account: 'Tài khoản',
    myTrips: 'Chuyến xe của tôi',
    profile: 'Thông tin cá nhân',

    // Hero
    heroTitle: 'Đặt Vé Xe Khách Trực Tuyến',
    heroSubtitle: 'Nhanh chóng - An toàn - Tiện lợi',
    departure: 'Điểm đi',
    destination: 'Điểm đến',
    date: 'Ngày đi',
    search: 'Tìm kiếm',
    selectDeparture: 'Chọn điểm đi',
    selectDestination: 'Chọn điểm đến',

    // Popular Routes
    popularRoutes: 'Tuyến Đường Phổ Biến',
    popularDestinations: 'Điểm đến phổ biến',
    tripsPerDay: 'chuyến/ngày',
    from: 'Từ',

    // Features
    features: 'Tại Sao Chọn Chúng Tôi',
    feature1Title: 'Đặt Vé Nhanh',
    feature1Desc: 'Chỉ với vài thao tác đơn giản',
    feature2Title: 'An Toàn',
    feature2Desc: 'Thanh toán bảo mật 100%',
    feature3Title: 'Hỗ Trợ 24/7',
    feature3Desc: 'Luôn sẵn sàng hỗ trợ bạn',
    feature4Title: 'Giá Tốt Nhất',
    feature4Desc: 'Cam kết giá cạnh tranh nhất',
    featuresSubtitle: 'Trải nghiệm dịch vụ đặt vé xe khách tốt nhất',
    safeAndSecure: 'An toàn & Bảo mật',
    safeAndSecureDesc: 'Thông tin thanh toán của bạn được bảo vệ bằng mã hóa cao cấp',
    timeSaving: 'Tiết kiệm thời gian',
    timeSavingDesc: 'Đặt vé chỉ trong vài phút mà không cần đến bến xe',
    bestPrice: 'Giá tốt nhất',
    bestPriceDesc: 'So sánh giá và tìm ưu đãi tốt nhất cho chuyến đi của bạn',
    support247: 'Hỗ trợ 24/7',
    support247Desc: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn',
    qualityAssured: 'Chất lượng đảm bảo',
    qualityAssuredDesc: 'Đối tác nhà xe uy tín với tiêu chuẩn phục vụ cao',
    multiplePayments: 'Thanh toán đa dạng',
    multiplePaymentsDesc: 'Hỗ trợ nhiều hình thức thanh toán tiện lợi và an toàn',

    // Promo Banner
    limitedOffer: 'Ưu đãi có thời hạn',
    specialOfferTitle: 'Ưu Đãi Đặc Biệt - Giảm 20% Cho Đơn Hàng Đầu Tiên!',
    useCode: 'Sử dụng mã',
    whenCheckout: 'khi thanh toán. Chỉ áp dụng cho khách hàng mới.',
    bookNowAndSave: 'Đặt vé ngay & Tiết kiệm',

    // Footer
    platformDescription: 'Nền tảng đặt vé xe khách trực tuyến hàng đầu Việt Nam',
    aboutUs: 'Về chúng tôi',
    aboutCompany: 'Giới thiệu',
    faq: 'Câu hỏi thường gặp',
    termsOfService: 'Điều khoản sử dụng',
    privacyPolicy: 'Chính sách bảo mật',
    support: 'Hỗ trợ',
    bookingGuide: 'Hướng dẫn đặt vé',
    refundPolicy: 'Chính sách hoàn vé',
    feedbackAndComplaint: 'Góp ý - Khiếu nại',
    contactInfo: 'Thông tin liên hệ',
    addressLabel: 'Địa chỉ',
    addressValue: '123 Đường ABC, Quận 1, TP. Hồ Chí Minh',
    phoneLabel: 'Điện thoại',
    emailLabel: 'Email',
    mapLocation: 'Bản đồ vị trí',
    sendMessage: 'Gửi tin nhắn',
    allRightsReserved: 'All rights reserved',

    // Contact
    contactTitle: 'Liên Hệ Với Chúng Tôi',
    contactSubtitle: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn',
    fullName: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    message: 'Tin nhắn',
    send: 'Gửi tin nhắn',

    // Routes Page
    allRoutes: 'Tất Cả Tuyến Đường',
    routesSubtitle: 'Khám phá các tuyến đường phổ biến',

    // Search Results
    searchResults: 'Kết quả tìm kiếm',
    foundTrips: 'Tìm thấy',
    tripsCount: 'chuyến',
    sortByTime: 'Giờ đi',
    sortByPrice: 'Giá thấp nhất',
    sortByDuration: 'Thời gian',
    reviews: 'đánh giá',
    seatsAvailable: 'chỗ trống',
    viewDetails: 'Xem chi tiết',
    amenityWifi: 'WiFi',
    amenityDrink: 'Nước uống',
    amenityAC: 'Điều hòa',
    amenityTV: 'TV',

    // Hotline
    hotlineTitle: 'Hotline Hỗ Trợ 24/7',
    hotlineSubtitle: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc',
    customerService: 'Tổng đài chăm sóc khách hàng',
    bookingSupport: 'Hỗ trợ đặt vé',
    technicalSupport: 'Hỗ trợ kỹ thuật',
    complaint: 'Khiếu nại & Góp ý',

    // Ticket Lookup
    ticketLookupTitle: 'Tra Cứu Vé',
    ticketLookupHeader: 'Tra Cứu Thông Tin Vé',
    ticketLookupSubtitle: 'Nhập mã vé và số điện thoại để tra cứu thông tin',
    ticketCode: 'Mã vé',
    ticketCodePlaceholder: 'Nhập mã vé (VD: VX2024123001)',
    phoneNumber: 'Số điện thoại',
    phoneNumberPlaceholder: 'Nhập số điện thoại đặt vé',
    lookupButton: 'Tra cứu',
    ticketConfirmed: 'Vé đã được xác nhận',
    bookingCode: 'Mã đặt vé',
    route: 'Tuyến đường',
    time: 'Thời gian',
    passenger: 'Hành khách',
    seatAndPrice: 'Số ghế & Giá vé',
    seat: 'Ghế',
    seatNumber: 'Số ghế',
    busCompany: 'Nhà xe',
    busType: 'Loại xe',
    pickupPoint: 'Điểm đón',
    printTicket: 'In vé',
    cancelTicket: 'Hủy vé',
    sleeper: 'Giường nằm',
    seating: 'Ghế ngồi',

    // My Trips
    myTripsTitle: 'Chuyến Xe Của Tôi',
    allTrips: 'Tất cả',
    upcoming: 'Sắp đi',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
    noTripsYet: 'Chưa có chuyến đi nào',
    noTripsDesc: 'Đặt vé ngay để bắt đầu hành trình của bạn',
    downloadTicket: 'Tải vé',
    rateTrip: 'Đánh giá',
    ratingModalTitle: 'Đánh giá chuyến đi',
    yourRating: 'Đánh giá của bạn',
    shareExperience: 'Chia sẻ trải nghiệm của bạn...',
    submitRating: 'Gửi đánh giá',
    upcomingStatus: 'Sắp đi',
    completedStatus: 'Đã đi',
    cancelledStatus: 'Đã hủy',

    // Messages
    selectBothLocations: 'Vui lòng chọn điểm đi và điểm đến',
    messageSent: 'Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm.',

    // Settings Page
    settings: 'Cài Đặt',
    settingsSubtitle: 'Quản lý cài đặt hệ thống nhà xe',
    general: 'Tổng quan',
    companyInfo: 'Thông tin công ty',
    notifications: 'Thông báo',
    security: 'Bảo mật',
    payment: 'Thanh toán',
    backup: 'Sao lưu',

    // General Settings
    generalSettings: 'Cài Đặt Tổng Quan',
    generalSettingsDesc: 'Cấu hình chung cho hệ thống',
    timezone: 'Múi giờ',
    defaultLanguage: 'Ngôn ngữ mặc định',
    currentLanguage: 'Ngôn ngữ hiện tại',
    dateFormat: 'Định dạng ngày',
    currency: 'Đơn vị tiền tệ',
    businessHours: 'Giờ Hoạt Động',
    businessHoursDesc: 'Cấu hình giờ làm việc',
    weekdays: 'Thứ 2 - Thứ 6',
    weekend: 'Thứ 7 - Chủ nhật',

    // Company Settings
    companySettings: 'Thông Tin Công Ty',
    companySettingsDesc: 'Cập nhật thông tin nhà xe',
    companyName: 'Tên công ty',
    address: 'Địa chỉ',
    taxCode: 'Mã số thuế',
    website: 'Website',
    companyLogo: 'Logo công ty',
    uploadLogo: 'Tải lên logo',

    // Pricing Settings
    pricingSettings: 'Cài Đặt Giá Cước',
    pricingSettingsDesc: 'Quản lý chính sách giá vé',
    baseRate: 'Giá cơ bản (VNĐ)',
    perKmRate: 'Giá/km (VNĐ)',
    cancellationFee: 'Phí hủy vé (%)',
    lateCancellationHours: 'Thời gian hủy muộn (giờ)',
    childDiscount: 'Giảm giá trẻ em (%)',
    studentDiscount: 'Giảm giá sinh viên (%)',

    // Notification Settings
    notificationSettings: 'Cài Đặt Thông Báo',
    notificationSettingsDesc: 'Quản lý thông báo của hệ thống',
    emailNotifications: 'Thông báo Email',
    emailNotificationsDesc: 'Nhận thông báo qua email về đặt vé, hủy vé',
    pushNotifications: 'Thông báo đẩy',
    pushNotificationsDesc: 'Nhận thông báo đẩy trên thiết bị di động',
    smsNotifications: 'Thông báo SMS',
    smsNotificationsDesc: 'Gửi SMS xác nhận đặt vé cho khách hàng',
    emailTemplates: 'Email Templates',
    bookingConfirmEmail: 'Email xác nhận đặt vé',
    bookingConfirmEmailDesc: 'Cấu hình nội dung email xác nhận',
    cancellationEmail: 'Email hủy vé',
    cancellationEmailDesc: 'Thông báo hủy vé cho khách hàng',
    reminderEmail: 'Email nhắc nhở chuyến đi',
    reminderEmailDesc: 'Nhắc khách 24h trước giờ khởi hành',

    // Security Settings
    securitySettings: 'Bảo Mật',
    securitySettingsDesc: 'Cài đặt bảo mật tài khoản và hệ thống',
    changePassword: 'Đổi mật khẩu',
    changePasswordDesc: 'Cập nhật mật khẩu đăng nhập',
    twoFactorAuth: 'Xác thực hai yếu tố (2FA)',
    twoFactorAuthDesc: 'Tăng cường bảo mật với 2FA',
    loginHistory: 'Lịch sử đăng nhập',
    loginHistoryDesc: 'Xem các lần đăng nhập gần đây',
    manageSession: 'Quản lý phiên đăng nhập',
    manageSessionDesc: 'Đăng xuất khỏi các thiết bị khác',
    securityPolicies: 'Chính Sách Bảo Mật',
    sessionTimeout: 'Thời gian hết phiên (phút)',
    maxLoginAttempts: 'Số lần đăng nhập sai tối đa',

    // Payment Settings
    paymentGateway: 'Cổng Thanh Toán',
    paymentGatewayDesc: 'Quản lý phương thức thanh toán',
    vnpay: 'VNPay',
    vnpayDesc: 'Cổng thanh toán VNPay',
    momo: 'MoMo',
    momoDesc: 'Ví điện tử MoMo',
    zalopay: 'ZaloPay',
    zalopayDesc: 'Ví điện tử ZaloPay',
    bankTransfer: 'Chuyển khoản ngân hàng',
    bankTransferDesc: 'Thanh toán qua chuyển khoản',
    cash: 'Tiền mặt',
    cashDesc: 'Thanh toán trực tiếp',

    // Backup Settings
    backupSettings: 'Sao Lưu Dữ Liệu',
    backupSettingsDesc: 'Quản lý sao lưu tự động và phục hồi',
    autoBackup: 'Sao lưu tự động',
    autoBackupDesc: 'Sao lưu dữ liệu hàng ngày lúc 02:00',
    backupFrequency: 'Tần suất sao lưu',
    retentionDays: 'Thời gian lưu trữ (ngày)',
    backupNow: 'Sao lưu ngay',
    recentBackups: 'Sao Lưu Gần Đây',
    restore: 'Phục hồi',
    daily: 'Hàng ngày',
    weekly: 'Hàng tuần',
    monthly: 'Hàng tháng',

    // Common
    save: 'Lưu',
    saveChanges: 'Lưu thay đổi',
    saveAllChanges: 'Lưu tất cả thay đổi',
    cancel: 'Hủy',
    delete: 'Xóa',
    edit: 'Sửa',
    add: 'Thêm',
    close: 'Đóng',
    confirm: 'Xác nhận',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước',
    loading: 'Đang tải...',
    success: 'Thành công',
    error: 'Lỗi',
    warning: 'Cảnh báo',
    info: 'Thông tin',

    // Admin Dashboard
    dashboard: 'Bảng điều khiển',
    statistics: 'Thống kê',
    trips: 'Chuyến đi',
    buses: 'Xe khách',
    drivers: 'Tài xế',
    revenue: 'Doanh thu',
    customers: 'Khách hàng',
    bookings: 'Đặt vé',

    // Admin Menu Items & System Admin
    companyAdmin: 'Company',
    systemAdmin: 'Admin',
    vehicleManagement: 'Quản lý xe',
    routeManagement: 'Chuyến đi',
    bookingManagement: 'Đặt vé',
    driverManagement: 'Tài xế',
    driverApplications: 'Đơn đăng ký',
    companyManagement: 'Nhà xe',
    userManagement: 'Người dùng',
    reviewManagement: 'Đánh giá',
    dataManagement: 'Dữ liệu',
    promoCodeManagement: 'Mã khuyến mãi',
    routeImagesManagement: 'Ảnh tuyến đường',
    underDevelopment: 'Đang phát triển',
    pageUnderConstruction: 'đang được xây dựng',
    lightTheme: 'Sáng',
    darkTheme: 'Tối',
    switchToLight: 'Chuyển sang sáng',
    switchToDark: 'Chuyển sang tối',
    switchToEnglish: 'Switch to English',
    switchToVietnamese: 'Chuyển sang Tiếng Việt',

    // Driver Portal
    driverPortal: 'Cổng Tài Xế',
    mySchedule: 'Lịch Trình Của Tôi',
    todayTrips: 'Chuyến Đi Hôm Nay',
    upcomingTrips: 'Chuyến Sắp Tới',
    tripHistory: 'Lịch Sử Chuyến Đi',
    passengers: 'Hành khách',
    checkIn: 'Check-in',
    scanQR: 'Quét mã QR',
    driverInfo: 'Thông Tin Tài Xế',
    licenseNumber: 'Số bằng lái xe',
    idCard: 'Số CCCD',
    achievements: 'Thành Tích & Đánh Giá',
    ratings: 'Đánh giá',
    totalTrips: 'Tổng số chuyến',
    onTimeRate: 'Tỷ lệ đúng giờ',
    safetyScore: 'Điểm an toàn',

    // Driver Home
    navigation: 'Dẫn đường',
    earnings: 'Doanh thu',
    theme: 'Giao diện',
    language: 'Ngôn ngữ',
    driver: 'Tài xế',
    hello: 'Xin chào',
    today: 'Hôm nay',
    tripToday: 'Chuyến hôm nay',
    aboutToDepart: 'Sắp khởi hành',
    running: 'Đang chạy',
    arrived: 'Đã đến',
    searchTrips: 'Tìm chuyến đi...',
    distance: 'Khoảng cách',
    boarded: 'Đã lên',

    // Notifications
    notificationsTitle: 'Thông báo',
    viewAll: 'Xem tất cả',
    newTripAssigned: 'Chuyến mới được giao',
    scheduleChanged: 'Thay đổi lịch trình',
    tripCompleted: 'Hoàn thành chuyến đi',
    minutesAgo: 'phút trước',
    hourAgo: 'giờ trước',
    hoursAgo: 'giờ trước',

    // Trip Details
    vehiclePlate: 'Biển số xe',
    noTrips: 'Không có chuyến đi nào',

    // Promo Codes
    promoCodes: 'Mã giảm giá',
    promoCode: 'Mã giảm giá',
    applyPromoCode: 'Áp dụng mã',
    enterPromoCode: 'Nhập mã giảm giá',
    promoCodeApplied: 'Mã đã áp dụng',
    promoCodeInvalid: 'Mã không hợp lệ',
    promoCodeDetails: 'Chi tiết mã giảm giá',
    discount: 'Giảm giá',
    validUntil: 'Có hiệu lực đến',
    applicableRoutes: 'Áp dụng cho tuyến',
    minAmount: 'Số tiền tối thiểu',
    maxDiscount: 'Giảm tối đa',
    availablePromoCodes: 'Mã giảm giá có sẵn',
    selectAndApply: 'Chọn và áp dụng mã phù hợp',

    // Seat Selection
    selectSeat: 'Chọn ghế',
    seatMap: 'Sơ đồ ghế',
    floor1: 'Tầng 1',
    floor2: 'Tầng 2',
    available: 'Trống',
    selected: 'Đang chọn',
    booked: 'Đã đặt',
    holding: 'Đang giữ',

    // Vehicle Types
    vehicleType: 'Loại xe',
    sleeperBus: 'Giường nằm',
    seatBus: 'Ghế ngồi',
    limousine: 'Limousine',
    vipBus: 'VIP',
    beds: 'giường',
    seats: 'ghế',
    vehicleDetails: 'Chi tiết xe',

    // Forgot Password
    forgotPassword: 'Quên mật khẩu',
    resetPassword: 'Đặt lại mật khẩu',
    enterEmail: 'Nhập email của bạn',
    sendResetLink: 'Gửi liên kết đặt lại',
    backToLogin: 'Quay lại đăng nhập',
    resetEmailSent: 'Email đặt lại mật khẩu đã được gửi',
    checkYourEmail: 'Vui lòng kiểm tra email của bạn',
    forgotPasswordDriver: 'Quên mật khẩu - Tài xế',
    forgotPasswordCompany: 'Quên mật khẩu - Quản lý nhà xe',
    forgotPasswordSystem: 'Quên mật khẩu - Quản trị hệ thống',
    forgotPasswordCustomer: 'Quên mật khẩu',
    enterEmailToReset: 'Nhập email để nhận liên kết đặt lại mật khẩu',
    registeredEmail: 'Email đăng ký',
    emailPlaceholder: 'example@email.com',
    sendingEmail: 'Đang gửi...',
    sendResetLinkButton: 'Gửi liên kết đặt lại',
    emailSentSuccess: 'Email đã được gửi!',
    checkEmailMessage: 'Vui lòng kiểm tra email',
    checkEmailFor: 'để nhận liên kết đặt lại mật khẩu.',
    noteLabel: 'Lưu ý:',
    checkSpamFolder: 'Kiểm tra cả thư mục spam nếu không thấy email trong hộp thư chính.',
    resetLinkNote: 'Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email này',

    // Dashboard Company
    companyDashboard: 'Dashboard Nhà Xe',
    totalVehicles: 'Tổng số xe',
    totalPassengers: 'Tổng hành khách',
    monthlyRevenue: 'Doanh thu tháng',
    revenue7Days: 'Doanh Thu 7 Ngày Gần Nhất',
    recentTrips: 'Chuyến Đi Gần Đây',
    report: 'Báo cáo',
    days7: '7 ngày',
    days30: '30 ngày',
    bookedSeats: 'Đã đặt',

    // System Dashboard
    systemDashboard: 'Dashboard Hệ Thống',
    totalCompanies: 'Tổng số nhà xe',
    totalUsers: 'Tổng người dùng',
    totalBookings: 'Tổng đặt vé',
    systemRevenue: 'Doanh thu hệ thống',
    activeCompanies: 'Nhà xe hoạt động',
    pendingApproval: 'Chờ phê duyệt',
    recentActivities: 'Hoạt Động Gần Đây',
    newCompanyRegistered: 'Nhà xe mới đăng ký',
    newDriverApplication: 'Đơn tài xế mới',
    bookingCompleted: 'Hoàn thành đặt vé',
    systemAlert: 'Cảnh báo hệ thống',

    // Vehicle Management
    vehicleList: 'Danh Sách Xe',
    addNewVehicle: 'Thêm Xe Mới',
    vehicleInfo: 'Thông Tin Xe',
    licensePlate: 'Biển số xe',
    model: 'Mẫu xe',
    manufacturer: 'Hãng sản xuất',
    year: 'Năm sản xuất',
    capacity: 'Số chỗ',
    status: 'Trạng thái',
    active: 'Hoạt động',
    inactive: 'Ngừng hoạt động',
    maintenance: 'Bảo trì',
    lastMaintenance: 'Bảo trì lần cuối',
    nextMaintenance: 'Bảo trì tiếp theo',
    totalDistance: 'Tổng quãng đường',
    fuelType: 'Loại nhiên liệu',
    diesel: 'Dầu diesel',
    gasoline: 'Xăng',
    electric: 'Điện',
    hybrid: 'Hybrid',
    amenities: 'Tiện nghi',
    wifi: 'WiFi',
    ac: 'Điều hòa',
    tv: 'TV',
    charger: 'Sạc điện thoại',
    blanket: 'Chăn',
    water: 'Nước uống',
    tissue: 'Khăn giấy',
    vehicleManagementTitle: 'Quản Lý Xe',
    vehicleManagementDesc: 'Quản lý đội xe của nhà xe',
    totalVehiclesCount: 'Tổng số xe',
    activeVehicles: 'Đang hoạt động',
    maintenanceVehicles: 'Đang bảo trì',
    totalSeats: 'Tổng số ghế',
    searchVehicle: 'Tìm kiếm theo biển số, loại xe...',
    editVehicle: 'Chỉnh Sửa Xe',
    deleteVehicleConfirm: 'Bạn có chắc muốn xóa xe này?',
    vehicleTypeLabel: 'Loại xe',
    sleeperBusOption: 'Giường nằm',
    vipSleeperBus: 'Giường nằm VIP',
    seatBusOption: 'Ghế ngồi',
    limousineOption: 'Limousine',
    seatNumber: 'Số ghế',
    yearOfManufacture: 'Năm sản xuất',
    manufacturerBrand: 'Hãng xe',

    // Driver Management
    driverManagementTitle: 'Quản Lý Tài Xế',
    driverManagementDesc: 'Quản lý đội ngũ tài xế',
    addDriver: 'Thêm tài xế',
    totalDriversCount: 'Tổng tài xế',
    availableDrivers: 'Sẵn sàng',
    busyDrivers: 'Đang bận',
    averageRating: 'Đánh giá TB',
    searchDriver: 'Tìm kiếm theo tên, SĐT, GPLX...',
    allStatus: 'Tất cả trạng thái',
    availableStatus: 'Sẵn sàng',
    busyStatus: 'Đang bận',
    offDutyStatus: 'Nghỉ phép',
    driverColumn: 'Tài xế',
    contactColumn: 'Liên hệ',
    licenseColumn: 'GPLX',
    assignedVehicleColumn: 'Xe phụ trách',
    ratingColumn: 'Đánh giá',
    tripsColumn: 'Chuyến đi',
    joinedDate: 'Tham gia',
    addNewDriverTitle: 'Thêm Tài Xế Mới',
    licenseNumberLabel: 'Số GPLX',

    // Route Management
    routeManagementTitle: 'Quản Lý Chuyến Đi',
    routeManagementDesc: 'Quản lý lịch trình và chuyến đi',
    createNewTrip: 'Tạo chuyến mới',
    scheduledTrips: 'Đã lên lịch',
    runningTrips: 'Đang chạy',
    totalTicketsSold: 'Tổng vé đã bán',
    searchRoute: 'Tìm kiếm theo tuyến đường, biển số...',
    scheduledStatus: 'Đã lên lịch',
    runningStatus: 'Đang chạy',
    completedStatus: 'Hoàn thành',
    cancelledStatus: 'Đã hủy',
    routeColumn: 'Tuyến đường',
    timeColumn: 'Thời gian',
    dateColumn: 'Ngày',
    priceColumn: 'Giá vé',
    seatsColumn: 'Số ghế',
    assignDriver: 'Phân công tài xế',
    driverAssigned: 'Đã phân công tài xế thành công!',

    // Booking Management
    bookingManagementTitle: 'Quản Lý Đặt Vé',
    bookingManagementDesc: 'Xem và quản lý các vé đã đặt',
    totalBookingsCount: 'Tổng đặt vé',
    confirmedBookings: 'Đã xác nhận',
    cancelledBookings: 'Đã hủy',
    totalRevenueLabel: 'Tổng doanh thu',
    searchBooking: 'Tìm kiếm theo mã vé, tên, SĐT...',
    ticketCodeColumn: 'Mã vé',
    passengerColumn: 'Hành khách',
    bookingDateColumn: 'Ngày đặt',
    viewBookingDetails: 'Chi tiết đặt vé',
    bookingDetails: 'Chi Tiết Đặt Vé',
    bookingInformation: 'Thông Tin Đặt Vé',
    tripInformation: 'Thông Tin Chuyến Đi',
    passengerInformation: 'Thông Tin Hành Khách',
    exportBookings: 'Xuất danh sách',

    // Additional Route Management
    selectVehicle: 'Chọn xe',
    createTrip: 'Tạo chuyến đi',
    ticketPrice: 'Giá vé',

    // Driver Applications
    driverApplicationsTitle: 'Đơn Đăng Ký Tài Xế',
    driverApplicationsDesc: 'Quản lý và phê duyệt đơn đăng ký tài xế mới',
    exportExcel: 'Xuất Excel',
    totalApplications: 'Tổng đơn',
    pendingApplications: 'Chờ duyệt',
    approvedApplications: 'Đã duyệt',
    rejectedApplications: 'Từ chối',
    searchApplications: 'Tìm kiếm theo tên, SĐT, email...',
    allApplications: 'Tất cả',
    // driverInfo: 'Tài xế', // Duplicate
    // contactInfo: 'Liên hệ', // Duplicate
    licenseInfo: 'Bằng lái',
    submittedDate: 'Ngày nộp',
    actions: 'Thao tác',
    // viewDetails: 'Xem chi tiết', // Duplicate
    approve: 'Phê duyệt',
    reject: 'Từ chối',
    noApplicationsFound: 'Không tìm thấy đơn đăng ký nào',
    tryChangeFilter: 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm',
    applicationCode: 'Mã đơn',
    personalInformation: 'Thông tin cá nhân',
    username: 'Tên đăng nhập',
    professionalInfo: 'Thông tin nghề nghiệp',
    licenseImage: 'Ảnh bằng lái xe',
    experienceYears: 'năm kinh nghiệm',
    notes: 'Ghi chú',
    addNote: 'Thêm ghi chú (tùy chọn):',
    rejectReason: 'Nhập lý do từ chối (sẽ được gửi đến tài xế):',
    approveSuccess: 'Đã phê duyệt đơn đăng ký! Tài xế sẽ nhận được email thông báo.',
    rejectSuccess: 'Đã từ chối đơn đăng ký! Email thông báo đã được gửi đến tài xế.',
    pendingStatus: 'Chờ duyệt',
    approvedStatus: 'Đã duyệt',
    rejectedStatus: 'Từ chối',

    // FAQ Page
    faqTitle: 'Câu Hỏi Thường Gặp',
    faqSubtitle: 'Tìm câu trả lời cho các thắc mắc của bạn',
    searchFAQ: 'Tìm kiếm câu hỏi...',
    allCategories: 'Tất cả',
    bookingCategory: 'Đặt vé',
    paymentCategory: 'Thanh toán',
    tripCategory: 'Chuyến đi',
    supportCategory: 'Hỗ trợ',
    backToHome: 'Về trang chủ',

    // FAQ Questions & Answers
    faq1Q: 'Làm thế nào để đặt vé xe trên VeXe.com?',
    faq1A: 'Rất đơn giản! Bạn chỉ cần: (1) Chọn điểm đi, điểm đến và ngày đi trên trang chủ. (2) Xem danh sách các chuyến xe và chọn chuyến phù hợp. (3) Chọn ghế ngồi yêu thích. (4) Điền thông tin hành khách và thanh toán. (5) Nhận vé điện tử qua email và SMS.',
    faq2Q: 'Tôi có thể đặt vé trước bao lâu?',
    faq2A: 'Bạn có thể đặt vé trước tối đa 30 ngày kể từ ngày đi. Tuy nhiên, mỗi nhà xe có thể có chính sách riêng về thời gian mở bán vé.',
    faq3Q: 'Làm sao để hủy hoặc đổi vé đã đặt?',
    faq3A: 'Bạn có thể hủy/đổi vé trong mục "Chuyến xe của tôi". Lưu ý: Phí hủy/đổi vé tùy thuộc vào chính sách của từng nhà xe và thời gian hủy/đổi. Nếu hủy trước 24h, phí thường là 10-20% giá vé. Nếu hủy trong vòng 24h, phí có thể lên đến 50%.',
    faq4Q: 'Có những phương thức thanh toán nào?',
    faq4A: 'VeXe.com hỗ trợ đa dạng phương thức thanh toán: (1) Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB). (2) Ví điện tử (MoMo, ZaloPay, VNPay). (3) Chuyển khoản ngân hàng. (4) Thanh toán tại cửa hàng tiện lợi. Tất cả đều được mã hóa và bảo mật 100%.',
    faq5Q: 'Thanh toán có an toàn không?',
    faq5A: 'Hoàn toàn an toàn! VeXe.com sử dụng công nghệ mã hóa SSL 256-bit, chuẩn bảo mật quốc tế PCI DSS. Thông tin thẻ của bạn sẽ không bao giờ được lưu trữ trên hệ thống của chúng tôi.',
    faq6Q: 'Tôi có nhận được hóa đơn VAT không?',
    faq6A: 'Có, bạn có thể yêu cầu xuất hóa đơn VAT khi đặt vé hoặc liên hệ với bộ phận CSKH trong vòng 7 ngày kể từ ngày đi. Vui lòng cung cấp thông tin công ty đầy đủ.',
    faq7Q: 'Tôi cần mang theo gì khi lên xe?',
    faq7A: 'Bạn cần mang theo: (1) Vé điện tử (có thể là mã QR trên điện thoại hoặc bản in). (2) CMND/CCCD hoặc giấy tờ tùy thân. (3) Hành lý cá nhân. Lưu ý: Mỗi hành khách được mang tối đa 20kg hành lý miễn phí.',
    faq8Q: 'Xe có WiFi và sạc điện thoại không?',
    faq8A: 'Hầu hết các xe cao cấp (VIP, Limousine) đều có WiFi miễn phí và cổng sạc USB. Tuy nhiên, tùy từng nhà xe sẽ có trang thiết bị khác nhau. Bạn có thể kiểm tra tiện ích xe trước khi đặt.',
    faq9Q: 'Nếu tôi đến muộn thì sao?',
    faq9A: 'Xe sẽ khởi hành đúng giờ đã định. Nếu bạn đến muộn, xe có thể đã rời bến và bạn sẽ không được hoàn tiền. Chúng tôi khuyên bạn nên đến bến xe trước 15-30 phút.',
    faq10Q: 'Làm sao để liên hệ với bộ phận CSKH?',
    faq10A: 'Bạn có thể liên hệ với chúng tôi qua: (1) Hotline: 1900 6067 (24/7). (2) Email: support@vexe.com. (3) Live chat trên website. (4) Fanpage Facebook: VeXe.com. (5) Zalo OA: VeXe Official. Chúng tôi sẵn sàng hỗ trợ bạn mọi lúc!',
    faq11Q: 'Tôi quên mất mã đặt vé, làm sao để tìm lại?',
    faq11A: 'Đừng lo! Bạn có thể: (1) Kiểm tra email đã dùng để đặt vé. (2) Vào mục "Tra cứu vé" trên website và nhập số điện thoại. (3) Liên hệ hotline 1900 6067 để được hỗ trợ tra cứu.',
    faq12Q: 'VeXe.com có ứng dụng di động không?',
    faq12A: 'Có! Bạn có thể tải ứng dụng VeXe.com trên App Store (iOS) và Google Play (Android). Ứng dụng có giao diện thân thiện, dễ sử dụng và nhận nhiều ưu đãi độc quyền.',

    // Auth Pages
    driverPortalTitle: 'Cổng Tài Xế',
    driverLoginSubtitle: 'Đăng nhập để bắt đầu làm việc',
    companyAdminTitle: 'Quản Lý Nhà Xe',
    companyLoginSubtitle: 'Đăng nhập để quản lý nhà xe',
    systemAdminTitle: 'Quản Trị Hệ Thống',
    systemLoginSubtitle: 'Đăng nhập với quyền quản trị viên',
    mobilePreviewTitle: 'Xem Giao Diện Mobile',
    previewApp: 'Preview ứng dụng di động',
    managementPortal: 'Cổng quản lý',
    manageTrips: 'Quản lý chuyến đi',
    manageBusiness: 'Điều hành doanh nghiệp',
    manageSystem: 'Quản lý toàn hệ thống',
    usernameLabel: 'Tên đăng nhập',
    enterUsername: 'Nhập tên đăng nhập',
    password: 'Mật khẩu',
    enterPassword: 'Nhập mật khẩu',
    rememberLogin: 'Ghi nhớ đăng nhập',
    rememberMe: 'Ghi nhớ đăng nhập',
    loggingIn: 'Đang đăng nhập...',
    noAccountYet: 'Chưa có tài khoản?',
    noAccount: 'Chưa có tài khoản?',
    registerNow: 'Đăng ký ngay',
    demoNote: 'Demo:',
    demoInstructions: 'Nhập bất kỳ tên và mật khẩu để đăng nhập',
    demoExample: 'Ví dụ:',
    pleaseEnterAllInfo: 'Vui lòng nhập đầy đủ thông tin!',

    // Driver Registration
    driverRegistrationTitle: 'Đăng Ký Tài Xế',
    driverRegistrationSubtitle: 'Gia nhập đội ngũ tài xế chuyên nghiệp của chúng tôi',
    backToLoginPage: 'Về trang đăng nhập',
    backToHomePage: 'Về trang chủ',
    avatarSection: 'Ảnh đại diện',
    chooseAvatar: 'Chọn ảnh đại diện',
    imageFormat: 'Định dạng: JPG, PNG (Max 5MB)',
    personalInfoSection: 'Thông tin cá nhân',
    professionalInfoSection: 'Thông tin nghề nghiệp',
    accountInfoSection: 'Thông tin tài khoản',
    fullNameLabel: 'Họ và tên',
    fullNamePlaceholder: 'Nguyễn Văn A',
    phoneLabel: 'Số điện thoại',
    phonePlaceholder: '0123456789',
    emailPlaceholder: 'email@example.com',
    addressLabel: 'Địa chỉ',
    addressPlaceholder: '123 Đường ABC, Quận 1, TP.HCM',
    licenseNumberField: 'Số bằng lái xe',
    licenseNumberPlaceholder: '123456789',
    experienceLabel: 'Kinh nghiệm lái xe (năm)',
    experiencePlaceholder: '5',
    licenseImageLabel: 'Ảnh bằng lái xe',
    uploadLicenseImage: 'Click để tải lên ảnh bằng lái xe',
    usernameField: 'Tên đăng nhập',
    usernamePlaceholder: 'driver123',
    passwordField: 'Mật khẩu',
    passwordPlaceholder: '••••••••',
    confirmPasswordField: 'Xác nhận mật khẩu',
    confirmPasswordPlaceholder: '••••••••',
    agreeToTerms: 'Tôi đồng ý với',
    termsAndConditions: 'Điều khoản dịch vụ',
    and: 'và',
    privacyPolicyLink: 'Chính sách bảo mật',
    ofVeXe: 'của VeXe.com',
    registerButton: 'Đăng ký ngay',
    processing: 'Đang xử lý...',
    registrationNote: 'Lưu ý:',
    registrationNoteText: 'Sau khi đăng ký, đơn của bạn sẽ được quản lý nhà xe xem xét và phê duyệt trong vòng 24-48h. Chúng tôi sẽ liên hệ với bạn qua email hoặc số điện thoại đã đăng ký.',
    passwordMismatch: 'Mật khẩu xác nhận không khớp!',
    passwordTooShort: 'Mật khẩu phải có ít nhất 6 ký tự!',
    registrationSuccessMessage: 'Đăng ký thành công! Đơn đăng ký của bạn đang chờ phê duyệt. Chúng tôi sẽ liên hệ với bạn trong vòng 24-48h.',
    required: '*',

    // Driver Profile & Settings
    profileAndSettings: 'Hồ Sơ & Cài Đặt',
    personalInfo: 'Thông tin cá nhân',
    // tripHistory: 'Lịch sử chuyến đi', // Duplicate
    changePasswordOption: 'Đổi mật khẩu',
    achievementsAndRatings: 'Thành tích & Đánh giá',
    employeeCode: 'Mã NV',
    excellentDriver: 'Tài xế xuất sắc',
    // tripsCount: 'Chuyến đi', // Duplicate
    rating: 'Đánh giá',
    onTime: 'Đúng giờ',
    thisMonthStats: 'Thống Kê Tháng Này',
    totalTripsThisMonth: 'Tổng chuyến',
    revenueLabel: 'Doanh thu',
    comparedToLastMonth: 'so với tháng trước',
    loginSubtitle: 'Đăng nhập',
    register: 'Đăng ký',
    haveAccount: 'Đã có tài khoản?',
    loginNow: 'Đăng nhập ngay',
    emailField: 'Email',
    confirmPassword: 'Xác nhận mật khẩu',
    enterConfirmPassword: 'Nhập lại mật khẩu',

    // Driver Profile Detail
    backToProfile: 'Quay lại',
    editProfile: 'Chỉnh sửa',
    saveProfile: 'Lưu',
    cancelEdit: 'Hủy',
    // personalInfoSection: 'Thông Tin Cá Nhân', // Duplicate
    licenseInfoSection: 'Thông Tin Bằng Lái',
    // fullNameLabel: 'Họ và tên', // Duplicate
    dateOfBirth: 'Ngày sinh',
    phoneNumberLabel: 'Số điện thoại',
    emailAddress: 'Email',
    idCardNumber: 'Số CCCD',
    // joinedDate: 'Ngày vào làm', // Duplicate
    addressInfo: 'Địa chỉ',
    licenseNumberInfo: 'Số bằng lái',
    licenseExpiry: 'Ngày hết hạn',
    licenseImages: 'Ảnh bằng lái',
    frontSide: 'Mặt trước',
    backSide: 'Mặt sau',
    employeeCodeLabel: 'Mã nhân viên',
    professionalDriver: 'Tài xế chuyên nghiệp',

    // Trip History
    tripHistoryTitle: 'Lịch Sử Chuyến Đi',
    tripHistorySubtitle: 'Xem lại các chuyến đi đã hoàn thành',
    thisWeek: 'Tuần này',
    thisMonth: 'Tháng này',
    thisYear: 'Năm nay',
    tripsCompleted: 'Chuyến đi',
    kmDriven: 'Km đã chạy',
    passengersServed: 'Hành khách',
    totalRevenue: 'Doanh thu',
    averageRatingLabel: 'Đánh giá TB',
    tripDetails: 'Chi tiết chuyến đi',
    completedLabel: 'Hoàn thành',
    passengersLabel: 'hành khách',
    performanceExcellent: 'Hiệu suất xuất sắc! 🎉',
    performanceSummary: 'Bạn đã hoàn thành',
    inPeriod: 'chuyến đi trong',
    week: 'tuần',
    month: 'tháng',
    year: 'năm',
    withRating: 'này với đánh giá trung bình',

    // Notifications
    notificationsPageTitle: 'Thông Báo',
    markAllRead: 'Đánh dấu tất cả đã đọc',
    unreadNotifications: 'thông báo chưa đọc',
    allNotifications: 'Tất cả',
    unreadOnly: 'Chưa đọc',
    readOnly: 'Đã đọc',
    closeButton: 'Đóng',
    detailsLabel: 'Chi tiết',
    viewDetailsButton: 'Xem chi tiết →',
    noNotifications: 'Không có thông báo',
    allRead: 'Bạn đã đọc hết thông báo',
    noNewNotifications: 'Chưa có thông báo mới',

    // Change Password
    changePasswordTitle: 'Đổi Mật Khẩu',
    changePasswordSubtitle: 'Cập nhật mật khẩu để bảo mật tài khoản',
    currentPasswordLabel: 'Mật khẩu hiện tại',
    newPasswordLabel: 'Mật khẩu mới',
    confirmNewPasswordLabel: 'Xác nhận mật khẩu mới',
    enterCurrentPassword: 'Nhập mật khẩu hiện tại',
    enterNewPassword: 'Nhập mật khẩu mới',
    reEnterNewPassword: 'Nhập lại mật khẩu mới',
    passwordRequirements: 'Yêu cầu mật khẩu:',
    minLength: 'Ít nhất 8 ký tự',
    hasUppercase: 'Có chữ hoa',
    hasLowercase: 'Có chữ thường',
    hasNumber: 'Có số',
    hasSpecialChar: 'Có ký tự đặc biệt',
    passwordMismatchError: 'Mật khẩu không khớp',
    changePasswordButton: 'Đổi mật khẩu',
    passwordChangeSuccess: 'Đổi mật khẩu thành công!',
    redirecting: 'Đang chuyển hướng...',
    securityTipsTitle: '💡 Bảo mật tài khoản',
    securityTip1: 'Không chia sẻ mật khẩu với bất kỳ ai',
    securityTip2: 'Thay đổi mật khẩu định kỳ mỗi 3-6 tháng',
    securityTip3: 'Sử dụng mật khẩu khác nhau cho các tài khoản',
    securityTip4: 'Không sử dụng thông tin cá nhân dễ đoán làm mật khẩu',

    // Achievements
    achievementsPageTitle: 'Thành Tích & Đánh Giá',
    achievementsTab: 'Thành tích',
    reviewsTab: 'Đánh giá',
    achievementsUnlocked: 'Thành tích đã mở',
    totalRewards: 'Tổng phần thưởng',
    averageProgress: 'Tiến độ trung bình',
    unlocked: 'Đã mở',
    rewardLabel: 'Phần thưởng:',
    averageRatingStats: 'Đánh giá TB',
    totalReviewsStats: 'Tổng đánh giá',
    fiveStarsCount: '5 sao',
    satisfactionRate: 'Tỷ lệ hài lòng',

    // Driver Assignment
    // assignDriver: 'Phân Công Tài Xế', // Duplicate
    // searchDriver: 'Tìm kiếm tài xế...', // Duplicate
    // tripsCount: 'chuyến', // Duplicate
    available: 'Sẵn sàng',
    busy: 'Đang bận',

    // Payment Modal
    payment: 'Thanh Toán',
    paymentSuccess: 'Thanh toán thành công!',
    // ticketConfirmed: 'Vé của bạn đã được xác nhận', // Duplicate
    ticketInfo: 'Thông tin vé',
    routeLabel: 'Tuyến đường:',
    dateLabel: 'Ngày đi:',
    departureTimeLabel: 'Giờ khởi hành:',
    seatNumberLabel: 'Số ghế:',
    totalAmount: 'Tổng tiền:',
    paymentMethod: 'Phương thức thanh toán',
    creditCard: 'Thẻ tín dụng / Ghi nợ',
    creditCardDesc: 'Visa, Mastercard, JCB',
    momoWallet: 'Ví MoMo',
    momoWalletDesc: 'Thanh toán qua ví điện tử',
    // bankTransfer: 'Chuyển khoản ngân hàng', // Duplicate
    bankTransferDesc: 'Chuyển khoản trực tiếp',
    cardNumber: 'Số thẻ',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Ngày hết hạn',
    expiryDatePlaceholder: 'MM/YY',
    cardholderName: 'Tên chủ thẻ',
    cardholderPlaceholder: 'NGUYEN VAN A',
    // cancel: 'Hủy', // Duplicate
    processingPayment: 'Đang xử lý...',
    payButton: 'Thanh toán',

    // Company Management
    companyManagementTitle: 'Quản Lý Nhà Xe',
    companyManagementDesc: 'Quản lý các nhà xe trên hệ thống',
    addCompany: 'Thêm nhà xe',
    totalCompaniesAll: 'Tổng nhà xe',
    activeStatus: 'Đang hoạt động',
    totalVehiclesAll: 'Tổng số xe',
    searchByNameEmail: 'Tìm kiếm theo tên, email...',
    // allStatus: 'Tất cả trạng thái', // Duplicate
    activeLabel: 'Hoạt động',
    suspendedLabel: 'Tạm ngưng',
    companyColumn: 'Nhà xe',
    contactColumn: 'Liên hệ',
    vehiclesColumn: 'Số xe',
    tripsColumn: 'Chuyến đi',
    revenueColumn: 'Doanh thu',
    ratingColumn: 'Đánh giá',
    statusColumn: 'Trạng thái',
    actionsColumn: 'Hành động',
    joinedLabel: 'Tham gia:',
    // viewDetails: 'Xem chi tiết', // Duplicate
    editAction: 'Sửa',
    suspendAction: 'Tạm ngưng',
    activateAction: 'Kích hoạt',

    // User Management
    userManagementTitle: 'Quản Lý Người Dùng',
    userManagementDesc: 'Quản lý tất cả người dùng trên hệ thống',
    totalUsersStats: 'Tổng người dùng',
    activeUsers: 'Người dùng hoạt động',
    bannedUsers: 'Đã cấm',
    totalRevenueStats: 'Tổng doanh thu',
    searchByNameEmailPhone: 'Tìm kiếm theo tên, email, SĐT...',
    allRoles: 'Tất cả vai trò',
    userRole: 'Người dùng',
    companyAdminRoleLabel: 'Quản lý nhà xe',
    bannedStatus: 'Đã cấm',
    userNameColumn: 'Người dùng',
    roleColumn: 'Vai trò',
    totalTripsColumn: 'Tổng chuyến',
    totalSpentColumn: 'Tổng chi tiêu',
    joinDateColumn: 'Ngày tham gia',
    banUser: 'Cấm',
    unbanUser: 'Bỏ cấm',

    // System Dashboard
    systemDashboardTitleAlt: 'Dashboard Hệ Thống',
    systemAdminLabel: 'Quản trị viên hệ thống',
    exportReport: 'Xuất báo cáo',
    totalCompaniesStats: 'Tổng nhà xe',
    usersStats: 'Người dùng',
    totalVehiclesStats: 'Tổng xe',
    monthlyRevenueStats: 'Doanh thu tháng',
    revenueOverview: 'Tổng Quan Doanh Thu',
    thisMonth: 'Tháng này',
    thisQuarter: 'Quý này',
    thisYear: 'Năm nay',
    topCompanies: 'Top Nhà Xe',
    companyNameColumn: 'Tên nhà xe',

    // Review Management
    reviewManagementTitle: 'Quản Lý Đánh Giá',
    reviewManagementDesc: 'Quản lý đánh giá và phản hồi từ khách hàng',
    publishedReviews: 'Đã đăng',
    flaggedReviews: 'Đã báo cáo',
    searchReviews: 'Tìm kiếm đánh giá...',
    allRatings: 'Tất cả đánh giá',
    stars: 'sao',
    publishedLabel: 'Đã đăng',
    hiddenLabel: 'Đã ẩn',
    flaggedLabel: 'Đã báo cáo',
    reviewerColumn: 'Người đánh giá',
    companyRouteColumn: 'Nhà xe & Tuyến',
    commentColumn: 'Bình luận',
    hideReview: 'Ẩn',
    showReview: 'Hiện',
    deleteReview: 'Xóa',
    tripDateLabel: 'Chuyến đi:',
    likesLabel: 'lượt thích',

    // About Page
    aboutDescription: 'Nền tảng đặt vé xe khách trực tuyến hàng đầu Việt Nam, mang đến trải nghiệm đặt vé nhanh chóng, an toàn và tiện lợi cho hàng triệu hành khách',
    routesCount: 'Tuyến đường',
    partnerCompanies: 'Đối tác nhà xe',
    yearsExperience: 'Năm kinh nghiệm',
    safetyAndTrust: 'An toàn & Tin cậy',
    safetyDescription: 'Cam kết đảm bảo an toàn tuyệt đối cho mọi hành khách với đội ngũ tài xế chuyên nghiệp',
    dedicatedService: 'Phục vụ tận tâm',
    dedicatedServiceDescription: 'Đội ngũ nhân viên nhiệt tình, luôn sẵn sàng hỗ trợ bạn 24/7',
    highQuality: 'Chất lượng cao',
    highQualityDescription: 'Đội xe hiện đại, tiện nghi đầy đủ, đảm bảo chuyến đi thoải mái nhất',
    onTimeDescription: 'Cam kết khởi hành và đến nơi đúng giờ, tôn trọng thời gian của bạn',
    ourStory: 'Câu Chuyện Của Chúng Tôi',
    ourStoryDesc: 'VeXe.com được thành lập với sứ mệnh mang đến trải nghiệm đặt vé xe khách tốt nhất cho người Việt',
    ourMission: 'Sứ Mệnh',
    ourMissionDesc: 'Kết nối hàng triệu hành khách với các nhà xe uy tín, tạo nên một hệ sinh thái giao thông an toàn, tiện lợi và minh bạch',
    ourJourney: 'Hành Trình Phát Triển',
    founded: 'Thành lập',
    foundedDesc: 'VeXe.com chính thức ra mắt tại TP. Hồ Chí Minh',
    expansion: 'Mở rộng',
    expansionDesc: 'Phủ sóng toàn quốc với hơn 200 đối tác nhà xe',
    mobileApp: 'Ứng dụng di động',
    mobileAppDesc: 'Ra mắt ứng dụng iOS và Android',
    milestone5M: '5 triệu khách hàng',
    awardDesc: 'Nhận giải thưởng "Nền tảng đặt vé tốt nhất"',
    present: 'Hiện tại',
    presentDesc: 'Phục vụ hơn 10 triệu khách hàng mỗi năm',
    ourTeam: 'Đội Ngũ Của Chúng Tôi',
    ourTeamDesc: 'Những con người đam mê, tận tâm và không ngừng sáng tạo',
    joinUs: 'Tham gia cùng chúng tôi',
    joinUsDesc: 'Hãy là một phần trong hành trình phát triển của VeXe.com',

    // Payment Page
    paymentTitle: 'Thanh Toán',
    paymentSubtitle: 'Chọn phương thức thanh toán để hoàn tất đặt vé',
    tripSummary: 'Thông Tin Chuyến Đi',
    departureDate: 'Ngày đi',
    selectedSeats: 'Ghế đã chọn',
    passengerInfo: 'Thông Tin Hành Khách',
    passengerName: 'Họ và tên',
    passengerPhone: 'Số điện thoại',
    passengerEmail: 'Email (tùy chọn)',
    enterPassengerName: 'Nhập họ và tên',
    enterPassengerPhone: 'Nhập số điện thoại',
    enterPassengerEmail: 'Nhập email',
    pricingDetails: 'Chi Tiết Giá',
    ticketFare: 'Giá vé',
    serviceFee: 'Phí dịch vụ',
    totalPayment: 'Tổng thanh toán',
    selectPaymentMethod: 'Chọn Phương Thức Thanh Toán',
    creditCardPayment: 'Thẻ tín dụng/ghi nợ',
    momoPayment: 'Ví MoMo',
    momoPaymentDesc: 'Thanh toán qua ví điện tử MoMo',
    vnpayPayment: 'VNPay',
    vnpayPaymentDesc: 'Thanh toán qua VNPay QR',
    bankPayment: 'Chuyển khoản ngân hàng',
    bankPaymentDesc: 'Chuyển khoản trực tiếp',
    completePayment: 'Hoàn Tất Thanh Toán',
    processingPaymentText: 'Đang xử lý thanh toán...',

    // QR Ticket Page
    qrTicketTitle: 'Vé Điện Tử',
    downloadQR: 'Tải xuống',
    shareQR: 'Chia sẻ',
    printQR: 'In vé',
    showQRCode: 'Xuất trình mã QR này khi lên xe',
    bookingSuccess: 'Đặt vé thành công!',
    bookingSuccessDesc: 'Vé điện tử của bạn đã sẵn sàng',
    importantNotes: 'Lưu Ý Quan Trọng',
    note1: 'Vui lòng đến điểm đón trước giờ khởi hành 15-30 phút',
    note2: 'Xuất trình mã QR và CMND/CCCD khi lên xe',
    note3: 'Mang theo hành lý tối đa 20kg (miễn phí)',
    note4: 'Liên hệ hotline nếu cần hỗ trợ',
    needHelp: 'Cần Hỗ Trợ?',
    contactHotline: 'Liên hệ hotline',
    customerCare: 'Chăm sóc khách hàng',

    // Contact Page
    getInTouch: 'Liên Hệ',
    getInTouchDesc: 'Chúng tôi rất mong được nghe từ bạn',
    yourName: 'Tên của bạn',
    yourEmail: 'Email của bạn',
    yourMessage: 'Tin nhắn của bạn',
    sendMessageButton: 'Gửi tin nhắn',
    sendingMessage: 'Đang gửi...',
    contactVia: 'Hoặc Liên Hệ Qua',
    officeAddress: 'Địa chỉ văn phòng',
    workingHours: 'Giờ làm việc',
    mondayFriday: 'Thứ 2 - Thứ 6',
    saturdaySunday: 'Thứ 7 - Chủ nhật',
    followUs: 'Theo Dõi Chúng Tôi',

    // Driver Trip Detail (NEW)
    checkinProgress: 'Tiến Độ Check-in',
    navigation: 'Dẫn đường',
    callDispatch: 'Gọi TT',
    reportIssue: 'Báo cáo',
    passengerList: 'Danh Sách Hành Khách',
    seatLabel: 'Ghế:',
    ticketCodeLabel: 'Mã vé:',

    // QR Scanner (NEW)
    scanQRInstruction: 'Di chuyển camera đến mã QR trên vé của hành khách',
    holdSteady: 'Giữ camera ổn định để quét',
    enterTicketCode: 'Nhập Mã Vé',
    enterTicketCodePlaceholder: 'Nhập mã vé',
    checkinSuccess: 'Check-in Thành Công!',
    invalidTicket: 'Mã vé không hợp lệ',
    pleaseTryAgain: 'Vui lòng thử lại',

    // Navigation (NEW)
    speedLabel: 'Tốc độ',
    remainingLabel: 'Còn lại',
    turnRightRoad: 'Rẽ phải vào Quốc lộ 1A',
    after25km: 'Sau 2.5km',
    reportIncident: 'Báo sự cố',
    callSupport: 'Gọi hỗ trợ',
    stopPoint: 'Điểm dừng',

    // Earnings (NEW)
    earningsTitle: 'Thu Nhập',
    earningsSubtitle: 'Quản lý thu nhập và chi phí của bạn',
    totalEarnings: 'Tổng thu nhập',
    baseEarnings: 'Thu nhập cơ bản',
    bonusEarnings: 'Thưởng & phụ cấp',
    currencyVND: 'VNĐ',

    // Demo Data
    demoUserName: 'Nguyễn Văn A',
    demoUserEmail: 'nguyenvana@example.com',
    demoDestination: 'Đà Lạt',

    // Additional Missing Keys
    manualEntry: 'Nhập mã thủ công',
    // confirm: 'Xác nhận', // Duplicate
    onBoard: 'Đã lên xe',
    notCheckedIn: 'Chưa lên',

    // Driver Applications (System Admin)
    // driverApplicationsTitle: 'Đơn Đăng Ký Tài Xế', // Duplicate
    // driverApplicationsSubtitle: 'Quản lý và phê duyệt đơn đăng ký tài xế mới', // Duplicate
    // exportExcel: 'Xuất Excel', // Duplicate
    totalApplications: 'Tổng đơn',
    pendingApplications: 'Chờ duyệt',
    approvedApplications: 'Đã duyệt',
    rejectedApplications: 'Từ chối',
    searchApplications: 'Tìm kiếm theo tên, SĐT, email...',
    // driverColumn: 'Tài xế', // Duplicate
    // contactColumn: 'Liên hệ', // Duplicate
    documentsColumn: 'Giấy tờ',
    submitDateColumn: 'Ngày nộp',
    // viewDetails: 'Xem chi tiết', // Duplicate
    // approve: 'Phê duyệt', // Duplicate
    // reject: 'Từ chối', // Duplicate
    addNoteOptional: 'Thêm ghi chú (tùy chọn):',
    // approveSuccess: 'Đã phê duyệt đơn đăng ký! Tài xế sẽ nhận được email thông báo.', // Duplicate
    // rejectSuccess: 'Đã từ chối đơn đăng ký! Email thông báo đã được gửi đến tài xế.', // Duplicate
    enterRejectReason: 'Nhập lý do từ chối:',
    licenseNumber: 'Số bằng lái',
    experience: 'Kinh nghiệm',
    years: 'năm',
    applicationDetails: 'Chi Tiết Đơn Đăng Ký',
    applicantInfo: 'Thông Tin Ứng Viên',
    licenseInfo: 'Thông Tin Bằng Lái',
    experienceYears: 'Số năm kinh nghiệm',
    viewLicense: 'Xem bằng lái',
    adminNotes: 'Ghi chú của admin',
    addNote: 'Thêm ghi chú',
    approveApplication: 'Phê duyệt',
    rejectApplication: 'Từ chối',
    noApplicationsFound: 'Không tìm thấy đơn đăng ký nào',
    tryChangeFilter: 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm',
    applicationCode: 'Mã đơn',
    personalInfo: 'Thông tin cá nhân',
    // fullNameLabel: 'Họ và tên', // Duplicate
    // usernameLabel: 'Tên đăng nhập', // Duplicate
    // phoneNumberLabel: 'Số điện thoại', // Duplicate
    // addressLabel: 'Địa chỉ', // Duplicate
    professionalInfo: 'Thông tin nghề nghiệp',
    licenseImageLabel: 'Ảnh bằng lái xe',
    notesLabel: 'Ghi chú',
    // statusColumn: 'Trạng thái', // Duplicate
    // actionsColumn: 'Thao tác', // Duplicate

    // Demo Login
    demoLoginInstruction: 'Nhập bất kỳ tên và mật khẩu để đăng nhập',
    demoExample: 'Ví dụ: admin / password',
  },
  en: {
    // Header
    home: 'Home',
    routes: 'Routes',
    ticketLookup: 'Ticket Lookup',
    contact: 'Contact',
    hotline: 'Hotline',
    login: 'Login',
    logout: 'Logout',
    account: 'Account',
    myTrips: 'My Trips',
    profile: 'Profile',

    // Hero
    heroTitle: 'Book Bus Tickets Online',
    heroSubtitle: 'Fast - Safe - Convenient',
    departure: 'From',
    destination: 'To',
    date: 'Date',
    search: 'Search',
    selectDeparture: 'Select departure',
    selectDestination: 'Select destination',

    // Popular Routes
    popularRoutes: 'Popular Routes',
    popularDestinations: 'Popular Destinations',
    tripsPerDay: 'trips/day',
    from: 'From',

    // Features
    features: 'Why Choose Us',
    feature1Title: 'Quick Booking',
    feature1Desc: 'Just a few simple steps',
    feature2Title: 'Secure',
    feature2Desc: '100% secure payment',
    feature3Title: '24/7 Support',
    feature3Desc: 'Always ready to help',
    feature4Title: 'Best Price',
    feature4Desc: 'Guaranteed competitive pricing',
    featuresSubtitle: 'Experience the best bus ticket booking service',
    safeAndSecure: 'Safe & Secure',
    safeAndSecureDesc: 'Your payment information is protected by high-level encryption',
    timeSaving: 'Time-saving',
    timeSavingDesc: 'Book tickets in minutes without going to the bus station',
    bestPrice: 'Best Price',
    bestPriceDesc: 'Compare prices and find the best deals for your trip',
    support247: '24/7 Support',
    support247Desc: 'Our customer service team is always ready to help you',
    qualityAssured: 'Quality Assured',
    qualityAssuredDesc: 'Trusted bus company with high service standards',
    multiplePayments: 'Multiple Payment Options',
    multiplePaymentsDesc: 'Supports convenient and secure payment methods',

    // Promo Banner
    limitedOffer: 'Limited Time Offer',
    specialOfferTitle: 'Special Offer - 20% Off Your First Booking!',
    useCode: 'Use code',
    whenCheckout: 'at checkout. Only for new customers.',
    bookNowAndSave: 'Book Now & Save',

    // Footer
    platformDescription: 'Vietnam\'s leading online bus ticket booking platform',
    aboutUs: 'About Us',
    aboutCompany: 'About',
    faq: 'FAQ',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    support: 'Support',
    bookingGuide: 'Booking Guide',
    refundPolicy: 'Refund Policy',
    feedbackAndComplaint: 'Feedback & Complaints',
    contactInfo: 'Contact Information',
    addressLabel: 'Address',
    addressValue: '123 ABC Street, District 1, Ho Chi Minh City',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    mapLocation: 'Map Location',
    sendMessage: 'Send Message',
    allRightsReserved: 'All rights reserved',

    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are always ready to help you',
    fullName: 'Full name',
    email: 'Email',
    phone: 'Phone number',
    message: 'Message',
    send: 'Send message',

    // Routes Page
    allRoutes: 'All Routes',
    routesSubtitle: 'Discover popular routes',

    // Search Results
    searchResults: 'Search Results',
    foundTrips: 'Found',
    tripsCount: 'trips',
    sortByTime: 'Departure Time',
    sortByPrice: 'Lowest Price',
    sortByDuration: 'Duration',
    reviews: 'reviews',
    seatsAvailable: 'seats available',
    viewDetails: 'View Details',
    amenityWifi: 'WiFi',
    amenityDrink: 'Drinks',
    amenityAC: 'Air Conditioning',
    amenityTV: 'TV',

    // Hotline
    hotlineTitle: '24/7 Support Hotline',
    hotlineSubtitle: 'We are always ready to help you anytime',
    customerService: 'Customer service',
    bookingSupport: 'Booking support',
    technicalSupport: 'Technical support',
    complaint: 'Complaints & Feedback',

    // Ticket Lookup
    ticketLookupTitle: 'Ticket Lookup',
    ticketLookupHeader: 'Ticket Information Lookup',
    ticketLookupSubtitle: 'Enter ticket code and phone number to lookup information',
    ticketCode: 'Ticket code',
    ticketCodePlaceholder: 'Enter ticket code (e.g. VX2024123001)',
    phoneNumber: 'Phone number',
    phoneNumberPlaceholder: 'Enter booking phone number',
    lookupButton: 'Look up',
    ticketConfirmed: 'Ticket Confirmed',
    bookingCode: 'Booking Code',
    route: 'Route',
    time: 'Time',
    passenger: 'Passenger',
    seatAndPrice: 'Seat & Price',
    seat: 'Seat',
    seatNumber: 'Seat number',
    busCompany: 'Bus Company',
    busType: 'Bus Type',
    pickupPoint: 'Pickup Point',
    printTicket: 'Print Ticket',
    cancelTicket: 'Cancel Ticket',
    sleeper: 'Sleeper',
    seating: 'Seating',

    // My Trips
    myTripsTitle: 'My Trips',
    allTrips: 'All',
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled',
    noTripsYet: 'No trips yet',
    noTripsDesc: 'Book a ticket now to start your journey',
    downloadTicket: 'Download Ticket',
    rateTrip: 'Rate',
    ratingModalTitle: 'Rate Your Trip',
    yourRating: 'Your Rating',
    shareExperience: 'Share your experience...',
    submitRating: 'Submit Rating',
    upcomingStatus: 'Upcoming',
    completedStatus: 'Completed',
    cancelledStatus: 'Cancelled',

    // Messages
    selectBothLocations: 'Please select both departure and destination',
    messageSent: 'Message sent successfully! We will respond soon.',

    // Settings Page
    settings: 'Settings',
    settingsSubtitle: 'Manage bus company system settings',
    general: 'General',
    companyInfo: 'Company Info',
    notifications: 'Notifications',
    security: 'Security',
    payment: 'Payment',
    backup: 'Backup',

    // General Settings
    generalSettings: 'General Settings',
    generalSettingsDesc: 'General system configuration',
    timezone: 'Timezone',
    defaultLanguage: 'Default Language',
    currentLanguage: 'Current Language',
    dateFormat: 'Date Format',
    currency: 'Currency',
    businessHours: 'Business Hours',
    businessHoursDesc: 'Configure working hours',
    weekdays: 'Monday - Friday',
    weekend: 'Saturday - Sunday',

    // Company Settings
    companySettings: 'Company Information',
    companySettingsDesc: 'Update bus company information',
    companyName: 'Company name',
    address: 'Address',
    taxCode: 'Tax code',
    website: 'Website',
    companyLogo: 'Company logo',
    uploadLogo: 'Upload logo',

    // Pricing Settings
    pricingSettings: 'Pricing Settings',
    pricingSettingsDesc: 'Manage ticket pricing policy',
    baseRate: 'Base Rate (VND)',
    perKmRate: 'Per Km Rate (VND)',
    cancellationFee: 'Cancellation Fee (%)',
    lateCancellationHours: 'Late Cancellation Hours',
    childDiscount: 'Child Discount (%)',
    studentDiscount: 'Student Discount (%)',

    // Notification Settings
    notificationSettings: 'Notification Settings',
    notificationSettingsDesc: 'Manage system notifications',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Receive email notifications about bookings and cancellations',
    pushNotifications: 'Push Notifications',
    pushNotificationsDesc: 'Receive push notifications on mobile devices',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDesc: 'Send SMS booking confirmation to customers',
    emailTemplates: 'Email Templates',
    bookingConfirmEmail: 'Booking Confirmation Email',
    bookingConfirmEmailDesc: 'Configure confirmation email content',
    cancellationEmail: 'Cancellation Email',
    cancellationEmailDesc: 'Notify customers about cancellations',
    reminderEmail: 'Trip Reminder Email',
    reminderEmailDesc: 'Remind customers 24h before departure',

    // Security Settings
    securitySettings: 'Security',
    securitySettingsDesc: 'Account and system security settings',
    changePassword: 'Change Password',
    changePasswordDesc: 'Update login password',
    twoFactorAuth: 'Two-Factor Authentication (2FA)',
    twoFactorAuthDesc: 'Enhance security with 2FA',
    loginHistory: 'Login History',
    loginHistoryDesc: 'View recent login activities',
    manageSession: 'Manage Sessions',
    manageSessionDesc: 'Logout from other devices',
    securityPolicies: 'Security Policies',
    sessionTimeout: 'Session Timeout (minutes)',
    maxLoginAttempts: 'Maximum Login Attempts',

    // Payment Settings
    paymentGateway: 'Payment Gateway',
    paymentGatewayDesc: 'Manage payment methods',
    vnpay: 'VNPay',
    vnpayDesc: 'VNPay payment gateway',
    momo: 'MoMo',
    momoDesc: 'MoMo e-wallet',
    zalopay: 'ZaloPay',
    zalopayDesc: 'ZaloPay e-wallet',
    bankTransfer: 'Bank Transfer',
    bankTransferDesc: 'Payment via bank transfer',
    cash: 'Cash',
    cashDesc: 'Direct payment',

    // Backup Settings
    backupSettings: 'Data Backup',
    backupSettingsDesc: 'Manage automatic backup and restore',
    autoBackup: 'Automatic Backup',
    autoBackupDesc: 'Daily backup at 02:00',
    backupFrequency: 'Backup Frequency',
    retentionDays: 'Retention Period (days)',
    backupNow: 'Backup Now',
    recentBackups: 'Recent Backups',
    restore: 'Restore',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',

    // Common
    save: 'Save',
    saveChanges: 'Save Changes',
    saveAllChanges: 'Save All Changes',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',

    // Admin Dashboard
    dashboard: 'Dashboard',
    statistics: 'Statistics',
    trips: 'Trips',
    buses: 'Buses',
    drivers: 'Drivers',
    revenue: 'Revenue',
    customers: 'Customers',
    bookings: 'Bookings',

    // Admin Menu Items
    companyAdmin: 'Company',
    systemAdmin: 'Admin',
    vehicleManagement: 'Vehicles',
    routeManagement: 'Routes',
    bookingManagement: 'Bookings',
    driverManagement: 'Drivers',
    driverApplications: 'Applications',
    companyManagement: 'Companies',
    userManagement: 'Users',
    reviewManagement: 'Reviews',
    dataManagement: 'Data',
    promoCodeManagement: 'Promo Codes',
    routeImagesManagement: 'Route Images',
    underDevelopment: 'Under Development',
    pageUnderConstruction: 'is under construction',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    switchToLight: 'Switch to light',
    switchToDark: 'Switch to dark',
    switchToEnglish: 'Switch to English',
    switchToVietnamese: 'Chuyển sang Tiếng Việt',

    // Driver Portal
    driverPortal: 'Driver Portal',
    mySchedule: 'My Schedule',
    todayTrips: "Today's Trips",
    upcomingTrips: 'Upcoming Trips',
    tripHistory: 'Trip History',
    passengers: 'Passengers',
    checkIn: 'Check-in',
    scanQR: 'Scan QR',
    driverInfo: 'Driver Information',
    licenseNumber: 'License Number',
    idCard: 'ID Card Number',
    achievements: 'Achievements & Ratings',
    ratings: 'Ratings',
    totalTrips: 'Total Trips',
    onTimeRate: 'On-Time Rate',
    safetyScore: 'Safety Score',

    // Driver Home
    navigation: 'Navigation',
    earnings: 'Earnings',
    theme: 'Theme',
    language: 'Language',
    driver: 'Driver',
    hello: 'Hello',
    today: 'Today',
    tripToday: 'Trips today',
    aboutToDepart: 'About to depart',
    running: 'Running',
    arrived: 'Arrived',
    searchTrips: 'Search trips...',
    distance: 'Distance',
    boarded: 'Boarded',

    // Notifications
    notificationsTitle: 'Notifications',
    viewAll: 'View All',
    newTripAssigned: 'New Trip Assigned',
    scheduleChanged: 'Schedule Changed',
    tripCompleted: 'Trip Completed',
    minutesAgo: 'minutes ago',
    hourAgo: 'hour ago',
    hoursAgo: 'hours ago',

    // Trip Details
    vehiclePlate: 'Vehicle Plate',
    noTrips: 'No trips available',

    // Promo Codes
    promoCodes: 'Promo Codes',
    promoCode: 'Promo Code',
    applyPromoCode: 'Apply Promo Code',
    enterPromoCode: 'Enter Promo Code',
    promoCodeApplied: 'Promo Code Applied',
    promoCodeInvalid: 'Invalid Promo Code',
    promoCodeDetails: 'Promo Code Details',
    discount: 'Discount',
    validUntil: 'Valid Until',
    applicableRoutes: 'Applicable Routes',
    minAmount: 'Minimum Amount',
    maxDiscount: 'Maximum Discount',
    useCode: 'Use Code',
    viewDetails: 'View Details',
    availablePromoCodes: 'Available Promo Codes',
    selectAndApply: 'Select and apply the appropriate code',

    // Seat Selection
    selectSeat: 'Select Seat',
    seatMap: 'Seat Map',
    floor1: 'Floor 1',
    floor2: 'Floor 2',
    available: 'Available',
    selected: 'Selected',
    booked: 'Booked',
    holding: 'Holding',

    // Vehicle Types
    vehicleType: 'Vehicle Type',
    sleeperBus: 'Sleeper Bus',
    seatBus: 'Seat Bus',
    limousine: 'Limousine',
    vipBus: 'VIP Bus',
    beds: 'Beds',
    seats: 'Seats',
    vehicleDetails: 'Vehicle Details',

    // Forgot Password
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    enterEmail: 'Enter your email',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    resetEmailSent: 'Reset password email sent',
    checkYourEmail: 'Please check your email',
    forgotPasswordDriver: 'Forgot Password - Driver',
    forgotPasswordCompany: 'Forgot Password - Company Admin',
    forgotPasswordSystem: 'Forgot Password - System Admin',
    forgotPasswordCustomer: 'Forgot Password',
    enterEmailToReset: 'Enter your email to receive password reset link',
    registeredEmail: 'Registered Email',
    emailPlaceholder: 'example@email.com',
    sendingEmail: 'Sending...',
    sendResetLinkButton: 'Send Reset Link',
    emailSentSuccess: 'Email has been sent!',
    checkEmailMessage: 'Please check your email',
    checkEmailFor: 'to receive the password reset link.',
    noteLabel: 'Note:',
    checkSpamFolder: 'Check your spam folder if you don\'t see the email in your inbox.',
    resetLinkNote: 'We will send a password reset link to this email',

    // Dashboard Company
    companyDashboard: 'Company Dashboard',
    totalVehicles: 'Total Vehicles',
    // todayTrips: "Today's Trips", // Duplicate
    totalPassengers: 'Total Passengers',
    monthlyRevenue: 'Monthly Revenue',
    revenue7Days: 'Revenue Last 7 Days',
    recentTrips: 'Recent Trips',
    report: 'Report',
    days7: '7 days',
    days30: '30 days',
    // running: 'Running', // Duplicate
    // aboutToDepart: 'About to depart', // Duplicate
    // completed: 'Completed', // Duplicate
    // vehiclePlate: 'Vehicle Plate', // Duplicate
    bookedSeats: 'Booked',

    // System Dashboard
    systemDashboard: 'System Dashboard',
    totalCompanies: 'Total Companies',
    totalUsers: 'Total Users',
    totalBookings: 'Total Bookings',
    systemRevenue: 'System Revenue',
    activeCompanies: 'Active Companies',
    pendingApproval: 'Pending Approval',
    recentActivities: 'Recent Activities',
    newCompanyRegistered: 'New company registered',
    newDriverApplication: 'New driver application',
    bookingCompleted: 'Booking completed',
    systemAlert: 'System alert',

    // Vehicle Management
    vehicleList: 'Vehicle List',
    addNewVehicle: 'Add New Vehicle',
    vehicleInfo: 'Vehicle Information',
    licensePlate: 'License Plate',
    model: 'Model',
    manufacturer: 'Manufacturer',
    year: 'Year',
    capacity: 'Capacity',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    maintenance: 'Maintenance',
    lastMaintenance: 'Last Maintenance',
    nextMaintenance: 'Next Maintenance',
    totalDistance: 'Total Distance',
    fuelType: 'Fuel Type',
    diesel: 'Diesel',
    gasoline: 'Gasoline',
    electric: 'Electric',
    hybrid: 'Hybrid',
    amenities: 'Amenities',
    wifi: 'WiFi',
    ac: 'Air Conditioning',
    tv: 'TV',
    charger: 'Phone Charger',
    blanket: 'Blanket',
    water: 'Water',
    tissue: 'Tissue',
    vehicleManagementTitle: 'Vehicle Management',
    vehicleManagementDesc: 'Manage the bus fleet of the company',
    totalVehiclesCount: 'Total Vehicles',
    activeVehicles: 'Active Vehicles',
    maintenanceVehicles: 'Maintenance Vehicles',
    totalSeats: 'Total Seats',
    searchVehicle: 'Search by license plate, vehicle type...',
    editVehicle: 'Edit Vehicle',
    deleteVehicleConfirm: 'Are you sure you want to delete this vehicle?',
    vehicleTypeLabel: 'Vehicle Type',
    sleeperBusOption: 'Sleeper Bus',
    vipSleeperBus: 'VIP Sleeper Bus',
    seatBusOption: 'Seat Bus',
    limousineOption: 'Limousine',
    seatNumber: 'Seat Number',
    yearOfManufacture: 'Year of Manufacture',
    manufacturerBrand: 'Manufacturer Brand',

    // Driver Management
    driverManagementTitle: 'Driver Management',
    driverManagementDesc: 'Manage the driver team',
    addDriver: 'Add Driver',
    totalDriversCount: 'Total Drivers',
    availableDrivers: 'Available',
    busyDrivers: 'Busy',
    averageRating: 'Average Rating',
    searchDriver: 'Search by name, phone number, license...',
    allStatus: 'All Statuses',
    availableStatus: 'Available',
    busyStatus: 'Busy',
    offDutyStatus: 'Off Duty',
    driverColumn: 'Driver',
    contactColumn: 'Contact',
    licenseColumn: 'License',
    assignedVehicleColumn: 'Assigned Vehicle',
    ratingColumn: 'Rating',
    tripsColumn: 'Trips',
    joinedDate: 'Joined Date',
    addNewDriverTitle: 'Add New Driver',
    licenseNumberLabel: 'License Number',

    // Route Management
    routeManagementTitle: 'Route Management',
    routeManagementDesc: 'Manage schedules and trips',
    createNewTrip: 'Create New Trip',
    totalTrips: 'Total Trips',
    scheduledTrips: 'Scheduled',
    runningTrips: 'Running',
    totalTicketsSold: 'Total Tickets Sold',
    searchRoute: 'Search by route, license plate...',
    scheduledStatus: 'Scheduled',
    runningStatus: 'Running',
    completedStatus: 'Completed',
    cancelledStatus: 'Cancelled',
    routeColumn: 'Route',
    timeColumn: 'Time',
    dateColumn: 'Date',
    priceColumn: 'Ticket Price',
    seatsColumn: 'Seats',
    assignDriver: 'Assign Driver',
    driverAssigned: 'Driver assigned successfully!',

    // Booking Management
    bookingManagementTitle: 'Booking Management',
    bookingManagementDesc: 'View and manage bookings',
    totalBookingsCount: 'Total Bookings',
    confirmedBookings: 'Confirmed',
    cancelledBookings: 'Cancelled',
    totalRevenueLabel: 'Total Revenue',
    searchBooking: 'Search by ticket code, name, phone number...',
    ticketCodeColumn: 'Ticket Code',
    passengerColumn: 'Passenger',
    bookingDateColumn: 'Booking Date',
    viewBookingDetails: 'View Booking Details',
    bookingDetails: 'Booking Details',
    bookingInformation: 'Booking Information',
    tripInformation: 'Trip Information',
    passengerInformation: 'Passenger Information',
    exportBookings: 'Export Bookings',

    // Additional Route Management
    selectVehicle: 'Select Vehicle',
    createTrip: 'Create Trip',
    ticketPrice: 'Ticket Price',

    // Driver Applications
    driverApplicationsTitle: 'Driver Applications',
    driverApplicationsDesc: 'Manage and approve new driver applications',
    exportExcel: 'Export Excel',
    totalApplications: 'Total Applications',
    pendingApplications: 'Pending',
    approvedApplications: 'Approved',
    rejectedApplications: 'Rejected',
    searchApplications: 'Search by name, phone number, email...',
    allApplications: 'All',
    // driverInfo: 'Driver', // Duplicate
    // contactInfo: 'Contact', // Duplicate
    licenseInfo: 'License',
    submittedDate: 'Submitted Date',
    actions: 'Actions',
    // viewDetails: 'View Details', // Duplicate
    approve: 'Approve',
    reject: 'Reject',
    noApplicationsFound: 'No applications found',
    tryChangeFilter: 'Try changing the filter or search keyword',
    applicationCode: 'Application Code',
    personalInformation: 'Personal Information',
    username: 'Username',
    professionalInfo: 'Professional Information',
    licenseImage: 'License Image',
    experienceYears: 'Years of Experience',
    notes: 'Notes',
    addNote: 'Add Note (optional):',
    rejectReason: 'Enter rejection reason (will be sent to the driver):',
    approveSuccess: 'Application approved! The driver will receive a notification email.',
    rejectSuccess: 'Application rejected! A notification email has been sent to the driver.',
    pendingStatus: 'Pending',
    approvedStatus: 'Approved',
    rejectedStatus: 'Rejected',

    // FAQ Page
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to your questions',
    searchFAQ: 'Search questions...',
    allCategories: 'All',
    bookingCategory: 'Booking',
    paymentCategory: 'Payment',
    tripCategory: 'Trip',
    supportCategory: 'Support',
    backToHome: 'Back to Home',

    // FAQ Questions & Answers
    faq1Q: 'How to book bus tickets on VeXe.com?',
    faq1A: 'It\'s simple! Just: (1) Select departure, destination and date on homepage. (2) View list of trips and choose suitable one. (3) Select your favorite seat. (4) Fill in passenger information and payment. (5) Receive e-ticket via email and SMS.',
    faq2Q: 'How far in advance can I book tickets?',
    faq2A: 'You can book tickets up to 30 days in advance. However, each bus company may have their own policy regarding ticket sales opening time.',
    faq3Q: 'How to cancel or change my booked ticket?',
    faq3A: 'You can cancel/change tickets in "My Trips" section. Note: Cancellation/change fees depend on each bus company\'s policy and timing. If canceled before 24h, the fee is usually 10-20% of ticket price. If canceled within 24h, the fee can be up to 50%.',
    faq4Q: 'What payment methods are available?',
    faq4A: 'VeXe.com supports various payment methods: (1) Credit/Debit cards (Visa, Mastercard, JCB). (2) E-wallets (MoMo, ZaloPay, VNPay). (3) Bank transfer. (4) Payment at convenience stores. All are encrypted and 100% secure.',
    faq5Q: 'Is payment secure?',
    faq5A: 'Absolutely safe! VeXe.com uses SSL 256-bit encryption technology, international PCI DSS security standard. Your card information will never be stored on our system.',
    faq6Q: 'Can I get a VAT invoice?',
    faq6A: 'Yes, you can request a VAT invoice when booking or contact customer service within 7 days from departure date. Please provide complete company information.',
    faq7Q: 'What do I need to bring when boarding?',
    faq7A: 'You need to bring: (1) E-ticket (QR code on phone or printed version). (2) ID card or identification documents. (3) Personal luggage. Note: Each passenger is allowed a maximum of 20kg luggage free of charge.',
    faq8Q: 'Does the bus have WiFi and phone charging?',
    faq8A: 'Most premium buses (VIP, Limousine) have free WiFi and USB charging ports. However, each bus company has different equipment. You can check the bus amenities before booking.',
    faq9Q: 'What if I arrive late?',
    faq9A: 'The bus will depart on time. If you arrive late, the bus may have left the station and you will not be refunded. We recommend arriving at the bus station 15-30 minutes early.',
    faq10Q: 'How to contact customer service?',
    faq10A: 'You can contact us via: (1) Hotline: 1900 6067 (24/7). (2) Email: support@vexe.com. (3) Live chat on website. (4) Fanpage Facebook: VeXe.com. (5) Zalo OA: VeXe Official. We are always ready to help you!',
    faq11Q: 'I forgot my booking code, how to find it?',
    faq11A: 'Don\'t worry! You can: (1) Check the email used for booking. (2) Go to "Ticket Lookup" on website and enter phone number. (3) Contact hotline 1900 6067 for support.',
    faq12Q: 'Does VeXe.com have a mobile app?',
    faq12A: 'Yes! You can download VeXe.com app on App Store (iOS) and Google Play (Android). The app has a friendly interface, easy to use and receives many exclusive offers.',

    // Auth Pages
    // driverPortalTitle: 'Driver Portal', // Duplicate
    driverLoginSubtitle: 'Login to start working',
    companyAdminTitle: 'Company Management',
    companyLoginSubtitle: 'Login to manage company',
    systemAdminTitle: 'System Administration',
    systemLoginSubtitle: 'Login with administrator privileges',
    mobilePreviewTitle: 'Mobile Preview',
    previewApp: 'Preview mobile app',
    managementPortal: 'Management Portal',
    manageTrips: 'Manage trips',
    manageBusiness: 'Manage business',
    manageSystem: 'Manage entire system',
    usernameLabel: 'Username',
    enterUsername: 'Enter username',
    password: 'Password',
    enterPassword: 'Enter password',
    rememberLogin: 'Remember me',
    rememberMe: 'Remember me',
    loggingIn: 'Logging in...',
    noAccountYet: "Don't have an account?",
    noAccount: "Don't have an account?",
    registerNow: 'Register now',
    demoNote: 'Demo:',
    demoInstructions: 'Enter any username and password to login',
    demoExample: 'Example:',
    pleaseEnterAllInfo: 'Please enter all information!',

    // Driver Registration
    driverRegistrationTitle: 'Driver Registration',
    driverRegistrationSubtitle: 'Join our professional driver team',
    backToLoginPage: 'Back to login',
    backToHomePage: 'Back to home',
    avatarSection: 'Avatar',
    chooseAvatar: 'Choose avatar',
    imageFormat: 'Format: JPG, PNG (Max 5MB)',
    personalInfoSection: 'Personal Information',
    professionalInfoSection: 'Professional Information',
    accountInfoSection: 'Account Information',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '0123456789',
    emailPlaceholder: 'email@example.com',
    addressLabel: 'Address',
    addressPlaceholder: '123 ABC Street, District 1, HCMC',
    licenseNumberField: 'Driver License Number',
    licenseNumberPlaceholder: '123456789',
    experienceLabel: 'Driving Experience (years)',
    experiencePlaceholder: '5',
    licenseImageLabel: 'Driver License Image',
    uploadLicenseImage: 'Click to upload driver license image',
    usernameField: 'Username',
    usernamePlaceholder: 'driver123',
    passwordField: 'Password',
    passwordPlaceholder: '••••••••',
    confirmPasswordField: 'Confirm Password',
    confirmPasswordPlaceholder: '••••••••',
    agreeToTerms: 'I agree to the',
    termsAndConditions: 'Terms of Service',
    and: 'and',
    privacyPolicyLink: 'Privacy Policy',
    ofVeXe: 'of VeXe.com',
    registerButton: 'Register Now',
    processing: 'Processing...',
    registrationNote: 'Note:',
    registrationNoteText: 'After registration, your application will be reviewed and approved by company management within 24-48 hours. We will contact you via email or registered phone number.',
    passwordMismatch: 'Passwords do not match!',
    passwordTooShort: 'Password must be at least 6 characters!',
    registrationSuccessMessage: 'Registration successful! Your application is pending approval. We will contact you within 24-48 hours.',
    required: '*',

    // Driver Profile & Settings
    profileAndSettings: 'Profile & Settings',
    personalInfo: 'Personal Information',
    // tripHistory: 'Trip History', // Duplicate
    // changePasswordOption: 'Change Password', // Duplicate
    // achievementsAndRatings: 'Achievements & Ratings', // Duplicate
    // employeeCode: 'Employee Code', // Duplicate
    // excellentDriver: 'Excellent Driver', // Duplicate
    // tripsCount: 'Trips', // Duplicate
    // rating: 'Rating', // Duplicate
    // onTime: 'On Time', // Duplicate
    // thisMonthStats: 'This Month\'s Statistics', // Duplicate
    // totalTripsThisMonth: 'Total Trips', // Duplicate
    // revenueLabel: 'Revenue', // Duplicate
    // comparedToLastMonth: 'compared to last month', // Duplicate
    // loginSubtitle: 'Login', // Duplicate
    // register: 'Register', // Duplicate
    // haveAccount: 'Already have an account?', // Duplicate
    // loginNow: 'Login now', // Duplicate
    // emailField: 'Email', // Duplicate
    // confirmPassword: 'Confirm Password', // Duplicate
    // enterConfirmPassword: 'Re-enter password', // Duplicate

    // Driver Profile Detail
    // backToProfile: 'Back', // Duplicate
    // editProfile: 'Edit', // Duplicate
    // saveProfile: 'Save', // Duplicate
    // cancelEdit: 'Cancel', // Duplicate
    // personalInfoSection: 'Personal Information', // Duplicate
    // licenseInfoSection: 'License Information', // Duplicate
    // fullNameLabel: 'Full Name', // Duplicate
    // dateOfBirth: 'Date of Birth', // Duplicate
    // phoneNumberLabel: 'Phone Number', // Duplicate
    // emailAddress: 'Email', // Duplicate
    // idCardNumber: 'ID Card Number', // Duplicate
    // joinedDate: 'Joined Date', // Duplicate
    // addressInfo: 'Address', // Duplicate
    // licenseNumberInfo: 'License Number', // Duplicate
    // licenseExpiry: 'Expiry Date', // Duplicate
    // licenseImages: 'License Images', // Duplicate
    // frontSide: 'Front Side', // Duplicate
    // backSide: 'Back Side', // Duplicate
    // employeeCodeLabel: 'Employee Code', // Duplicate
    // professionalDriver: 'Professional Driver', // Duplicate

    // Trip History
    // tripHistoryTitle: 'Trip History', // Duplicate
    // tripHistorySubtitle: 'Review completed trips', // Duplicate
    // thisWeek: 'This Week', // Duplicate
    // thisMonth: 'This Month', // Duplicate
    // thisYear: 'This Year', // Duplicate
    // tripsCompleted: 'Trips', // Duplicate
    // kmDriven: 'Km Driven', // Duplicate
    // passengersServed: 'Passengers', // Duplicate
    // totalRevenue: 'Revenue', // Duplicate
    // averageRatingLabel: 'Avg. Rating', // Duplicate
    // tripDetails: 'Trip Details', // Duplicate
    // completedLabel: 'Completed', // Duplicate
    // passengersLabel: 'passengers', // Duplicate
    // performanceExcellent: 'Excellent Performance! 🎉', // Duplicate
    // performanceSummary: 'You have completed', // Duplicate
    // inPeriod: 'trips in this', // Duplicate
    // week: 'week', // Duplicate
    // month: 'month', // Duplicate
    // year: 'year', // Duplicate
    // withRating: 'with an average rating of', // Duplicate

    // Notifications
    // notificationsPageTitle: 'Notifications', // Duplicate
    // markAllRead: 'Mark all as read', // Duplicate
    // unreadNotifications: 'unread notifications', // Duplicate
    // allNotifications: 'All', // Duplicate
    // unreadOnly: 'Unread', // Duplicate
    // readOnly: 'Read', // Duplicate
    // closeButton: 'Close', // Duplicate
    // detailsLabel: 'Details', // Duplicate
    // viewDetailsButton: 'View details →', // Duplicate
    // noNotifications: 'No notifications', // Duplicate
    // allRead: 'You have read all notifications', // Duplicate
    // noNewNotifications: 'No new notifications', // Duplicate

    // Change Password
    // changePasswordTitle: 'Change Password', // Duplicate
    // changePasswordSubtitle: 'Update your password for account security', // Duplicate
    // currentPasswordLabel: 'Current Password', // Duplicate
    // newPasswordLabel: 'New Password', // Duplicate
    // confirmNewPasswordLabel: 'Confirm New Password', // Duplicate
    // enterCurrentPassword: 'Enter current password', // Duplicate
    // enterNewPassword: 'Enter new password', // Duplicate
    // reEnterNewPassword: 'Re-enter new password', // Duplicate
    // passwordRequirements: 'Password requirements:', // Duplicate
    // minLength: 'At least 8 characters', // Duplicate
    // hasUppercase: 'Uppercase letter', // Duplicate
    // hasLowercase: 'Lowercase letter', // Duplicate
    // hasNumber: 'Number', // Duplicate
    // hasSpecialChar: 'Special character', // Duplicate
    // passwordMismatchError: 'Passwords do not match', // Duplicate
    // changePasswordButton: 'Change Password', // Duplicate
    // passwordChangeSuccess: 'Password changed successfully!', // Duplicate
    // redirecting: 'Redirecting...', // Duplicate
    // securityTipsTitle: '💡 Account Security', // Duplicate
    // securityTip1: 'Never share your password with anyone', // Duplicate
    // securityTip2: 'Change your password every 3-6 months', // Duplicate
    // securityTip3: 'Use different passwords for different accounts', // Duplicate
    // securityTip4: 'Do not use easily guessable personal information', // Duplicate

    // Achievements
    // achievementsPageTitle: 'Achievements & Reviews', // Duplicate
    // achievementsTab: 'Achievements', // Duplicate
    // reviewsTab: 'Reviews', // Duplicate
    // achievementsUnlocked: 'Unlocked', // Duplicate
    // totalRewards: 'Total Rewards', // Duplicate
    // averageProgress: 'Average Progress', // Duplicate
    // unlocked: 'Unlocked', // Duplicate
    // rewardLabel: 'Reward:', // Duplicate
    // averageRatingStats: 'Avg. Rating', // Duplicate
    // totalReviewsStats: 'Total Reviews', // Duplicate
    // fiveStarsCount: '5 Stars', // Duplicate
    // satisfactionRate: 'Satisfaction Rate', // Duplicate

    // Driver Assignment
    // assignDriver: 'Assign Driver', // Duplicate
    // searchDriver: 'Search driver...', // Duplicate
    // tripsCount: 'trips', // Duplicate
    // available: 'Available', // Duplicate
    // busy: 'Busy', // Duplicate

    // Payment Modal
    // payment: 'Payment', // Duplicate
    // paymentSuccess: 'Payment Successful!', // Duplicate
    // ticketConfirmed: 'Your ticket has been confirmed', // Duplicate
    // ticketInfo: 'Ticket Information', // Duplicate
    // routeLabel: 'Route:', // Duplicate
    // dateLabel: 'Date:', // Duplicate
    // departureTimeLabel: 'Departure Time:', // Duplicate
    // seatNumberLabel: 'Seat Number:', // Duplicate
    // totalAmount: 'Total Amount:', // Duplicate
    // paymentMethod: 'Payment Method', // Duplicate
    // creditCard: 'Credit / Debit Card', // Duplicate
    // creditCardDesc: 'Visa, Mastercard, JCB', // Duplicate
    // momoWallet: 'MoMo Wallet', // Duplicate
    // momoWalletDesc: 'Pay via e-wallet', // Duplicate
    // bankTransfer: 'Bank Transfer', // Duplicate
    // bankTransferDesc: 'Direct bank transfer', // Duplicate
    // cardNumber: 'Card Number', // Duplicate
    // cardNumberPlaceholder: '1234 5678 9012 3456', // Duplicate
    // expiryDate: 'Expiry Date', // Duplicate
    // expiryDatePlaceholder: 'MM/YY', // Duplicate
    // cardholderName: 'Cardholder Name', // Duplicate
    // cardholderPlaceholder: 'NGUYEN VAN A', // Duplicate
    // cancel: 'Cancel', // Duplicate
    // processingPayment: 'Processing...', // Duplicate
    // payButton: 'Pay', // Duplicate

    // Company Management
    // companyManagementTitle: 'Company Management', // Duplicate
    // companyManagementDesc: 'Manage companies in the system', // Duplicate
    // addCompany: 'Add Company', // Duplicate
    // totalCompaniesAll: 'Total Companies', // Duplicate
    // activeStatus: 'Active', // Duplicate
    // totalVehiclesAll: 'Total Vehicles', // Duplicate
    // searchByNameEmail: 'Search by name, email...', // Duplicate
    // allStatus: 'All Status', // Duplicate
    // activeLabel: 'Active', // Duplicate
    // suspendedLabel: 'Suspended', // Duplicate
    // companyColumn: 'Company', // Duplicate
    // contactColumn: 'Contact', // Duplicate
    // vehiclesColumn: 'Vehicles', // Duplicate
    // tripsColumn: 'Trips', // Duplicate
    // revenueColumn: 'Revenue', // Duplicate
    // ratingColumn: 'Rating', // Duplicate
    // statusColumn: 'Status', // Duplicate
    // actionsColumn: 'Actions', // Duplicate
    // joinedLabel: 'Joined:', // Duplicate
    // viewDetails: 'View Details', // Duplicate
    // editAction: 'Edit', // Duplicate
    // suspendAction: 'Suspend', // Duplicate
    // activateAction: 'Activate', // Duplicate

    // User Management
    // userManagementTitle: 'User Management', // Duplicate
    // userManagementDesc: 'Manage all users in the system', // Duplicate
    // totalUsersStats: 'Total Users', // Duplicate
    // activeUsers: 'Active Users', // Duplicate
    // bannedUsers: 'Banned', // Duplicate
    // totalRevenueStats: 'Total Revenue', // Duplicate
    // searchByNameEmailPhone: 'Search by name, email, phone...', // Duplicate
    // allRoles: 'All Roles', // Duplicate
    // userRole: 'User', // Duplicate
    // companyAdminRoleLabel: 'Company Admin', // Duplicate
    // bannedStatus: 'Banned', // Duplicate
    // userNameColumn: 'User', // Duplicate
    // roleColumn: 'Role', // Duplicate
    // totalTripsColumn: 'Total Trips', // Duplicate
    // totalSpentColumn: 'Total Spent', // Duplicate
    // joinDateColumn: 'Join Date', // Duplicate
    // banUser: 'Ban', // Duplicate
    // unbanUser: 'Unban', // Duplicate

    // System Dashboard
    // systemDashboardTitleAlt: 'System Dashboard', // Duplicate
    // systemAdminLabel: 'System Administrator', // Duplicate
    // exportReport: 'Export Report', // Duplicate
    // totalCompaniesStats: 'Total Companies', // Duplicate
    // usersStats: 'Users', // Duplicate
    // totalVehiclesStats: 'Total Vehicles', // Duplicate
    // monthlyRevenueStats: 'Monthly Revenue', // Duplicate
    // revenueOverview: 'Revenue Overview', // Duplicate
    // thisMonth: 'This Month', // Duplicate
    // thisQuarter: 'This Quarter', // Duplicate
    // thisYear: 'This Year', // Duplicate
    // topCompanies: 'Top Companies', // Duplicate
    // companyNameColumn: 'Company Name', // Duplicate

    // Review Management
    // reviewManagementTitle: 'Review Management', // Duplicate
    // reviewManagementDesc: 'Manage reviews and feedback from customers', // Duplicate
    // publishedReviews: 'Published', // Duplicate
    // flaggedReviews: 'Flagged', // Duplicate
    // searchReviews: 'Search reviews...', // Duplicate
    // allRatings: 'All Ratings', // Duplicate
    // stars: 'stars', // Duplicate
    // publishedLabel: 'Published', // Duplicate
    // hiddenLabel: 'Hidden', // Duplicate
    // flaggedLabel: 'Flagged', // Duplicate
    // reviewerColumn: 'Reviewer', // Duplicate
    // companyRouteColumn: 'Company & Route', // Duplicate
    // commentColumn: 'Comment', // Duplicate
    // hideReview: 'Hide', // Duplicate
    // showReview: 'Show', // Duplicate
    // deleteReview: 'Delete', // Duplicate
    // tripDateLabel: 'Trip:', // Duplicate
    // likesLabel: 'likes', // Duplicate

    // About Page
    // aboutDescription: 'Vietnam\'s leading online bus ticket booking platform, providing fast, safe and convenient booking experience for millions of passengers', // Duplicate
    // routesCount: 'Routes', // Duplicate
    // partnerCompanies: 'Partner Companies', // Duplicate
    // yearsExperience: 'Years of Experience', // Duplicate
    // safetyAndTrust: 'Safety & Trust', // Duplicate
    // safetyDescription: 'Committed to ensuring absolute safety for all passengers with a professional driver team', // Duplicate
    // dedicatedService: 'Dedicated Service', // Duplicate
    // dedicatedServiceDescription: 'Enthusiastic staff, always ready to support you 24/7', // Duplicate
    // highQuality: 'High Quality', // Duplicate
    // highQualityDescription: 'Modern fleet, full amenities, ensuring the most comfortable trip', // Duplicate
    // onTimeDescription: 'Commitment to depart and arrive on time, respecting your time', // Duplicate
    // ourStory: 'Our Story', // Duplicate
    // ourStoryDesc: 'VeXe.com was founded with the mission to bring the best bus ticket booking experience to Vietnamese people', // Duplicate
    // ourMission: 'Our Mission', // Duplicate
    // ourMissionDesc: 'Connecting millions of passengers with reputable bus companies, creating a safe, convenient and transparent transportation ecosystem', // Duplicate
    // ourJourney: 'Our Journey', // Duplicate
    // founded: 'Founded', // Duplicate
    // foundedDesc: 'VeXe.com officially launched in Ho Chi Minh City', // Duplicate
    // expansion: 'Expansion', // Duplicate
    // expansionDesc: 'Nationwide coverage with over 200 bus company partners', // Duplicate
    // mobileApp: 'Mobile App', // Duplicate
    // mobileAppDesc: 'Launched iOS and Android applications', // Duplicate
    // milestone5M: '5 million customers', // Duplicate
    // awardDesc: 'Received "Best Booking Platform" award', // Duplicate
    // present: 'Present', // Duplicate
    // presentDesc: 'Serving over 10 million customers annually', // Duplicate
    // ourTeam: 'Our Team', // Duplicate
    // ourTeamDesc: 'Passionate, dedicated people who are constantly innovating', // Duplicate
    // joinUs: 'Join Us', // Duplicate
    // joinUsDesc: 'Be a part of VeXe.com\'s development journey', // Duplicate

    // Payment Page
    // paymentTitle: 'Payment', // Duplicate
    // paymentSubtitle: 'Choose payment method to complete booking', // Duplicate
    // tripSummary: 'Trip Summary', // Duplicate
    // departureDate: 'Departure Date', // Duplicate
    // selectedSeats: 'Selected Seats', // Duplicate
    // passengerInfo: 'Passenger Information', // Duplicate
    // passengerName: 'Full Name', // Duplicate
    // passengerPhone: 'Phone Number', // Duplicate
    // passengerEmail: 'Email (optional)', // Duplicate
    // enterPassengerName: 'Enter full name', // Duplicate
    // enterPassengerPhone: 'Enter phone number', // Duplicate
    // enterPassengerEmail: 'Enter email', // Duplicate
    // pricingDetails: 'Pricing Details', // Duplicate
    // ticketFare: 'Ticket Fare', // Duplicate
    // serviceFee: 'Service Fee', // Duplicate
    // totalPayment: 'Total Payment', // Duplicate
    // selectPaymentMethod: 'Select Payment Method', // Duplicate
    // creditCardPayment: 'Credit/Debit Card', // Duplicate
    // momoPayment: 'MoMo Wallet', // Duplicate
    // momoPaymentDesc: 'Pay via MoMo e-wallet', // Duplicate
    // vnpayPayment: 'VNPay', // Duplicate
    // vnpayPaymentDesc: 'Pay via VNPay QR', // Duplicate
    // bankPayment: 'Bank Transfer', // Duplicate
    // bankPaymentDesc: 'Direct bank transfer', // Duplicate
    // completePayment: 'Complete Payment', // Duplicate
    // processingPaymentText: 'Processing payment...', // Duplicate

    // QR Ticket Page
    // qrTicketTitle: 'E-Ticket', // Duplicate
    // downloadQR: 'Download', // Duplicate
    // shareQR: 'Share', // Duplicate
    // printQR: 'Print Ticket', // Duplicate
    // showQRCode: 'Show this QR code when boarding', // Duplicate
    // bookingSuccess: 'Booking Successful!', // Duplicate
    // bookingSuccessDesc: 'Your e-ticket is ready', // Duplicate
    // importantNotes: 'Important Notes', // Duplicate
    // note1: 'Please arrive at pickup point 15-30 minutes before departure', // Duplicate
    // note2: 'Present QR code and ID card when boarding', // Duplicate
    // note3: 'Maximum luggage 20kg (free)', // Duplicate
    // note4: 'Contact hotline if you need assistance', // Duplicate
    // needHelp: 'Need Help?', // Duplicate
    // contactHotline: 'Contact hotline', // Duplicate
    // customerCare: 'Customer Care', // Duplicate

    // Contact Page
    // getInTouch: 'Get In Touch', // Duplicate
    // getInTouchDesc: 'We\'d love to hear from you', // Duplicate
    // yourName: 'Your Name', // Duplicate
    // yourEmail: 'Your Email', // Duplicate
    // yourMessage: 'Your Message', // Duplicate
    // sendMessageButton: 'Send Message', // Duplicate
    // sendingMessage: 'Sending...', // Duplicate
    // contactVia: 'Or Contact Via', // Duplicate
    // officeAddress: 'Office Address', // Duplicate
    // workingHours: 'Working Hours', // Duplicate
    // mondayFriday: 'Monday - Friday', // Duplicate
    // saturdaySunday: 'Saturday - Sunday', // Duplicate
    // followUs: 'Follow Us', // Duplicate

    // Driver Trip Detail (NEW)
    // checkinProgress: 'Check-in Progress', // Duplicate
    // navigation: 'Navigate', // Duplicate
    // callDispatch: 'Call Dispatch', // Duplicate
    // reportIssue: 'Report', // Duplicate
    // passengerList: 'Passenger List', // Duplicate
    // seatLabel: 'Seat:', // Duplicate
    // ticketCodeLabel: 'Ticket code:', // Duplicate

    // QR Scanner (NEW)
    // scanQRInstruction: 'Move camera to QR code on passenger ticket', // Duplicate
    // holdSteady: 'Hold camera steady to scan', // Duplicate
    // enterTicketCode: 'Enter Ticket Code', // Duplicate
    // enterTicketCodePlaceholder: 'Enter ticket code', // Duplicate
    // checkinSuccess: 'Check-in Successful!', // Duplicate
    // invalidTicket: 'Invalid ticket', // Duplicate
    // pleaseTryAgain: 'Please try again', // Duplicate

    // Navigation (NEW)
    // speedLabel: 'Speed', // Duplicate
    // remainingLabel: 'Remaining', // Duplicate
    // turnRightRoad: 'Turn right onto Highway 1A', // Duplicate
    // after25km: 'After 2.5km', // Duplicate
    // reportIncident: 'Report Incident', // Duplicate
    // callSupport: 'Call Support', // Duplicate
    // stopPoint: 'Stop Point', // Duplicate

    // Earnings (NEW)
    // earningsTitle: 'Earnings', // Duplicate
    // earningsSubtitle: 'Manage your earnings and expenses', // Duplicate
    // totalEarnings: 'Total Earnings', // Duplicate
    // baseEarnings: 'Base Earnings', // Duplicate
    // bonusEarnings: 'Bonus & Allowances', // Duplicate
    // currencyVND: 'VND', // Duplicate

    // Demo Data
    // demoUserName: 'John Doe', // Duplicate
    // demoUserEmail: 'johndoe@example.com', // Duplicate
    // demoDestination: 'Da Lat', // Duplicate

    // Additional Missing Keys
    // manualEntry: 'Manual Entry', // Duplicate
    // confirm: 'Confirm', // Duplicate
    // onBoard: 'On Board', // Duplicate
    // notCheckedIn: 'Not Checked In', // Duplicate

    // Driver Applications (System Admin)
    // driverApplicationsTitle: 'Driver Registration Applications', // Duplicate
    // driverApplicationsSubtitle: 'Manage and approve new driver registrations', // Duplicate
    // exportExcel: 'Export Excel', // Duplicate
    // totalApplications: 'Total', // Duplicate
    // pendingApplications: 'Pending', // Duplicate
    // approvedApplications: 'Approved', // Duplicate
    // rejectedApplications: 'Rejected', // Duplicate
    // searchApplications: 'Search by name, phone, email...', // Duplicate
    // driverColumn: 'Driver', // Duplicate
    // contactColumn: 'Contact', // Duplicate
    // documentsColumn: 'Documents', // Duplicate
    // submitDateColumn: 'Submit Date', // Duplicate
    // viewDetails: 'View Details', // Duplicate
    // approve: 'Approve', // Duplicate
    // reject: 'Reject', // Duplicate
    // addNoteOptional: 'Add note (optional):', // Duplicate
    // approveSuccess: 'Application approved! Driver will receive an email notification.', // Duplicate
    // rejectSuccess: 'Application rejected! Email notification has been sent to driver.', // Duplicate
    // enterRejectReason: 'Enter rejection reason:', // Duplicate
    // licenseNumber: 'License Number', // Duplicate
    // experience: 'Experience', // Duplicate
    // years: 'years', // Duplicate
    // applicationDetails: 'Application Details', // Duplicate
    // applicantInfo: 'Applicant Information', // Duplicate
    // licenseInfo: 'License Information', // Duplicate
    // experienceYears: 'Years of experience', // Duplicate
    // viewLicense: 'View License', // Duplicate
    // adminNotes: 'Admin Notes', // Duplicate
    // addNote: 'Add Note', // Duplicate
    // approveApplication: 'Approve', // Duplicate
    // rejectApplication: 'Reject', // Duplicate
    // noApplicationsFound: 'No applications found', // Duplicate
    // tryChangeFilter: 'Try changing filters or search keywords', // Duplicate
    // applicationCode: 'Application Code', // Duplicate
    // personalInfo: 'Personal Information', // Duplicate
    // fullNameLabel: 'Full Name', // Duplicate
    // usernameLabel: 'Username', // Duplicate
    // phoneNumberLabel: 'Phone Number', // Duplicate
    // addressLabel: 'Address', // Duplicate
    // professionalInfo: 'Professional Information', // Duplicate
    // licenseImageLabel: 'Driver License Image', // Duplicate
    // notesLabel: 'Notes', // Duplicate
    // statusColumn: 'Status', // Duplicate
    // actionsColumn: 'Actions', // Duplicate

    // Demo Login
    // demoLoginInstruction: 'Enter any username and password to login', // Duplicate
    // demoExample: 'Example: admin / password', // Duplicate
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      return (saved === 'vi' || saved === 'en') ? saved : 'vi';
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
  };

  const t = (key: string | TranslationKeys): string => {
    // Ép kiểu để truy cập object
    const text = translations[language][key as TranslationKeys];
    // Fallback nếu không tìm thấy key ở ngôn ngữ hiện tại, thử tìm ở tiếng Việt, nếu không có trả về key
    return text || translations['vi'][key as TranslationKeys] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}