# 💰 Wallet Service

> CityPoint & Community Incentive System - AegisFlow AI Platform.

---

## Purpose

The **Wallet Service** manages the **CityPoint** reward system, an initiative designed to encourage active community participation in urban resilience and hazard monitoring through the AegisFlow AI platform:

1. **Encouraging Citizen Contributions**
   - Award CityPoints to citizens when they submit verified, accurate incident reports (flooding, accidents, infrastructure damage).
   - Reward contributions that help validate system data (e.g., verifying active flood warning accuracy at their location).

2. **Wallet & Transaction Management**
   - Each AegisFlow user is provisioned a digital wallet to accumulate CityPoints.
   - Maintain transparent transactional history ledger records ensuring fair point distributions.

3. **Rewards Redemption & Welfare Benefits**
   - Allow users to redeem CityPoints for partner discount vouchers, municipal service discounts, or public goods.
   - Strengthen citizen-municipality engagement.

---

## Technology Stack

| Component | Technology |
|---|---|
| **Runtime** | Node.js (TypeScript) |
| **Framework** | Express.js / Fastify |
| **Database** | PostgreSQL (Transactions & Balances) |
| **Cache** | Redis (Fast balance lookup) |
| **Messaging** | RabbitMQ / Kafka (Consuming transaction trigger events) |

---

## Core Features

### 1. CityPoint Wallet Management
- **Automatic Wallet Provisioning**: Instantly create a wallet whenever a new user registers on the AegisFlow platform.
- **Balance & Ledger Queries**: Fetch current point balances and transaction histories in real-time.
- **Transaction Security**: Digitally sign and log point updates (debits/credits) to ensure auditability.

### 2. Points Accrual Mechanism (Earning)
- **Incident Reporting**: Earn points when a submitted incident report (e.g. flooded road) is verified and marked useful.
- **Data Validation (Crowdsourcing)**: Earn points for validating active AI forecasts (e.g. confirming "Yes, this street is indeed flooded").
- **Community Interaction**: Reward altruistic behaviors helping others during emergency situations.

### 3. Redemption Subsystem (Redemption)
- **Vouchers & Coupons**: Redeem points for shopping, dining, or retail discount coupons from partner merchants.
- **Public Services**: Deduct municipal fees (e.g. public parking or waste collection fees) using earned points.
- **Charity Donations**: Convert CityPoints to cash donations sent directly to disaster relief or climate adaptation funds.

---

## System Integration

- **[Incident Service](../IncidentService/Readme.md)**: Dispatches reward triggers when citizen reports are resolved successfully.
- **[Notification Service](../NotificationService/Readme.md)**: Alerts users upon point earnings or new voucher redemption options.
- **[AIML Service](../AIMLService/Readme.md)**: Runs AI checks to grade the quality and reliability of user reports before issuing points.
- **Mobile App**: Primary client interface for citizens to manage wallets and redeem rewards.

---

## API Endpoints (Examples)

### Balance Query
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

### Transaction History
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

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/AegisFlowAI/blob/master/LICENSE).

---

_**AegisFlow AI – Small contributions, major impact for the city.**_
