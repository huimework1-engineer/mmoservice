"use client"

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Save, Wallet, Link as LinkIcon, AlertCircle } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cài đặt Hệ thống</h1>
              <p className="text-sm text-gray-500 mt-1">Cấu hình thanh toán, webhook và hiển thị.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm gap-2">
              <Save className="w-4 h-4" /> Lưu cấu hình
            </Button>
          </div>

          <div className="max-w-4xl space-y-8">
            {/* Payment Settings */}
            <Card className="border-none shadow-sm shadow-gray-200/50">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-white rounded-t-xl">
                <Wallet className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold text-gray-900">Cấu hình Thanh toán / Ngân hàng</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên ngân hàng (Bank Name)</label>
                    <Input defaultValue="MB Bank - Ngân hàng Quân đội" placeholder="Ví dụ: Vietcombank" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mã ngân hàng (Bank Code/BIN)</label>
                    <Input defaultValue="MB" placeholder="Mã theo chuẩn VietQR (VD: MB, VCB, 970422)" />
                    <p className="text-xs text-gray-500">Mã này dùng để sinh API QR tự động qua vietqr.io</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Số tài khoản</label>
                    <Input defaultValue="123456789" placeholder="Nhập số tài khoản..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên chủ tài khoản</label>
                    <Input defaultValue="NGUYEN VAN A" placeholder="VIET HOA KHONG DAU" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Tiền tố nội dung CK (Default Prefix)</label>
                    <Input defaultValue="THANHTOAN" placeholder="MMO, THANHTOAN..." />
                    <p className="text-xs text-gray-500">Người dùng sẽ chuyển khoản với cú pháp: <strong>[PREFIX] [MÃ_ĐƠN]</strong> (Ví dụ: THANHTOAN MMO-12345)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Settings */}
            <Card className="border-none shadow-sm shadow-gray-200/50">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-white rounded-t-xl">
                <LinkIcon className="w-5 h-5 text-gray-400" />
                <h2 className="font-bold text-gray-900">Tích hợp Webhook & APIs</h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Tích hợp Google Sheets:</strong> Khi điền URL Webhook dưới đây, hệ thống sẽ tự động đồng bộ đơn hàng mới và trạng thái thanh toán sang Google Sheets ngay lập tức. Hãy làm theo tài liệu hướng dẫn để tạo Apps Script Webhook.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Google Sheet Webhook URL (Apps Script)</label>
                    <Input 
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec" 
                      defaultValue="https://script.google.com/macros/s/AKfycbDemoABC123/exec"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
