// mobile-app/src/services/user/driveService.ts
import apiService from '../common/apiService';
import { API_ENDPOINTS } from '../common/configService';

interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  size?: number;
  url?: string;
  uploadedAt?: string;
}

class DriveService {
  async listFiles(): Promise<DriveFile[]> {
    const res = await apiService.get<{ files: DriveFile[] }>(API_ENDPOINTS.USER.DRIVE.LIST);
    // backend có thể trả { files: [...] } hoặc [] -> cố gắng tương thích
    return (res.data && (res.data as any).files) || (res.data as any) || [];
  }

  /**
   * Upload a file from a local uri (expo DocumentPicker result)
   * @param uri local file uri
   * @param name filename
   * @param mimeType content type (optional)
   */
  async uploadFile(uri: string, name: string, mimeType?: string) {
    const formData = new FormData();
    // For React Native + axios, append object { uri, name, type }
    formData.append('file', {
      uri,
      name,
      type: mimeType || 'application/octet-stream',
    } as any);

    const res = await apiService.post(API_ENDPOINTS.USER.DRIVE.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }

  async deleteFile(fileId: string) {
    const endpoint = API_ENDPOINTS.USER.DRIVE.DELETE.replace(':id', fileId);
    return apiService.delete(endpoint);
  }

  async downloadFileUrl(fileId: string) {
    // Optional helper if backend exposes direct download URL
    const endpoint = (API_ENDPOINTS.USER.DRIVE.DOWNLOAD || '').replace(':id', fileId);
    const res = await apiService.get(endpoint);
    return res.data;
  }
}

export const driveService = new DriveService();
export type { DriveFile };
