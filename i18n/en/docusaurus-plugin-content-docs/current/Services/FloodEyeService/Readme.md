# 🌊 FloodEye Service

> AI-Powered Flood Detection - AegisFlow AI Platform.

## 📋 Overview

**Programming Language:** Python 3.11 + FastAPI + PostGIS  
**Database:** PostgreSQL with PostGIS (`floodeye_db`)  
**Status:** 🟡 Under Development

The FloodEye service utilizes artificial intelligence to detect and analyze flooding from image feeds, correlating it with geospatial data to deliver early warnings and support disaster response operations.

---

## 🎯 Core Features

### 🌊 Flood Detection

- **AI-Powered Image Analysis**
  - Deep learning models (CNN).
  - Transfer learning (ResNet, EfficientNet).
  - Custom trained models.
  - Real-time inference.

- **Water Level Detection**
  - Water surface recognition.
  - Depth estimation.
  - Baseline comparison.
  - Tracking water level changes.

- **Flood Severity Classification**
  - **Level 1 (Low)**: Minor flooding, no immediate danger.
  - **Level 2 (Medium)**: Moderate flooding, monitoring required.
  - **Level 3 (High)**: Heavy flooding, hazardous.
  - **Level 4 (Critical)**: Severe flooding, emergency status.

- **Confidence Scoring**
  - Confidence score output (0–100%).
  - Model uncertainty estimation.
  - Multi-model ensemble.
  - Ground truth validation.

### 📸 Image Processing

- **Image Preprocessing**
  - Resizing and normalization.
  - Color correction.
  - Noise reduction.
  - Image enhancement.

- **Feature Extraction**
  - Feature extraction mapping.
  - Edge detection.
  - Texture analysis.
  - Pattern recognition.

- **Model Inference**
  - Model inference execution.
  - GPU acceleration.
  - Batch processing.
  - Caching results.

- **Batch Processing**
  - Batch image processing pipeline.
  - Queue management.
  - Parallel processing.
  - Progress tracking.

### 🗺️ Geospatial Analysis

- **Flood Mapping**
  - Flood extent mapping.
  - Inundation areas extraction.
  - Water depth visualization.
  - Time-series animations.

- **Affected Area Calculation**
  - Affected area calculation.
  - Population at risk.
  - Infrastructure impact.
  - Economic loss estimation.

- **Risk Zones Identification**
  - Risk zones identification.
  - Evacuation route calculations.
  - Safe zones mapping.
  - Emergency shelters locations.

- **Historical Flood Logs**
  - Historical flood data logs.
  - Flood frequency analysis.
  - Return period estimation.
  - Trend analysis.

### 🔔 Warning System

- **Automatic Alert Generation**
  - Automatic alert generation.
  - Multi-level warning levels.
  - Escalation rules.
  - Alert distribution.

- **Risk Level Notifications**
  - Risk level notification dispatches.
  - Affected population statistics.
  - Recommended safety actions.
  - Real-time updates.

- **NotificationService Integration**
  - Push notifications.
  - SMS alerts.
  - Email warnings.
  - In-app alerts.

- **Early Warning Systems**
  - Early warning triggers.
  - Predictive alerts.
  - Lead time optimization.
  - False alarm reduction.

---

## 🔗 Integrations

This service integrates with:

- **MediaService**: Ingests images for AI analysis.
- **IoTService**: Consumes water level sensor telemetry.
- **IncidentService**: Automatically registers incidents when flooding is detected.
- **NotificationService**: Distributes flood warning alerts.
- **AnalyticsService**: Logs historical analytics data.
- **AIMLService**: Shares model architectures and compute infrastructure.

---

## 📊 Input Data

### Image Inputs

- **Sources**: Traffic cameras, drones, satellites, citizen uploads.
- **Formats**: JPEG, PNG.
- **Resolution**: Minimum 224x224.
- **Quality**: Clear, unblurred image frames.

### Sensor Data Inputs

- Real-time water levels.
- Precipitation records.
- Elevation and terrain parameters.
- Historical data.

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Intelligent monitoring, rapid response.**_
