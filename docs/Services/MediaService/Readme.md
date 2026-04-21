# 📷 Media Service

> Quản lý & Xử lý Dữ liệu Truyền thông - Nền tảng AegisFlow AI

---

## Mục Đích

**Media Service** đóng vai trò là kho lưu trữ và bộ xử lý trung tâm cho tất cả các dữ liệu hình ảnh, video và âm thanh trong hệ sinh thái AegisFlow AI:

1. **Quản lý Luồng Camera Giao thông**
   - Tiếp nhận luồng RTMP/HLS từ các camera đô thị.
   - Cung cấp khả năng xem trực tiếp (Live Streaming) cho Dashboard.
   - Trích xuất khung hình (Snapshot) để AI phân tích lưu lượng và sự cố.

2. **Lưu trữ Bằng chứng Sự cố**
   - Lưu trữ hình ảnh và video từ các báo cáo của người dân (Citizen Reports).
   - Quản lý các file đính kèm cho các sự cố trong [Incident Service](../IncidentService/Readme.md).
   - Đảm bảo tính toàn vẹn và bảo mật của dữ liệu bằng chứng.

3. **Tối ưu hóa & Phân phối**
   - Tự động nén và resize hình ảnh để tiết kiệm băng thông cho ứng dụng di động.
   - Chuyển đổi định dạng video phù hợp với nhiều thiết bị.
   - Sử dụng CDN để phân phối dữ liệu media với độ trễ thấp.

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Runtime** | Node.js (TypeScript) |
| **Framework** | NestJS / Express.js |
| **Processing** | FFmpeg, Sharp (Image Processing) |
| **Storage** | AWS S3, MinIO (On-premise) |
| **Database** | PostgreSQL (Metadata) |
| **Streaming** | Nginx-RTMP, HLS.js |

---

## Chức năng Chính

### 1. Upload & Xử lý Media
- **Hình ảnh**: Tự động tạo thumbnails, optimize dung lượng, hỗ trợ WebP, JPEG, PNG.
- **Video**: Transcoding sang HLS/DASH, tạo preview clip, trích xuất metadata.
- **Audio**: Lưu trữ và phát lại các bản ghi âm báo cáo sự cố.

### 2. Streaming & Playback
- **Live Stream**: Hỗ trợ xem trực tiếp từ hàng nghìn camera giao thông đồng thời.
- **VOD (Video on Demand)**: Xem lại các đoạn video sự cố đã được ghi lại.
- **Adaptive Bitrate**: Tự động điều chỉnh chất lượng theo tốc độ mạng của người dùng.

### 3. Lưu trữ & Bảo mật
- **Versioning**: Lưu trữ các phiên bản khác nhau của cùng một file.
- **Access Control**: Chỉ những người dùng có quyền (Admin, Operator) mới có thể xem các video nhạy cảm.
- **Retention Policy**: Tự động xóa hoặc lưu trữ lâu dài (Glacier) dựa trên loại dữ liệu.

---

## Tích hợp Hệ thống

Dịch vụ Media kết nối chặt chẽ với các thành phần khác:

- **[Incident Service](../IncidentService/Readme.md)**: Cung cấp bằng chứng hình ảnh/video cho từng vụ việc.
- **[FloodEye Service](../FloodEyeService/Readme.md)**: Cung cấp khung hình camera để AI nhận diện mực nước ngập.
- **[IoT Service](../IoTService/Readme.md)**: Quản lý metadata của các thiết bị camera.
- **Dashboard**: Hiển thị live stream và các bản đồ nhiệt dựa trên dữ liệu hình ảnh.

---

## API Endpoints (Ví dụ)

### Upload Media
```bash
POST /api/media/upload
Content-Type: multipart/form-data
-F "file=@incident_photo.jpg"
-F "type=incident"
-F "entityId=INC-123"
```

### Get Stream URL
```bash
GET /api/media/streams/{cameraId}

Response:
{
  "streamUrl": "https://cdn.aegisflow.ai/live/camera_01/index.m3u8",
  "status": "online",
  "viewerCount": 12
}
```

---

## Deployment

### Docker
```bash
docker-compose up -d media-service
```

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---
_**AegisFlow AI – Hình ảnh minh bạch, đô thị an toàn.**_
