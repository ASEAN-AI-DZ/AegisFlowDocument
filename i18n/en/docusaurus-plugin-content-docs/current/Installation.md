# 📦 AegisFlow AI Installation Guide

> Detailed guide to install and run AegisFlow AI on local machine or server with the entire Microservices ecosystem.

---

## 🔧 System Requirements

### Basic Requirements
- **OS**: Linux, macOS, Windows (WSL2)
- **RAM**: Minimum 16GB (32GB recommended due to running multiple microservices)
- **Disk**: 50GB free space (for DBMS data, AI models, and containers)
- **Internet**: Stable connection to download docker images and AI models.

### Using Docker (Recommended ✅)

| Tech | Version | Note |
|---|---|---|
| **Docker** | 20.10+ | [Download Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | 2.0+ | Bundled with Docker Desktop |
| **Git** | 2.30+ | [Download Git](https://git-scm.com/downloads) |

**Benefits**: No need to manually install Go, Python, PHP, Node.js, PostgreSQL, Redis, MongoDB... Everything is contained in containers!

### If NOT Using Docker

See the detailed instructions in [BUILD_WITHOUT_DOCKER.md](./BUILD_WITHOUT_DOCKER.md)

| Tech | Version | Purpose |
|---|---|---|
| **PHP + Composer** | 8.2+ | Core API Interaction (Laravel) |
| **Node.js + npm/yarn** | 20.0+ | Frontend and Node Microservices |
| **Python** | 3.10+ | AIMLService and AnalyticsService |
| **Go** | 1.21+ | Go Microservices (High performance) |
| **PostgreSQL + PostGIS** | 15.0+ | Primary Database (Geospatial extension) |
| **MongoDB** | 6.0+ | Flexible NoSQL data, ContextBroker ecosystem |
| **Redis** | 7.0+ | Caching, session & pub/sub broker |

---

## 🚀 Quick Setup with Docker (5 minutes)

### Step 1: Clone Repository

```bash
git clone https://github.com/ASEAN-AI-DZ/AegisFlowAI.git
cd AegisFlowAI
```

### Step 2: Create Global .env File

```bash
cp .env.example .env
```

**Edit `.env` (particularly database & credentials lines):**

```env
# Database Credentials
POSTGRES_DB=aegisflow_db
POSTGRES_USER=aegis_user
POSTGRES_PASSWORD=aegis_pass

MONGO_INITDB_ROOT_USERNAME=mongo_admin
MONGO_INITDB_ROOT_PASSWORD=mongo_pass

# Redis
REDIS_PASSWORD=your_redis_pass

# App / API Configurations
APP_KEY=base64:your_generated_app_key
JWT_SECRET=your_jwt_secret

# AWS / AI Integrations (if using cloud provider or bedrock/lambda)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

# Mapbox Token for Frontend
MAPBOX_TOKEN=your_mapbox_token  # Register at mapbox.com
```

### Step 3: Build & Run with Docker Compose

```bash
# Build all images and set up background containers
docker-compose up -d --build

# Wait 2-3 minutes for all microservices and databases to completely start
docker-compose ps
```

### Step 4: Initialize Database (Migrations)

The CoreAPI system uses Laravel, so you need to run migrations and seed data:

```bash
# Run migrations for CoreAPI
docker-compose exec core_api php artisan migrate

# Seed sample data (Flood zones, Admin, sample warnings...)
docker-compose exec core_api php artisan db:seed
```

### Step 5: Access the System

The system will be exposed via gateway or directly on these ports:
- **Frontend App**: http://localhost:5173
- **Core API Gateway**: http://localhost:8000
- **AIML Service**: http://localhost:8003
- **pgAdmin / Adminer**: http://localhost:8080

---

## 📋 Services Architecture (Docker Containers)

Running `docker-compose up -d` starts the following group of services:

```bash
docker-compose ps

# SUMMARY OUTPUT:
# NAME                   IMAGE                                   STATUS
# aegis-frontend         aegisflow-frontend:latest               Up (Port: 5173)
# aegis-coreapi          aegisflow-coreapi:latest (PHP 8.2)      Up (Port: 8000)
# aegis-aiml             aegisflow-aiml:latest (Python FastAPI)  Up (Port: 8003)
# aegis-iot              aegisflow-iot:latest (Node.js)          Up (Port: 3001)
# aegis-digitaltwin      aegisflow-dtwin:latest                  Up (Port: 3002)
# postgres-db            postgres:15-postgis                     Up (Port: 5432)
# mongo-db               mongo:6                                 Up (Port: 27017)
# redis-cache            redis:7                                 Up (Port: 6379)
```
*(Refer to other modules like NotificationService, AnalyticsService, IncidentService, WalletService in the `docs/Services/` directory)*

---

## 🧪 Verify Installation

### 1. Check API Health

```bash
# Test CoreAPI
curl http://localhost:8000/api/health

# Test AIML Service
curl http://localhost:8003/health
```

**Expected response from CoreAPI:**
```json
{
  "status": "ok",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### 2. Check Frontend

Open browser and access: **http://localhost:5173**

You should see the platform interface displaying:
- 📍 Digital Twin map of the city and transportation network.
- 🌊 Flooding status collected from IoT stations and satellite data.
- 📊 Predictive AI analysis charts.

### 3. Database Administration

- **PostgreSQL / Adminer (if pgAdmin/Adminer enabled)**: **http://localhost:8080**
- Use the account configured in your `.env` file (e.g. `aegis_user` / `aegis_pass`).

---

## 🛠️ Useful Commands

### Development (Logs and Debug)

```bash
# View all system logs (container names might vary)
docker-compose logs -f

# View logs for a specific service (Example: AI/ML)
docker-compose logs -f aegis-aiml

# Access the CoreAPI container shell
docker-compose exec core_api bash
```

### Database Management

```bash
# Reset PostgreSQL Database completely (Warning: Clears all data!)
docker-compose exec core_api php artisan migrate:fresh --seed

# Enter psql terminal directly
docker-compose exec postgres-db psql -U aegis_user -d aegisflow_db
```

### Build & Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Push to registry (if applicable)
docker tag aegisflow-api:latest your-registry.com/aegisflow-api:latest
docker push your-registry.com/aegisflow-api:latest
```

---

## 🚨 Troubleshooting

### Error: "Container exited with code 1"

```bash
# View detailed logs
docker-compose logs api

# Check if .env configuration is correct
cat .env | grep DATABASE_URL

# Try rebuilding
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Error: "Port 5173 already in use"

```bash
# Find the process using the port
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Or specify a different port
PORT=3001 FRONTEND_PORT=5174 docker-compose up -d
```

### Error: "PostgreSQL connection refused"

```bash
# Check if the PostgreSQL container is running
docker-compose ps postgres

# Connect directly
docker-compose exec postgres psql -U aegis_user -d aegisflow_db

# If still failing, reset database volume
docker-compose down -v  # -v: deletes volumes
docker-compose up -d
docker-compose exec api npm run migrate
```

### Error: "AWS credentials not found"

```bash
# Check .env
grep AWS_ .env

# Or configure AWS CLI locally
aws configure
```

---

## 📚 Advanced Setup

### Using a Custom Domain

Add to `/etc/hosts` (macOS/Linux):
```
127.0.0.1 aegisflow.local
```

Windows (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 aegisflow.local
```

Then update your `.env`:
```env
FRONTEND_URL=http://aegisflow.local:5173
API_URL=http://aegisflow.local:3000
```

### Enable HTTPS (Local)

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Update docker-compose.yml
# ... (refer to nginx.conf template configuration)
```

### Scaling (Multiple Workers)

In `docker-compose.yml`:
```yaml
api:
  deploy:
    replicas: 3  # Run 3 instances of the API
```

---

## ✅ Installation Verification Checklist

Verify the following markers:

- ✅ `docker-compose ps` - All containers are "Up"
- ✅ http://localhost:5173 - Frontend renders
- ✅ http://localhost:3000/api/health - API responds
- ✅ Database migrations completed successfully
- ✅ Able to simulate flood zones and view safe detour routes

---

## 📖 Next Steps

1. [Getting Started](./GettingStarted.md) – Familiarize with the interface
2. [Architecture](./Architecture.md) – Detailed system design
3. [Services](./Services/README.md) – Understand each module
4. [Development](./BUILD_WITHOUT_DOCKER.md) – Development environment setup

---

## 💬 Need Help?

- 📖 [Introduction Document](./intro.md)
- 🐛 [GitHub Issues](https://github.com/ASEAN-AI-DZ/AegisFlowAI/issues)
- 💭 [Discussions](https://github.com/ASEAN-AI-DZ/AegisFlowAI/discussions)
