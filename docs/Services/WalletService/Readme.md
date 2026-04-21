# 💰 Wallet Service

> Hệ thống CityPoint & Khuyến khích Cộng đồng - Nền tảng AegisFlow AI

---

## Mục Đích

**Wallet Service** quản lý hệ thống điểm thưởng **CityPoint**, một sáng kiến nhằm khuyến khích sự tham gia của cộng đồng vào việc xây dựng và bảo vệ đô thị thông qua nền tảng AegisFlow AI:

1. **Khuyến khích Đóng góp từ Công dân**
   - Tặng điểm CityPoint cho người dân khi họ báo cáo các sự cố chính xác (ngập lụt, tai nạn, hỏng hóc hạ tầng).
   - Thưởng điểm cho các đóng góp giúp cải thiện dữ liệu của hệ thống (ví dụ: xác nhận tình trạng ngập thực tế).

2. **Quản lý Ví & Giao dịch**
   - Mỗi người dùng AegisFlow có một ví điện tử để tích lũy CityPoint.
   - Theo dõi lịch sử giao dịch minh bạch, đảm bảo công bằng trong việc phân phối điểm thưởng.

3. **Đổi thưởng & Phúc lợi Đô thị**
   - Cho phép người dùng đổi CityPoint lấy các voucher dịch vụ, giảm phí dịch vụ công hoặc các phần quà từ đối tác.
   - Thúc đẩy mối quan hệ gắn kết giữa chính quyền và người dân.

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Runtime** | Node.js (TypeScript) |
| **Framework** | Express.js / Fastify |
| **Database** | PostgreSQL (Transactions & Balances) |
| **Cache** | Redis (Fast balance lookup) |
| **Messaging** | RabbitMQ / Kafka (Listening to events) |

---

## Chức năng Chính

### 1. Quản lý Ví CityPoint
- **Tự động cấp ví**: Tạo ví ngay khi người dùng đăng ký tài khoản AegisFlow.
- **Truy vấn số dư**: Kiểm tra số điểm hiện tại và lịch sử biến động theo thời gian thực.
- **Bảo mật giao dịch**: Đảm bảo mỗi giao dịch cộng/trừ điểm đều được ký xác thực và ghi log đầy đủ.

### 2. Cơ chế Tích lũy Điểm (Earning)
- **Báo cáo sự cố**: Nhận điểm khi gửi phản ánh (Incident Report) được hệ thống xác nhận là hữu ích.
- **Xác thực dữ liệu**: Nhận điểm khi tham gia kiểm chứng các cảnh báo từ AI (ví dụ: xác nhận "Đúng là đoạn đường này đang ngập").
- **Tương tác cộng đồng**: Thưởng điểm cho các hành động tích cực giúp đỡ người khác trong tình huống khẩn cấp.

### 3. Hệ thống Đổi thưởng (Redemption)
- **Voucher & Coupons**: Đổi điểm lấy mã giảm giá mua sắm, ăn uống từ các đối tác liên kết.
- **Dịch vụ Công**: Sử dụng điểm để giảm trừ một phần phí vệ sinh, phí gửi xe hoặc các dịch vụ đô thị khác.
- **Quyên góp từ thiện**: Chuyển đổi CityPoint thành tiền mặt để quyên góp cho các quỹ hỗ trợ thiên tai hoặc bảo vệ môi trường.

---

## Tích hợp Hệ thống

- **[Incident Service](../IncidentService/Readme.md)**: Gửi tín hiệu cộng điểm khi một sự cố do người dân báo cáo được xử lý thành công.
- **[Notification Service](../NotificationService/Readme.md)**: Gửi thông báo cho người dùng khi họ được cộng điểm hoặc có các chương trình đổi thưởng mới.
- **[AIML Service](../AIMLService/Readme.md)**: Sử dụng AI để đánh giá "chất lượng" và "độ tin cậy" của báo cáo để quyết định mức thưởng phù hợp.
- **Mobile App**: Giao diện chính để người dân quản lý ví và thực hiện đổi quà.

---

## API Endpoints (Ví dụ)

### Kiểm tra Số dư
```bash
GET /api/wallet/balance
Authorization: Bearer <token>

Response:
{
  "balance": 1250,
  "currency": "CityPoint",
  "lastUpdated": "2026-04-21T14:30:00Z"
}
```

### Lịch sử Giao dịch
```bash
GET /api/wallet/transactions?limit=5
```

---

## Deployment

### Docker
```bash
docker-compose up -d wallet-service
```

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---
_**AegisFlow AI – Đóng góp nhỏ, giá trị lớn cho thành phố.**_
