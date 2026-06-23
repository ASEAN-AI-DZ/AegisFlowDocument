# 🚨 Emergency Response & Notification Service

> Emergency Alert & Routing Guidance System - Timely response to urban incidents.

---

## Purpose

The **Notification & Emergency Response Service** of AegisFlow AI provides:

1. **Emergency Alerts**
   - Flooding: "⚠️ Flooding alert in District 1 - Evacuate within 1 hour"
   - Accidents: "🚗 Major accident on Le Loi St - Use alternative routes"
   - Air Quality: "🌫️ Poor air quality (AQI 165) - Stay indoors"

2. **Routing Guidance**
   - Calculate the fastest route for ambulances and fire trucks.
   - Suggest safe detours for citizen evacuation.
   - Predict travel times (ETA).

3. **Multi-Channel Distribution**
   - 📱 Push notifications (mobile app).
   - 📧 Email.
   - 💬 SMS.
   - 📻 Radio/Siren broadcasting (via external integrations).
   - 🌐 Web interface alerts.

4. **Targeted Priorities**
   - 👥 Citizens (evacuation alerts).
   - 🚑 Emergency Response Teams (route guidance).
   - 🏛️ Local Authorities (incident situation reports).

---

## Technology Stack

| Component | Technology |
|---|---|
| **Framework** | Node.js + Express.js |
| **Database** | MongoDB (notification history), PostgreSQL (user preferences) |
| **Message Queue** | Apache Kafka, RabbitMQ |
| **Push** | Firebase Cloud Messaging (FCM) |
| **Email** | SendGrid / AWS SES |
| **SMS** | Twilio, Viettel, Vinaphone |
| **Real-time** | Socket.io, WebSocket |
| **Logging** | ELK Stack (Elasticsearch, Logstash, Kibana) |

---

## Emergency Response Workflow

```
1. Incident Detected
   └── Prediction Service trigger or Citizen Report validation

2. Emergency Response Service Triggered
   └── Classify incident type (flooding, accident, pollution, etc.)
   └── Pinpoint affected geographic zones

3. AI-Powered Route Calculation
   └── Calculate fastest route for rescue units
   └── Predict travel times (ETA)

4. Notification Generation
   └── Compose localized messages tailored for each recipient group
   └── Support multilingual templates (Vietnamese, English, etc.)

5. Multi-channel Distribution
   └── Prioritize delivery channels (Push > SMS > Email)
   └── Track delivery and receipt status

6. Feedback Loop
   └── Track user acknowledgment (ACK)
   └── Dispatch follow-up reminders if necessary
```

---

## API Endpoints

### Broadcast Alerts

```bash
# Broadcast city-wide or zone-specific alert
POST /api/emergency/broadcast-alert
{
  "type": "flooding|accident|pollution|earthquake",
  "severity": "low|medium|high|critical",
  "affectedZones": ["zone_1", "zone_2"],
  "message": "Flooding alert - Evacuate immediately",
  "recommendedActions": ["evacuate", "use_alternative_routes"],
  "timeframe": "immediate|1hour|6hours"
}

Response:
{
  "alertId": "alert_...",
  "status": "broadcasting",
  "recipients": 150000,      // Estimated count
  "channels": {
    "push": 120000,
    "sms": 20000,
    "email": 10000
  }
}
```

### Emergency Route Calculation

```bash
# Find fastest route for responders
POST /api/emergency/fastest-route
{
  "vehicleType": "ambulance|fire_truck|police",
  "fromLocation": { "lat": 16.04, "lon": 108.21 },  // Origin
  "toLocation": { "lat": 16.08, "lon": 108.20 },    // Destination
  "avoidAreas": ["zone_flooded_1", "zone_flooded_2"]
}

Response:
{
  "routes": [
    {
      "routeId": "route_best",
      "distance": 8.2,           // km
      "duration": 340,           // seconds
      "eta": "2026-03-31T11:15:00Z",
      "waypoints": [{lat, lon}, ...],
      "hazards": ["heavy_traffic_on_hospital_road"],
      "instructions": [
        "Turn right on Nguyen Trai",
        "Use HOV lane on bypass",
        "Turn left on Hospital Way"
      ]
    }
  ]
}
```

### Evacuation Guidance

```bash
# Get safe evacuation detours and shelters
POST /api/emergency/evacuation-guidance
{
  "affectedZones": ["zone_flooded"],
  "populationDensity": "high"
}

Response:
{
  "evacuationRoutes": [
    {
      "routeId": "evac_route_1",
      "capacity": 5000,          // People/hour capacity
      "safetyLevel": "safe",
      "destination": "Higher ground in District 2",
      "distance": 3.5,
      "instructions": "..."
    }
  ],
  "shelters": [
    {
      "name": "School A",
      "location": { "lat": 16.10, "lon": 108.22 },
      "capacity": 2000,
      "current_occupancy": 500,
      "supplies": ["water", "food", "medical"]
    }
  ]
}
```

### Notification Preferences

```bash
# Update user notification channels and quiet hours
PATCH /api/users/{userId}/notification-preferences
{
  "alertTypes": {
    "flooding": true,
    "accident": true,
    "pollution": true
  },
  "channels": {
    "push": true,
    "sms": false,
    "email": true
  },
  "quietHours": {
    "start": "22:00",
    "end": "07:00",
    "allowCriticalOnly": true
  }
}
```

