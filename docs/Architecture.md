# 🏗️ Kiến Trúc Hệ Thống AegisFlow AI

> _"Thiết kế cơ bản cho Nền tảng GIS & Map & AI cho Quản lý Đô thị Thông minh"_

---

## 📊 Tổng Quan Kiến Trúc

AegisFlow AI được thiết kế theo kiến trúc **Microservices** hiện đại, đảm bảo:
- 🔄 Khả năng mở rộng (Scalability)
- 🔌 Tính linh hoạt (Flexibility)
- ⚡ Hiệu suất cao (High Performance)
- 🛡️ Độ tin cậy (Reliability)

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  (Vite + Vanilla JS, Leaflet/Mapbox, Charts.js)            │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────┐
│              API Gateway & Load Balancer                    │
│                  (Node.js  / Nginx)                │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    │            │            │            │
    ▼            ▼            ▼            ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│GIS & Map│ │   AI     │ │ Routing  │ │Dashboard │
│ Service │ │Prediction│ │  Engine  │ │  Service │
│         │ │ Service  │ │          │ │          │
└─────────┘ └──────────┘ └──────────┘ └──────────┘
    │            │            │            │
    └────────────┼────────────┼────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    │            │            │            │
    ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ IoT      │ │ Message  │ │ Cache &  │ │Geospatial│
│ Adapter  │ │ Queue    │ │ Session  │ │  Database│
│          │ │ (Kafka)  │ │ (Redis)  │ │(PostgreSQL
└──────────┘ └──────────┘ └──────────┘ │+ PostGIS)
                                        └──────────┘
```

---

## 🔧 Các Thành phần Chính

| Thành phần | Công nghệ | Mục đích |
|----------|----------|---------|
| **Frontend** | Vite, Vanilla JS, Leaflet, Charts.js | Giao diện người dùng, bản đồ tương tác ngập lụt |
| **API Gateway** | Node.js + Express / Nginx | Routing, Load balancing, Authentication |
| **GIS & Map** | Node.js, PostGIS, WebSockets | Mô hình hóa mạng lưới giao thông, cập nhật trạng thái ngập realtime |
| **AI Prediction** | Amazon Bedrock + Nova, FastAPI | Dự báo điểm ngập, mô phỏng vùng cô lập |
| **Routing Engine** | Python FastAPI, Thuật toán Graph | Tìm kiếm đường sơ tán an toàn, loại bỏ node ngập |
| **Dashboard** | Node.js + EJS/Pug | Hiển thị dữ liệu, Vulnerability Score, Radar Chart |
| **IoT Adapter** | Node.js, MQTT / HTTP | Nhận dữ liệu từ cảm biến mực nước, trạm bơm, thời tiết |
| **Message Queue** | Apache Kafka / RabbitMQ | Event streaming, đồng bộ trạng thái ngập bất đồng bộ |
| **Cache** | Redis | Session, caching lộ trình an toàn, real-time data |
| **Database** | PostgreSQL + PostGIS | Lưu trữ dữ liệu địa lý, lịch sử ngập, tọa độ người dùng |

---

## 🌐 Luồng Dữ liệu Chính

### 1. Nhận dữ liệu từ Nguồn Ngoài

```
Sensors/Weather APIs/Crowdsourcing
        ↓
   API/MQTT Broker
        ↓
  IoT Adapter
        ↓
  Kafka Topic
        ↓
  [Microservices]
```

**Dữ liệu bao gồm:**
- 🌊 Cảm biến IoT (mực nước, lưu lượng cống thoát)
- 🌤️ Dữ liệu thời tiết (API OpenWeatherMap, lượng mưa)
- 🚗 Trạng thái đường sá thời gian thực
- 📱 Báo cáo điểm ngập từ ứng dụng người dân (Crowdsourcing)

### 2. Cập nhật Mô hình Không gian Động (Dynamic Spatial Model)

```
Raw Data (Kafka)
        ↓
GIS & Map Service
        ↓
1. Validate & Normalize
2. Update Graph Network Weights
3. Publish Flood Events
        ↓
PostgreSQL + PostGIS
        ↓
Dashboard / Map Visualizations
```

**Mô hình không gian bao gồm:**
- Đồ thị mạng (Graph) của đô thị
- Nút (Nodes): giao lộ, điểm dân cư, khu neo đậu cứu hộ
- Cạnh (Edges): các đoạn đường
- Trạng thái thực tế: khô ráo, ngập nhẹ, ngập sâu, cấm đi lại.

### 3. AI Dự đoán & Cảnh báo

```
Spatial State (Current + Historical Rain)
        ↓
AI Prediction Service
        ↓
1. Feature Engineering
2. Run ML Models (LSTM/Hybrid)
3. Evaluate Risks
        ↓
