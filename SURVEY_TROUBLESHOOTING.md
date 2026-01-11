# Survey Submission Troubleshooting Guide

## If you get an error when submitting the form:

### Step 1: Check the Console Logs

1. Open your browser's Developer Tools (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Look for error messages starting with `[Survey API]`

### Step 2: Common Errors and Solutions

#### Error: "GOOGLE_SERVICE_ACCOUNT_EMAIL is not set"
**Solution:**
- Make sure you have a `.env.local` file in your project root
- Check that `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correctly set with your service account email
- Restart the development server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)

#### Error: "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not set"
**Solution:**
- Make sure your `.env.local` has the `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- The private key should include the full `-----BEGIN PRIVATE KEY-----` to `-----END PRIVATE KEY-----` part
- Make sure newlines are replaced with `\n`
- Example format:
  ```
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
  ```

#### Error: "Permission denied" or "Access Denied"
**Solution:**
1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1RZAQ8Uoy9VwEb4xdHMU71zP9Q6eWRifg6JB0Sx8OXL4/
2. Click **Share** button (top right)
3. Check that your service account email is in the share list with **Editor** access
4. If not, add it:
   - Paste your `GOOGLE_SERVICE_ACCOUNT_EMAIL` value
   - Select **"Editor"** role
   - Click **Share**

#### Error: "Invalid private key format"
**Solution:**
- The newlines in your private key must be represented as `\n` (backslash-n), not actual newlines
- Your key should be on a single line in the `.env.local` file
- Example (ONE line):
  ```
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEA...\n-----END PRIVATE KEY-----\n"
  ```

### Step 3: Check Server Logs

1. Look at your terminal where you're running `npm run dev`
2. Find the logs starting with `[Survey API]`
3. The sequence should be:
   ```
   [Survey API] Received submission request
   [Survey API] Parsed request body successfully
   [Survey API] Environment variables validated
   [Survey API] Google Sheets document initialized
   [Survey API] JWT created, authenticating...
   [Survey API] Authentication successful
   [Survey API] Sheet info loaded
   [Survey API] Got sheet, current row count: X
   [Survey API] Header row count: X
   [Survey API] Row data prepared...
   [Survey API] Row added successfully to Google Sheet
   ```

### Step 4: Verify Google Sheet Access

1. Make sure the service account email has access:
   - Go to https://docs.google.com/spreadsheets/d/1RZAQ8Uoy9VwEb4xdHMU71zP9Q6eWRifg6JB0Sx8OXL4/
   - Click **Share**
   - Look for your service account email in the list
   - It should have **Editor** permissions

2. Make sure the sheet is not empty:
   - The sheet should have at least 1 row (headers will be added automatically if missing)

### Step 5: Quick Verification

After fixing the issue:
1. Close the browser and clear cache (Ctrl+Shift+Delete)
2. Restart the dev server: Stop it and run `npm run dev` again
3. Try submitting the form again
4. Check the Google Sheet for the new row

## If data is still not appearing:

1. **Refresh the Google Sheet** (F5 or Cmd+R)
2. **Check Sheet URL** - Make sure you're looking at the correct sheet
3. **Check Sheet Permissions** - Make sure the sheet is shared with the service account
4. **Look for data in the sheet** - New rows will appear at the top (after the header row)

## Contact Support

If you're still having issues:
1. Take a screenshot of the error message
2. Copy the full error from the console
3. Share it with your development team
