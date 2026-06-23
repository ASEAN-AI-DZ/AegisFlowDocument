# 🏗️ AegisFlow AI Microservices

> All modular services that make up the AegisFlow AI platform.

---

## 📊 Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                           │
│         (React/Vite, Leaflet, Interactive Map)                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │GIS &   │  │ Prediction│ │Simulation│
    │ Map    │  │ & Alert   │  │ What-If  │
    └────────┘  └──────────┘  └──────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        │             │             │              │
        ▼             ▼             ▼              ▼
    ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ IoT     │  │Emergency │  │ Dashboard│  │Incident &│
    │ Sensors │  │Response  │  │ Service  │  │Analytics │
    └─────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## 🔑 Core Services

### 1. **GIS & Map Service** ⭐

**Purpose**: Modeling the entire city in real-time.

- 🌍 Build the traffic network graph of the city.
- 📍 Integrate geospatial data (PostGIS) for roads, intersections, and buildings.
- ⏱️ Update state continuously from sensors, traffic cameras, and IoT.
- 💾 Store spatial states and historical data.

**Technologies**: Node.js, PostgreSQL + PostGIS, Redis, Kafka  
**API Port**: 3001  
**Documentation**: [DigitalTwinService/Readme.md](./DigitalTwinService/Readme.md)

```bash
# Health check
curl http://localhost:3001/api/digital-twin/health

# Get zones
curl http://localhost:3001/api/digital-twin/zones
```

---

### 2. **AI Prediction Service** 🤖

**Purpose**: Forecasting & alerting urban incidents.

- 🚗 **Traffic Prediction**: Forecast traffic flow (15–60 minutes ahead).
- 💧 **Flooding Alert**: Predict flooding risk based on weather APIs + IoT water level sensors.
- 📊 **Cascade Effects**: Simulate cascading blockage impacts on the graph.
- 💰 **Socioeconomic Impact**: Forecast socioeconomic impact of incidents using Amazon Nova.

**Models**: LSTM, Transformer, Agent-Based, LLM  
**AI Framework**: Amazon Bedrock + Nova  
**Technologies**: Python, FastAPI, TensorFlow/PyTorch  
**API Port**: 8002  
**Documentation**: [AIMLService/Readme.md](./AIMLService/Readme.md)

```bash
# Get traffic prediction
curl http://localhost:8002/api/predictions/traffic/road_123?horizonMinutes=60

# Get flooding alert
curl http://localhost:8002/api/predictions/flooding/city
```

---

### 3. **Simulation & What-If Service** 🎮

**Purpose**: Simulating scenarios before actual deployment.

- 🏗️ Allow drag-and-drop of mock infrastructure (new roads, hospitals, schools, shelters).
- 🔄 Run agent-based simulations (5–10 years projection).
- 📈 Forecast multidimensional impact: economic, environmental, social, traffic.
- 📊 Compare A/B testing scenarios.
- 📄 Generate detailed reports with an Impact Score and Radar Chart.

**Technologies**: Python, Mesa (ABM), FastAPI, Ray  
**API Port**: 8003  
**Documentation**: [AnalyticsService/Readme.md](./AnalyticsService/Readme.md)

```bash
# Create scenario
curl -X POST http://localhost:8003/api/scenarios \
  -H "Content-Type: application/json" \
  -d '{"name": "New Hospital in District 4"}'

# Run simulation
curl -X POST http://localhost:8003/api/scenarios/scenario_123/simulate
```

---

### 4. **Emergency Response & Notification Service** 🚨

**Purpose**: Emergency warning & evacuation guidance.

- 🚑 **Fastest Route For Emergency**: Calculate optimal collision-free routes for ambulances and fire trucks.
- 🗺️ **Evacuation Guidance**: Recommend safe evacuation detours avoiding high flood zones.
- 📱 **Multi-channel Alerts**: Push notifications, SMS, Email, Web.
- 📊 **Cascade Broadcasting**: Distribute alerts city-wide or district-wide.
- 📍 **Geolocation-based**: Target alerts strictly to citizens in the affected boundaries.

**Technologies**: Node.js, Express, MongoDB, Firebase FCM, Kafka  
**API Port**: 3005  
**Documentation**: [NotificationService/Readme.md](./NotificationService/Readme.md)

