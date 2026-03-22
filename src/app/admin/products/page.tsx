"use client"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Plus, Search, Filter, MoreHorizontal, Edit, Target, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/Input"

export default function AdminProductsPage() {
  const products = [
    { id: 1, name: "ChatGPT Plus Chính Chủ", category: "AI & Chatbot", price: "450,000đ", stock: 100, status: "active" },
    { id: 2, name: "YouTube Premium 1 Năm", category: "Giải trí & Video", price: "299,000đ", stock: -1, status: "active" },
    { id: 3, name: "Netflix Premium Slot", category: "Giải trí & Video", price: "65,000đ", stock: 50, status: "active" },
    { id: 4, name: "Google Drive Không Giới Hạn", category: "Lưu trữ Cloud", price: "Liên hệ", stock: -1, status: "hidden" },
    { id: 5, name: "Cursor Pro Lập Trình", category: "Developer Tools", price: "350,000đ", stock: 12, status: "active" },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
              <p className="text-sm text-gray-500 mt-1">Quản lý danh mục, hàng hoá và các biến thể giá.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2 shrink-0 shadow-sm shadow-blue-600/20">
              <Plus className="w-5 h-5" /> Thêm sản phẩm mới
            </Button>
          </div>

          <Card className="border-none shadow-sm shadow-gray-200/50">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-t-xl">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Tìm tên sản phẩm..." className="pl-9 h-9 border-gray-200 focus:border-blue-500" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <select className="h-9 px-3 rounded-md border border-gray-200 text-sm text-gray-600 bg-white outline-none w-full sm:w-auto focus:border-blue-500 transition-colors">
                  <option>Tất cả danh mục</option>
                  <option>AI & Chatbot</option>
                  <option>Giải trí</option>
                </select>
                <Button variant="outline" size="sm" className="h-9 border-gray-200 bg-gray-50 text-gray-600 gap-2">
                  <Filter className="w-4 h-4" /> Lọc
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left align-middle">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold w-12"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" /></th>
                    <th className="px-6 py-4 font-semibold">Tên sản phẩm</th>
                    <th className="px-6 py-4 font-semibold">Danh mục</th>
                    <th className="px-6 py-4 font-semibold">Giá cơ bản</th>
                    <th className="px-6 py-4 font-semibold text-center">Tồn kho</th>
                    <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                    <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors bg-white">
                      <td className="px-6 py-4"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-gray-300" /></td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{p.name}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                          ID: PROD-{p.id} 
                          <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                          3 Gói (Variants)
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{p.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{p.price}</td>
                      <td className="px-6 py-4 text-center">
                        {p.stock === -1 ? (
                          <span className="text-gray-400 text-xs italic">Không giới hạn</span>
                        ) : (
                          <span className={`font-semibold ${p.stock > 20 ? 'text-green-600' : 'text-orange-600'}`}>{p.stock}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.status === 'active' ? (
                          <span className="px-2.5 py-1 text-xs font-medium border rounded-md inline-flex bg-emerald-50 text-emerald-700 border-emerald-200">
                            Hiển thị
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-xs font-medium border rounded-md inline-flex bg-gray-100 text-gray-700 border-gray-200">
                            <EyeOff className="w-3 h-3 mr-1" /> Đang ẩn
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                            <Target className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                            <MoreHorizontal className="w-4 h-4" />
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
              <div className="text-gray-500">Hiển thị <span className="font-medium text-gray-900">1</span> đến <span className="font-medium text-gray-900">5</span> của <span className="font-medium text-gray-900">42</span> sản phẩm</div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 border-gray-200" disabled>Trước</Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white">1</Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 text-gray-600">2</Button>
                <Button variant="outline" size="sm" className="h-8 border-gray-200">Sau</Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
