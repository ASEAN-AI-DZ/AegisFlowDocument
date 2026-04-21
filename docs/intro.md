# 🌊 AegisFlow AI — Nền tảng GIS & Map & AI cho Quản lý Đô thị Thông minh

<div align="center">
  <a href="https://aegis-flow-ai.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Website-AegisFlow_AI-00C853?style=for-the-badge" alt="Demo System"/>
  </a>
  <br/>
  <a href="./License.md">
    <img src="https://img.shields.io/badge/License-GPL%203.0-blue.svg" alt="License: GPL-3.0"/>
  </a>
  <br/>
  <a href="./CONTRIBUTING.md">🤝 Đóng Góp</a> 
  <!-- <a href="CHANGELOG.md">📜 Changelog</a> -->
</div>

<!-- ![Banner](/img/banner_aegisflowai.png) -->

> _"Từ phản ứng thụ động sang dự báo chủ động — AI là lá chắn bảo vệ cộng đồng trước thiên tai"_

**AegisFlow AI** là nền tảng tiên tiến tích hợp **Hệ thống Thông tin Địa lý (GIS)** và **AI (Trí tuệ Nhân tạo)**, được thiết kế để chuyển đổi cách quản lý và ứng phó với ngập lụt đô thị từ phản ứng sang dự đoán và chủ động. Hệ thống mô hình hóa toàn bộ mạng lưới giao thông dưới dạng đồ thị mạng động, tích hợp dữ liệu thời gian thực từ cảm biến mực nước, dữ liệu thời tiết và báo cáo của công dân để hỗ trợ sơ tán nhanh chóng, an toàn và phân bổ cứu trợ chuẩn xác.

---

## 📋 Thực trạng đô thị

### Bối cảnh

Trong bối cảnh biến đổi khí hậu và đô thị hóa diễn ra nhanh chóng tại các thành phố lớn trên cả nước, hệ thống ứng phó thiên tai truyền thống đang đối mặt với nhiều thách thức nghiêm trọng.

**Thực trạng:**
- Mưa lớn cực đoan và triều cường gây ngập lụt diễn ra thường xuyên, làm tê liệt giao thông đô thị.
- Các tuyến đường huyết mạch bị cắt đứt bất ngờ, gây nguy hiểm cho người dân và làm chậm trễ xe cấp cứu, cứu hỏa trong giờ khắc sinh tử.
- Hầu hết các hệ thống hiện tại chỉ tập trung vào ghi nhận (monitoring) sự cố sau khi đã xảy ra, nhưng thiếu khả năng dự báo sớm (prediction) mức độ ngập và cảnh báo tuyến đường an toàn.
- Phản ứng xử lý chậm, khó điều phối lực lượng cứu hộ tối ưu và thiếu công cụ hỗ trợ ra quyết định kịp thời cho Ban chỉ đạo phòng chống thiên tai.

---

## 🎯 Mục tiêu Dự án

### Mục tiêu Ngắn hạn

1. **Xây dựng Bản đồ tương tác thời gian thực** cập nhật tình hình ngập lụt toàn đô thị
2. **Triển khai AI dự báo sớm:**
   - Điểm đen ngập lụt dựa trên dữ liệu địa hình, lịch sử mưa và trạm bơm
   - Rủi ro môi trường dựa trên dữ liệu thời tiết + cảm biến IoT
3. **Hỗ trợ định tuyến:** Cho phép tự động loại bỏ các tuyến đường ngập sâu và tìm kiếm đường vòng an toàn nhất trước khi người dân di chuyển
4. **Dashboard hỗ trợ ra quyết định:** Cung cấp giao diện trực quan cho chính quyền trong việc điều chuyển nguồn lực cứu trợ

### Mục tiêu Dài hạn

- Tích hợp sâu rộng vào hệ thống điều hành Smart City và Trung tâm phòng chống thiên tai quốc gia, trở thành nền tảng cốt lõi hỗ trợ vận hành trong mùa mưa bão.
- Mở rộng phạm vi ứng dụng sang nhiều lĩnh vực dự báo thiên tai khác, bao gồm: cảnh báo sạt lở nền nhiệt, đánh giá rủi ro cơ sở hạ tầng, và quy hoạch đô thị bền vững với biến đổi khí hậu.

