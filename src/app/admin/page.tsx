"use client"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { 
  Users, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp,
  PackageCheck,
  Clock
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { title: "Tổng doanh thu", value: "128,500,000 đ", change: "+12.5%", icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
    { title: "Đơn hàng mới", value: "34", change: "+5.2%", icon: <ShoppingCart className="w-5 h-5 text-emerald-600" /> },
    { title: "Chờ thanh toán", value: "12", change: "-2.4%", icon: <Clock className="w-5 h-5 text-amber-600" /> },
    { title: "Khách hàng", value: "1,245", change: "+18.1%", icon: <Users className="w-5 h-5 text-purple-600" /> },
  ]

  const recentOrders = [
    { id: "MMO-260322-A1B2", customer: "Nguyễn Văn A", product: "ChatGPT Plus Chính Chủ", amount: 450000, status: "completed", date: "10:30 22/03/2026" },
    { id: "MMO-260322-B3C4", customer: "Trần Thị B", product: "YouTube Premium 1 Năm", amount: 299000, status: "pending", date: "09:15 22/03/2026" },
    { id: "MMO-260322-C5D6", customer: "Lê Văn C", product: "Netflix Premium Slot", amount: 65000, status: "processing", date: "08:45 22/03/2026" },
    { id: "MMO-260321-D7E8", customer: "Phạm Thị D", product: "Canva Pro Education", amount: 99000, status: "completed", date: "21:20 21/03/2026" },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Tổng quan tình hình kinh doanh hôm nay.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white px-3 py-1.5 border border-gray-200 rounded-md shadow-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm shadow-gray-200/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                      <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className={stat.change.startsWith('+') ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400 ml-2">so với tháng trước</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders Table */}
            <Card className="lg:col-span-2 border-none shadow-sm shadow-gray-200/50">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-gray-400" /> Đơn hàng gần đây
                </h3>
                <a href="/admin/orders" className="text-sm text-blue-600 font-medium hover:underline">Xem tất cả</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Mã đơn</th>
                      <th className="px-6 py-4 font-semibold">Khách hàng</th>
                      <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                      <th className="px-6 py-4 font-semibold text-right">Tổng tiền</th>
                      <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-600">{order.product}</td>
                        <td className="px-6 py-4 text-right font-medium">
                          {new Intl.NumberFormat('vi-VN').format(order.amount)}đ
                        </td>
                        <td className="px-6 py-4 pr-6 flex justify-center">
                          <span className={`px-2.5 py-1 text-xs font-medium border rounded-md inline-flex items-center gap-1.5 ${
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            order.status === 'processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' ? 'bg-emerald-500' : order.status === 'processing' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                            {order.status === 'completed' ? 'Đã giao' : order.status === 'processing' ? 'Đang XL' : 'Chờ TT'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Top Selling Products */}
            <Card className="border-none shadow-sm shadow-gray-200/50">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-gray-400" /> Bán chạy nhất
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { name: "Netflix Premium Slot", sales: 145, revenue: "9.4M" },
                  { name: "ChatGPT Plus", sales: 86, revenue: "38.7M" },
                  { name: "YouTube Premium", sales: 72, revenue: "21.5M" },
                  { name: "Canva Pro Edu", sales: 54, revenue: "5.3M" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.sales} lượt bán</p>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-blue-600">{item.revenue}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
