import { NextResponse } from 'next/server'
import { sendNewOrderToSheet } from '@/lib/googleSheets'
import { generateTransferContent } from '@/lib/qr-helper'

// Mock database interactions since Prisma isn't fully scaffolded
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 1. Process order in DB (mocked)
    const orderCode = `MMO-${Math.floor(Date.now() / 1000).toString().slice(-6)}`
    
    const newOrder = {
      orderCode,
      customerName: body.fullName,
      phone: body.phone,
      email: body.email,
      contactChannel: body.telegram || "N/A",
      productNames: "ChatGPT Plus Chính Chủ", // Mock extract from cart
      variantNames: "1 Tháng",
      subtotal: 450000,
      total: 450000,
      orderStatus: "waiting_payment",
      paymentStatus: "unpaid",
      transferContent: generateTransferContent("THANHTOAN", orderCode),
      source: "website",
      note: body.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 2. Fire webhook to Google Sheets (non-blocking)
    // Send in background so client doesn't wait
    sendNewOrderToSheet(newOrder).catch(console.error)

    // 3. Return success
    return NextResponse.json({ success: true, orderCode: newOrder.orderCode })
    
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
