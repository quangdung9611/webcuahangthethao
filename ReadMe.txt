Để chạy website:
1/ Backend:
- Chạy "XamPP" và start "MySQL".
- Mở phpMyAdmin.
- Tạo thư database mới có tên: dungcushop.
- Import file dungcushop.sql trong folder project vào database mới vừa tạo (ngoài 3 folders: "admindashboard", "backend-project" và "userfrontend" thì có file sql ở cùng cấp).
- Mở terminal ở vị trí thư mục "backend-project".
- Option: Nếu mới vừa clone project về từ github thì chạy trước lệnh "npm install" để tải các package JavaScript, còn nếu đã có các packages thì bỏ qua bước này.
- Nếu đã có các packages tại "backend-project" thì chạy lệnh "npm start" để kết nối database.
- Backend đã chạy DB với các API xử lý cho frontend của Admin Dashboard và Client Frontend.

2/ Admin Dashboard:
- Mở terminal ở vị trí thư mục "admindashboard".
- Option: Nếu mới vừa clone project về từ github thì chạy trước lệnh "npm install" để tải các package JavaScript, còn nếu đã có các packages thì bỏ qua bước này.
- Nếu đã có các packages tại "backend-project" thì chạy lệnh "npm start" để chạy server cho Admin.
- Sau khi mở thì page Admin xuất hiện với đăng nhập và mật khẩu, cung cấp id và password hiện tại để đăng nhập vào hệ thống:
	+ Id: DaiMinh
	+ Password: 29041994
- Sau khi đăng nhập thì có thể chạy sử dụng page Admin Dashboard.

3/ Client Frontend:
- Mở terminal ở vị trí thư mục "userfrontend".
- Option: Nếu mới vừa clone project về từ github thì chạy trước lệnh "npm install" để tải các package JavaScript, còn nếu đã có các packages thì bỏ qua bước này.
- Nếu đã có các packages tại "backend-project" thì chạy lệnh "npm start" để chạy server cho Client.
- Sau khi chạy sever thì page dành cho client sẽ được mở và sử dụng bình thường.