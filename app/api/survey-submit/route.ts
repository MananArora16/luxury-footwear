import { NextRequest, NextResponse } from "next/server"

const SPREADSHEET_ID = "1RZAQ8Uoy9VwEb4xdHMU71zP9Q6eWRifg6JB0Sx8OXL4"
const SHEET_NAME = "Sheet1"

interface GoogleServiceAccount {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
}

async function getAccessToken(): Promise<string> {
  try {
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n")
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const projectId = process.env.GOOGLE_PROJECT_ID

    if (!privateKey || !email) {
      throw new Error("Missing Google Cloud credentials")
    }

    const header = {
      alg: "RS256",
      typ: "JWT",
    }

    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: email,
      sub: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }

    // Simple JWT creation (for production, use a proper JWT library)
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    const message = `${encodedHeader}.${encodedPayload}`

    // Using crypto to sign
    const crypto = await import("crypto")
    const sign = crypto.createSign("RSA-SHA256")
    sign.update(message)
    sign.end()
    const signature = sign.sign(privateKey, "base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")

    const jwt = `${message}.${signature}`

    // Exchange JWT for access token
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }).toString(),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${data.error_description || data.error}`)
    }

    return data.access_token
  } catch (error) {
    console.error("[Survey API] Token error:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[Survey API] Received submission request")
    const { answers, surveyQuestions } = await request.json()
    console.log("[Survey API] Parsed request body successfully")

    // Get access token
    console.log("[Survey API] Getting access token...")
    const accessToken = await getAccessToken()
    console.log("[Survey API] Access token obtained successfully")

    // Prepare the row values
    const rowValues = [
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      ...surveyQuestions.map((q: any) => {
        const answer = answers[q.id]
        const option = q.options.find((opt: any) => opt.value === answer)
        return option?.label || answer || "Not Answered"
      }),
    ]

    console.log("[Survey API] Row values prepared:", rowValues)

    // First, try to append the values
    console.log("[Survey API] Appending values to sheet...")

    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:Z:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    )

    const appendData = await appendResponse.json()

    if (!appendResponse.ok) {
      console.error("[Survey API] Append error:", appendData)
      // If append fails, it might be because headers don't exist, so let's add them
      if (appendData.error?.message?.includes("Unable to parse")) {
        console.log("[Survey API] Setting up headers...")

        const headers = [
          "Timestamp",
          ...surveyQuestions.map((q: any) => q.question),
        ]

        const headerResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:Z1?valueInputOption=USER_ENTERED`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [headers],
            }),
          }
        )

        if (!headerResponse.ok) {
          throw new Error("Failed to set headers")
        }

        // Now append the data
        const retryAppendResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:Z:append?valueInputOption=USER_ENTERED`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [rowValues],
            }),
          }
        )

        if (!retryAppendResponse.ok) {
          throw new Error("Failed to append data after setting headers")
        }
      } else {
        throw new Error(appendData.error?.message || "Failed to append data")
      }
    }

    console.log("[Survey API] Row appended successfully to Google Sheet")

    return NextResponse.json(
      { success: true, message: "Survey submitted successfully and stored in Google Sheet" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[Survey API] ERROR:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    console.error("[Survey API] Error message:", errorMessage)
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
