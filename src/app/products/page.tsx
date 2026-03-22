import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/product/ProductCard"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Search, Filter } from "lucide-react"

// Mock data
const products = [
  { id: "1", name: "ChatGPT Plus Chính Chủ", slug: "chatgpt-plus", shortDescription: "Tài khoản ChatGPT Plus nâng cấp trên chính email của bạn. Dùng GPT-4, DALL-E 3.", imageUrl: "", basePrice: 450000, priceMode: "fixed" as const, badge: "HOT" },
  { id: "2", name: "YouTube Premium 1 Năm", slug: "youtube-premium-1y", shortDescription: "Xem YouTube không quảng cáo, nghe nhạc nền. Nâng cấp chính chủ gói Family.", imageUrl: "", basePrice: 299000, priceMode: "fixed" as const },
  { id: "3", name: "Netflix Premium Slot", slug: "netflix-slot", shortDescription: "1 Profile riêng tư, xem chuẩn 4K trên mọi thiết bị.", imageUrl: "", basePrice: 65000, priceMode: "fixed" as const, badge: "Best Seller" },
  { id: "4", name: "Canva Pro Education", slug: "canva-pro", shortDescription: "Nâng cấp tài khoản Canva Pro vĩnh viễn với tư cách giáo viên.", imageUrl: "", basePrice: 99000, priceMode: "fixed" as const },
  { id: "5", name: "Google Drive 2TB / 5TB", slug: "google-drive", shortDescription: "Lưu trữ không giới hạn thời gian. Thêm dung lượng trực tiếp vào mail chính.", imageUrl: "", basePrice: 0, priceMode: "contact" as const },
  { id: "6", name: "Cursor Pro / Github Copilot", slug: "cursor-copilot", shortDescription: "Công cụ hỗ trợ code AI đắc lực nhất cho lập trình viên.", imageUrl: "", basePrice: 350000, priceMode: "fixed" as const },
  { id: "7", name: "Midjourney Stand", slug: "midjourney", shortDescription: "Tạo ảnh AI không giới hạn với Midjourney.", imageUrl: "", basePrice: 300000, priceMode: "fixed" as const },
  { id: "8", name: "Spotify Premium", slug: "spotify", shortDescription: "Nghe nhạc không quảng cáo chất lượng cao.", imageUrl: "", basePrice: 40000, priceMode: "fixed" as const },
]

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container py-4 flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Trang chủ</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Tất cả sản phẩm</span>
        </div>
      </div>

      <main className="container flex-1 py-8 flex flex-col lg:flex-row gap-8">
        <Sidebar />
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Tất cả sản phẩm (8)</h1>
            
            <div className="flex w-full md:w-auto items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Tìm kiếm..." className="pl-9 bg-white" />
              </div>
              <select className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500">
                <option>Mới nhất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Bán chạy</option>
              </select>
              <Button variant="outline" size="icon" className="md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>&lt;</Button>
              <Button variant="default" size="icon" className="bg-blue-600 text-white hover:bg-blue-700">1</Button>
              <Button variant="ghost" size="icon">2</Button>
              <Button variant="outline" size="icon">&gt;</Button>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
