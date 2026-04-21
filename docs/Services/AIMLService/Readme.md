# 🤖 AI Prediction Service

> Công nghệ AI dự báo - Cảnh báo ngập lụt, định tuyến sơ tán, đánh giá vùng cô lập

---

## Mục Đích

**AI Prediction Service** cung cấp các dự báo thông minh cho AegisFlow AI:

1. **💧 Cảnh báo Ngập lụt (Flood Prediction)**
   - Dự báo 1-3 giờ trước
   - Xác định các điểm đen ngập úng sắp hình thành
   - Gợi ý mức độ sâu của nước và vùng ảnh hưởng

2. **🚗 Định tuyến Sơ tán Khẩn cấp**
   - Loại bỏ đoạn đường ngập khỏi mạng lưới giao thông
   - Tìm kiếm tuyến đường tiếp cận an toàn nhất
   - Hướng dẫn lộ trình cho xe cứu thương, cứu hỏa

3. **📊 Tác động Dây chuyền (Cascade Effects)**
   - Mô phỏng đoạn đường ngập làm cô lập các nhánh đường khác
   - Đánh giá khả năng khu dân cư bị "bao vây"

4. **🚑 Đánh giá Mức độ Tổn thương (Vulnerability)**
   - Chấm điểm ưu tiên cứu hộ cho từng khu vực
   - Hỗ trợ ra quyết định phân bổ thuyền cứu hộ và nhu yếu phẩm

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **AI Core** | Amazon Bedrock + Amazon Nova |
| **Time Series** | TensorFlow/PyTorch (LSTM, Transformer) |
| **Framework** | Python FastAPI |
| **ML Ops** | Kubernetes, MLflow |
| **Monitoring** | Prometheus + Grafana |

---

## Các Mô hình Dự báo

### 1. Flood Risk Prediction (Hybrid ML)

**Input:**
- Dữ liệu thời tiết (OpenWeatherMap/API khí tượng)
- Cảm biến đo mực nước (real-time từ IoT)
- Lịch sử ngập lụt khu vực
- Địa hình (độ trũng, đường thoát nước)

**Output:**
- Dự báo độ sâu mực nước (15, 30, 60, 180 phút tới)
- Mức độ rủi ro (NONE, LOW, MEDIUM, HIGH, CRITICAL)

**Độ chính xác:** RMSE < 10cm (với mật độ cảm biến đủ)

### 2. Safe Routing Engine (Dynamic Network AI)

**Input:**
- Original City Graph topology
- Cập nhật các node/đường đang bị ngập sâu
- Loại phương tiện (cứu thương, ô tô, ghe thuyền)
- Tình trạng kẹt xe hiện tại

**Output:**
- Danh sách tọa độ tuyến đường (waypoints)
- Các điểm ngập đã tránh

**Độ chính xác:** Tỷ lệ an toàn lộ trình > 98%

### 3. Cascade Isolation Effects (Agent-Based)

**Input:**
- Các điểm đang ngập sâu làm đứt mạch giao thông
- Mạng lưới đường hẻm phụ
- Thông tin mật độ dân cư

**Output:**
- Danh sách các vùng dân cư bị cô lập hoàn toàn
- Timeline ngập (Dự kiến bị cô lập trong bao lâu)
- Mức độ nghiêm trọng (Severity estimation)

### 4. Vulnerability Score (Nova LLM)

**Input:**
- Demographic data (vùng có người già, bệnh viện)
- Mức độ ngập hiện tại
- Tình trạng đồ tiếp tế

**Output:**
- Báo cáo phân bổ ưu tiên cứu hộ (structured JSON):
  ```json
  {
    "priority_score": 95,
    "affected_population": 1200,
    "critical_facilities": ["Bệnh viện Quận", "Trạm Y tế"],
    "rescue_requirements": {
      "boats_needed": 3,
      "food_packages": 500,
      "urgency_level": "CRITICAL"
    },
    "reasoning": "Khu vực bị cô lập cấp độ cao, có bệnh viện đang mất điện... [AI generated]"
  }
  ```

---

## API Endpoints

### Flood Risk Prediction

```bash
# Dự báo mức độ ngập của một tuyến đường
POST /api/predictions/flooding/risk/{roadId}
{
  "horizonMinutes": 120
}

Response:
{
  "roadId": "...",
  "predictions": [
    { "timestamp": "2026-04-21T11:00:00Z", "expectedDepth": 0.4, "risk": "HIGH" },
    { "timestamp": "2026-04-21T12:00:00Z", "expectedDepth": 0.8, "risk": "CRITICAL" }
  ],
  "alert": "Water level rising rapidly, recommend immediate road closure"
}
```

