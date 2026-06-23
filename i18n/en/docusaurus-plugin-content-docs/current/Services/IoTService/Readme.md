# 📡 IoT Service

> Sensor Data Ingestion & Monitoring - AegisFlow AI Platform.

## 📋 Overview

**Programming Language:** Node.js + TimescaleDB + MQTT + Redis  
**Database:** TimescaleDB (`iot_db`)  
**Status:** 🟡 Under Development

The IoT service manages connections, ingests telemetry, and monitors IoT devices in the AegisFlow system, including environmental sensors, traffic cameras, and other smart devices.

---

## 🎯 Core Features

### 📡 Sensor Data Ingestion

- **MQTT Protocol Support**
  - Publish/subscribe topics.
  - QoS levels (0, 1, 2).
  - Retained messages.
  - Last Will and Testament messages.

- **HTTP REST API**
  - POST endpoints for data ingestion.
  - Bulk upload endpoints.
  - Webhook callbacks.
  - API Authentication.

- **Real-Time Data Ingestion**
  - Telemetry streaming.
  - Low latency.
  - High throughput.
  - Buffer and queuing management.

- **Batch Ingestion**
  - Bulk insertions.
  - Batch parsing.
  - Scheduled import jobs.
  - Data validation.

### 📊 Time Series Data

- **TimescaleDB for Efficient Storage**
  - Hypertables optimized for time-series inputs.
  - Automatic table partitioning.
  - Data compression.
  - Data retention policies.

- **Data Aggregation Rollups**
  - **1 Minute**: Real-time monitoring metrics.
  - **5 Minutes**: Short-term analysis.
  - **1 Hour**: Long-term trend analysis.
  - **1 Day**: Historical charts.

- **Historical Querying**
  - Period-based range queries.
  - Aggregate functions (AVG, MIN, MAX, SUM).
  - Downsampling.
  - Gap-filling interpolation.

- **Data Retention Policies**
  - Raw telemetry: 30 days.
  - 1-minute aggregations: 90 days.
  - 1-hour aggregations: 1 year.
  - Daily rollups: Permanent.

### 🔔 Threshold Alerting

- **Configurable Thresholds**
  - Upper/lower bounds.
  - Dynamic adaptive thresholds.
  - Multi-condition thresholds.
  - Sensor-specific custom configs.

- **Rule Engine**
  - Flexible rule evaluations.
  - Complex boolean conditions.
  - Time-windowed rules.
  - Correlated multi-sensor alerts.

- **Multi-Level Warnings**
  - Warnings.
  - Critical alerts.
  - Emergency triggers.
  - Escalation rules.

- **Event Publishing via RabbitMQ**
  - Publish alert events to message brokers.
  - Integration with NotificationService.
  - Deduplication of warning notifications.
  - Alert correlation.

### 🎛️ Sensor Management

- **Provisioning & Management**
  - Device provisioning tokens.
  - Automatic device discovery.
  - Bulk registration sheets.
  - Decommissioning workflows.

- **Sensor Metadata**
  - Device specs (model, manufacturer).
  - Physical coordinates (GPS coordinates).
  - Installation date log.
  - Owner/operator details.

- **Health Monitoring**
  - Online/offline status detection.
  - Last-seen timestamp logging.
  - Battery charge levels.
  - Signal strength (RSSI).
  - Telemetry error rates.

- **Calibration Tracking**
  - Calibration calendars.
  - Historical calibration logs.
  - Sensor drift detection.
  - Maintenance prompts.

---

## 🔌 Supported Sensor Types

### 🌊 Water Level Sensors
- Measure river and reservoir depths.
- Flood occurrence detection.
- High water level alarms.
- Integrates with FloodEyeService.

### 💨 Air Quality Sensors
- PM2.5, PM10 indexes.
- CO, CO2, NO2 levels.
- Temperature and relative humidity.
- AQI calculation.

### 📹 Traffic Cameras
- Traffic congestion detection.
- Vehicle counting metrics.
- License plate recognition.
- Traffic violation alerts.

### 🌦️ Weather Stations
- Temperature and humidity.
- Precipitation volume tracking.
- Wind speed and direction.
- Barometric pressure.

### 🌊 Inundation Detectors
- Real-time flooding water level depth.
- Flow rate index.
- Early hazard warnings.
- Flood prediction inputs.

---

## 🔗 Integrations

This service integrates with:

- **MQTT Broker (Mosquitto)**: Ingests raw sensor streams.
- **FloodEyeService**: Delivers water level indicators.
- **AnalyticsService**: Registers long-term analytics logs.
- **NotificationService**: Triggers warning notifications on threshold breaches.
- **IncidentService**: Automatically registers emergency incidents when thresholds are breached.
- **Orion-LD**: Synchronizes entity models conforming to the NGSI-LD standard.

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Connecting devices, enabling smart cities.**_
