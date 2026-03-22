"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { CheckCircle2, Copy, AlertCircle, RefreshCw, SmartphoneNfc } from "lucide-react"

// Import our QR helper (will be executed client side or we can fetch a generated URL)
import { generateQrUrl, generateTransferContent } from "@/lib/qr-helper"

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const orderCode = params.code as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)

  // Mock settings that would normally come from DB/Server
  const bankSettings = {
    bankName: "MB Bank - Ngan hang quan doi",
    bankCode: "MB",
    accountNumber: "123456789",
    accountName: "NGUYEN VAN A",
    amount: 450000, // From order
    transferPrefix: "THANHTOAN",
  }

  const transferContent = generateTransferContent(bankSettings.transferPrefix, orderCode)
  
  const qrUrl = generateQrUrl({
    bankCode: bankSettings.bankCode,
    accountNumber: bankSettings.accountNumber,
    accountName: bankSettings.accountName,
    amount: bankSettings.amount,
    transferContent: transferContent
  })

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    // Replace with a proper Toast in production
    alert(`Đã copy ${label}: ` + text)
  }

  const handleSubmitPayment = async () => {
    setIsSubmitting(true)
    
    try {
      // In real app, call API:
      // await fetch(`/api/orders/${orderCode}/submit-payment`, { method: "POST" })
      
      // Simulate API latency
      await new Promise(r => setTimeout(r, 1500))
      
      setPaymentSubmitted(true)
      
      // Automatically redirect to success/status page after 3 seconds
      setTimeout(() => {
        router.push(`/order/${orderCode}`)
      }, 3000)
    } catch (e) {
      alert("Có lỗi xảy ra, vui lòng thử lại!")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container flex-1 py-12">
        <div className="max-w-2xl mx-auto">
          {paymentSubmitted ? (
            <div className="text-center py-12">
              <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Đã xác nhận thanh toán!</h1>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Hệ thống đang kiểm tra tự động. Nếu đúng thông tin, đơn hàng của bạn sẽ được kích hoạt ngay lập tức.
              </p>
              <Button onClick={() => router.push(`/order/${orderCode}`)}>
                Xem trạng thái đơn hàng
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Thanh toán đơn hàng</h1>
                <p className="text-gray-500 mt-2">Mã đơn: <span className="font-bold text-gray-900">{orderCode}</span></p>
              </div>

              <Card className="overflow-hidden border-2 border-blue-100 shadow-md">
                <div className="bg-blue-600 p-4 text-center text-white flex justify-center items-center gap-2">
                  <SmartphoneNfc className="w-5 h-5" />
                  <span className="font-medium">Quét mã QR qua ứng dụng ngân hàng</span>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    
                    {/* QR Code Section */}
                    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full md:w-1/2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qrUrl} alt="Mã QR Thanh Toán" className="w-48 h-48 mb-4 object-contain" />
                      <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Sử dụng tính năng Quét mã QR
                      </div>
                    </div>

                    {/* Manual Transfer Info */}
                    <div className="w-full md:w-1/2 space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Ngân hàng</label>
                        <div className="font-semibold text-gray-900 text-sm md:text-base">{bankSettings.bankName}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Chủ tài khoản</label>
                        <div className="font-semibold text-gray-900">{bankSettings.accountName}</div>
                      </div>

                      <div className="space-y-1 relative group">
                        <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Số tài khoản</label>
                        <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-1">
                          <span className="font-bold text-xl text-blue-600 tracking-wider font-mono">{bankSettings.accountNumber}</span>
                          <button 
                            onClick={() => copyToClipboard(bankSettings.accountNumber, "Số tài khoản")}
                            className="text-gray-400 hover:text-blue-600 p-1 bg-gray-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Số tiền cần chuyển</label>
                        <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-1">
                          <span className="font-bold text-xl text-red-600">
                            {new Intl.NumberFormat('vi-VN').format(bankSettings.amount)} đ
                          </span>
                          <button 
                            onClick={() => copyToClipboard(bankSettings.amount.toString(), "Số tiền")}
                            className="text-gray-400 hover:text-blue-600 p-1 bg-gray-50 rounded"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 mt-4">
                        <label className="text-xs text-amber-700 uppercase font-bold tracking-wider mb-1 block">
                          Nội dung chuyển khoản (Bắt buộc)
                        </label>
                        <div className="flex items-center justify-between bg-white rounded border border-amber-200 p-2">
                          <span className="font-bold text-lg text-gray-900 font-mono select-all tracking-wider">
                            {transferContent}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(transferContent, "Nội dung")}
                            className="text-gray-500 hover:text-blue-600 p-1.5 bg-gray-50 rounded shadow-sm border border-gray-200"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-amber-800 mt-1.5">
                          ⚠️ Nhập chính xác nội dung trên để hệ thống nạp tự động nhanh nhất!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col items-center">
                <Button 
                  size="lg" 
                  className="w-full sm:w-80 h-14 text-base font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20"
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Đang xử lý...</>
                  ) : (
                    "Tôi Đã Chuyển Khoản"
                  )}
                </Button>
                <p className="text-xs text-gray-500 mt-4 max-w-md text-center">
                  Bấm nút xác nhận sau khi bạn đã chuyển khoản thành công. Tuỳ thuộc ngân hàng, quá trình xác nhận tự động có thể mất từ 1-5 phút.
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
