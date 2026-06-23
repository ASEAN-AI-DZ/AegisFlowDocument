# 📷 Media Service

> Media Asset Management & Processing - AegisFlow AI Platform.

---

## Purpose

The **Media Service** serves as the central storage repository and processing module for all image, video, and audio assets in the AegisFlow AI ecosystem:

1. **Traffic Camera Feed Management**
   - Ingest RTMP/HLS streams from city cameras.
   - Deliver live streaming feeds to the Operations Dashboard.
   - Extract video frame snapshots for AI traffic and hazard analysis.

2. **Incident Evidence Storage**
   - Store images and video attachments uploaded via citizen incident reports.
   - Manage media attachments linked to [Incident Service](../IncidentService/Readme.md) records.
   - Guarantee the integrity and access security of uploaded assets.

3. **Asset Optimization & Delivery**
   - Automate image compression and thumbnail resizing to optimize bandwidth on mobile applications.
   - Transcode video uploads to standard formats compatible with web and mobile clients.
   - Enforce low-latency media distribution utilizing CDNs.

---

## Technology Stack

| Component | Technology |
|---|---|
| **Runtime** | Node.js (TypeScript) |
| **Framework** | NestJS / Express.js |
| **Processing** | FFmpeg, Sharp (Image Processing) |
| **Storage** | AWS S3, MinIO (On-premise) |
| **Database** | PostgreSQL (Metadata) |
| **Streaming** | Nginx-RTMP, HLS.js |

---

## Core Features

### 1. Ingestion & Media Processing
- **Images**: Automate thumbnail generation, size optimization, support for WebP, JPEG, PNG.
- **Videos**: Transcode to HLS/DASH, generate preview clips, parse metadata tags.
- **Audio**: Store and stream voice notes linked to citizen incident reports.

### 2. Streaming & Playback
- **Live Streams**: Support simultaneous stream playback for thousands of city cameras.
- **Video on Demand (VOD)**: Playback archived clips from recorded incident events.
- **Adaptive Bitrate**: Dynamically adjust stream quality based on client network bandwidth.

### 3. Storage & Security
- **Versioning**: Store multiple historical revisions of the same asset file.
- **Access Control**: Enforce authorization checks; restrict sensitive video access to permitted operators.
- **Retention Policies**: Automate media archival (e.g. Glacier migration) or deletion schedules.

---

## System Integration

The Media service integrates closely with:

- **[Incident Service](../IncidentService/Readme.md)**: Stores visual verification assets for reported incidents.
- **[FloodEye Service](../FloodEyeService/Readme.md)**: Supplies video frame feeds to the AI flood detection models.
- **[IoTService](../IoTService/Readme.md)**: Synchronizes metadata profiles of camera devices.
- **Dashboard**: Displays live camera streams on interactive map layers.

---

## API Endpoints (Examples)

### Upload Media
```bash
POST /api/media/upload
Content-Type: multipart/form-data
-F "file=@incident_photo.jpg"
-F "type=incident"
-F "entityId=INC-123"
```

### Get Stream URL
```bash
GET /api/media/streams/{cameraId}

Response:
{
  "streamUrl": "https://cdn.aegisflow.ai/live/camera_01/index.m3u8",
  "status": "online",
  "viewerCount": 12
}
```

---

## Deployment

### Docker
```bash
docker-compose up -d media-service
```

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Transparent visuals, building safer cities.**_
