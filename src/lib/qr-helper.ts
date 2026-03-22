export interface QrConfig {
  bankCode: string // e.g. "VCB", "MB", "TCB", or BIN
  accountNumber: string
  accountName: string
  amount: number
  transferContent: string
}

/**
 * Generate VietQR URL for quick bank transfer
 * Format uses vietqr.io free API
 */
export function generateQrUrl(config: QrConfig): string {
  const { bankCode, accountNumber, accountName, amount, transferContent } = config
  
  // Format based on standard VietQR url structure
  // Using vietqr.io API format: https://img.vietqr.io/image/{bank_bin}-{bank_acc}-{template}.png
  // Example: https://img.vietqr.io/image/mbbank-123456789-compact2.png
  
  const baseUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png`
  
  const params = new URLSearchParams({
    amount: amount.toString(),
    addInfo: transferContent,
    accountName: accountName,
  })

  return `${baseUrl}?${params.toString()}`
}

/**
 * Generate standard transfer content prefix + order code
 */
export function generateTransferContent(prefix: string, orderCode: string): string {
  // Removes MMO/dashes if we want it short, or just keep it
  // Example: THANHTOAN MMO12345
  return `${prefix || "TT"} ${orderCode}`.toUpperCase()
}
