## 1. Mục Tiêu Ứng Dụng

- Giúp người dùng **nhanh chóng** tổ chức và chia nhỏ ý tưởng thành các cấp độ khác nhau theo dạng mindmap, **không cần** thao tác vẽ đường nối thủ công.
- Dễ sử dụng, không đòi hỏi đăng nhập, bảo mật phức tạp; **lưu tạm** thông tin cục bộ (nếu cần) hoặc cho phép tải/xuất khi hoàn tất.
- Tập trung vào **trải nghiệm nhập liệu nhanh** với các **phím tắt** cơ bản.

---

## 2. Phạm Vi Chức Năng

### 2.1. Canvas Mindmap
1. **Màn hình hiển thị (Canvas)**  
   - Có một khu vực rộng (canvas) hiển thị **cấu trúc phân cấp**: từ một ý chính (root) đến các ý con, cháu, v.v.  
   - Ứng dụng **tự động** sắp xếp bố cục để thể hiện quan hệ cha – con, không cần người dùng kéo nối bằng tay.

2. **Tự Động Vẽ Quan Hệ**  
   - Mỗi khi tạo một nút con, ứng dụng tự quản lý đường nối hoặc phân cấp trên giao diện, tránh thao tác thủ công.

### 2.2. Quản Lý Nút (Node)
1. **Tạo Nút Gốc**  
   - Khi người dùng bắt đầu, có sẵn **một nút gốc** (root) cho ý chính.  
   - Cho phép chỉnh sửa nội dung của nút gốc (tiêu đề, ý chính ban đầu).

2. **Thêm Nút Con**  
   - Người dùng có thể tạo nút con từ một nút cha đã chọn (ví dụ: root hoặc một nút bất kỳ).  
   - Sau khi thêm, hệ thống **tự động** hiển thị nhánh con, không cần thao tác kéo nối.

3. **Chỉnh Sửa Nút**  
   - Nhấp (click) chọn nút để “focus” (bôi sáng).  
   - Nhấp đúp (double-click) hoặc một nút lệnh “Chỉnh sửa” (nếu có) để vào chế độ sửa nội dung (hiển thị ô nhập văn bản).  
   - Người dùng gõ nội dung, có thể có **nhiều dòng** nếu cần (sẽ mô tả chi tiết ở phần phím tắt).  

4. **Xóa Nút**  
   - Chọn nút rồi bấm nút “Xóa” (hoặc một thao tác tương đương) để gỡ bỏ nút đó cùng các nút con trực thuộc.  

5. **Di Chuyển/Sắp Xếp** (Tuỳ chọn, đơn giản)  
   - Có thể cho phép người dùng **kéo thả** nút để thay đổi vị trí hoặc **chuyển đổi cha** (nếu muốn).  
   - Hoặc giữ cách bố cục tự động, người dùng chỉ việc thêm/xóa, ứng dụng sẽ tự sắp xếp.

### 2.3. Phím Tắt (Keyboard Shortcuts) Quan Trọng

1. **Trạng Thái “Chọn” vs. “Chỉnh Sửa”**  
   - **Chọn (Focus)**: Nút được bôi sáng, nhưng chưa hiển thị con trỏ soạn thảo.  
   - **Chỉnh Sửa (Edit)**: Nút hiển thị ô văn bản, cho phép nhập nội dung.

2. **Quy Tắc Nhấn Enter**  
   - **Nếu Đang Chỉnh Sửa**:  
     - **Enter**: Kết thúc chỉnh sửa, lưu nội dung mới, nút quay lại trạng thái “chọn”.  
     - **Shift + Enter**: Tạo **xuống dòng** trong cùng một nút (thay vì kết thúc chỉnh sửa).  
   - **Nếu Đang Chọn (Không Chỉnh Sửa)**:  
     - **Enter**: Tạo **một nút con** (child) bên dưới nút cha đang chọn.  
     - Nút con mới có thể **tự động** chuyển sang chế độ “chỉnh sửa” để người dùng nhập nội dung tức thì.

*(Lưu ý: Trước đó có ví dụ “Tab => nút con, Enter => nút ngang hàng”, nhưng theo yêu cầu cuối cùng, ta sử dụng Enter để thêm nút con khi đang chọn. Bạn hoàn toàn có thể mở rộng hoặc thay đổi nếu muốn. Ở đây bám sát quy tắc cuối cùng của bạn: “Enter = tạo nút con khi không edit, Enter = kết thúc edit, Shift+Enter = xuống dòng.”)*

### 2.4. Lưu & Tải (Tối Thiểu)
- **Lưu Cục Bộ (Local)**:  
  - Khi cần, người dùng bấm “Lưu” để tải xuống một file JSON (hoặc định dạng tương tự) ghi lại cấu trúc cây.  
- **Mở Lại**:  
  - Từ file đã lưu, có thể upload lên lại để tiếp tục chỉnh sửa.  

