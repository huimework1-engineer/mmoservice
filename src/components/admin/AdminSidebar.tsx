"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ListTree,
  Bell
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: "/admin/orders", label: "Đơn hàng", icon: <ShoppingCart className="w-5 h-5" /> },
  { href: "/admin/products", label: "Sản phẩm", icon: <Package className="w-5 h-5" /> },
  { href: "/admin/categories", label: "Danh mục", icon: <ListTree className="w-5 h-5" /> },
  { href: "/admin/customers", label: "Khách hàng", icon: <Users className="w-5 h-5" /> },
  { href: "/admin/banners", label: "Banners", icon: <Bell className="w-5 h-5" /> },
  { href: "/admin/settings", label: "Cài đặt", icon: <Settings className="w-5 h-5" /> },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col text-slate-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <span className="text-xl font-bold text-white tracking-widest">
          ADMIN<span className="text-blue-500">PRO</span>
        </span>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Admin</span>
            <span className="text-xs text-slate-400 cursor-pointer hover:text-white underline decoration-dotted">Đăng xuất</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
