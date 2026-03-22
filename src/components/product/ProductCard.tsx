import Link from "next/link"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter } from "../ui/Card"

export interface ProductCardProps {
  id: string
  name: string
  slug: string
  shortDescription: string
  imageUrl: string
  basePrice: number
  priceMode: "fixed" | "contact"
  badge?: string | null
}

export default function ProductCard({
  id,
  name,
  slug,
  shortDescription,
  imageUrl,
  basePrice,
  priceMode,
  badge,
}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md hover:border-blue-200 group">
      <Link href={`/products/${slug}`} className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 group-hover:scale-105 transition-transform duration-300">
          <span className="text-sm">Image: {name}</span>
        </div>
        {badge && (
          <Badge className="absolute left-2 top-2 z-10" variant="destructive">
            {badge}
          </Badge>
        )}
      </Link>
      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 mb-1">
          <Link href={`/products/${slug}`} className="hover:text-blue-600 transition-colors">
            {name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500 mb-4 flex-1">
          {shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between">
          <div className="font-bold text-gray-900">
            {priceMode === "fixed" ? (
              <span className="text-blue-600 font-bold text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(basePrice)}</span>
            ) : (
              <span className="text-orange-500 font-bold">Liên hệ</span>
            )}
            {priceMode === "fixed" && <span className="text-xs text-gray-500 font-normal ml-1">/tháng</span>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
          Chi tiết
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Mua ngay
        </Button>
      </CardFooter>
    </Card>
  )
}
