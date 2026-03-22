import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect /admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // In a real app, verify the JWT token from cookies here
    const token = request.cookies.get('admin-token')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
