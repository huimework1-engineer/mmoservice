/**
 * MMO Services Platform - Google Sheets Webhook
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Sheets -> Extensions -> Apps Script
 * 2. Copy and paste this code into Code.gs
 * 3. Change YOUR_SHEET_NAME if needed (default is 'Orders')
 * 4. Click Deploy -> New Deployment
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Copy the Web App URL and paste it into GOOGLE_SHEET_WEBHOOK_URL in .env
 */

const SHEET_NAME = 'Orders';

function doPost(e) {
  try {
    // Check if post data exists
    if (!e || !e.postData || !e.postData.contents) {
      return responseJson({ success: false, error: "No post data" }, 400);
    }
    
    // Parse the JSON payload sent from Next.js backend
    const payload = JSON.parse(e.postData.contents);
    const eventType = payload.event;
    const data = payload.data;
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Initialize sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      const headers = [
        "Order Code", "Customer Name", "Phone", "Email", "Contact Channel", 
        "Products", "Variants", "Subtotal", "Total", "Order Status", 
        "Payment Status", "Transfer Content", "Source", "Notes", "Created At", "Updated At"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f4f6");
    }

    if (eventType === "NEW_ORDER") {
      // Append a new row for a new order
      sheet.appendRow([
        data.orderCode || "",
        data.customerName || "",
        data.phone || "",
        data.email || "",
        data.contactChannel || "",
        data.productNames || "",
        data.variantNames || "",
        data.subtotal || 0,
        data.total || 0,
        data.orderStatus || "pending",
        data.paymentStatus || "unpaid",
        data.transferContent || "",
        data.source || "",
        data.note || "",
        data.createdAt || new Date().toISOString(),
        data.updatedAt || new Date().toISOString()
      ]);
      
      return responseJson({ success: true, message: "Order stored" }, 200);
      
    } else if (eventType === "PAYMENT_SUBMITTED" || eventType === "STATUS_CHANGED") {
      // Find the row with the matching order code and update it
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      const orderCodeColumn = 0; // Column A (0-indexed array)
      
      let updated = false;
      
      for (let i = 1; i < values.length; i++) {
        if (values[i][orderCodeColumn] === data.orderCode) {
          // Found the order! Update row (i + 1 because Sheets is 1-indexed)
          
          if (data.orderStatus) {
            // Order Status is column J (index 10)
            sheet.getRange(i + 1, 10).setValue(data.orderStatus);
          }
          if (data.paymentStatus) {
            // Payment Status is column K (index 11)
            sheet.getRange(i + 1, 11).setValue(data.paymentStatus);
          }
          
          // Update the "Updated At" column P (index 16)
          sheet.getRange(i + 1, 16).setValue(new Date().toISOString());
          
          updated = true;
          break;
        }
      }
      
      if (updated) {
        return responseJson({ success: true, message: "Order updated" }, 200);
      } else {
        return responseJson({ success: false, error: "Order not found" }, 404);
      }
    }
    
    return responseJson({ success: false, error: "Unknown event type" }, 400);
    
  } catch (error) {
    // Return formatted error so our backend logs it properly
    return responseJson({ success: false, error: error.toString() }, 500);
  }
}

/**
 * Helper to return strict JSON response format required by ContentService
 */
function responseJson(body, statusCode) {
  const result = ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
    
  return result;
}
