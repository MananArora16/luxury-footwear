# Google Sheets Integration Setup Guide

## Step 1: Install Required Packages

Run the following command to install the Google Sheets API packages:

```bash
npm install google-spreadsheet google-auth-library
# or with pnpm
pnpm add google-spreadsheet google-auth-library
```

## Step 2: Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in the service account name and click "Create"
   - Skip optional steps and click "Done"
5. Create and Download Service Account Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON" format
   - Click "Create" - this will download a JSON file

## Step 3: Configure Environment Variables

1. Open the downloaded JSON file and copy:
   - `client_email` - this is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` - this is your `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

2. Create or update `.env.local` in your project root:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the private key as a single line string with `\n` for newlines.

## Step 4: Share the Google Sheet with Service Account

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1RZAQ8Uoy9VwEb4xdHMU71zP9Q6eWRifg6JB0Sx8OXL4/edit
2. Click "Share" button
3. Add the service account email as an editor:
   - Paste the `GOOGLE_SERVICE_ACCOUNT_EMAIL` value
   - Select "Editor" role
   - Click "Share"

## Step 5: Set Up Sheet Headers (Optional)

The API will automatically create headers on the first submission:
- Column A: Timestamp
- Column B onwards: Each survey question

Or you can manually add headers in the first row:
- A1: Timestamp
- B1: What's your preferred footwear style?
- C1: How important is comfort to you?
- etc.

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the survey page
3. Answer all questions and click "Submit Survey"
4. Check your Google Sheet - a new row should appear with the responses

## Troubleshooting

**Error: "Invalid private key"**
- Make sure the private key is properly formatted with `\n` for newlines
- The key should start with `-----BEGIN PRIVATE KEY-----` and end with `-----END PRIVATE KEY-----`

**Error: "Permission denied"**
- Make sure the service account email is shared with "Editor" access on the Google Sheet
- Check that the sheet ID in the route is correct

**Error: "Service account email not found"**
- Verify the email is correctly copied from the JSON file
- Make sure there are no extra spaces

## API Endpoint

The survey data is sent to: `POST /api/survey-submit`

Request body:
```json
{
  "answers": { "1": "formal", "2": "critical", ... },
  "surveyQuestions": [ { id, question, options }, ... ]
}
```

Response:
```json
{
  "success": true,
  "message": "Survey submitted successfully"
}
```
