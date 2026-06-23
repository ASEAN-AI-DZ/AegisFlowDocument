# 🎮 Simulation & What-If Service

> Scenario Simulation Tool - Test infrastructure decisions in AegisFlow AI's virtual environment.

---

## Purpose

The **Simulation & What-If Service** allows planners and urban managers to test hundreds of different scenarios before actual deployment on the AegisFlow AI platform:

1. **What-If Scenario Simulation**
   - Design new roads, bridges, and detours.
   - Adjust traffic intersections and signal timings.
   - Model the impact of new public facilities (hospitals, schools, shelter zones).
   - Alter traffic routing and zone division policies.

2. **Multidimensional Impact Forecasting**
   - 📈 **Socioeconomic**: Forecast regional GDP changes, employment growth, and accessibility indexes.
   - 🌤️ **Environmental**: Estimate emission levels, air quality index changes, and new flooding risk boundaries.
   - 👥 **Social**: Equity scores, healthcare accessibility index, and education coverage rating.
   - 🚗 **Traffic**: Assess reduction in traffic congestion, travel times, and routing safety metrics.

3. **Scenario Comparison (A/B Testing)**
   - Visually compare different planning options.
   - Evaluate comparative Impact Scores.
   - Inform optimal decision-making backed by simulated evidence.

---

## Technology Stack

| Component | Technology |
|---|---|
| **Simulation Core** | Python (Mesa ABM, NetworkX) |
| **API Framework** | Python FastAPI |
| **Parallel Computing** | Ray (Distributed Computing) |
| **Database** | PostgreSQL + PostGIS, MongoDB (Metadata), ClickHouse (Analytics) |
| **Message Queue** | Apache Kafka |
| **AI Integration** | Amazon Nova (Impact Assessment) |

---

## Simulation Workflow

```
1. Initialize Scenario
   └── Drag & drop mock infrastructure on AegisFlow map
   └── Setup baseline parameters (budget, timeline, objectives)

2. Clone GIS & Map State
   └── Take a baseline spatial snapshot of the city state from the GIS database

3. Apply Scenario Changes
   └── Modify network graph topology (Network Graph)
   └── Add/update mock infrastructure attributes

4. Run Agent-Based Model (ABM) Simulation
   └── Simulate navigation of millions of agents (citizens)
   └── Evaluate agent interactions with the newly modified infrastructure

5. AI Impact Analysis
   └── Run contextual impact analysis with Amazon Nova
   └── Extract structured socioeconomic and environmental indices

6. Compile Report & Impact Score
   └── Compute composite Impact Score (0–100)
   └── Generate Radar Charts and trend timelines
   └── Generate natural language explanation of outcomes (AI Generated)

7. Persist & Share
   └── Save simulation parameters and results for cross-comparison
   └── Export PDF reports for stakeholders
```

---

## API Endpoints

### Scenario Management

```bash
# Create new scenario
POST /api/scenarios
{
  "name": "Renovation of Intersection A",
  "changes": [
    { "type": "new_road", "geometry": "..." }
  ]
}

# Fetch simulation results
GET /api/scenarios/{id}/results
```

### Execution

```bash
# Trigger simulation run
POST /api/scenarios/{id}/simulate

Response:
{
  "status": "processing",
  "eta_seconds": 180,
  "simulation_id": "sim_987"
}
```

---

## Dashboard Analytics & Backend

Beyond scenario simulation, this service provides deep analytics APIs powering the AegisFlow AI dashboard.

### Multidimensional Data Aggregation

- **Time Series Analysis**: Consolidates historical flood water levels and traffic density reports by hour/day/month.
- **Anomaly Detection**: Automatically identifies faulty IoT sensor data patterns.
- **District Analytics**: Compare responder dispatch metrics and flood resolution times across different administrative districts.

### Reporting

- **Operational Health Report**: Overview of real-time urban vitals.
- **SLA Performance Reports**: Measure crisis response speeds and dispatch efficiency ratings.
- **GIS Heatmaps**: Layer spatial risk vectors representing cumulative flooding reports.

---

## System Integration

The Simulation & Analytics service integrates closely with:

- **GIS & Map Service**: Pulls spatial baseline layouts (Baseline State).
- **AI Prediction Service**: Integrates machine learning flood forecasts into simulation parameters.
- **IoT Service**: Streams live sensors telemetry via **Kafka** to calibrate simulation agents.
- **Notification Service**: Triggers operational report dispatches and alerts when simulations finish.

---

## Deployment

Packaged as a Docker container, this service can scale horizontally utilizing a Ray Cluster to compute complex multi-agent simulations.

```bash
docker-compose up -d simulation-service
```

---

## Data Structure (ClickHouse Events Schema)

### Events Table

```sql
CREATE TABLE events (
    event_id UUID,
    event_type String,
    timestamp DateTime,
    user_id UInt64,
    entity_id UInt64,
    entity_type String,
    metadata String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (timestamp, event_type);
```

### Materialized Report View

```sql
CREATE MATERIALIZED VIEW reports_daily AS
SELECT
    toDate(created_at) as date,
    category,
    status,
    count() as total_reports,
    avg(resolution_time) as avg_resolution_time
FROM reports
GROUP BY date, category, status;
```

---

## License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Data-driven decisions, building resilient cities.**_