### Safe Routing Engine

```bash
# Tìm đường đi an toàn
POST /api/predictions/routing/safe-path
{
  "origin": { "lat": 16.0544, "lon": 108.2022 },
  "destination": { "lat": 16.0782, "lon": 108.2201 },
  "vehicleType": "ambulance"
}

Response:
{
  "status": "success",
  "eta": 20,
  "route": [...], // Danh sách tọa độ
  "avoidedNodes": ["node-le-duan", "node-pham-van-dong"]
}
```

### Cascade Isolation Effects

```bash
# Đánh giá khu vực bị cô lập
POST /api/predictions/cascade/isolation
{
  "triggerNodes": ["node-le-duan"],
  "floodDepth": 1.2
}

Response:
{
  "primaryIsolatedZones": [...],
  "secondaryIsolatedZones": [...],
  "timeline": {
    "1h": "Cắt đứt hoàn toàn lối vào khu dân cư A",
    "2h": "Mực nước ngập sâu không thể dùng xe gầm cao"
  }
}
```

### Vulnerability Score

```bash
# Đánh giá ưu tiên cứu hộ cho khu vực
POST /api/predictions/vulnerability
{
  "zoneId": "zone-hai-chau",
  "currentFloodLevel": "CRITICAL"
}

Response:
{
  "priority_score": 95,
  "critical_facilities": ["Bệnh viện A"],
  "rescue_requirements": { "boats_needed": 3, ... },
  "explanation": "Khu vực ưu tiên khẩn cấp do có nguy cơ mất an toàn cao ở nhóm dân cư người cao tuổi."
}
```

---

## Training & Optimization

### Data Pipeline

```
Raw Data (IoT, APIs Thời tiết)
    ↓
Data Validation & Cleaning
    ↓
Feature Engineering (GIS, Topology Graph)
    ↓
Train/Test Split (80/20)
    ↓
Model Training (LSTM, Graph Networks)
    ↓
Model Validation & Evaluation
    ↓
Hyperparameter Tuning
    ↓
Production Deployment
```

### Retraining Schedule

- **Flood Prediction Model**: Daily (12 AM UTC) và Retrain khẩn cấp khi Rainfall > 100mm/h.
- **Routing Engine**: Real-time cập nhật lại trọng số Graph (Mỗi 5 phút).
- **Cascade/Vulnerability Models**: Weekly (Sundays 2 AM).

---

## Ví dụ Sử dụng

### Từ Dashboard Service

```typescript
// Lấy dữ liệu ngập để hiển thị cảnh báo chặn đường
const floodRisk = await predictionService.getFloodRisk(roadId);
if (floodRisk.alert) {
  displayWarning(floodRisk.alert);  // "Water level rising rapidly, recommend immediate road closure"
  map.drawExclusionZone(roadId);
}
```

### Từ Notification Service

```typescript
// Gửi lộ trình an toàn cho dân cư đang di chuyển
const safeRoute = await predictionService.getSafeRouting(userLoc, homeLoc);
if (safeRoute.avoidedNodes.length > 0) {
  notificationService.sendAppPush(userId, {
    title: "Cảnh báo đổi lộ trình",
    message: "Tuyến đường phía trước đang ngập sâu. Hệ thống đã tìm hướng đi mới an toàn cho bạn.",
    routeData: safeRoute.route
  });
}
```

---

## Deployment

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN pip install fastapi uvicorn tensorflow torch osmnx psycopg2-binary
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8002
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

### Env Variables

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
GIS_DATABASE_URL=postgresql://user:pass@postgis:5432/aegisgis
WEATHER_API_KEY=...
KAFKA_BROKER=kafka:9092
MODEL_PATH=/models
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Flood prediction RMSE | < 10cm |
| Safe route calculation latency | < 100ms |
| Route safety compliance | > 98% |
| API response time | < 500ms |
| Model inference time | < 1 second |

---

## Liên quan

- [GIS & Map Service](../DigitalTwinService/) – Bản đồ hệ thống GIS
- [Analytics Service](../AnalyticsService/) – Phân tích xu hướng ngập
- [Notification Service](../NotificationService/) – Gửi cảnh báo tới người dân
