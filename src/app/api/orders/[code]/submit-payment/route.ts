import { NextResponse } from 'next/server'
import { sendOrderPaymentSubmittedToSheet } from '@/lib/googleSheets'

export async function POST(request: Request, { params }: { params: { code: string } }) {
  try {
    const { code } = params
    
    // 1. Update in DB: orderStatus = payment_submitted, paymentStatus = submitted
    // await prisma.order.update({ ... })

    // 2. Fire webhook to Google Sheets
    sendOrderPaymentSubmittedToSheet(code).catch(console.error)

    // 3. Return success
    return NextResponse.json({ success: true, message: "Payment marked as submitted" })
    
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: "Failed to submit payment" }, { status: 500 })
  }
}
