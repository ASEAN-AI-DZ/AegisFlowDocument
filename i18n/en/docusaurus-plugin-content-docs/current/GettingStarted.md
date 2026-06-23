# 🚀 Getting Started with AegisFlow AI

> _"From theory to practice — Deploy AegisFlow AI today"_

---

## 📋 System Requirements

### Preliminary Setup
- **Node.js**: v16+ 
- **npm** or **yarn**: v7+
- **PostgreSQL**: v12+
- **PostGIS**: v3.0+ (extension for PostgreSQL)
- **Docker** (optional, but recommended)

### Environment
- **OS**: Linux, macOS, or Windows (WSL2)
- **RAM**: Minimum 8GB
- **Disk**: 20GB (for containing data and models)

---

## 🔧 Quick Start (5 minutes)

### Step 1: Clone Repository

```bash
git clone https://github.com/ASEAN-AI-DZ/AegisFlowAI.git
cd AegisFlowAI
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://aegis_user:aegis_pass@localhost:5432/aegisflow_db
POSTGIS_ENABLED=true

# AI Core
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# API
PORT=3000
NODE_ENV=development

# Maps
MAPBOX_TOKEN=your_mapbox_token
```

### Step 4: Initialize Database

```bash
npm run migrate
npm run seed  # (if flood sample data is needed)
```

### Step 5: Run Application

```bash
npm start
```

The application will run at `http://localhost:3000`

---

## 🐳 Setup with Docker (Recommended)

### Step 1: Build Docker Image

```bash
docker-compose build
```

### Step 2: Run Container

```bash
docker-compose up -d
```

### Step 3: Check Status

```bash
docker-compose ps
```

All services will be running:
- **API Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **PostgreSQL**: localhost:5432
- **Redis** (cache): localhost:6379

---

## 📊 Project Structure

```
aegisflow-ai/
├── src/
│   ├── services/           # Microservices
│   │   ├── GISMap/        # GIS & Map engine
│   │   ├── Prediction/    # AI prediction
│   │   ├── Routing/       # Safe Routing engine
│   │   └── Dashboard/     # Decision support & Vulnerability
│   ├── pages/              # Frontend pages
│   ├── css/                # Styling
│   └── api/                # API routes
├── docs/                   # Documentation
├── docker-compose.yml      # Docker configuration
├── package.json
└── README.md
```

---

## ✅ Verify Installation

### 1. Check API

```bash
curl http://localhost:3000/api/health
# Result: {"status": "ok", "timestamp": "2026-03-31T..."}
```

### 2. Access Frontend

Open browser: `http://localhost:5173`

### 3. Create a Test Project

1. Log in with a demo account.
2. Select "Find Safe Routing".
3. Set a start point and end point on the map.
4. View flood segment warning results and the calculated optimal detour route.

---

## 🚨 Troubleshooting

### Error: "Connection refused" (PostgreSQL)

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Or if using Docker
docker-compose ps postgres
```

### Error: "Port 3000 is already in use"

```bash
# Find the process using port 3000
lsof -i :3000

# Or specify another port
PORT=3001 npm start
```

### Error: "AWS credentials not found"

Check if your `.env` file contains `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Or configure AWS CLI:

```bash
aws configure
```

---

## 📚 Next Steps

- [System Architecture](./Architecture.md) – Learn detailed design
- [Installation without Docker](./BUILD_WITHOUT_DOCKER.md) – If you do not want to use Docker
- [Core Services](./Services/README.md) – Learn about each microservice
- [API Documentation](./Services/README.md) – List of API endpoints

---

## 💡 Development Tips

### Hot Reload Frontend

```bash
npm run dev  # Automatically reload when code changes
```

### Debug Backend

```bash
DEBUG=* npm start  # View detailed logs
```

### Reset Database

```bash
npm run migrate:reset
npm run seed
```

---

## 🆘 Need Help?

- 📖 Review [System Architecture](./Architecture.md) to understand more about design
- 🐛 Report bugs: [GitHub Issues](https://github.com/ASEAN-AI-DZ/AegisFlowAI/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ASEAN-AI-DZ/AegisFlowAI/discussions)

---

## 📄 License

This project is distributed under the **GNU General Public License v3.0**. See the [LICENSE](./License.md) file for more details.

---

© 2026 AegisFlow AI – Developed with ❤️ by ASEAN-AI-DZ Team