```bash
# Broadcast flood alert
curl -X POST http://localhost:3005/api/emergency/broadcast-alert \
  -H "Content-Type: application/json" \
  -d '{
    "type": "flooding",
    "severity": "critical",
    "affectedZones": ["zone_1", "zone_2"],
    "message": "Critical flooding alert"
  }'

# Request emergency route
curl -X POST http://localhost:3005/api/emergency/fastest-route \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleType": "ambulance",
    "fromLocation": {"lat": 16.04, "lon": 108.21},
    "toLocation": {"lat": 16.08, "lon": 108.20}
  }'
```

---

### 5. **IoT Service** 📡

**Purpose**: Receiving data from sensors, cameras, and weather feeds.

- 📷 Traffic camera feeds (RTMP streams).
- 🌡️ IoT sensors (water level, temperature, pollution index).
- 🌤️ Weather data feeds (OpenWeatherMap, NOAA APIs).
- 🚗 Floating car data (Grab, HERE Maps, etc.).
- 📱 Mobile app crowdsourcing reports (citizen uploads).

**Technologies**: Node.js, MQTT Broker, Kafka Producer  
**Documentation**: [IoTService/Readme.md](./IoTService/Readme.md)

---

### 6. **Dashboard Service** 📊

**Purpose**: Decision support visualizer.

- 🗺️ **Interactive Map**: Renders live city state overlay.
- 📈 **Impact Score** (0–100): Calculated score assessing scenario viability.
- 📊 **Radar Chart**: 5 indexes (Economic, Environmental, Accessibility, Equity, Safety).
- 🎯 **Comparison View**: Cross-compare multiple simulation scenarios.
- 💡 **AI Explanation**: Natural language rationale of why a scenario is positive or negative.

**Technologies**: React/Vue, D3.js, Chart.js, Leaflet  
**Documentation**: [AnalyticsService/Readme.md](./AnalyticsService/Readme.md)

---

### 7. **Incident Service** 🚨

**Purpose**: Managing incident lifecycle.

- 📝 Record and register incidents (traffic accidents, severe flooding, structure fire).
- 🏷️ Automatic AI classification and prioritization.
- 📊 Track responder progress and resolution status.
- 📈 Incident statistics and reporting.

**Documentation**: [IncidentService/Readme.md](./IncidentService/Readme.md)

---

### 8. **Search Service** 🔍

**Purpose**: Fast search and spatial query matching.

- 🔎 Full-text indexing (hospitals, schools, shelters).
- 📍 Spatial radius search.
- 📊 Real-time search indexing (OpenSearch/Elasticsearch).

**Documentation**: [SearchService/Readme.md](./SearchService/Readme.md)

---

### 9. **FloodEye Service** 🌊

**Purpose**: AI computer vision for flood detection.

- 📸 Analyze street camera image feeds using Deep Learning (CNN, ResNet).
- 🌊 Estimate flood water depth levels visually.
- 🔔 Automate real-time flood warning triggers.
- 📍 Correlate data with GIS layers.

**Technologies**: Python, FastAPI, TensorFlow/PyTorch, PostGIS  
**Documentation**: [FloodEyeService/Readme.md](./FloodEyeService/Readme.md)

---

### 10. **Media Service** 📷

**Purpose**: Storage and optimization of media assets.

- 📹 Live traffic camera streaming (RTMP/HLS).
- 🖼️ Store incident evidence images and citizen upload uploads.
- ⚙️ Media compression and conversion pipeline.
- ☁️ Object storage integration (AWS S3, GCS).

**Technologies**: Node.js, FFmpeg, AWS S3  
**Documentation**: [MediaService/Readme.md](./MediaService/Readme.md)

---

### 11. **Wallet Service** 💰

**Purpose**: Community contribution system (CityPoint).

- 🪙 Earn points for submitting verified and valuable incident reports.
- 🎁 Redeem points for public transit tickets, city parking, or other rewards.
- 📊 Maintain citizen contribution leaderboards.
- 🛡️ Integrity check of reward tokens.

**Technologies**: Node.js, PostgreSQL, Redis  
**Documentation**: [WalletService/Readme.md](./WalletService/Readme.md)

---

## 🔄 Core Data Flows

### Real-time Event Flow

```
Sensors/IoT
    ↓
MQTT Broker
    ↓
IoT Service (Adapter)
    ↓
Kafka Topic
    ├─→ GIS & Map Service (Update state)
    ├─→ Prediction Service (Analyze)
    └─→ Analytics Service (Store metrics)
    
    ↓
    
Predictions Generated
    ├─→ Dashboard (Display)
    ├─→ Notification Service (Alert if needed)
    └─→ Incident Service (Track)
```

