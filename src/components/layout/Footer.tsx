export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-blue-600">MMO<span className="text-gray-900">Services</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Nền tảng cung cấp dịch vụ phần mềm, tài khoản số và công cụ MMO hàng đầu Việt Nam. Cam kết uy tín, bảo hành dài hạn.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Danh mục</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tài khoản AI & Chatbot</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Giải trí & Video</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Lưu trữ Cloud</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Thiết kế & Đồ hoạ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Chính sách</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Hướng dẫn thanh toán</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Email: support@mmoservices.vn</li>
              <li>Hotline: 0987.654.321</li>
              <li>Thời gian làm việc: 8h00 - 22h00</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MMO Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
