# Settings & Security - Functional Flows

## Flow 1: Update Password

1. **User in account settings**
   - Security section
   - Click "Change Password"

2. **Enter current password**
   - Verify identity
   - Current password field

3. **Enter new password**
   - New password field
   - Confirm password field
   - Password strength indicator shown

4. **Validate password**
   - Must meet requirements
   - Cannot reuse recent passwords
   - Confirmation must match

5. **Submit change**
   - Click "Update Password"
   - System validates

6. **Confirmation sent**
   - Email sent to account email
   - "Password successfully changed"
   - All other sessions remain active

---

## Flow 2: View Active Sessions & Remote Logout

1. **User opens settings**
   - Security section
   - "Active Sessions" link

2. **View all sessions**
   - Table shows:
     - Device/browser
     - IP address
     - Location
     - Last active time
     - Current session marked

3. **Identify suspicious session**
   - See login from unknown location
   - Click "Log Out" button on that session

4. **Confirm logout**
   - Dialog: "Log out this session?"
   - Confirm button

5. **Session terminated**
   - That session invalidated
   - User on that device logged out
   - Other sessions unaffected

---

## Flow 3: Enable Two-Factor Authentication

1. **User in security settings**
   - 2FA not yet enabled
   - Click "Set Up 2FA"

2. **Choose method**
   - Options: Authenticator App, SMS
   - Select Authenticator App

3. **Scan QR code**
   - QR code displayed
   - Scan with authenticator app
   - Code now generating

4. **Verify setup**
   - App shows 6-digit code
   - Enter code in Wyask form
   - Submit to verify

5. **2FA enabled**
   - "2FA successfully enabled"
   - Save backup codes
   - Download codes as PDF

6. **Next login**
   - Password required
   - Then 2FA code required
   - Complete authentication

---

## Flow 4: Request Data Export (GDPR)

1. **User in privacy section**
   - "Download My Data"
   - Click "Request Export"

2. **Choose format**
   - JSON, CSV, or Wyask format
   - Select preferred format

3. **Confirm request**
   - Dialog: "This includes all personal data, envelopes, chat history"
   - "Generate export?" button

4. **Export processing**
   - System generates file
   - "Generating your data..."
   - Takes time for large accounts

5. **Email notification**
   - "Your data export is ready"
   - Download link in email
   - Link valid for 7 days

6. **User downloads**
   - Clicks link in email
   - File downloads
   - Contains all personal data

---

## Flow 5: Request Account Deletion

1. **User scrolls to bottom**
   - "Delete Account" section
   - Click "Delete My Account"

2. **Confirmation dialog**
   - Warning: "This action is permanent"
   - "All data will be deleted after 30 days"
   - "Type 'DELETE' to confirm"

3. **Type confirmation**
   - User types "DELETE"
   - Unlock button if correct

4. **Final confirmation**
   - Click "Permanently Delete"
   - Email sent: "Account deletion scheduled"

5. **Grace period**
   - 30 days before deletion
   - Account inaccessible
   - Can cancel within 30 days

6. **Hard deletion**
   - After 30 days, automatic deletion
   - All data removed
   - Cannot be recovered

---

## Flow 6: Update Email Address

1. **User in account settings**
   - "Email Address" section
   - Shows current email

2. **Click "Change Email"**
   - Input new email address
   - Validation: Format check

3. **Current password required**
   - Enter password
   - Verify identity

4. **Verification emails sent**
   - Email to current address: "Confirm email change"
   - Email to new address: "Verify this email"

5. **Verify new email**
   - Click verification link in new email
   - Email change confirmed

6. **Email updated**
   - Can now login with new email
   - Old email no longer works

---

## Flow 7: Manage Email Preferences

1. **User in notification settings**
   - Email preferences section

2. **Notification types shown**
   - Account activity (toggle)
   - Envelope notifications (toggle)
   - Marketing emails (toggle)
   - Support tips (toggle)

3. **Adjust preferences**
   - Enable/disable each type
   - Changes auto-save

4. **Digest frequency**
   - Choose: Immediate, Daily digest, Weekly
   - Select preferred frequency

5. **Preferences saved**
   - "Preferences updated"
   - System respects settings

---

## Flow 8: View Login History

1. **User in security section**
   - "Login History" link

2. **Chronological list shown**
   - Recent logins first
   - Each shows:
     - Date/time
     - Status (Success/Failed)
     - IP address
     - Location
     - Device/browser

3. **Click entry for details**
   - Full information
   - "Suspicious?" button if concerned
   - Report option

4. **Filter history**
   - Show: All, Success, Failed
   - Date range picker

---

## Flow 9: Setup API Keys (Pro Only)

1. **User in API settings**
   - "API Keys" section
   - Plus/Pro feature

2. **Generate new key**
   - Click "Generate API Key"
   - Modal shown

3. **Confirm key creation**
   - Dialog: "Generate new API key?"
   - Confirm

4. **Key displayed**
   - Long token string shown
   - "Copy" button
   - "Download as file" option
   - "Cannot be shown again" warning

5. **Key saved**
   - User stores securely
   - Used for API authentication

6. **Manage keys**
   - List all keys
   - Regenerate, revoke, delete
   - Last used timestamp

---

## Edge Cases

### EC1: Password Change During Session
- User changes password
- Current sessions remain active
- Logout and re-login forces new password

### EC2: Data Export Takes Long Time
- Large account with 1000+ envelopes
- Export takes 2+ minutes
- Browser waits or gets queued task

### EC3: User Forgets Backup Codes for 2FA
- Lost authenticator device
- No backup codes saved
- Cannot login
- Recovery email sent by support

### EC4: Email Verification Link Expires
- New email verification link expires after 24 hours
- Request new verification email
- Retry process

### EC5: Suspicious Activity Alert
- Login from new country detected
- Email sent with details
- "Not you?" link triggers verification
- Compromised account recovery
