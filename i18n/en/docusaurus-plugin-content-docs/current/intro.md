# 🌊 AegisFlow AI — GIS & Map & AI Platform for Smart Urban Management

<div align="center">
  <a href="https://aegis-flow-ai.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Website-AegisFlow_AI-00C853?style=for-the-badge" alt="Demo System"/>
  </a>
  <br/>

  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](/License)

  <br/>
</div>

![Banner](@site/static/img/Banner1.png)

> _"From reactive response to proactive prediction — AI is the shield protecting the community from natural disasters"_

**AegisFlow AI** is an advanced platform integrating **Geographic Information Systems (GIS)** and **AI (Artificial Intelligence)**, designed to transform urban flood management and response from reactive to predictive and proactive. The system models the entire transportation network as a dynamic network graph, integrating real-time data from water level sensors, weather data, and citizen reports to support fast, safe evacuation and precise rescue distribution.

---

## 📋 Urban Reality

### Context

Under the context of rapid urbanization and climate change in major cities across the country, traditional natural disaster response systems are facing severe challenges.

**Current Situation:**

- Extreme heavy rain and high tides cause frequent flooding, paralyzing urban traffic.
- Key arterial roads are unexpectedly cut off, posing danger to citizens and delaying ambulances and fire engines during critical life-or-death moments.
- Most current systems only focus on monitoring and recording (monitoring) incidents after they have occurred, lacking the ability to forecast early (prediction) flood levels and warn about safe routes.
- Response times are slow, coordinating rescue forces is suboptimal, and disaster management committees lack timely decision-support tools.

---

## 🎯 Project Objectives

### Short-term Goals

1. **Build a comprehensive real-time interactive map** updating the flood situation across the urban area.
2. **Deploy early AI prediction:**
   - Flood black spots based on terrain data, rainfall history, and pumping stations.
   - Environmental risks based on weather data + IoT sensors.
3. **Support routing:** Automatically exclude deep flood segments and search for the safest detour route before citizens travel.
4. **Decision Support Dashboard:** Provide an intuitive interface for authorities to deploy rescue resources.

### Long-term Goals

- Deeply integrate into Smart City operation centers and National Disaster Prevention and Control centers, becoming a core platform supporting operations during the rainy and stormy season.
- Expand applications to other natural disaster forecasting areas, including: landslide alerts, infrastructure risk assessment, and sustainable urban planning resilient to climate change.

---

## 💡 Solution – AegisFlow AI

**AegisFlow AI** is the answer. It is a comprehensive platform combining **Geospatial Data (GIS & Map)** with **AI**, acting as a **"digital shield"** of the city during disasters. Every road and every intersection has its risk levels synchronized in real-time. By understanding the "breath" of weather and terrain, we shift from **reporting damage** to **predicting flood levels** and **protecting lives**.

---

## 🔬 What is a Dynamic Analysis & Prediction System?

### Definition

Unlike static map systems, **AegisFlow AI** operates a **Dynamic Spatial Model**. This is a live data layer overlaid on the physical map of the city to assess the interaction between infrastructure and rainfall.

**This system is NOT:**

- ❌ A generic weather forecasting application.
- ❌ A standard traffic update bulletin like Google Maps (which often still suggests the shortest path even if it is deeply flooded).

**The AegisFlow dynamic prediction system IS:**

- ✅ A **connected network**, constantly updated with flood points in real-time.
- ✅ Integrated multi-stream data: weather APIs, water level sensors, and crowdsourced citizen reports.
- ✅ An **accurate reflection** of road availability and safety.
- ✅ **Two-way:** The community reports flooding → AI maps the risk areas; AI computes routes → Rescue teams reach the scene fastest.

### Core Capabilities

1. **Alerting:** Projecting high-risk areas hours in advance.
2. **Predicting:** Calculating groundwater levels and localized rising flow rates.
3. **Optimizing:** Finding the safest evacuation routes, keeping away from "flood sinks".
4. **Centralized Analysis:** Suggesting relief station placement based on isolated population density.

---

## 🌐 How Does AegisFlow AI Work?

### Concept

Imagine using an application like **Waze or Google Maps**, but **specifically designed to survive natural disasters** – a routing engine highly responsive to flooding.

With AegisFlow AI, the entire transportation network is modeled as a **graph network** (Nodes = intersections, Edges = road segments). The weights of these "Edges" change dynamically based on rainfall and flood sensors.

When a historic storm hits, the system does not just display current flood points, but **immediately performs spatial reasoning** for the next **1-3 hours**:

- Where will floodwaters spread and cut off which main roads?
- Which detours (non-flooded) should ambulances and fire trucks take to reach hospitals fastest?
- Which residential areas are about to be completely isolated and need priority rescue boats early?
- What is the optimal allocation plan for emergency supplies to which points?

---

## 👥 Target Audience

![Audience](@site/static/img/doituong.png)

### 👨‍💼 1. Planners & Government Officials