---

## 💡 Giải pháp – AegisFlow AI

**AegisFlow AI** là câu trả lời. Đây là một nền tảng toàn diện kết hợp **Dữ liệu Không gian (GIS & Map)** với **AI**, hoạt động như một **"lá chắn kỹ thuật số"** của thành phố trong thiên tai. Mỗi con đường, mỗi giao lộ đều được **đồng bộ hóa mức độ rủi ro thời gian thực**. Thông qua việc thấu hiểu "nhịp thở" của thời tiết và địa hình, chúng ta chuyển từ **báo cáo thiệt hại** sang **dự báo mức ngập** và **bảo vệ sinh mạng**.

---

## 🔬 Hệ Thống Phân Tích & Dự Báo Động là gì?

### Định nghĩa

Khác với các hệ thống bản đồ tĩnh, **AegisFlow AI** vận hành một **Mô hình Trạng thái Động (Dynamic Spatial Model)**. Đây là một lớp dữ liệu sống phủ lên bản đồ vật lý của đô thị nhằm đánh giá mức độ tương tác giữa hạ tầng và lượng mưa.

**Hệ thống này KHÔNG PHẢI:**

- ❌ Một ứng dụng dự báo thời tiết chung chung
- ❌ Bản tin cập nhật kẹt xe thông thường như Google Maps (thường vẫn gợi ý đường ngắn nhất dù đã ngập sâu)

**Hệ thống dự báo động AegisFlow là:**

- ✅ Một **mạng lưới liên kết**, được cập nhật liên tục điểm ngập theo thời gian thực
- ✅ Tích hợp đa luồng dữ liệu: API thời tiết, cảm biến đo mực nước, Crowdsourcing từ người dân
- ✅ **Phản ánh chính xác** tình trạng khả dụng của các tuyến đường
- ✅ **Hai chiều:** Cộng đồng báo ngập → AI khoanh vùng rủi ro; AI tìm lộ trình → Cứu hộ tiếp cận hiện trường nhanh nhất

### Khả năng cốt lõi

1. **Cảnh báo:** Phóng chiếu các điểm có nguy cơ rủi ro cao trước nhiều giờ đồng hồ.
2. **Dự báo:** Tính toán mức nước ngầm, lưu lượng dâng cục bộ.
3. **Tối ưu hóa:** Tìm ra lộ trình sơ tán an toàn nhất, tránh xa các "rốn ngập".
4. **Phân tích tập trung:** Gợi ý vị trí đặt trạm cứu trợ dựa trên mật độ dân cư bị cô lập.

---

## 🌐 AegisFlow AI Hoạt Động Ra Sao?

### Khái niệm

Hãy tưởng tượng bạn đang dùng một ứng dụng như **Waze hay Google Maps**, nhưng **dành riêng cho việc sống sót qua thiên tai** – một hệ thống định tuyến cực kỳ nhạy bén với nước ngập.

Với AegisFlow AI, toàn bộ mạng lưới giao thông được mô hình hóa dưới dạng **graph network** (Node = điểm giao cắt, Edge = đoạn đường). Trọng số của các "Edge" này thay đổi linh hoạt theo lượng mưa và cảm biến ngập.

Khi một trận mưa lịch sử đổ xuống, hệ thống không chỉ hiển thị các điểm ngập hiện tại mà còn **ngay lập tức suy diễn không gian** cho **1-3 giờ tới**:

- Nước ngập sẽ lan rộng chặn đứng những tuyến lộ chính nào?
- Xe cứu thương, cứu hỏa nên đi tuyến đường vòng nào (không ngập) để đến bệnh viện nhanh nhất?
- Những khu dân cư nào sắp bị cô lập hoàn toàn và cần ưu tiên thuyền cứu hộ sớm?
- Giải pháp phân bổ nhu yếu phẩm khẩn cấp đến điểm nào là tối ưu nhất?

