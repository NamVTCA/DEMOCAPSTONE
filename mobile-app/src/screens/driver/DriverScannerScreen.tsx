import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import apiService from '../../services/common/apiService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index-store';

type TicketInfo = {
  id: string;
  bookingId?: string;
  passengerName?: string;
  seat?: string;
  tripId?: string;
  status?: string;
  extras?: any;
};

export default function DriverScannerScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const auth = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const resetScanner = () => {
    setScanned(false);
    setTicket(null);
    setLoading(false);
  };

type ValidateResponse = {
  ticket?: TicketInfo;
  message?: string;
  ok?: boolean;
};

const handleValidateTicket = useCallback(
  async (ticketId: string) => {
    try {
      setLoading(true);
      // <-- dùng generic để TS biết res.data có shape ValidateResponse
      const res = await apiService.post<ValidateResponse>('/drivers/validate', { ticketId });
      const data = res.data;

      // Kiểm tra an toàn
      if (data && typeof data === 'object') {
        if (data.ticket) {
          setTicket(data.ticket);
        } else {
          Alert.alert('Không hợp lệ', data.message ?? 'Không tìm thấy vé');
        }
      } else {
        // unexpected shape
        console.warn('Unexpected validate response shape:', data);
        Alert.alert('Lỗi', 'Phản hồi không hợp lệ từ máy chủ');
      }
    } catch (err: unknown) {
      console.error('Validate error', err);
      // safe extract error message
      const axiosErr = err as any;
      const errData = axiosErr?.response?.data;
      const message =
        (errData && (errData.message || errData.msg || (typeof errData === 'string' && errData))) ||
        axiosErr?.message ||
        'Không thể xác thực vé';
      Alert.alert('Lỗi', message);
    } finally {
      setLoading(false);
    }
  },
  []
);

  const onBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);

    // Usually QR payload could be JSON or plain ticketId. Try parse.
    let ticketId = data;
    try {
      const parsed = JSON.parse(data);
      // parsed could be { ticketId: '...' } or booking info
      if (parsed.ticketId) ticketId = parsed.ticketId;
      else if (parsed.id) ticketId = parsed.id;
      // else leave as raw data
    } catch {
      // not JSON -> treat as raw id
    }

    handleValidateTicket(ticketId);
  };

const confirmUseTicket = async () => {
  if (!ticket) return;
  try {
    setLoading(true);
    // khai báo kiểu trả về nếu backend trả { ok: boolean, message?: string }
    const res = await apiService.post<{ ok?: boolean; message?: string }>('/drivers/confirm-ticket', { ticketId: ticket.id });
    const data = res.data;

    if (data && data.ok) {
      Alert.alert('Thành công', 'Xác nhận vé thành công');
      resetScanner();
    } else {
      Alert.alert('Lỗi', data?.message ?? 'Xác nhận thất bại');
    }
  } catch (err: unknown) {
    console.error('Confirm error', err);
    const axiosErr = err as any;
    const errData = axiosErr?.response?.data;
    const message =
      (errData && (errData.message || errData.msg || (typeof errData === 'string' && errData))) ||
      axiosErr?.message ||
      'Xác nhận thất bại';
    Alert.alert('Lỗi', message);
  } finally {
    setLoading(false);
  }
};
  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Đang yêu cầu quyền camera...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Không có quyền camera. Vui lòng cấp quyền trong cài đặt.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!ticket ? (
        <>
          <View style={styles.scannerContainer}>
            <BarCodeScanner
              onBarCodeScanned={onBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
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

          <View style={{ flexDirection: 'row', marginTop: 16 }}>
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
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scannerContainer: { flex: 1, overflow: 'hidden', borderRadius: 8 },
  scanOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: 'center',
  },
  scanText: { color: '#fff', marginTop: 8, fontWeight: '600' },
  controls: { padding: 16, flexDirection: 'row', justifyContent: 'center' },
  button: { backgroundColor: '#1976d2', padding: 12, borderRadius: 8 },
  cancel: { backgroundColor: '#999' },
  buttonText: { color: '#fff', fontWeight: '600' },
  result: { padding: 16 },
  resultTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  field: { fontSize: 16, marginTop: 6 },
});