Predictions:
- Flood Depth (1-3 hours ahead)
- Vulnerability Score (Prioritize Rescue)
- Cascade Isolation Effects
        ↓
Dashboard + Alerts
```

**Các mô hình dự báo:**
- 💧 **Flood Risk**: Xác định khu vực ngập úng sắp tới (ML lai).
- 🚑 **Vulnerability**: Đánh giá điểm ưu tiên cứu hộ bằng LLM (Amazon Nova).
- 📊 **Impact Cascade**: Mô phỏng sự cô lập mạng lưới đường hẻm.

### 4. Định tuyến An toàn (Safe Routing)

```
User Request (Origin -> Destination)
        ↓
Routing Engine
        ↓
1. Fetch current flood exclusions (nodes to avoid)
2. Run Graph Algorithm (Dijkstra/A* modified)
3. Calculate ETA
        ↓
Results:
- Safe Route Waypoints
- Avoided Flood Nodes
- Evacuation Shelter Suggestions
        ↓
User App Navigation
```

---

## 🔄 Luồng Khẩn cấp (Emergency Response)

Khi xuất hiện mưa lớn đột biến hoặc sự cố ngập úng sâu:

```
Severe Flooding Detected
        ↓
Alert & Prediction Service
        ↓
1. Identify Critical Flood Zones
2. Trigger AI Routing Exclusions
        ↓
3a. Calculate Safe Routes (for ambulance/rescue boats)
3b. Predict Isolated Communities (Cascade Effects)
3c. Evaluate Vulnerability Score for Supply Drop
        ↓
Notification Service
        ↓
Send Alerts to:
- Rescue Teams (High Priority Zones)
- Citizens (Route Change Push Notifications)
- Operation Center Dashboard
```

---

## 📡 API Endpoints Chính

```
GET    /api/map/flood-zones        # Lấy tọa độ các vùng ngập hiện tại
POST   /api/predictions/flooding   # Dự báo độ sâu ngập lụt
POST   /api/predictions/routing    # Yêu cầu tìm lộ trình an toàn
POST   /api/predictions/isolation  # Đánh giá vùng dân cư bị cô lập
POST   /api/crowdsource/report     # Công dân báo cáo điểm ngập
GET    /api/dashboard/vulnerability# Lấy danh sách ưu tiên cứu hộ
POST   /api/emergency/dispatch     # Điều phối đơn vị cứu hộ
```

---

## 💾 Cấu trúc Database

### PostgreSQL + PostGIS

```sql
-- GIS Network (Đồ thị mạng giao thông)
TABLE zones              -- Các khu vực hành chính/phân vùng
TABLE intersections      -- Nút giao thông (Nodes)
TABLE roads              -- Đoạn đường (Edges)
TABLE critical_facilities-- Bệnh viện, trung tâm y tế, trạm cứu hộ

-- Real-time State
TABLE flood_state        -- Trạng thái ngập úng hiện tại theo khu vực
TABLE road_status        -- Tình trạng khả dụng của đường sá (Open/Closed)
TABLE sensor_water_level -- Dữ liệu thô từ cảm biến IoT

-- Predictions & Analysis
TABLE flood_predictions  -- Lịch sử và kết quả dự báo mức nước
TABLE vulnerability_logs -- Điểm đánh giá tổn thương theo thời gian

-- Crowdsourcing & Incidents
TABLE citizen_reports    -- Báo cáo ngập từ cộng đồng
TABLE rescue_missions    -- Phiếu điều phối lực lượng cứu hộ
```

---

## 🚀 Triển khai

### Development
```bash
npm install
npm run dev
```

### Production (Docker)
```bash
docker-compose --file docker-compose.prod.yml up -d
```

### Scaling
- **Horizontal**: Chạy nhiều instance của API và Routing Engine
- **Vertical**: Tăng tài nguyên (CPU, RAM) cho AI inference
- **Caching**: Sử dụng Redis để cache lộ trình và tọa độ an toàn

---

## 🔐 Bảo mật

- **Authentication**: JWT tokens cho Admin và Users
- **Authorization**: Role-based access control (Citizen vs Rescue Team vs Authority)
- **Encryption**: HTTPS/TLS, mã hóa dữ liệu nhạy cảm (tọa độ người dùng)
- **Rate Limiting**: Ngăn chặn spam cáo báo giả hoặc gửi query đường đi liên tục
- **Audit Logs**: Ghi lại lịch sử điều phối và cảnh báo khẩn cấp

---

## 📚 Tài liệu Liên quan

- [AI Prediction Service](./Services/AIMLService/Readme.md)
- [API Reference](./Services/README.md)
- [Installation Guide](./Installation.md)
