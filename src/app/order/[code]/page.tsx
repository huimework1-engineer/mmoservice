"use client"

import { useParams } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Copy, AlertCircle, Clock } from "lucide-react"

export default function OrderSuccessPage() {
  const params = useParams()
  const orderCode = params.code as string

  // Mock order data
  const order = {
    code: orderCode,
    status: "pending", // pending, processing, completed
    paymentStatus: "unpaid", // unpaid, submitted, paid
    total: 450000,
    createdAt: new Date().toISOString(),
    customer: {
      name: "Nguyễn Văn A",
      email: "email@example.com",
      phone: "0987654321"
    },
    items: [
      { name: "ChatGPT Plus Chính Chủ", variant: "1 Tháng", price: 450000, qty: 1 }
    ]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã copy: " + text)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container flex-1 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Status Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-500">Cảm ơn bạn đã tin tưởng dịch vụ của MMO Services.</p>
          </div>

          <Card className="mb-8 overflow-hidden">
            {/* Status Banner */}
            <div className="bg-yellow-50 p-4 border-b border-yellow-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Đơn hàng đang chờ thanh toán</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Vui lòng thực hiện chuyển khoản để chúng tôi xử lý đơn hàng của bạn.
                </p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-100 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Mã đơn hàng</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">{order.code}</span>
                    <button onClick={() => copyToClipboard(order.code)} className="text-gray-400 hover:text-blue-600">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-500 mb-1">Tổng tiền</div>
                  <div className="text-xl font-bold text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 py-6 border-b border-gray-100">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Thông tin người nhận</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span className="text-gray-500">Họ tên:</span> <span className="font-medium">{order.customer.name}</span></li>
                    <li className="flex justify-between"><span className="text-gray-500">SDT:</span> <span className="font-medium">{order.customer.phone}</span></li>
                    <li className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-medium">{order.customer.email}</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Trạng thái</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-500">Trạng thái đơn:</span> 
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Đang xử lý</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-500">Thanh toán:</span> 
                      <Badge variant="outline" className="text-gray-500 border-gray-300">Chưa thanh toán</Badge>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-500">Thời gian:</span> 
                      <span className="font-medium">{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h4>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Gói: {item.variant} x {item.qty}</div>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/'}>
              Về trang chủ
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Clock className="w-4 h-4 mr-2" />
              Hướng dẫn thanh toán
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
