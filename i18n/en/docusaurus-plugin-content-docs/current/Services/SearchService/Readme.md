# 🔍 Search Service

> Urban Search & Data Query Engine - AegisFlow AI Platform.

---

## Purpose

The **Search Service** provides fast, accurate, and flexible search capabilities for all data within the AegisFlow AI system. It supports Full-text Search, advanced filtering, and Geospatial Search:

1. **Urban Entity Search**
   - Quickly search for infrastructure assets: hospitals, schools, fire stations, shelter zones, etc.
   - Query administrative zones, road segments, and network intersections.

2. **Incident & Report Queries**
   - Search for logged incidents based on description keywords, category tags, or locations.
   - Filter crowdsourced citizen reports by status, severity, and timestamps.

3. **Geospatial Search (Spatial Search)**
   - Search for entities within a specific buffer radius (Radius Search).
   - Query entities located within disaster impact boundaries.

---

## Technology Stack

| Component | Technology |
|---|---|
| **Language** | Go 1.21+ (Gin Framework) |
| **Search Engine** | Meilisearch / OpenSearch |
| **Database** | PostgreSQL (Primary Data Source) |
| **Sync Engine** | Apache Kafka / RabbitMQ (Event-driven sync) |
| **API** | RESTful API + GraphQL (Optional) |

---

## Core Features

### 1. Full-text Search
- **Typo Tolerance**: Tolerates minor typos (1-2 characters) when users perform quick searches.
- **Multilingual Support**: Supports Vietnamese character queries (accented and unaccented terms).
- **Highlighting**: Highlights matching keywords in search result snippets.

### 2. Advanced Filtering
- **Categorical Filtering**: Filter by infrastructure type or incident category.
- **Status Filtering**: Filter incidents by current states (e.g. open, in progress, resolved, closed).
- **Temporal Filtering**: Query historical logs within specific time frames (e.g. flooding events from last month).

### 3. Geospatial Search
- **Radius Search**: e.g., "Find all medical facilities within 2km of the flooded intersection."
- **Bounding Box**: Retrieve entities located within the active map viewport coordinates.
- **Distance Sorting**: Sort and prioritize results closest to the user's GPS coordinates.

---

## Data Synchronization

The Search Service does not store primary database records, acting instead as an Indexing Layer:

1. **Real-time Sync**: Consumes event topics from Kafka when new incidents are created or infrastructure states update in the [GIS & Map Service](../DigitalTwinService/Readme.md).
2. **Batch Indexing**: Periodically reconciles search indices with PostgreSQL records to ensure data integrity.
3. **CDC (Change Data Capture)**: Utilizes Debezium or similar capture tools to track changes in the main database.

---

## System Integration

- **Dashboard**: Drives the primary search bar on the operations dashboard map.
- **[Incident Service](../IncidentService/Readme.md)**: Helps rescue operators quickly identify nearby incidents or resources.
- **[GIS & Map Service](../DigitalTwinService/Readme.md)**: Indexes geographic entities to enable quick spatial queries.
- **Mobile App**: Helps citizens find closest safe shelters or relief stations.

---

## API Endpoints (Examples)

### General Entity Search
```bash
GET /api/search?q=hospital&type=infrastructure&limit=10
```

### Spatial Radius Search
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

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Smart search, rapid response.**_
