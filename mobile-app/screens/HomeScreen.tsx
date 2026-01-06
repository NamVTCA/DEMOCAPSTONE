import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function HomeScreen({ navigation }: any) {
  const { t, language } = useLanguage();
  const { colors, theme } = useTheme();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    navigation.navigate('SearchResults', {
      from,
      to,
      date,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#3B82F6', '#14B8A6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logo}
          >
            <Text style={styles.logoText}>🚌</Text>
          </LinearGradient>
          <Text style={[styles.title, { color: colors.text }]}>VeXe.com</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {language === 'vi' ? 'Đặt vé xe khách' : 'Book Bus Tickets'}
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            {language === 'vi' ? 'Nhanh chóng - An toàn - Tiện lợi' : 'Fast - Safe - Convenient'}
          </Text>
        </View>

        {/* Search Card */}
        <View style={[styles.searchCard, { backgroundColor: colors.surface }]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('from')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder={language === 'vi' ? 'TP. Hồ Chí Minh' : 'Ho Chi Minh City'}
              placeholderTextColor={colors.textSecondary}
              value={from}
              onChangeText={setFrom}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('to')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder={language === 'vi' ? 'Đà Lạt' : 'Da Lat'}
              placeholderTextColor={colors.textSecondary}
              value={to}
              onChangeText={setTo}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('date')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.textSecondary}
              value={date}
              onChangeText={setDate}
            />
          </View>

          <TouchableOpacity onPress={handleSearch}>
            <LinearGradient
              colors={['#3B82F6', '#14B8A6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>{t('search')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Popular Routes */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {language === 'vi' ? 'Tuyến đường phổ biến' : 'Popular Routes'}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.routesScroll}>
            {popularRoutes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.routeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => {
                  setFrom(route.from);
                  setTo(route.to);
                }}
              >
                <LinearGradient
                  colors={['#3B82F6', '#14B8A6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.routeIcon}
                >
                  <Text style={styles.routeIconText}>🚌</Text>
                </LinearGradient>
                <Text style={[styles.routeFrom, { color: colors.text }]}>{route.from}</Text>
                <Text style={[styles.routeArrow, { color: colors.textSecondary }]}>→</Text>
                <Text style={[styles.routeTo, { color: colors.text }]}>{route.to}</Text>
                <Text style={[styles.routePrice, { color: colors.primary }]}>{route.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {language === 'vi' ? 'Tại sao chọn VeXe.com?' : 'Why Choose VeXe.com?'}
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {language === 'vi' ? feature.titleVi : feature.titleEn}
                </Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
                  {language === 'vi' ? feature.descVi : feature.descEn}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const popularRoutes = [
  { from: 'TP.HCM', to: 'Đà Lạt', price: '220.000đ' },
  { from: 'Hà Nội', to: 'Hải Phòng', price: '150.000đ' },
  { from: 'TP.HCM', to: 'Vũng Tàu', price: '120.000đ' },
  { from: 'Hà Nội', to: 'Sa Pa', price: '300.000đ' },
];

const features = [
  {
    icon: '⚡',
    titleVi: 'Đặt vé nhanh',
    titleEn: 'Quick Booking',
    descVi: 'Chỉ 3 bước đơn giản',
    descEn: 'Just 3 simple steps',
  },
  {
    icon: '🔒',
    titleVi: 'An toàn',
    titleEn: 'Secure',
    descVi: 'Thanh toán bảo mật',
    descEn: 'Secure payment',
  },
  {
    icon: '💰',
    titleVi: 'Giá tốt nhất',
    titleEn: 'Best Price',
    descVi: 'Nhiều ưu đãi',
    descEn: 'Many promotions',
  },
  {
    icon: '📱',
    titleVi: 'Vé điện tử',
    titleEn: 'E-Ticket',
    descVi: 'Không cần in vé',
    descEn: 'No printing needed',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
  },
  searchCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  routesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  routeCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  routeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  routeIconText: {
    fontSize: 24,
  },
  routeFrom: {
    fontSize: 14,
    fontWeight: '600',
  },
  routeArrow: {
    fontSize: 16,
    marginVertical: 4,
  },
  routeTo: {
    fontSize: 14,
    fontWeight: '600',
  },
  routePrice: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  featureCard: {
    width: '47%',
    margin: '1.5%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    textAlign: 'center',
  },
});
