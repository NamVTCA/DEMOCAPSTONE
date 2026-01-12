// mobile-app/src/screens/driver/DriverScannerScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as CameraModule from "expo-camera";
import { useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import apiService from "../../services/common/apiService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index-store";

type TicketInfo = {
  id: string;
  bookingId?: string;
  passengerName?: string;
  seat?: string;
  tripId?: string;
  status?: string;
  extras?: any;
};

type ValidateResponse = {
  ticket?: TicketInfo;
  message?: string;
  ok?: boolean;
};

// Resolve runtime Camera component (file scope)
const ExpoCamera: React.ComponentType<any> | null =
  ((CameraModule as any).Camera || (CameraModule as any).default || null);

export default function DriverScannerScreen({ navigation }: any) {
  // Use the official hook for permissions
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Local simple states
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const auth = useSelector((s: RootState) => s.auth);

  // If permission value is null/undefined, show requesting UI while we call request
  useEffect(() => {
    (async () => {
      try {
        // If already asked before, cameraPermission is not null; otherwise request
        if (!cameraPermission) {
          await requestCameraPermission();
        }
      } catch (e) {
        console.warn("Camera permission request failed", e);
      }
    })();
  }, [cameraPermission, requestCameraPermission]);

  // Helper to know granted status
  const permissionGranted = cameraPermission?.granted ?? false;
  const permissionUndetermined = cameraPermission == null;

  const resetScanner = () => {
    setScanned(false);
    setTicket(null);
    setLoading(false);
  };

  const handleValidateTicket = useCallback(async (ticketId: string) => {
    try {
      setLoading(true);
      const res = await apiService.post<ValidateResponse>("/drivers/validate", {
        ticketId,
      });
      const data = res.data;
      if (data && typeof data === "object") {
        if (data.ticket) {
          setTicket(data.ticket);
        } else {
          Alert.alert("Không hợp lệ", data.message ?? "Không tìm thấy vé");
        }
      } else {
        console.warn("Unexpected validate response shape:", data);
        Alert.alert("Lỗi", "Phản hồi không hợp lệ từ máy chủ");
      }
    } catch (err: unknown) {
      console.error("Validate error", err);
      const axiosErr = err as any;
      const errData = axiosErr?.response?.data;
      const message =
        (errData &&
          (errData.message ||
            errData.msg ||
            (typeof errData === "string" && errData))) ||
        axiosErr?.message ||
        "Không thể xác thực vé";
      Alert.alert("Lỗi", message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);

    // QR payload could be JSON or plain id
    let ticketId = data;
    try {
      const parsed = JSON.parse(data);
      if (parsed?.ticketId) ticketId = parsed.ticketId;
      else if (parsed?.id) ticketId = parsed.id;
    } catch {
      // not JSON
    }

    handleValidateTicket(ticketId);
  };

  const confirmUseTicket = async () => {
    if (!ticket) return;
    try {
      setLoading(true);
      const res = await apiService.post<{ ok?: boolean; message?: string }>(
        "/drivers/confirm-ticket",
        {
          ticketId: ticket.id,
        }
      );
      const data = res.data;
      if (data && data.ok) {
        Alert.alert("Thành công", "Xác nhận vé thành công");
        resetScanner();
      } else {
        Alert.alert("Lỗi", data?.message ?? "Xác nhận thất bại");
      }
    } catch (err: unknown) {
      console.error("Confirm error", err);
      const axiosErr = err as any;
      const errData = axiosErr?.response?.data;
      const message =
        (errData &&
          (errData.message ||
            errData.msg ||
            (typeof errData === "string" && errData))) ||
        axiosErr?.message ||
        "Xác nhận thất bại";
      Alert.alert("Lỗi", message);
    } finally {
      setLoading(false);
    }
  };

  // Permission UI handling
  if (permissionUndetermined) {
    return (
      <View style={styles.center}>
        <Text>Đang yêu cầu quyền camera...</Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.center}>
        <Text>Không có quyền camera. Vui lòng cấp quyền trong cài đặt.</Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 12 }]}
          onPress={() => requestCameraPermission()}
        >
          <Text style={styles.buttonText}>Yêu cầu quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!ticket ? (
        <>
          <View style={styles.scannerContainer}>
            {/* If ExpoCamera is available at runtime, render it. Otherwise show fallback message */}
            {ExpoCamera ? (
              <ExpoCamera
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
                ratio="16:9"
              />
            ) : (
              <View style={[styles.center, { flex: 1 }]}>
                <Text style={{ marginBottom: 8 }}>Module camera chưa sẵn sàng.</Text>
                <Text style={{ textAlign: "center", color: "#666" }}>
                  Hãy mở ứng dụng bằng Expo Go (hoặc rebuild dev client nếu dùng custom client).
                </Text>
              </View>
            )}

            <View style={styles.scanOverlay}>
              <Ionicons name="scan-outline" size={36} color="#fff" />
              <Text style={styles.scanText}>Quét mã vé</Text>
            </View>
          </View>

          <View style={styles.controls}>
            {scanned && (
              <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                <Text style={styles.buttonText}>Quét lại</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>Thông tin vé</Text>
          <Text style={styles.field}>Mã vé: {ticket.id}</Text>
          {ticket.bookingId && <Text style={styles.field}>Booking: {ticket.bookingId}</Text>}
          {ticket.passengerName && <Text style={styles.field}>Hành khách: {ticket.passengerName}</Text>}
          {ticket.seat && <Text style={styles.field}>Ghế: {ticket.seat}</Text>}
          {ticket.status && <Text style={styles.field}>Trạng thái: {ticket.status}</Text>}

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <TouchableOpacity style={[styles.button, { marginRight: 8 }]} onPress={confirmUseTicket}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Xác nhận</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={() => resetScanner()}>
              <Text style={styles.buttonText}>Hoàn tác</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scannerContainer: { flex: 1, overflow: "hidden", borderRadius: 8 },
  scanOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: "center",
  },
  scanText: { color: "#fff", marginTop: 8, fontWeight: "600" },
  controls: { padding: 16, flexDirection: "row", justifyContent: "center" },
  button: { backgroundColor: "#1976d2", padding: 12, borderRadius: 8 },
  cancel: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontWeight: "600" },
  result: { padding: 16 },
  resultTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  field: { fontSize: 16, marginTop: 6 },
});
