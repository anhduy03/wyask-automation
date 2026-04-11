# Settings & Security - Edge Cases

### EC1: Password Too Weak
**Scenario:** User enters "password" (no uppercase/number)  
**Expected Behavior:**
- Validation fails: "Password must include uppercase, lowercase, number, special character"
- Clear requirements shown
- User corrects and resubmits

---

### EC2: Email Already In Use
**Scenario:** User tries to change email to one already registered  
**Expected Behavior:**
- Validation fails: "This email is already in use"
- Must choose different email
- Cannot change to existing email

---

### EC3: 2FA Device Lost
**Scenario:** User set up 2FA on phone, phone lost  
**Expected Behavior:**
- Cannot login (stuck at 2FA step)
- "Can't access your 2FA device?" link
- Account recovery process (email verification)
- Restore access or contact support

---

### EC4: Data Export File Too Large
**Scenario:** Pro user with 500 GB of data, export requested  
**Expected Behavior:**
- System caps file size or streams
- Or: Split into multiple files
- Chunked download option
- Or: Notify of size, delay generation

---

### EC5: Account Deletion During Grace Period
**Scenario:** User deletes account, changes mind within 30 days  
**Expected Behavior:**
- Email provided to cancel deletion
- "Cancel Deletion" link in email
- Account restored if clicked
- No data recovery after 30 days

---

### EC6: Data Export with Special Characters in Filenames
**Scenario:** Envelope named "Résumé #1 (2024).pdf"  
**Expected Behavior:**
- Special characters preserved in export
- Or: Sanitized for cross-platform compatibility
- Filename readable on all systems

---

### EC7: Concurrent Session Logout
**Scenario:** User logs out on device A while simultaneously accessing on device B  
**Expected Behavior:**
- Logout affects only device A
- Device B session continues
- Independent session management

---

### EC8: IP Whitelisting Blocks Legitimate User
**Scenario:** Pro user enables IP whitelist, travels and tries login from new IP  
**Expected Behavior:**
- Login blocked: "Access from this location not allowed"
- 2FA recovery code option (if available)
- Or: Email temporary bypass code
- Support can manually add IP

---

### EC9: Suspicious Activity False Alarm
**Scenario:** User travels internationally, alerts fire for "new country"  
**Expected Behavior:**
- Alert sent (reasonable precaution)
- User clicks "This was me"
   - Dismisses alert
   - Or trusts location going forward

---

### EC10: Login History Older Than 1 Year
**Scenario:** User asks to see logins from 2 years ago  
**Expected Behavior:**
- Data not available (1-year retention policy)
- Clear message: "Login history available for last 12 months"
- Older records deleted per policy

---

### EC11: Password Reset Link Clicked, Then Password Changed Elsewhere
**Scenario:** User gets reset link, then changes password via settings screen, then clicks link  
**Expected Behavior:**
- Reset link no longer valid (already used/superseded)
- Error: "This reset link has expired"
- User logs in with new password

---

### EC12: Recovery Codes Never Saved
**Scenario:** 2FA enabled, recovery codes not downloaded  
**Expected Behavior:**
- Codes shown: "Save these codes"
- "I understand I cannot recover access without these" checkbox
- Require acknowledgment before enabling

---

### EC13: Email Verification Sent, User Has Wrong Email on File
**Scenario:** System sends verification to old email, user never sees it  
**Expected Behavior:**
- "Didn't receive email?" link
- Resend to same email (or new email)
- Wait time before resend (avoid spam)

---

### EC14: Session Timeout During Form Submission
**Scenario:** User filling out form, 30-minute timeout reached  
**Expected Behavior:**
- Form data lost
- Redirect to login
- After login, can resume (if supported)
- Or: Notification before timeout

---

### EC15: Deleting Account with Active Subscriptions
**Scenario:** Pro subscriber requests account deletion  
**Expected Behavior:**
- Subscription automatically cancelled
- Refund processed (partial if mid-month)
- Invoice generated for final period
- Notification sent

---

### EC16: Mobile User's Session Expires, Tries to Use Cached Data
**Scenario:** Mobile user offline, session expired  
**Expected Behavior:**
- Cached data might be stale
- Refresh attempted when online
- Re-authentication required
- Graceful recovery

---

### EC17: API Key Exposed in Public Repository
**Scenario:** Developer accidentally commits API key to GitHub  
**Expected Behavior:**
- User should revoke key immediately
- UI offers one-click revoke
- Generate new key
- All requests with old key now fail

---

### EC18: Attempt to Brute Force Password Reset
**Scenario:** Attacker tries 1000 reset requests in 1 hour  
**Expected Behavior:**
- Rate limiting activates
- After 5 attempts: "Too many reset requests, please wait 1 hour"
- IP blocked temporarily
- Admin alerted

---

### EC19: GDPR Right to Erasure for Co-Owned Envelope
**Scenario:** User deletes account (erasure) but owns shared envelope  
**Expected Behavior:**
- Envelope deleted OR transferred
- Recipients notified of deletion
- Dependent data cascade-deleted
- No orphaned records

---

### EC20: Timezone Mismatch in Login History
**Scenario:** Server in UTC, user in PST, login time shows wrong time  
**Expected Behavior:**
- Display server time (UTC)
- Or: Convert to user's timezone
- Clear indicator: "Times in UTC" or "Times in your timezone"
