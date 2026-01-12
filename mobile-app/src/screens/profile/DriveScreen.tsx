// mobile-app/src/screens/profile/DriveScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { driveService } from "../../services/user/driveService";
import { DriveFile } from "../../services/user/driveService";
import { Ionicons } from "@expo/vector-icons";

export default function DriveScreen({ navigation }: any) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await driveService.listFiles();
      setFiles(res || []);
    } catch (e) {
      console.error(e);
      Alert.alert("Lỗi", "Không tải được danh sách file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  type DocumentSuccess = {
    type: "success";
    uri: string;
    name: string;
    size?: number;
    mimeType?: string;
  };

const handlePickAndUpload = async () => {
  try {
    const res = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });

    // Một số version typing của expo không có property `type` như TS mong đợi,
    // nên ta check runtime bằng cast sang any rồi xử lý
    if ((res as any).type === 'success') {
      setUploading(true);

      const success = res as any; // narrow thành any để đọc uri/name/mimeType an toàn
      const uri: string = success.uri;
      const name: string = success.name || uri.split('/').pop() || `file_${Date.now()}`;
      // mimeType property có thể tên mimeType hoặc mime || undefined
      const mimeType: string | undefined = success.mimeType || success.mime || undefined;

      await driveService.uploadFile(uri, name, mimeType);
      Alert.alert('Thành công', 'Tải lên thành công.');
      await load();
    } else {
      // user cancelled
      console.log('Document picker cancelled');
    }
  } catch (e) {
    console.error('Upload error', e);
    Alert.alert('Lỗi', 'Tải lên thất bại.');
  } finally {
    setUploading(false);
  }
};

  const handleDelete = (fileId: string) => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa tệp này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await driveService.deleteFile(fileId);
            await load();
          } catch (e) {
            console.error(e);
            Alert.alert("Lỗi", "Không thể xóa tệp.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const openFile = async (file: DriveFile) => {
    if (file.url) {
      Linking.openURL(file.url).catch(() =>
        Alert.alert("Lỗi", "Không thể mở tệp.")
      );
    } else {
      Alert.alert("Thông báo", "Tệp chưa có URL trực tiếp.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Drive</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePickAndUpload}
          disabled={uploading}
        >
          <Ionicons name="cloud-upload" size={18} color="#fff" />
          <Text style={styles.uploadText}>
            {uploading ? "Đang tải..." : "Tải lên"}
          </Text>
        </TouchableOpacity>
      </View>

      {files.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Chưa có tệp nào trong Drive.</Text>
        </View>
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id || item.name}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fileName}>{item.name}</Text>
                <Text style={styles.fileSub}>
                  {item.size ? `${item.size} bytes` : ""}{" "}
                  {item.uploadedAt
                    ? `• ${new Date(item.uploadedAt).toLocaleString()}`
                    : ""}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => openFile(item)}
                  style={styles.actionBtn}
                >
                  <Ionicons name="open-outline" size={20} color="#1976d2" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.actionBtn}
                >
                  <Ionicons name="trash-outline" size={20} color="#dc3545" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "700" },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976d2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#666" },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  fileName: { fontSize: 16, fontWeight: "600" },
  fileSub: { color: "#666", fontSize: 12, marginTop: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  actionBtn: { marginLeft: 12, padding: 6 },
});