### 2.5. Xuất Hình Ảnh (Tuỳ Chọn)
- **Chụp Canvas** (Export to PNG/JPEG) để người dùng chia sẻ hoặc in ấn.

*(Chức năng xuất hình ảnh chỉ là tùy chọn, không bắt buộc nếu muốn giữ mức độ tối giản.)*

---

## 3. Trải Nghiệm Người Dùng (UX)

1. **Giao Diện Đơn Giản**  
   - Màn hình chính hiển thị nút gốc (root) ở giữa hoặc phía trên, các nút con tỏa ra xung quanh hoặc theo chiều dọc.  
   - Thanh công cụ (nếu có) chỉ gồm các nút cơ bản: “Lưu/Tải”, “Thêm nút con” (tuỳ người dùng nếu không quen phím tắt), “Xóa”, “Xuất ảnh” (nếu có).

2. **Tương Tác Kết Hợp Chuột và Bàn Phím**  
   - **Click** chọn nút → **Enter** (không edit) = thêm nút con.  
   - **Double-click** (hoặc chọn “Chỉnh sửa”) → vào chế độ gõ văn bản.  
   - **Enter** (đang edit) = thoát chế độ chỉnh sửa.  
   - **Shift+Enter** (đang edit) = xuống dòng cùng một nút.  

3. **Phản Hồi Trực Quan**  
   - Khi chọn nút, nút được viền sáng hoặc đổi màu.  
   - Khi tạo nút con, nút mới xuất hiện ngay bên dưới (hoặc bên cạnh), được focus để nhập nội dung.  
   - Khi kết thúc chỉnh sửa, hiển thị nội dung mới trên nút.

4. **Không Cần Đăng Nhập**  
   - Mọi thao tác diễn ra tại chỗ, người dùng **không** cần tài khoản.  
   - Tùy chọn lưu/tải file nếu muốn giữ lại hoặc mở lại sơ đồ.

---

## 4. Luồng Tương Tác Minh Họa

1. **Mở App**:  
   - Thấy một nút gốc giữa màn hình, tên mặc định “Ý chính” (hoặc để trống).

2. **Chỉnh Sửa Nút Gốc**:  
   - Nhấp đúp, gõ nội dung → nhấn Enter để xong, hoặc Shift+Enter để xuống dòng nếu dài.

3. **Thêm Nút Con**:  
   - Khi nút gốc đang được chọn (focus), nhấn Enter → tạo nút con.  
   - Nút con mới chuyển ngay vào chế độ chỉnh sửa, gõ nội dung, Enter để lưu.

4. **Chỉnh Sửa, Xóa, Sắp Xếp**:  
   - Muốn sửa nội dung: chọn nút → nhấp đúp.  
   - Muốn xóa: chọn nút → bấm nút “Xóa” hoặc thao tác xóa tùy thiết kế.  
   - Muốn kéo thả vị trí: giữ chuột lên nút để di chuyển (nếu có hỗ trợ sắp xếp bằng chuột).

5. **Lưu File (Local)**:  
   - Nhấn nút “Lưu” → tải xuống file JSON (chẳng hạn `mymap.json`).  
   - Khi cần mở lại, nhấn “Tải file” → chọn `mymap.json` → ứng dụng đọc dữ liệu và dựng lại cấu trúc cũ.

*(Các bước có thể đơn giản hơn/ít hơn nếu bạn muốn tối ưu trải nghiệm.)*

---

## 5. Tiêu Chí Hoàn Thành

- **Tạo và quản lý nút**: Người dùng có thể thêm, chỉnh sửa, xóa, tạo cấp con một cách trơn tru, không cần “vẽ tay” đường nối.  
- **Phím tắt Enter/Shift+Enter**:  
  - Đúng hành vi: Enter tạo con nếu đang focus, kết thúc edit nếu đang nhập nội dung, Shift+Enter xuống dòng.  
- **Giao diện rõ ràng**: Nút nào được chọn thì nổi bật; khi thêm con, hiển thị ngay, cho phép nhập tức thì.  
- **Lưu/Tải file**: Người dùng có thể lưu sơ đồ dưới dạng file và mở lại.  
- **Không yêu cầu đăng nhập**: Toàn bộ chạy trên trình duyệt, không cần tài khoản.  

---

## 6. Phạm Vi Không Bao Gồm

- **Bảo mật, phân quyền**: Không cần vì ứng dụng chỉ chạy cục bộ hoặc chia sẻ file thủ công.  
- **Cộng tác thời gian thực**: Không có, trừ khi mở rộng sau này.  
- **Kết nối thủ công**: Không cần. Ứng dụng tự hiểu quan hệ cha – con khi tạo nút con.  
- **Nhiều tính năng nâng cao khác (template, theme, AI gợi ý, v.v.)**: Không yêu cầu ở phiên bản tối giản này.

