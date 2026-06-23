# 🏗️ AegisFlow AI System Architecture

> _"Foundational design for GIS & Map & AI platform for Smart Urban Management"_

---

## 📊 Architecture Overview

AegisFlow AI is designed with a modern **Microservices** architecture, ensuring:
- 🔄 Scalability
- 🔌 Flexibility
- ⚡ High Performance
- 🛡️ Reliability

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  (Vite + Vanilla JS, Leaflet/Mapbox, Charts.js)             │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────┐
│              API Gateway & Load Balancer                    │
│                  (Node.js  / Nginx)                         │
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

## 🔧 Core Components

| Component | Technology | Purpose |
|----------|----------|---------|
| **Frontend** | Vite, Vanilla JS, Leaflet, Charts.js | User interface, interactive flood mapping |
| **API Gateway** | Node.js + Express / Nginx | Routing, Load balancing, Authentication |
| **GIS & Map** | Node.js, PostGIS, WebSockets | Road network graph modeling, real-time flood updates |
| **AI Prediction** | Amazon Bedrock + Nova, FastAPI | Flood point forecasting, isolated zone simulation |
| **Routing Engine** | Python FastAPI, Graph Algorithms | Safe evacuation routing, excluding flooded nodes |
| **Dashboard** | Node.js + EJS/Pug | Data rendering, Vulnerability Score, Radar Chart |
| **IoT Adapter** | Node.js, MQTT / HTTP | Ingests data from water level sensors, pumping stations, weather |
| **Message Queue** | Apache Kafka / RabbitMQ | Event streaming, async flood status synchronization |
| **Cache** | Redis | Session, caching of safe routes, real-time data |
| **Database** | PostgreSQL + PostGIS | Spatial data storage, flood history, user coordinates |

---

## 🌐 Main Data Flows

### 1. Receiving Data from External Sources

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

**Data includes:**
- 🌊 IoT Sensors (water level, drainage pipe flows)
- 🌤️ Weather data (OpenWeatherMap API, precipitation)
- 🚗 Real-time traffic road status
- 📱 Crowdsourced flood reports from citizens

### 2. Updating Dynamic Spatial Model

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

**Dynamic Spatial Model includes:**
- Traffic network Graph
- Nodes: intersections, residential hubs, rescue docking points
- Edges: road segments
- Real-time status: dry, minor flooding, deep flooding, blocked.

### 3. AI Prediction & Alerting

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

**Prediction Models:**
- 💧 **Flood Risk**: Identifies upcoming flood zones (Hybrid ML model).
- 🚑 **Vulnerability**: Scores rescue priority using LLM (Amazon Nova).
- 📊 **Impact Cascade**: Simulates isolation of alley networks.

### 4. Safe Routing

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

## 🔄 Emergency Response Flow

When severe flooding or a critical inundation event is detected:

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

## 📡 Core API Endpoints

```
GET    /api/map/flood-zones        # Get coordinates of current flood zones
POST   /api/predictions/flooding   # Forecast flood depth levels
POST   /api/predictions/routing    # Query safe routing detours
POST   /api/predictions/isolation  # Assess isolated residential zones
POST   /api/crowdsource/report     # Citizen reports of flood points
GET    /api/dashboard/vulnerability# Fetch priority rescue list
POST   /api/emergency/dispatch     # Dispatch rescue units
```

---

## 💾 Database Structure

### PostgreSQL + PostGIS

```sql
-- GIS Network (Traffic network graph)
TABLE zones              -- Administrative zones/regions
TABLE intersections      -- Intersection nodes
TABLE roads              -- Road edges
TABLE critical_facilities-- Hospitals, medical centers, rescue stations

-- Real-time State
TABLE flood_state        -- Current flood status by area
TABLE road_status        -- Road segment availability (Open/Closed)
TABLE sensor_water_level -- Raw IoT sensor readings

-- Predictions & Analysis
TABLE flood_predictions  -- Forecast water levels history and results
TABLE vulnerability_logs -- Vulnerability score over time

-- Crowdsourcing & Incidents
TABLE citizen_reports    -- Citizen-reported flood points
TABLE rescue_missions    -- Dispatch tickets for rescue units
```

---

## 🚀 Deployment

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
- **Horizontal**: Spawn multiple instances of API and Routing Engine
- **Vertical**: Scale up resources (CPU, RAM) for AI inference
- **Caching**: Utilize Redis to cache route matrices and safe coordinates

---

## 🔐 Security

- **Authentication**: JWT tokens for Admin and Users
- **Authorization**: Role-based access control (Citizen vs Rescue Team vs Authority)
- **Encryption**: HTTPS/TLS, encryption of sensitive data (user coordinates)
- **Rate Limiting**: Prevent abuse, spam reports, or denial of routing requests
- **Audit Logs**: Maintain logs for dispatch history and emergency notifications

---

## 📚 Related Documentation

- [AI Prediction Service](./Services/AIMLService/Readme.md)
- [API Reference](./Services/README.md)
- [Installation Guide](./Installation.md)
