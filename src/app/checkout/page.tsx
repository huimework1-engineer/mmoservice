"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/Card"

export default function CheckoutPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    telegram: "",
    notes: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to success page with a fake order code
      router.push("/order/MMO-260322-ABC12")
    }, 1500)
  }

  // Fake cart details for UI demo
  const cartItem = {
    name: "ChatGPT Plus Chính Chủ",
    variantName: "1 Tháng",
    price: 450000,
    quantity: 1
  }

  const total = cartItem.price * cartItem.quantity

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container flex-1 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Thanh toán & Đặt hàng</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin người mua</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Họ và tên *</label>
                      <Input 
                        required 
                        placeholder="Nhập họ và tên..." 
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Số điện thoại *</label>
                      <Input 
                        required 
                        type="tel"
                        placeholder="Nhập SĐT..." 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email nhận tài khoản *</label>
                      <Input 
                        required 
                        type="email"
                        placeholder="Nhập email..." 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Zalo / Telegram (Tuỳ chọn)</label>
                      <Input 
                        placeholder="Để tiện liên hệ hỗ trợ..." 
                        value={formData.telegram}
                        onChange={e => setFormData({...formData, telegram: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ghi chú đơn hàng (Tuỳ chọn)</label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      placeholder="Ghi chú thêm về yêu cầu của bạn..."
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-medium text-gray-900">{cartItem.name}</div>
                    <div className="text-sm text-gray-500">Gói: {cartItem.variantName}</div>
                    <div className="text-sm text-gray-500">SL: {cartItem.quantity}</div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartItem.price)}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tạm tính</span>
                    <span className="font-medium text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Tổng tiền</span>
                    <span className="text-blue-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận & Đặt hàng"}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  Bằng cách đặt hàng, bạn đồng ý với Điều khoản dịch vụ của chúng tôi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
