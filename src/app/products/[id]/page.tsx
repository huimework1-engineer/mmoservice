"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ShieldCheck, CheckCircle2 } from "lucide-react"

// Mock detail data
const productDetail = {
  id: "1",
  name: "ChatGPT Plus Chính Chủ",
  slug: "chatgpt-plus",
  category: "AI & Chatbot",
  badge: "HOT",
  longDescription: "Sở hữu tài khoản ChatGPT Plus chính chủ trên chính email của bạn. Tận hưởng sức mạnh của GPT-4, DALL-E 3 tạo ảnh, duyệt web thực tế, và plugin đa dạng. \n\n✅ Nâng cấp trực tiếp trên email của bạn\n✅ Bảo hành 1 đổi 1 trong thời gian sử dụng\n✅ Gia hạn tự động nếu cần\n✅ Support 24/7 nhiệt tình",
  imageUrl: "",
  priceMode: "fixed",
  variants: [
    { id: "v1", name: "1 Tháng", price: 450000, durationLabel: "1 Tháng", stock: 100, warrantyNote: "Bảo hành 1 đổi 1 trong 30 ngày" },
    { id: "v2", name: "3 Tháng", price: 1300000, durationLabel: "3 Tháng", stock: 50, warrantyNote: "Bảo hành 1 đổi 1 trong 90 ngày" },
    { id: "v3", name: "6 Tháng", price: 2500000, durationLabel: "6 Tháng", stock: 10, warrantyNote: "Bảo hành 1 đổi 1 trong 180 ngày" },
  ]
}

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedVariantId, setSelectedVariantId] = useState(productDetail.variants[0].id)
  
  const selectedVariant = productDetail.variants.find(v => v.id === selectedVariantId) || productDetail.variants[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container py-4 flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Trang chủ</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-blue-600">Sản phẩm</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{productDetail.name}</span>
        </div>
      </div>

      <main className="container flex-1 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center">
                 <span className="text-xl font-bold text-gray-400">Hình ảnh minh hoạ</span>
                 <span className="text-sm text-gray-400">{productDetail.name}</span>
               </div>
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className={`aspect-square rounded-lg bg-gray-100 border-2 cursor-pointer ${i === 1 ? 'border-blue-600' : 'border-transparent'}`} />
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <Badge variant="secondary" className="mr-2">{productDetail.category}</Badge>
              {productDetail.badge && <Badge variant="destructive">{productDetail.badge}</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{productDetail.name}</h1>
            
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="text-4xl font-bold text-blue-600">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedVariant.price)}
              </div>
            </div>

            {/* Variants */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Chọn gói / Thời hạn</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {productDetail.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`relative p-3 rounded-xl border text-left transition-all ${
                      selectedVariantId === variant.id 
                        ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" 
                        : "border-gray-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{variant.name}</div>
                    <div className="text-sm text-blue-600 font-semibold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.price)}
                    </div>
                    {selectedVariantId === variant.id && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Features & Warranty Note */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Chính sách bảo hành</h4>
                  <p className="text-sm text-gray-600">{selectedVariant.warrantyNote}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <Button size="lg" variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                Nhắn Zalo Tư Vấn
              </Button>
              <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20">
                Mua Ngay
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Chi tiết sản phẩm</h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            {productDetail.longDescription.split('\n').map((line, i) => (
              <p key={i} className="mb-4">{line}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
