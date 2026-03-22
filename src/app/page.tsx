import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/product/ProductCard"
import { Badge } from "@/components/ui/Badge"
import { ShieldCheck, Zap, Clock } from "lucide-react"

// Mock data for initial frontend build
const popularProducts = [
  { id: "1", name: "ChatGPT Plus Chính Chủ", slug: "chatgpt-plus", shortDescription: "Tài khoản ChatGPT Plus nâng cấp trên chính email của bạn. Dùng GPT-4, DALL-E 3.", imageUrl: "", basePrice: 450000, priceMode: "fixed" as const, badge: "HOT" },
  { id: "2", name: "YouTube Premium 1 Năm", slug: "youtube-premium-1y", shortDescription: "Xem YouTube không quảng cáo, nghe nhạc nền. Nâng cấp chính chủ gói Family.", imageUrl: "", basePrice: 299000, priceMode: "fixed" as const },
  { id: "3", name: "Netflix Premium Slot", slug: "netflix-slot", shortDescription: "1 Profile riêng tư, xem chuẩn 4K trên mọi thiết bị.", imageUrl: "", basePrice: 65000, priceMode: "fixed" as const, badge: "Best Seller" },
  { id: "4", name: "Canva Pro Education", slug: "canva-pro", shortDescription: "Nâng cấp tài khoản Canva Pro vĩnh viễn với tư cách giáo viên.", imageUrl: "", basePrice: 99000, priceMode: "fixed" as const },
  { id: "5", name: "Google Drive 2TB / 5TB", slug: "google-drive", shortDescription: "Lưu trữ không giới hạn thời gian. Thêm dung lượng trực tiếp vào mail chính.", imageUrl: "", basePrice: 0, priceMode: "contact" as const },
  { id: "6", name: "Cursor Pro / Github Copilot", slug: "cursor-copilot", shortDescription: "Công cụ hỗ trợ code AI đắc lực nhất cho lập trình viên.", imageUrl: "", basePrice: 350000, priceMode: "fixed" as const },
]

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Announcement Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm text-center font-medium">
        🎉 Đang có chương trình khuyến mãi giảm 20% cho thành viên mới. Nhập mã NEW20 khi thanh toán !
      </div>

      <main className="container flex-1 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          
          <div className="flex-1 space-y-8 min-w-0">
            {/* Hero / Banner Area */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-800 p-8 text-white shadow-lg">
              <div className="relative z-10 md:w-2/3">
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-none">Flash Sale</Badge>
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Nền Tảng Dịch Vụ <br /> Số Hàng Đầu
                </h1>
                <p className="mb-6 text-lg text-blue-100 max-w-lg leading-relaxed">
                  Cung cấp các loại tài khoản Premium, phần mềm bản quyền với giá tốt nhất thị trường. Bảo hành 1 đổi 1.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="h-5 w-5 text-green-400" /> Uy tín 100%
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="h-5 w-5 text-yellow-400" /> Tự động 24/7
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-5 w-5 text-blue-300" /> Bảo hành trọn đời
                  </div>
                </div>
              </div>
              {/* Decorative background circle */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
            </div>

            {/* Featured Products */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
                <a href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">Xem tất cả &rarr;</a>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
            
            {/* New Products or another category */}
            <div className="pt-4">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Mới cập nhật</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {popularProducts.slice(0, 3).map((product) => (
                   <ProductCard key={`new-${product.id}`} {...product} />
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
