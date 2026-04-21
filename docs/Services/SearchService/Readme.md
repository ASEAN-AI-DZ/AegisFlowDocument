# 🔍 Search Service

> Công cụ Tìm kiếm & Truy vấn Dữ liệu Đô thị - Nền tảng AegisFlow AI

---

## Mục Đích

**Search Service** cung cấp khả năng tìm kiếm nhanh chóng, chính xác và linh hoạt cho toàn bộ dữ liệu trong hệ thống AegisFlow AI. Dịch vụ này hỗ trợ tìm kiếm toàn văn (Full-text Search), lọc nâng cao và truy vấn không gian địa lý (Geospatial Search):

1. **Tìm kiếm Thực thể Đô thị**
   - Tìm kiếm nhanh các công trình hạ tầng: bệnh viện, trường học, trạm cứu hỏa, v.v.
   - Truy vấn các khu vực (Zones), tuyến đường (Roads) và nút giao thông.

2. **Truy vấn Sự cố & Báo cáo**
   - Tìm kiếm các sự cố (Incidents) dựa trên mô tả, loại sự cố hoặc địa điểm.
   - Lọc các báo cáo của người dân theo trạng thái, mức độ nghiêm trọng và thời gian.

3. **Tìm kiếm Không gian Địa lý (Spatial Search)**
   - Tìm kiếm các thực thể trong một bán kính nhất định (Radius Search).
   - Truy vấn các đối tượng nằm trong vùng ảnh hưởng của thiên tai hoặc sự cố.

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Language** | Go 1.21+ (Gin Framework) |
| **Search Engine** | Meilisearch / OpenSearch |
| **Database** | PostgreSQL (Primary Data Source) |
| **Sync Engine** | Apache Kafka / RabbitMQ (Event-driven sync) |
| **API** | RESTful API + GraphQL (Optional) |

---

## Chức năng Chính

### 1. Tìm kiếm Toàn văn (Full-text Search)
- **Typo Tolerance**: Chấp nhận lỗi đánh máy nhỏ (1-2 ký tự) khi người dùng tìm kiếm nhanh.
- **Multilingual Support**: Hỗ trợ tốt tiếng Việt (có dấu và không dấu).
- **Highlighting**: Làm nổi bật các từ khóa khớp trong kết quả tìm kiếm.

### 2. Bộ lọc Nâng cao (Advanced Filtering)
- **Categorical Filtering**: Lọc theo loại hạ tầng, loại sự cố.
- **Status Filtering**: Theo dõi các sự cố đang xử lý, đã đóng hoặc mới tạo.
- **Temporal Filtering**: Tìm kiếm dữ liệu trong các khoảng thời gian cụ thể (ví dụ: các vụ ngập lụt trong tháng trước).

### 3. Tìm kiếm Không gian (Geospatial Search)
- **Radius Search**: "Tìm tất cả trạm y tế trong bán kính 2km từ điểm ngập".
- **Bounding Box**: Tìm kiếm thực thể trong khung nhìn hiện tại của bản đồ.
- **Distance Sorting**: Ưu tiên hiển thị các kết quả gần vị trí người dùng nhất.

---

## Đồng bộ Dữ liệu (Data Synchronization)

Dịch vụ Search không lưu trữ dữ liệu gốc mà hoạt động như một lớp chỉ mục (Indexing Layer):

1. **Real-time Sync**: Lắng nghe các sự kiện từ Kafka khi có sự cố mới hoặc cập nhật hạ tầng từ [Digital Twin Service](../DigitalTwinService/Readme.md).
2. **Batch Indexing**: Định kỳ đồng bộ hóa lại toàn bộ dữ liệu từ PostgreSQL để đảm bảo tính nhất quán.
3. **CDC (Change Data Capture)**: Sử dụng Debezium hoặc các công cụ tương tự để bắt kịp các thay đổi từ database chính.

---

## Tích hợp Hệ thống

- **Dashboard**: Cung cấp thanh tìm kiếm chính cho người dùng điều hành.
- **[Incident Service](../IncidentService/Readme.md)**: Giúp nhân viên cứu hộ tìm nhanh thông tin các vụ việc liên quan.
- **[Digital Twin Service](../DigitalTwinService/Readme.md)**: Chỉ mục hóa các đối tượng GIS để truy vấn không gian.
- **Mobile App**: Hỗ trợ người dân tìm kiếm các địa điểm an toàn hoặc trạm cứu trợ gần nhất.

---

## API Endpoints (Ví dụ)

### Tìm kiếm Tổng hợp
```bash
GET /api/search?q=bệnh+viện&type=infrastructure&limit=10
```

### Tìm kiếm Không gian
```bash
POST /api/search/spatial
{
  "lat": 16.0544,
  "lon": 108.2022,
  "radius": 2000,
  "filters": {
    "type": "shelter",
    "status": "available"
  }
}
```

---

## Deployment

### Docker
```bash
docker-compose up -d search-service
```

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---
_**AegisFlow AI – Tìm kiếm thông minh, phản ứng nhanh chóng.**_
