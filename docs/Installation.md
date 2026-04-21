# 📦 Hướng dẫn Cài đặt AegisFlow AI

> Hướng dẫn chi tiết để cài đặt và chạy AegisFlow AI trên máy local hoặc server với toàn bộ hệ sinh thái Microservices.

---

## 🔧 Yêu cầu Hệ thống

### Yêu cầu Cơ bản
- **OS**: Linux, macOS, Windows (WSL2)
- **RAM**: Tối thiểu 16GB (khuyến nghị 32GB do chạy nhiều microservices)
- **Disk**: 50GB trống (để dữ liệu DBMS, model AI, và containers)
- **Internet**: Kết nối ổn định tải docker images và AI models.

### Nếu dùng Docker (Khuyến nghị ✅)

| Công nghệ | Phiên bản | Ghi chú |
|-----------|----------|--------|
| **Docker** | 20.10+ | [Tải Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | 2.0+ | Đi kèm Docker Desktop |
| **Git** | 2.30+ | [Tải Git](https://git-scm.com/downloads) |

**Lợi ích**: Không cần cài đặt nhiều Go, Python, PHP, Node.js, PostgreSQL, Redis, MongoDB... Tất cả đã có trong containers!

### Nếu KHÔNG dùng Docker

Xem chi tiết [Trang hướng dẫn BUILD_WITHOUT_DOCKER.md](./BUILD_WITHOUT_DOCKER.md)

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| **PHP + Composer** | 8.2+ | Tương tác Core API (Laravel) |
| **Node.js + npm/yarn** | 20.0+ | Frontend và các Node Microservices |
| **Python** | 3.10+ | AIMLService và AnalyticsService |
| **Go** | 1.21+ | Các Go Microservices (tốc độ cao) |
| **PostgreSQL + PostGIS** | 15.0+ | Database chính (vấn đề geospatial) |
| **MongoDB** | 6.0+ | Dữ liệu linh hoạt, NoSQL, hệ sinh thái ContextBroker |
| **Redis** | 7.0+ | Caching, session & pub/sub broker |

---

## 🚀 Cài đặt Nhanh với Docker (5 phút)

### Bước 1: Clone Repository

```bash
git clone https://github.com/ASEAN-AI-DZ/AegisFlowAI.git
cd AegisFlowAI
```

### Bước 2: Tạo file .env tổng

```bash
cp .env.example .env
```

**Chỉnh sửa `.env` (đặc biệt các dòng database & credentials):**

```env
# Database Credentials
POSTGRES_DB=aegisflow_db
POSTGRES_USER=aegis_user
POSTGRES_PASSWORD=aegis_pass

MONGO_INITDB_ROOT_USERNAME=mongo_admin
MONGO_INITDB_ROOT_PASSWORD=mongo_pass

# Redis
REDIS_PASSWORD=your_redis_pass

# Cấu hình App / API
APP_KEY=base64:your_generated_app_key
JWT_SECRET=your_jwt_secret

# Tích hợp AWS / AI (nếu dùng cloud provider hoặc bedrock/lambda)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

# Mapbox cho Frontend
MAPBOX_TOKEN=your_mapbox_token  # Đăng ký tại mapbox.com
```

### Bước 3: Build & Chạy với Docker Compose

```bash
# Lệnh build toàn bộ image và thiết lập các container nền
docker-compose up -d --build

# Chờ 2-3 phút cho tất cả các microservices và db khởi động hoàn tất
docker-compose ps
```

### Bước 4: Khởi tạo Database (Migration)

Hệ thống CoreAPI sử dụng Laravel nên cần migrate và seed data:

```bash
# Chạy migrations cho CoreAPI
docker-compose exec core_api php artisan migrate

# Seed dữ liệu mẫu (Khu vực ngập lụt, Admin, Cảnh báo mẫu...)
docker-compose exec core_api php artisan db:seed
```

### Bước 5: Truy cập Hệ thống

Hệ thống sẽ được expose qua gateway hoặc trực tiếp trên các cổng:
- **Frontend App**: http://localhost:5173
- **Core API Gateway**: http://localhost:8000
- **AIML Service**: http://localhost:8003
- **pgAdmin / Adminer**: http://localhost:8080

---

## 📋 Services Kiến trúc (Docker Containers)

Khi chạy `docker-compose up -d`, các danh sách group dịch vụ sau sẽ được khởi động:

```bash
docker-compose ps

# OUTPUT TÓM TẮT:
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
*(Tham khảo các module còn lại như NotificationService, AnalyticsService, IncidentService, WalletService tại thư mục `docs/Services/`)*

---

## 🧪 Kiểm tra Cài đặt

### 1. Kiểm tra API Health

```bash
# Test CoreAPI
curl http://localhost:8000/api/health

# Test AIML Service
curl http://localhost:8003/health
```

**Kết quả mong đợi từ CoreAPI:**
```json
{
  "status": "ok",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### 2. Kiểm tra Frontend

Mở trình duyệt truy cập: **http://localhost:5173**

Bạn sẽ thấy giao diện nền tảng hiển thị:
- 📍 Bản đồ Digital Twin của thành phố và mạng lưới giao thông.
- 🌊 Tình trạng ngập lụt thu thập từ các trạm IoT và dữ liệu vệ tinh.
- 📊 Biểu đồ phân tích Predictive AI.

### 3. Quản trị Cơ sở dữ liệu

- **PostgreSQL / Adminer (nếu bật pgAdmin/Adminer)**: **http://localhost:8080**
- Dùng account config trong file `.env` (vd: `aegis_user` / `aegis_pass`).

---

## 🛠️ Các lệnh Hữu ích

### Development (Log và Debug)

```bash
# Xem logs toàn bộ hệ thống (có thể thay đổi tuỳ tên container)
docker-compose logs -f

# Xem logs của 1 service cụ thể (Ví dụ: AI/ML)
docker-compose logs -f aegis-aiml

# Truy cập vào shell của CoreAPI
docker-compose exec core_api bash
```

### Database Management

```bash
# Reset toàn bộ PostgreSQL Database (Cảnh báo: Xoá mọi dữ liệu sạch sẽ!)
docker-compose exec core_api php artisan migrate:fresh --seed

# Vào psql terminal trực tiếp
docker-compose exec postgres-db psql -U aegis_user -d aegisflow_db
```

### Build & Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Push lên registry (nếu có)
docker tag aegisflow-api:latest your-registry.com/aegisflow-api:latest
docker push your-registry.com/aegisflow-api:latest
```

---

## 🚨 Khắc phục Sự cố

### Lỗi: "Container exited with code 1"

```bash
# Xem log chi tiết
docker-compose logs api

# Kiểm tra .env có đúng không
cat .env | grep DATABASE_URL

# Thử rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Lỗi: "Port 5173 already in use"

```bash
# Tìm process sử dụng port
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Hoặc chỉ định port khác
PORT=3001 FRONTEND_PORT=5174 docker-compose up -d
```

### Lỗi: "PostgreSQL connection refused"

```bash
# Kiểm tra container PostgreSQL có chạy không
docker-compose ps postgres

# Connect trực tiếp
docker-compose exec postgres psql -U aegis_user -d aegisflow_db

# Nếu vẫn lỗi, reset database
docker-compose down -v  # -v: xóa volumes
docker-compose up -d
docker-compose exec api npm run migrate
```

### Lỗi: "AWS credentials not found"

```bash
# Kiểm tra .env
grep AWS_ .env

# Hoặc cấu hình AWS CLI
aws configure
```

---

## 📚 Cài đặt Nâng cao

### Sử dụng Custom Domain

Thêm vào `/etc/hosts` (macOS/Linux):
```
127.0.0.1 aegisflow.local
```

Windows (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 aegisflow.local
```

Sau đó cập nhật `.env`:
```env
FRONTEND_URL=http://aegisflow.local:5173
API_URL=http://aegisflow.local:3000
```

### Enable HTTPS (Local)

```bash
# Tạo self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Cập nhật docker-compose.yml
# ... (xem template ở nginx.conf)
```

### Scaling (Multiple Workers)

Trong `docker-compose.yml`:
```yaml
api:
  deploy:
    replicas: 3  # Chạy 3 instances của API
```

---

## ✅ Xác nhận Cài đặt Hoàn tất

Kiểm tra các dấu hiệu:

- ✅ `docker-compose ps` - Tất cả containers "Up"
- ✅ http://localhost:5173 - Frontend hiển thị
- ✅ http://localhost:3000/api/health - API responds
- ✅ Database migrations thành công
- ✅ Có thể mô phỏng vùng ngập lụt và xem lộ trình an toàn

---

## 📖 Bước Tiếp theo

1. [Hướng dẫn Bắt đầu](./GettingStarted.md) – Làm quen với giao diện
2. [Kiến trúc](./Architecture.md) – Hiểu chi tiết hệ thống
3. [Services](./Services/README.md) – Tìm hiểu từng module
4. [Phát triển](./BUILD_WITHOUT_DOCKER.md) – Cài đặt để phát triển

---

## 💬 Cần Giúp?

- 📖 [Tài liệu giới thiệu](./intro.md)
- 🐛 [GitHub Issues](https://github.com/ASEAN-AI-DZ/AegisFlowAI/issues)
- 💭 [Discussions](https://github.com/ASEAN-AI-DZ/AegisFlowAI/discussions)# 📦 Hướng dẫn Cài đặt AegisFlow AI