---

## 👥 Các Đối tượng hướng đến

<!-- ![Đối tượng](/img/doi_tuong.png) -->

### 👨‍💼 1. Nhà Quy hoạch & Quan chức Chính quyền
- Dự báo tác động của các dự án hạ tầng trước khi triển khai
- Mô phỏng kịch bản what-if để tối ưu hóa quyết định
- Dashboard dữ liệu để ra quyết định nhanh, chính xác

### 👷 2. Kỹ sư & Chuyên gia Giao thông Đô thị
- Phân tích chi tiết lưu lượng giao thông và rủi ro
- Mô phỏng hiệu quả của các biện pháp tương ứng
- Tối ưu hóa hạ tầng giao thông

### 🏛️ 3. Tổ chức Cộng đồng & NGO
- Tất cả công dân có thể sử dụng công cụ để đề xuất dự án
- Minh bạch hóa tác động kinh tế-xã hội-môi trường

### 📚 4. Nhà Nghiên cứu & Sinh viên
- Truy cập dữ liệu mở để nghiên cứu
- Mô hình hóa các vấn đề đô thị phức tạp
- Kiểm chứng giả thuyết trong môi trường an toàn

---

## 🚀 Chức năng Chính của AegisFlow AI

<!-- ![Chức năng](/img/chuc_nang_chinh.png) -->

### 1. **Real-time Flood Radar (Bản đồ Cảnh báo Thời gian thực)**

- Mô hình hóa tọa độ điểm ngập lập tức lên đồ thị bản đồ gốc
- Cập nhật liên tục từ dữ liệu người dùng (Crowdsourcing) và cảm biến IoT
- Hiển thị mức độ ngập và màu sắc cảnh báo theo từng cụm khu vực

### 2. **AI Dự báo Rủi ro Rút/Ngập**

- **Dự báo vùng có rủi ro ngập** trong tương lai gần qua thuật toán Machine Learning 
- Phân tích tương quan giữa dữ liệu API thời tiết (Weather) và địa hình trũng thấp

### 3. **Dashboard Hỗ trợ Quyết định Cứu trợ**

- **Vulnerability Score:** Chấm điểm ưu tiên cứu trợ khu vực (vùng có người già/bệnh viện ngập sâu được điểm ưu tiên cao)
- Thống kê trực quan điểm báo ngập, số lượng người kẹt, và xu hướng lan rộng

### 4. **Hỗ trợ Ưu tiên Định tuyến & Sơ tán (Safe Routing)**

- Khi đường lớn biến thành sông, AI kích hoạt "Routing Engine" cắt bỏ các node ngập sâu, tính **tuyến đường an toàn nhất** cho xe máy/ô tô
- **Hướng dẫn sơ tán:** Gợi ý các nhà sinh hoạt cộng đồng/hầm trú ẩn cao ráo gần nhất
- Cảnh báo trực tiếp cho người dân đang lái xe lại gần khu vực nguy hiểm

---

## 📚 Công nghệ Sử dụng

| Thành phần                 | Công nghệ cụ thể       | Vai trò trong hệ thống                                                                                                                      |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Giao diện (Frontend)**   | `Leaflet.js`           | Hiển thị bản đồ tương tác, vẽ các lớp phủ dữ liệu như vùng ngập, luồng giao thông và các thực thể GIS & Map.                             |
| **Xử lý Logic (Backend)**  | `Node.js (Express)`    | Đóng vai trò trung tâm điều phối API, quản lý phiên làm việc và kết nối tới cơ sở dữ liệu.                                                  |
| **Trí tuệ Nhân tạo (AI)**  | `Amazon Bedrock`       | Cung cấp hạ tầng để chạy các mô hình ngôn ngữ lớn và mô hình dự báo, hỗ trợ phân tích kịch bản và tối ưu hóa tài nguyên đô thị.             |
| **Dữ liệu nền (Database)** | `PostgreSQL + PostGIS` | Lưu trữ và xử lý các dữ liệu không gian phức tạp, thực hiện các phép toán hình học như kiểm tra giao cắt, tạo vùng đệm và tính khoảng cách. |
| **Kết nối (Real-time)**    | `WebSockets`           | Duy trì kết nối hai chiều liên tục, đảm bảo dữ liệu từ cảm biến IoT được cập nhật lên bản đồ theo thời gian thực.                           |

