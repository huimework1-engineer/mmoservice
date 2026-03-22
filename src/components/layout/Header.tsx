"use client"

import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">MMO<span className="text-gray-900">Services</span></span>
          </Link>
          <div className="hidden md:flex relative w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm (Netflix, Spotify...)"
              className="w-full bg-gray-100 pl-9 focus-visible:bg-white"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600">
            Tra cứu đơn hàng
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:flex text-gray-600">
            Hướng dẫn
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative text-gray-600">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                0
              </span>
            </Button>
            <Button variant="default" size="sm" className="hidden sm:flex gap-2">
              <User className="h-4 w-4" /> Đăng nhập
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
