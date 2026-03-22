"use client"

import Link from "next/link"
import { MonitorPlay, Cloud, Video, ShieldCheck, Code, Cpu } from "lucide-react"

const categories = [
  { id: "ai", name: "AI & Chatbot", icon: <Cpu className="h-4 w-4" />, count: 12 },
  { id: "cloud", name: "Lưu trữ & Cloud", icon: <Cloud className="h-4 w-4" />, count: 8 },
  { id: "video", name: "Giải trí & Video", icon: <MonitorPlay className="h-4 w-4" />, count: 15 },
  { id: "creative", name: "Thiết kế & Sáng tạo", icon: <Video className="h-4 w-4" />, count: 6 },
  { id: "vpn", name: "VPN & Bảo mật", icon: <ShieldCheck className="h-4 w-4" />, count: 10 },
  { id: "dev", name: "Developer Tools", icon: <Code className="h-4 w-4" />, count: 5 },
]

export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:block shrink-0">
      <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 font-semibold text-gray-900 px-2 text-sm uppercase tracking-wider">Danh mục sản phẩm</h3>
        <nav className="flex flex-col space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-blue-600">{category.icon}</span>
                {category.name}
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{category.count}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="mb-4 font-semibold text-gray-900 px-2 text-sm uppercase tracking-wider">Hỗ trợ 24/7</h3>
          <div className="space-y-3 px-2">
            <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Zalo: 0987.654.321
            </a>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              Telegram: @mmoservices
            </a>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <div className="h-2 w-2 rounded-full bg-blue-800"></div>
              Fanpage Facebook
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
