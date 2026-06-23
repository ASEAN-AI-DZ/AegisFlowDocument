# 🌍 GIS & Map Service

> Core of AegisFlow AI - Real-time spatial urban modeling.

---

## Purpose

The **GIS & Map Service** is the "heart" of the AegisFlow AI platform. It handles:

1. **Urban Network Modeling** - Constructs the city traffic network graph representing:
   - 🛣️ Roads, intersections, administrative zones.
   - 🏢 Critical facilities (hospitals, schools, assembly points, shelters).
   - 📡 IoT sensors, camera hubs.
   - 👥 Population centers, movement matrices.

2. **Real-time Synchronization** - Ingests streams from:
   - 📷 Traffic cameras.
   - 🌡️ IoT sensors (water level indicators, rainfall meters).
   - 🌤️ Live weather APIs.
   - 🚗 Floating vehicle telemetry.
   - 📱 Citizen crowdsourced hazard reports.

3. **Data Access Layer** - Exposes APIs for other services to query:
   - Real-time city status.
   - Timeseries historical data.
   - Geospatial calculations and topological relations (PostGIS).

---

## Technology Stack

| Component | Technology |
|---|---|
| **Language** | Node.js + TypeScript |
| **Framework** | Express.js + Socket.io |
| **Database** | PostgreSQL + PostGIS |
| **Cache** | Redis |
| **Message Queue** | Apache Kafka |
| **Visualization** | GeoJSON + Leaflet |

---

## Data Structures

### Zones (Administrative Regions)
```typescript
{
  id: UUID,
  name: "Hai Chau District",
  geometry: Polygon,        // PostGIS geometry (SRID 4326)
  population: 150000,
  status: "normal|congested|flooded",
  state: {
    congestionLevel: 0-100,
    floodingLevel: 0-100,
    pm25: 45.2,
    temperature: 28.5
  }
}
```

### Roads & Intersections (Graph Edges & Nodes)
```typescript
{
  id: UUID,
  name: "Le Loi Street",
  geometry: LineString,     // PostGIS geometry
  lanes: 4,
  speedLimit: 60,           // km/h
  traffic: {
    flow: 1200,             // vehicles/hour
    avgSpeed: 18,           // km/h
    occupancy: 65           // %
  }
}
```

### Infrastructure (Buildings/Points of Interest)
```typescript
{
  id: UUID,
  name: "Hospital A",
  type: "hospital|school|market|shelter",
  location: Point,          // PostGIS geometry
  capacity: 500,
  status: "operational|closed|limited"
}
```

---

## API Endpoints

### Initial Verification

```bash
# Check service health status
GET /api/digital-twin/health
```

### Real-time State Querying

```bash
# Get current status of a specific zone
GET /api/digital-twin/zones/:zoneId

# Retrieve all zones
GET /api/digital-twin/zones?limit=100

# Query road segment status
GET /api/digital-twin/roads/:roadId

# List critical buildings within a zone
GET /api/digital-twin/infrastructure?type=hospital&zoneId=...
```

### Ingestion & Updates

```bash
# Ingest updated zone metrics (typically from Kafka worker)
POST /api/digital-twin/zones/:zoneId/update
{
  "congestionLevel": 85,
  "floodingLevel": 0,
  "pm25": 45.2
}

# Update real-time road traffic metrics
POST /api/digital-twin/roads/:roadId/traffic
{
  "flow": 1200,
  "avgSpeed": 18,
  "occupancy": 65
}
```

### Historical Logs & Spatial Queries

```bash
# Query historical timeseries values for a zone
GET /api/digital-twin/zones/:zoneId/history?from=2026-03-01&to=2026-03-31

# Query nearest infrastructure from coordinates
GET /api/digital-twin/spatial-query?lat=16.0544&lon=108.2022&radius=500&type=hospital
```

---

## Geospatial Queries (PostGIS)

All spatial relations are processed using PostgreSQL with the PostGIS extension:

```sql
-- Find all hospitals within 500m of an accident coordinate
SELECT * FROM infrastructure 
WHERE type = 'hospital' 
  AND ST_Distance(location, ST_GeomFromText('POINT(16.0544 108.2022)', 4326)) < 500;

-- Calculate total flooded surface area in square meters
SELECT ST_Area(geometry) as flooded_area FROM zones 
WHERE status = 'flooded';
```

---

## Usage Examples

### AI Prediction Service Integration

```typescript
// Query current and historical states to feed ML models
const currentState = await dtService.getZoneState(zoneId);
const history = await dtService.getHistory(zoneId, { days: 7 });

// Run predictions (LSTM / LLM inference)
const predictions = await aiService.predict(currentState, history);
```

### Dashboard View Rendering

```typescript
// Fetch zone polygon arrays to display on map
const zones = await dtService.getAllZones();

// Draw layers on map container
zones.forEach(zone => {
  addPolygonToMap(zone.geometry, zone.status);
});
```

---

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Configurations

```env
DATABASE_URL=postgresql://user:pass@postgres:5432/aegisflow_db
POSTGIS_URL=postgresql://user:pass@postgres:5432/aegisflow_db
REDIS_URL=redis://redis:6379
KAFKA_BROKER=kafka:9092
PORT=3001
```

---

## Performance Monitoring

- **Spatial Indexing**: Monitor ST_Distance / ST_Contains execution times (target < 100ms).
- **Cache Hit Ratio**: Redis cache hit ratio for route graphs (target > 80%).
- **Kafka Consumption Lag**: Telemetry topic lag (target < 5 seconds).

---

## Related Documentation

- [AI Prediction Service](../AIMLService/) – Machine learning prediction details
- [Simulation Service](../AnalyticsService/) – Running what-if planning scenarios
- [Dashboard Service](../README.md) – Displaying GIS layers on maps
