// mobile-app/src/screens/auth/RegisterScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../store/index-store";
import apiService from "../../services/common/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "../../store/authSlice";

const { width, height } = Dimensions.get("window");

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [isDriver, setIsDriver] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim()
    ) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Lỗi", "Email không đúng định dạng");
      return;
    }

    // Vietnamese phone number validation
    const phoneRegex =
      /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không đúng định dạng Việt Nam\n\nVí dụ: 0987654321, 0912345678, 0901234567"
      );
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      console.log("🔄 Đang đăng ký tài khoản...");
      console.log("Form data:", { ...formData, isDriver });

      // Build payload
      const payload: any = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      };
      if (isDriver) payload.role = "driver";

      // Cast response to any to avoid TS unknown errors
      const res = (await apiService.post("/auth/register", payload)) as any;

      if (res && res.status >= 200 && res.status < 300) {
        console.log("✅ Đăng ký thành công:", res.data);

        // Auto login
        try {
          const loginRes = (await apiService.post("/auth/login", {
            email: payload.email,
            password: payload.password,
          })) as any;

          const accessToken: string | undefined =
            loginRes?.data?.accessToken ?? undefined;
          const user: any = loginRes?.data?.user ?? null;

          if (accessToken) {
            await AsyncStorage.setItem("accessToken", accessToken);
            if (user) {
              await AsyncStorage.setItem("user", JSON.stringify(user));
            }

            // Update redux auth state (loadUser should read token/user from storage or call /auth/me)
            try {
              dispatch(loadUser());
            } catch (e) {
              console.warn("dispatch(loadUser) failed:", e);
            }

            Alert.alert(
              "Đăng ký & Đăng nhập Thành Công",
              "Bạn đã được đăng ký và đăng nhập vào ứng dụng.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Main" as any),
                },
              ]
            );
            return;
          } else {
            // No token returned — fall back
            Alert.alert(
              "Đăng ký thành công",
              "Tài khoản đã được tạo. Vui lòng đăng nhập.",
              [{ text: "Đăng Nhập", onPress: () => navigation.goBack() }]
            );
            return;
          }
        } catch (loginErr: unknown) {
          const le = loginErr as any;
          console.warn("Auto-login failed after register:", le);
          Alert.alert(
            "Đăng ký thành công",
            "Tài khoản đã được tạo nhưng đăng nhập tự động thất bại. Vui lòng đăng nhập thủ công."
          );
          navigation.goBack();
          return;
        }
      } else {
        // non-2xx
        const data = (res && res.data) as any;
        console.error("❌ Lỗi đăng ký:", data);
        let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";
        if (data?.message) {
          if (Array.isArray(data.message)) {
            errorMessage = data.message.join("\n");
          } else {
            errorMessage = String(data.message);
          }
        }
        Alert.alert("Lỗi Đăng Ký", errorMessage);
      }
    } catch (error: unknown) {
      // narrow unknown to any before accessing properties
      const err = error as any;
      console.error("❌ Lỗi network or server:", err);
      const serverMessage =
        err?.response?.data?.message || err?.message || "Không thể kết nối đến máy chủ.";
      Alert.alert("Lỗi Đăng Ký", String(serverMessage));
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0077be" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={["#0077be", "#005a8b"]}
              style={styles.logoContainer}
            >
              <Ionicons name="bus" size={width * 0.15} color="white" />
              <Text style={styles.appTitle}>OBTP</Text>
              <Text style={styles.appSubtitle}>Đặt vé xe khách</Text>
            </LinearGradient>
          </View>

          {/* Register Form */}
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Tạo tài khoản mới</Text>
            <Text style={styles.subtitleText}>Tham gia cùng chúng tôi</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#999"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="#999"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor="#999"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Register as driver toggle */}
            <TouchableOpacity
              style={styles.driverToggle}
              onPress={() => setIsDriver((v) => !v)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  { backgroundColor: isDriver ? "#0077be" : "#fff" },
                ]}
              >
                {isDriver && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.driverToggleText}>Đăng ký làm tài xế</Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.registerButtonText}>Đang đăng ký...</Text>
              ) : (
                <Text style={styles.registerButtonText}>Đăng ký</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Đã có tài khoản? </Text>
                <TouchableOpacity onPress={handleBackToLogin}>
                  <Text style={styles.loginLink}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* ... keep the styles from your previous file ... */
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  keyboardAvoidingView: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  header: { alignItems: "center", paddingTop: height * 0.05, paddingBottom: height * 0.03 },
  logoContainer: { width: width * 0.25, height: width * 0.25, borderRadius: width * 0.125, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  appTitle: { fontSize: width * 0.06, fontWeight: "bold", color: "white", marginTop: 5 },
  appSubtitle: { fontSize: width * 0.035, color: "white", textAlign: "center", marginTop: 2 },
  formContainer: { flex: 1, paddingHorizontal: width * 0.06, paddingTop: height * 0.02 },
  welcomeText: { fontSize: width * 0.06, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 8 },
  subtitleText: { fontSize: width * 0.04, color: "#666", textAlign: "center", marginBottom: height * 0.04 },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 12, marginBottom: 16, paddingHorizontal: 16, paddingVertical: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, minHeight: 56 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: width * 0.045, color: "#333", paddingVertical: 16 },
  driverToggle: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: "#999", alignItems: "center", justifyContent: "center", marginRight: 10 },
  checkboxInner: { width: 12, height: 12, backgroundColor: "#fff", borderRadius: 2 },
  driverToggleText: { fontSize: width * 0.045, color: "#333" },
  registerButton: { backgroundColor: "#0077be", paddingVertical: 18, borderRadius: 12, marginTop: 8, marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  registerButtonText: { color: "white", fontSize: width * 0.05, fontWeight: "600", textAlign: "center" },
  footer: { alignItems: "center" },
  loginContainer: { flexDirection: "row", alignItems: "center" },
  loginText: { color: "#666", fontSize: width * 0.04 },
  loginLink: { color: "#0077be", fontSize: width * 0.04, fontWeight: "600" },
});

export default RegisterScreen;
