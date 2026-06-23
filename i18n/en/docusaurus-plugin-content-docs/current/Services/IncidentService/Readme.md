# 🚨 Incident Service

> Incident Management & Rescue Dispatch - AegisFlow AI Platform.

## 📋 Overview

**Programming Language:** Node.js + PostgreSQL + Redis + RabbitMQ  
**Database:** PostgreSQL (`incident_db`)  
**Status:** 🟡 Under Development

The Incident service manages the entire lifecycle of incidents within the AegisFlow AI platform, from creation, assignment, handling, to completion, featuring advanced automation and workflow optimization.

---

## 🎯 Core Features

### 🚨 Incident Management

- **Create, Update, Track Incidents**
  - Create incidents from citizen reports.
  - Automate incident registration from AI/IoT alerts.
  - Update active incident data.
  - Monitor resolution progress.

- **Severity Levels**
  - **Low**: Minor incidents, non-urgent.
  - **Medium**: Resolvable within the day.
  - **High**: High priority, requiring rapid response.
  - **Critical**: Emergency status, immediate danger.

- **Priority Queue Management**
  - Sort queue based on severity rating.
  - Calculate queue wait times.
  - Enforce SLA breach warnings.
  - Automatic escalation triggers.

- **SLA Tracking**
  - First response times.
  - Resolution times.
  - On-time completion rates.
  - SLA breach reports.

### 🎯 Automated Assignment

- **Closest Agency Algorithm**
  - Calculate geospatial distances.
  - Select closest available agency.
  - Evaluate administrative boundaries.
  - Optimize travel times.

- **Load Balancing**
  - Distribute workloads evenly.
  - Prevent over-allocating individual agencies.
  - Monitor active responder workloads.
  - Dynamic workload adjustments.

- **Skill-Based Routing**
  - Dispatch based on technical expertise.
  - Match incident types with specialized units.
  - Consider unit experience.
  - Optimize handling outcomes.

- **Availability Verification**
  - Online/offline status checks.
  - Count of actively assigned incidents.
  - Active shifts check.
  - Dispatch capacity limits.

### 📊 Lifecycle State Management

- **Controlled Transitions**
  - Standardized transition workflow.
  - Transition validation rules.
  - Prevent forbidden status regressions.
  - Maintain historical status transition logs.

- **Approval Workflow**
  - Supervisor approval before closing incidents.
  - Completion confirmation.
  - Performance rating surveys.
  - Citizen feedback collection.

- **Escalation Rules**
  - Automatic escalation on SLA breaches.
  - Dispatch alerts to coordinators.
  - Reassign to higher units.
  - Log operational failures.

- **Audit Logging**
  - Track every modification.
  - Identity and timestamp tags.
  - Rationale for edits.
  - Complete historical tracing.

### 📍 Geospatial Features

- **Location-Based Dispatch**
  - Run distance calculation logic.
  - Select closest responders.
  - Match with administrative zone maps.
  - Optimize routes.

- **Distance Computations**
  - Haversine distance computations.
  - Real-world route distances.
  - Estimate travel times.
  - Consider congestion.

- **Coverage Mapping**
  - Define agency boundaries.
  - Map active responder coverage areas.
  - Detect gaps and overlaps.
  - Optimize resource allocation.

- **Historical Spatial Logs**
  - Map historical incident distribution.
  - Identify incident hot spots.
  - Forecast upcoming risk points.
  - Heatmap visualizer feeds.

---

## 🔄 Incident Status Workflow

```
New
 ↓
Accepted
 ↓
In Progress ←→ Suspended
 ↓
Resolved
 ↓
Closed
```

---

## 📋 Incident Types

| Type | Description | Severity | SLA |
|---|---|---|---|
| 🔥 **Fire** | Structure fires, brush fires | Critical | < 15 mins |
| 🌊 **Flooding** | Heavy flooding, waterlogging | High | < 30 mins |
| 🚗 **Traffic** | Accidents, severe congestion | High | < 20 mins |
| ⚡ **Utilities** | Power cuts, broken mains | Medium | < 1 hour |
| 🏗️ **Infrastructure** | Damaged roads, collapsed bridges | Medium | < 2 hours |
| 🌳 **Environment** | Pollutants, fallen trees | Low | < 4 hours |
| 🗑️ **Waste** | Litter buildup, hygiene hazards | Low | < 8 hours |

---

## 🔗 Integrations

This service integrates with:

- **CoreAPI**: Receives citizen reports and registers incidents.
- **NotificationService**: Sends alerts to responders and citizens.
- **AIMLService**: Classifies incident severity and predicts expansion.
- **AnalyticsService**: Logs historical incident telemetry.
- **MediaService**: Stores images/videos uploaded for validation.
- **SearchService**: Enforces fast incident queries and maps.
- **FloodEyeService**: Automatically logs incidents upon visual flood detection.
- **IoTService**: Consumes sensor telemetry alerts.

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Effective management, safer cities.**_