### Scenario Simulation Flow

```
User Creates Scenario (Frontend)
    ↓
Simulation Service
    ├─ Clone current state (from GIS & Map)
    ├─ Apply changes
    ├─ Run ABM (Agent-Based Model)
    ├─ Call Amazon Nova for impact prediction
    ├─ Generate Impact Score & Radar Chart
    └─ Save results
    
    ↓
Dashboard displays results
    ├─ Impact Score
    ├─ Radar Chart
    ├─ Timeline of effects
    └─ AI explanation
```

---

## 📋 Service Dependencies

| Service | Depends On | Used By |
|---|---|---|
| **GIS & Map** | IoT Service, Kafka | Prediction, Simulation, Dashboard |
| **Prediction** | GIS & Map, Weather API | Dashboard, Notification, Simulation |
| **Simulation** | GIS & Map, Amazon Nova | Dashboard, Incident |
| **Notification** | Prediction, Incident, GIS & Map | End Users, Admin Portal |
| **Dashboard** | GIS & Map, Simulation, Prediction | Web UI, Mobile UI |
| **IoT** | Sensors, External APIs | GIS & Map |
| **Incident** | Prediction, Notification | Dashboard, Analytics |

---

## 🚀 Deployment

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all
docker-compose down
```

### Individual Service Startup

```bash
# GIS & Map
docker-compose up -d digital-twin

# Prediction Service
docker-compose up -d prediction

# Simulation Service  
docker-compose up -d simulation

# Emergency Response
docker-compose up -d emergency

# Dashboard
docker-compose up -d dashboard

# IoT
docker-compose up -d iot
```

---

## 🔗 API Gateway

All services are exposed via a unified API Gateway at **http://localhost:3000**:

```
GET  /api/digital-twin/*
GET  /api/predictions/*
POST /api/scenarios/*
POST /api/emergency/*
GET  /api/dashboard/*
GET  /api/incidents/*
GET  /api/search/*
```

---

## 📚 Detailed Documentation

- [GIS & Map Service](./DigitalTwinService/Readme.md)
- [AI Prediction Service](./AIMLService/Readme.md)
- [Simulation Service](./AnalyticsService/Readme.md)
- [Emergency Response & Notification](./NotificationService/Readme.md)
- [IoT Service](./IoTService/Readme.md)
- [Incident Service](./IncidentService/Readme.md)
- [Search Service](./SearchService/Readme.md)
- [FloodEye Service](./FloodEyeService/Readme.md)
- [Media Service](./MediaService/Readme.md)
- [Wallet Service](./WalletService/Readme.md)

---

## 🆘 Troubleshooting

### Service fails to start

```bash
# Check logs
docker-compose logs <service_name>

# Rebuild service
docker-compose build --no-cache <service_name>

# Restart
docker-compose restart <service_name>
```

### API unresponsive

```bash
# Test connection
curl http://localhost:<PORT>/health

# Check if service container is running
docker-compose ps
```

### Database connection errors

```bash
# Connect to database container
docker-compose exec postgres psql -U aegis_user -d aegisflow_db

# Check tables
\dt
```

---

## 💡 Best Practices

1. **Service Communication**: Use Kafka for async communication, HTTP/REST for sync operations.
2. **Monitoring**: Setup Prometheus + Grafana to monitor system health and latencies.
3. **Logging**: Centralize logs using the ELK Stack or a similar log consolidator.
4. **Scaling**: Deploy with Docker Swarm or Kubernetes for high availability and replication.
5. **Security**: Keep credentials in environment variables, protect endpoints via the API Gateway, and enforce RBAC.

---

## 🔄 Updates & Maintenance

- **Weekly**: Audit error logs, verify Kafka queue offsets, check disk space usage.
- **Monthly**: Apply package security updates, check Redis cache hit ratio.
- **Quarterly**: Benchmark API response times, optimize heavy PostGIS queries.
- **As needed**: Address hotfixes for critical security vulnerabilities.

---

## 📞 Contact

- 📧 Development: thanhtruong23111999@gmail.com
- 🐛 Bug Reports: [GitHub Issues](https://github.com/ASEAN-AI-DZ/AegisFlowAI/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ASEAN-AI-DZ/AegisFlowAI/discussions)