- Forecast the impact of infrastructure projects before implementation.
- Simulate what-if scenarios to optimize decisions.
- Data dashboards for quick, accurate decision-making.

### 👷 2. Traffic Engineers & Urban Specialists

- Detailed analysis of traffic flow and flood risks.
- Simulate the effectiveness of corresponding response measures.
- Optimize traffic infrastructure during crises.

### 🏛️ 3. Community Organizations & NGOs

- All citizens can use the tool to propose projects and feedback.
- Make economic, social, and environmental impacts transparent.

### 📚 4. Researchers & Students

- Access open data for research.
- Model complex urban problems.
- Verify hypotheses in a safe environment.

---

## 🚀 Core Features of AegisFlow AI

![Features](@site/static/img/chucnang.png)

### 1. **Real-time Flood Radar**

- Instantly plot flood point coordinates onto the base map graph.
- Continuously update from crowdsourced user reports and IoT sensors.
- Display flooding severity and warning colors by region cluster.

### 2. **AI Flood Risk/Drainage Prediction**

- **Forecast areas at risk of flooding** in the near future using Machine Learning.
- Analyze correlations between weather API data and low-lying terrain.

### 3. **Rescue Decision Support Dashboard**

- **Vulnerability Score:** Score regional rescue priority (areas with elderly people/flooded hospitals receive higher priority scores).
- Visually track flood report points, numbers of stranded people, and expansion trends.

### 4. **Safe Routing & Evacuation Support**

- When main roads turn into rivers, the AI activates the "Routing Engine" to discard deeply flooded nodes and calculate the **safest route** for motorbikes/cars.
- **Evacuation Guidance:** Suggest nearest high-ground community shelters.
- Directly warn citizens driving near hazard zones.

---

## 📚 Technology Stack

| Component | Technology | Role in System |
| --- | --- | --- |
| **Frontend** | `Leaflet.js` | Displays the interactive map, drawing data overlays such as flood zones, traffic flows, and GIS & Map entities. |
| **Backend** | `Node.js (Express)` | Central hub coordinating APIs, session management, and database connections. |
| **AI Engine** | `Amazon Bedrock` | Provides infrastructure to run large language models and prediction models, supporting scenario analysis and urban resource optimization. |
| **Database** | `PostgreSQL + PostGIS` | Stores and processes complex spatial data, performing geometric operations like intersection checks, buffer creation, and distance calculations. |
| **Real-time** | `WebSockets` | Maintains continuous two-way connections, ensuring IoT sensor data is updated on the map in real-time. |

---

## 🌟 AegisFlow AI vs. Current Systems

| Criteria | ❌ Current Maps & Systems | ✅ AegisFlow AI |
| --- | --- | --- |
| Approach | Only monitors congestion – shows empty roads even if flooded | Route exclusions – Automatically blocks flooded roads and finds detours |
| Response | Reactive – citizens enter flooded areas before knowing | Proactive – forecasts and sends flood-avoiding routes in advance |
| Coordination | Lack of allocation system, rescue based on intuition | Assesses vulnerability, automatically polarizes high-priority areas |
| Data Update | Very slow, waiting for local news articles | Crowdsourcing Realtime + IoT + WebSockets displays immediately |
| Scenario Analysis | None or very limited spatial calculations | Analyzes low points, maps risk boundaries using PostgreSQL (PostGIS) |
| Safety Risk | Dangerous, many vehicles stall or get trapped | Safe – Ensures citizens find safe routes home |

---

## 📖 Key Documentation

- [System Architecture](./Architecture.md) – Learn about the overall design
- [Getting Started](./GettingStarted.md) – Install and run AegisFlow AI
- [Detailed Installation](./Installation.md) – Step-by-step installation instructions
- [Services](./Services/README.md) – Learn about each microservice

---

## 🎯 Conclusion

AegisFlow AI is a comprehensive **GIS Map + AI Prediction** solution for urban flood management and response. The system not only updates real-time alerts but is also capable of searching safe evacuation routes, coordinating rescue, and protecting citizens' lives in extreme weather conditions.

With modern technology and a Microservices architecture, AegisFlow AI brings clear practical value: reducing life safety risks, accelerating emergency response, and supporting tight decision-making.

The project does not just handle today's urgent flooding issues but builds a solid digital defense layer for **Resilient Cities** in Vietnam's future.

**AegisFlow AI – Unblocking flows, protecting lives safely.**

---

## 📞 Contact & Contribution

### Project Contact

- **GitHub Repository:** https://github.com/ASEAN-AI-DZ/AegisFlowAI
- **Contribution:** Fork repository → create feature branch → open Pull Request
- **Bug Reporting:** Create a GitHub Issue with a detailed description and steps to reproduce
- **New Feature Proposals:** Join discussions and improve AI Models

---

## 📄 License

This project is distributed under the **GNU General Public License v3.0**. See the [LICENSE](/License) file for more details.

---

_**Developed with ❤️ towards safe, resilient cities**_
