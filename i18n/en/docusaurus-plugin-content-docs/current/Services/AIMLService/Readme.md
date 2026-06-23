# 🤖 AI Prediction Service

> AI Forecasting Technology - Flood alerting, evacuation routing, and isolation assessment.

---

## Purpose

The **AI Prediction Service** provides intelligent forecasts and rationales for AegisFlow AI:

1. **💧 Flood Prediction**
   - Forecast flood levels 1-3 hours in advance.
   - Identify upcoming flooding black spots.
   - Estimate inundation depth and affected boundaries.

2. **🚗 Emergency Evacuation Routing**
   - Exclude deeply flooded road segments from the traffic network graph.
   - Search for the safest detours.
   - Coordinate routes for ambulances, fire engines, and rescue boats.

3. **📊 Cascade Isolation Effects**
   - Simulate how flooded segments trigger cascading blockages on neighboring alleys.
   - Evaluate the risk of residential areas becoming completely stranded.

4. **🚑 Vulnerability Score**
   - Score the rescue priority for different areas.
   - Inform decision-making on allocating rescue boats and distribution of relief supplies.

---

## Technology Stack

| Component | Technology |
|---|---|
| **AI Core** | Amazon Bedrock + Amazon Nova |
| **Time Series** | TensorFlow/PyTorch (LSTM, Transformer) |
| **Framework** | Python FastAPI |
| **ML Ops** | Kubernetes, MLflow |
| **Monitoring** | Prometheus + Grafana |

---

## Prediction Models

### 1. Flood Risk Prediction (Hybrid ML)

**Input:**
- Weather data (OpenWeatherMap / Meteorological APIs).
- IoT water level sensors (real-time telemetry).
- Historical flooding logs.
- Geospatial terrain data (elevation, slope, drainage capacity).

**Output:**
- Water level depth forecasts (15, 30, 60, 180 minutes horizon).
- Flooding risk category (NONE, LOW, MEDIUM, HIGH, CRITICAL).

**Accuracy:** RMSE < 10cm (given sufficient sensor density).

### 2. Safe Routing Engine (Dynamic Network AI)

**Input:**
- Base City Graph network topology.
- Real-time nodes/edges flagged with critical flood levels.
- Vehicle type (ambulance, standard car, rescue boat).
- Active congestion levels.

**Output:**
- List of safe route coordinates (waypoints).
- Excluded/avoided flood nodes.

**Accuracy:** Route safety compliance rate > 98%.

### 3. Cascade Isolation Effects (Agent-Based)

**Input:**
- Active flood nodes cutting off key arterial segments.
- Minor alley network layout.
- Population density data.

**Output:**
- List of completely isolated residential zones.
- Flooding timeline (estimated duration of isolation).
- Severity estimation rating.

### 4. Vulnerability Score (Nova LLM)

**Input:**
- Demographic data (zones containing high elderly population, nursing homes, hospitals).
- Current flood levels.
- Food/medical supply warehouse status.

**Output:**
- Priority rescue report (structured JSON):
  ```json
  {
    "priority_score": 95,
    "affected_population": 1200,
    "critical_facilities": ["District Hospital", "Medical Center"],
    "rescue_requirements": {
      "boats_needed": 3,
      "food_packages": 500,
      "urgency_level": "CRITICAL"
    },
    "reasoning": "High isolation index. The district hospital is currently experiencing power outages... [AI generated]"
  }
  ```

---

## API Endpoints

### Flood Risk Prediction

```bash
# Predict flood risk for a specific road
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
# Fetch safe route detour
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
  "route": [...], // Array of coordinates
  "avoidedNodes": ["node-le-duan", "node-pham-van-dong"]
}
```

### Cascade Isolation Effects

```bash
# Evaluate isolated residential zones
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
    "1h": "Evacuation path to residential zone A is completely cut off",
    "2h": "Flood depth blocks passage of high-clearance vehicles"
  }
}
```

### Vulnerability Score

```bash
# Score rescue priority
POST /api/predictions/vulnerability
{
  "zoneId": "zone-hai-chau",
  "currentFloodLevel": "CRITICAL"
}

Response:
{
  "priority_score": 95,
  "critical_facilities": ["Hospital A"],
  "rescue_requirements": { "boats_needed": 3, ... },
  "explanation": "Critical priority zone due to high risk to isolated elderly residents."
}
```

---

## Training & Optimization

### Data Pipeline

```
Raw Data (IoT water levels, Weather APIs)
    ↓
Data Validation & Cleaning
    ↓
Feature Engineering (GIS & Network Topology Graph)
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

- **Flood Prediction Model**: Daily (12 AM UTC) and emergency retrain when Rainfall > 100mm/h.
- **Routing Engine**: Real-time graph edge weights recalculated every 5 minutes.
- **Cascade/Vulnerability Models**: Weekly (Sundays 2 AM).

---

## Usage Examples

### From Dashboard Service

```typescript
// Query flood risk alerts to draw blockages on map
const floodRisk = await predictionService.getFloodRisk(roadId);
if (floodRisk.alert) {
  displayWarning(floodRisk.alert);  // "Water level rising rapidly, recommend immediate road closure"
  map.drawExclusionZone(roadId);
}
```

### From Notification Service

```typescript
// Suggest detours to citizens traveling towards flooded areas
const safeRoute = await predictionService.getSafeRouting(userLoc, homeLoc);
if (safeRoute.avoidedNodes.length > 0) {
  notificationService.sendAppPush(userId, {
    title: "Safe Detour Alert",
    message: "The road ahead is deeply flooded. The system has calculated a safe detour route.",
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

### Environment Variables

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
|---|---|
| Flood prediction RMSE | < 10cm |
| Safe route calculation latency | < 100ms |
| Route safety compliance | > 98% |
| API response time | < 500ms |
| Model inference time | < 1 second |

---

## Related Documentation

- [GIS & Map Service](../DigitalTwinService/) – GIS Map engine details
- [Analytics Service](../AnalyticsService/) – Flood trend analysis
- [Notification Service](../NotificationService/) – Disseminate warning alerts to citizens
