"use client"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Search, Filter, Eye, Download, Printer } from "lucide-react"
import { Input } from "@/components/ui/Input"

export default function AdminOrdersPage() {
  const orders = [
    { id: "MMO-260322-A1B2", date: "22/03/2026 10:30", customer: "Nguyễn Văn A", phone: "0987654321", product: "ChatGPT Plus (1 Tháng)", amount: "450,000đ", pStatus: "paid", status: "completed" },
    { id: "MMO-260322-B3C4", date: "22/03/2026 09:15", customer: "Trần Thị B", phone: "0912345678", product: "YouTube Premium", amount: "299,000đ", pStatus: "unpaid", status: "pending" },
    { id: "MMO-260322-C5D6", date: "22/03/2026 08:45", customer: "Lê Văn C", phone: "0901234567", product: "Netflix Slot", amount: "65,000đ", pStatus: "submitted", status: "processing" },
    { id: "MMO-260321-D7E8", date: "21/03/2026 21:20", customer: "Phạm Thị D", phone: "0888999111", product: "Canva Pro Edu", amount: "99,000đ", pStatus: "paid", status: "completed" },
    { id: "MMO-260321-E9F0", date: "21/03/2026 15:10", customer: "Hoàng Văn E", phone: "0777888999", product: "Google Drive 2TB", amount: "Liên hệ", pStatus: "paid", status: "cancelled" },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
              <p className="text-sm text-gray-500 mt-1">Theo dõi, duyệt thanh toán và giao hàng.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 gap-2">
                <Download className="w-4 h-4" /> Xuất Excel
              </Button>
            </div>
          </div>

          <Card className="border-none shadow-sm shadow-gray-200/50">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between bg-white rounded-t-xl">
              <div className="relative w-full lg:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Tìm mã đơn, SĐT hoặc Tên khách hàng..." className="pl-9 h-10 border-gray-200 focus:border-blue-500 shadow-sm" />
              </div>
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <select className="h-10 px-3 rounded-md border border-gray-200 text-sm text-gray-600 bg-white outline-none focus:border-blue-500">
                  <option>Tất cả trạng thái</option>
                  <option>Chờ xử lý (Mới)</option>
                  <option>Đang xử lý</option>
                  <option>Hoàn thành</option>
                </select>
                <select className="h-10 px-3 rounded-md border border-gray-200 text-sm text-gray-600 bg-white outline-none focus:border-blue-500">
                  <option>Thanh toán: Tất cả</option>
                  <option>Chưa thanh toán</option>
                  <option>Đã gửi bill</option>
                  <option>Đã xác nhận</option>
                </select>
                <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200 bg-gray-50 text-gray-600">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left align-middle">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Mã đơn / Ngày</th>
                    <th className="px-6 py-4 font-semibold">Khách hàng</th>
                    <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                    <th className="px-6 py-4 font-semibold text-right">Tổng tiền</th>
                    <th className="px-6 py-4 font-semibold text-center">Thanh toán</th>
                    <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                    <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="px-6 py-4">
                        <div className="font-bold text-blue-600 cursor-pointer hover:underline">{o.id}</div>
                        <div className="text-xs text-gray-400 mt-1">{o.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{o.customer}</div>
                        <div className="text-xs text-gray-500 mt-1">{o.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700 font-medium line-clamp-1">{o.product}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 text-right">{o.amount}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 text-[11px] font-bold uppercase rounded ${
                          o.pStatus === 'paid' ? 'bg-green-100 text-green-700' :
                          o.pStatus === 'submitted' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {o.pStatus === 'paid' ? 'Đã TT' : o.pStatus === 'submitted' ? 'Sent Bill' : 'Chưa TT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1.5 text-xs font-semibold rounded-md inline-block w-24 text-center ${
                          o.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          o.status === 'processing' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          o.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          'bg-yellow-50 text-yellow-600 border border-yellow-100'
                        }`}>
                          {o.status === 'completed' ? 'Hoàn thành' : o.status === 'processing' ? 'Đang xử lý' : o.status === 'cancelled' ? 'Đã huỷ' : 'Mới'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-full" title="Xem chi tiết">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full" title="In hoá đơn">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl flex items-center justify-between text-sm">
              <div className="text-gray-500">Hiển thị <span className="font-medium text-gray-900">1</span> đến <span className="font-medium text-gray-900">5</span> của <span className="font-medium text-gray-900">128</span> đơn hàng</div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 border-gray-200" disabled>Trước</Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white">1</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600">2</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600">3</Button>
                <Button variant="outline" size="sm" className="h-8 border-gray-200">Sau</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