---

## Message Templates

### Flooding Alert (Template)

```
Title:
⚠️ Flooding Alert - {{zone_name}}

Content:
Flooding is forecast to occur within the next {{timeframe}} hours.
Zone {{zone_name}} will be affected.

Recommended Action:
- {{recommended_actions}}

Safe Evacuation Route:
{{safe_routes}}

Details: {{app_link}}
```

### Traffic Incident (Template)

```
Title:
🚨 Traffic Incident - {{location}}

Content:
A traffic incident has occurred at {{location}}.
Congestion is building. Please avoid this area.

Alternative Detour:
{{alternative_routes}}

Estimated travel delay: {{eta}} minutes

Details: {{app_link}}
```

---

## Delivery Strategies

### Multi-channel Prioritization

```
Scenario 1: Flooding (Slow onset, large area)
├── All users in zone: PUSH (High priority)
├── After 10 min: SMS (if no client ACK received)
└── After 30 min: Email

Scenario 2: Traffic Incident (Fast onset, small area)
├── Drivers in proximity: PUSH + SMS (Immediate delivery)
├── Surrounding zone users: PUSH only
└── Follow-up: Re-route suggestions refreshed every 5 min
```

### Retry Logic

```
1st attempt: Immediately
2nd attempt: +5 minutes (if no ACK received)
3rd attempt: +15 minutes
4th attempt: +1 hour (final attempt)
```

---

## Performance Metrics

| Metric | Target |
|---|---|
| Push notification latency | < 3 seconds |
| SMS delivery time | < 30 seconds |
| Broadcast dispatch to 100k users | < 30 seconds |
| Message acknowledgment (ACK) rate | > 60% |
| False alert rate | < 2% |

---

## Usage Examples

### Triggered by Prediction Service (Flooding Alert)

```typescript
const floodingAlert = await predictionService.getFloodingAlert();
if (floodingAlert.overallRisk === 'CRITICAL') {
  await notificationService.broadcastAlert({
    type: 'flooding',
    severity: 'critical',
    affectedZones: floodingAlert.affectedZones.map(z => z.zoneId),
    message: `Urgent flooding warning in ${affectedZones.join(', ')}`,
    timeframe: 'immediate'
  });
}
```

### Triggered by Incident Service (Emergency Responder Dispatch)

```typescript
const incident = await incidentService.getIncidentDetails(incidentId);
const routes = await notificationService.getEmergencyRoutes({
  vehicleType: 'ambulance',
  fromLocation: incident.location,
  toLocation: nearestHospital.location
});

await notificationService.sendDirectAlert({
  recipientType: 'emergency_teams',
  message: `Emergency dispatch for accident at ${incident.location}`,
  routes: routes,
  priority: 'critical'
});
```

---

## Advanced Subsystems

### 📧 Email Subsystem
- **Template engine**: Handle HTML/CSS emails with variables replacement.
- **SMTP configuration**: Support multiple SMTP relays with TLS/SSL encryption.
- **Queue management**: Redis-backed queues for rate-limited bulk email batches.

### 💬 SMS Gateway Integration
- **Gateways**: Enforce Twilio integration and local VNPT/Viettel gateways.
- **Failover**: Automatic gateway switching upon failed delivery attempts.
- **Tracking**: Track status reports (sent, delivered, failed) and cost analysis logs.

### 🔔 Live In-App Alerts
- WebSocket connections maintain instant two-way message updates.
- Offline queuing caches notifications for disconnected clients.
- Read/unread status syncing with real-time badge updates.

---

## 📬 Notification Types

| Type | Channels | Priority | Description |
|---|---|---|---|
| 🚨 **Emergency** | Push, SMS, Email | High | Critical hazard warnings and evacuation orders |
| 📢 **Warning** | Push, Email | Medium | Non-life-threatening major updates |
| ℹ️ **Informational**| Push, In-app | Low | General public information announcements |
| 💬 **Interactive**  | Push, In-app | Medium | Comments, replies, and citizen reports approvals |
| 🏆 **Rewards** | Push, In-app | Low | Reward points (CityPoint) accruals or redemptions |
| 📊 **Reports** | Email | Low | Periodic dashboard analysis reports |

---

## 🔗 Integrations

This service integrates with:

- **CoreAPI**: Dispatch notifications via the primary API gateway.
- **RabbitMQ/Kafka**: Consume warning events published by other microservices.
- **IncidentService**: Alerts responders when incidents are registered or escalated.
- **FloodEyeService**: Distributes warnings on visual flood detection.
- **IoTService**: Triggers notifications when sensor threshold ranges are breached.
- **MediaService**: Resolves thumbnails and media attachment URLs.

---

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN npm install -g pm2
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3005
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

### Environment Variables

```env
MONGODB_URL=mongodb://mongo:27017/notifications
KAFKA_BROKERS=kafka:9092
FCM_API_KEY=...
SENDGRID_API_KEY=...
TWILIO_AUTH_TOKEN=...
```

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Timely alerts, protecting communities.**_
