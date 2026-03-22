/**
 * Helper to sync order data with Google Sheets via App Script Webhook
 */

const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL

export interface SheetOrderData {
  orderCode: string
  customerName: string
  phone: string
  email: string
  contactChannel: string
  productNames: string
  variantNames: string
  subtotal: number
  total: number
  orderStatus: string
  paymentStatus: string
  transferContent: string
  source: string
  note: string
  createdAt: string
  updatedAt: string
}

async function sendToWebhook(data: any) {
  if (!WEBHOOK_URL) {
    console.warn("GOOGLE_SHEET_WEBHOOK_URL is not configured - skipping sync")
    return
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Set short timeout so it doesn't block the API thread heavily
      signal: AbortSignal.timeout(5000), 
    })

    if (!res.ok) {
      console.error(`Google Sheet Webhook failed with status: ${res.status}`)
    }
  } catch (error) {
    console.error("Google Sheet Webhook Error:", error)
    // We intentionally swallow the error here so the main app/DB logic doesn't crash
  }
}

export async function sendNewOrderToSheet(order: SheetOrderData) {
  return sendToWebhook({
    event: "NEW_ORDER",
    timestamp: new Date().toISOString(),
    data: order
  })
}

export async function sendOrderPaymentSubmittedToSheet(orderCode: string) {
  return sendToWebhook({
    event: "PAYMENT_SUBMITTED",
    timestamp: new Date().toISOString(),
    data: { orderCode, paymentStatus: "submitted", orderStatus: "payment_submitted" }
  })
}

export async function sendOrderStatusChangedToSheet(orderCode: string, orderStatus: string, paymentStatus: string) {
  return sendToWebhook({
    event: "STATUS_CHANGED",
    timestamp: new Date().toISOString(),
    data: { orderCode, orderStatus, paymentStatus }
  })
}