---

## 🌟 So Sánh AegisFlow AI Với Các Hệ Thống Hiện Tại

| Tiêu chí           | ❌ Các Hệ thống, Bản đồ Hiện tại                          | ✅ AegisFlow AI                                                      |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| Cách tiếp cận      | Chỉ giám sát kẹt xe – hiển thị đường rỗng dù ngập nước    | Loại trừ lộ trình – Tự động chặn đường ngập và tìm đường vòng        |
| Phản ứng           | Thụ động – người dân đi vào vùng nước mới biết ngập       | Chủ động – dự báo và gửi lộ trình tránh ngập từ trước                |
| Khả năng điều phối | Thiếu hệ thống phân bổ, cứu hộ theo cảm tính              | Đánh giá mức độ tổn thương, tự động phân cực khu vực ưu tiên cao     |
| Cập nhật dữ liệu   | Rất chậm, chờ báo chí đô thị lên bài                      | Crowdsourcing Realtime + IoT + WebSockets hiển thị ngay lập tức      |
| Phân tích kịch bản | Không có hoặc rất hạn chế tính toán không gian            | Phân tích điểm trũng, khoanh vùng rủi ro bằng PostgreSQL (PostGIS)   |
| Rủi ro sinh mạng   | Nguy hiểm, nhiều trường hợp xe bị chết máy, mắc kẹt       | An toàn – Đảm bảo người dân tìm được đường về nhà an toàn            |

---

## 📖 Tài liệu Chính


- [Kiến trúc Hệ thống](./Architecture.md) – Tìm hiểu và thiết kế tổng thể
- [Hướng dẫn Bắt đầu](./GettingStarted.md) – Cài đặt và chạy AegisFlow AI
- [Cài đặt Chi tiết](./Installation.md) – Hướng dẫn chi tiết cài đặt từng bước
- [Các Dịch vụ](./Services/README.md) – Tìm hiểu từng microservice

---

## 🎯 Kết Luận

AegisFlow AI là giải pháp **Bản đồ GIS + AI Dự báo** toàn diện cho công tác quản lý và ứng phó ngập lụt đô thị. Hệ thống không chỉ cập nhật cảnh báo realtime mà còn có khả năng tìm kiếm tuyến đường sơ tán an toàn, điều phối cứu trợ và bảo vệ tính mạng người dân trong điều kiện thời tiết cực đoan.

Với công nghệ hiện đại và kiến trúc Microservices, AegisFlow AI mang lại giá trị thực tiễn rõ rệt: giảm thiểu rủi ro sinh mạng, tăng tốc độ phản ứng khẩn cấp và hỗ trợ ra quyết định chặt chẽ.

Dự án không chỉ xử lý vấn đề ngập lụt cấp bách của hôm nay mà còn xây dựng một lớp phòng thủ kỹ thuật số vững chắc cho các **đô thị chống chịu (Resilient Cities)** tại Việt Nam trong tương lai.

**AegisFlow AI – Khơi thông dòng chảy, bảo vệ sinh mạng an toàn.**

---

## 📞 Liên hệ & Đóng góp

### Liên hệ Dự án
- **GitHub Repository:** https://github.com/ASEAN-AI-DZ/AegisFlowAI
- **Đóng góp:** Fork repository → tạo feature branch → mở Pull Request
- **Báo lỗi:** Tạo GitHub Issue với mô tả chi tiết, steps to reproduce
- **Đề xuất tính năng mới:** Tham gia discussions và cải thiện Model AI

---

## 📄 Giấy phép

Dự án này được phân phối dưới **GNU General Public License v3.0**. Xem file [LICENSE](./License.md) để biết thêm chi tiết.

---

_**Được phát triển với ❤️ để hướng tới đô thị an toàn, bền vững**_

