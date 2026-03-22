"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ShieldCheck } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login success
    router.push("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 w-full">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Đăng nhập vào hệ thống quản trị</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Admin</label>
              <Input required type="email" placeholder="admin@mmo.vn" defaultValue="admin@mmo.vn" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
              <Input required type="password" placeholder="••••••••" defaultValue="admin123" />
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 mt-2">
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
