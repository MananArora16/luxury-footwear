import { NextRequest, NextResponse } from "next/server"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

export async function POST(request: NextRequest) {
  try {
    const { answers, surveyQuestions } = await request.json()

    // Initialize the Google Sheets document
    const doc = new GoogleSpreadsheet(
      "1RZAQ8Uoy9VwEb4xdHMU71zP9Q6eWRifg6JB0Sx8OXL4"
    )

    // Authenticate with Google Sheets API
    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    await doc.useServiceAccountAuth(jwt)
    await doc.loadInfo()

    // Get the first sheet (or create one if it doesn't exist)
    let sheet = doc.sheetsByIndex[0]

    // If sheet is empty, add headers
    if (sheet.rowCount === 1) {
      const headers = [
        "Timestamp",
        ...surveyQuestions.map((q: any) => q.question),
      ]
      await sheet.setHeaderRow(headers)
    }

    // Prepare the row data
    const rowData = [
      new Date().toISOString(),
      ...surveyQuestions.map((q: any) => {
        const answer = answers[q.id]
        const option = q.options.find((opt: any) => opt.value === answer)
        return option?.label || answer || ""
      }),
    ]

    // Add a new row
    await sheet.addRows([rowData], { insert: true })

    return NextResponse.json(
      { success: true, message: "Survey submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error submitting survey:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit survey" },
      { status: 500 }
    )
  }
}
