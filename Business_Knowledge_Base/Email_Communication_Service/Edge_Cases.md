# Email Communication Service - Edge Cases

### EC1: Hard Bounce After Account Deletion
**Scenario:** Email bounces for user whose account was deleted  
**Expected Behavior:**
- Remove from suppress list
- Don't retry to deleted account
- Mark as handled
- No notification needed

---

### EC2: Recipient Has Typo in Email
**Scenario:** User invites "john@gmai.com" instead of "john@gmail.com"  
**Expected Behavior:**
- Email validation: Domain check
- Optional warning: "Did you mean @gmail.com?"
- If proceeded: Email sent to typo address
- Invite undelivered (user's error)

---

### EC3: Email Provider Rate Limit Exceeded
**Scenario:** Sending 100 emails/second, provider limit is 30/second  
**Expected Behavior:**
- Rate limit error from provider
- Queue retries after backoff
- Exponential backoff (5s, 10s, 20s...)
- Eventually succeeds when rate drops

---

### EC4: Email Template Not Found
**Scenario:** Code tries to send email with template "invite_v99"  
**Expected Behavior:**
- Error logged: "Template not found"
- Admin alerted
- Fallback to generic email (if available)
- Or: Error to user

---

### EC5: Unsubscribe Link in Email Doesn't Work
**Scenario:** User clicks unsubscribe, link broken/expired  
**Expected Behavior:**
- Generic error page: "Cannot process unsubscribe"
- Suggest contacting support
- Or: Direct to email preferences page
- User can manually unsubscribe

---

### EC6: User Receives Email for Deleted Envelope
**Scenario:** Envelope deleted, notification email already queued  
**Expected Behavior:**
- Email still sends (async queue)
- User opens email: "Envelope not found"
- Or: Email filtered out pre-send

---

### EC7: Extremely Large Distribution List
**Scenario:** Invite 100,000 users to envelope  
**Expected Behavior:**
- Queue processes very slowly
- Takes hours to send all
- Throttling prevents server overload
- Report shows progress

---

### EC8: Email Contains Special Characters in Name
**Scenario:** Recipient: "José García <jose@example.com>"  
**Expected Behavior:**
- UTF-8 encoding handles special chars
- Email displays correctly
- Or: ASCII fallback "Jose Garcia"
- No corruption

---

### EC9: User Changes Email, Old Email Gets Invite
**Scenario:** User changed email from old@example.com to new@example.com, then gets invited via old email  
**Expected Behavior:**
- Invite goes to old email
- User doesn't see it (no longer checking)
- Can request resend to new email
- Or: System maps old to new (if known)

---

### EC10: Spam Filter Marks Legitimate Email as Spam
**Scenario:** Password reset email flagged by Gmail spam filter  
**Expected Behavior:**
- Expected: User checks spam folder
- Prevention: Proper SPF/DKIM/DMARC setup
- Report spam false positive
- Google learns to accept future emails

---

### EC11: Email Provider Outage
**Scenario:** SendGrid down for 2 hours  
**Expected Behavior:**
- Emails queue locally
- Retry when provider restored
- Status shows "Retrying"
- No data loss
- Users can check status

---

### EC12: Competitor Spoofs Company Email
**Scenario:** Attacker sends email "from wyask.com" to users  
**Expected Behavior:**
- SPF/DKIM should reject
- Or: Email flagged as spoofed
- Users report suspicious emails
- Admin investigates

---

### EC13: User Unsubscribes Before Processing
**Scenario:** Email queued, user unsubscribes before send  
**Expected Behavior:**
- Pre-send check: Is user opted in?
- No: Skip sending (waste prevention)
- User never receives email

---

### EC14: Verification Link Clicked Multiple Times
**Scenario:** User clicks verification link twice  
**Expected Behavior:**
- First click: Verified, token consumed
- Second click: Token no longer valid
- Error: "Link has expired or been used"

---

### EC15: Bulk Email Resume After Crash
**Scenario:** System sending 10,000 emails, crashes at 3,000  
**Expected Behavior:**
- Queue persists to database
- Restart resumes from position
- Or: Idempotent - already-sent emails skipped
- No duplicates sent

---

### EC16: User Receives Email in Different Language
**Scenario:** Email provider configured for Spanish, user in English region  
**Expected Behavior:**
- Template in Spanish sent
- Or: Detect browser language, use that
- Clearly state language/locale

---

### EC17: Invite Email to Team Email Distribution List
**Scenario:** User invites "team@company.com" (distribution list)  
**Expected Behavior:**
- Email accepted (valid format)
- Sent to distribution list
- All members receive
- Or: System detects, warns user

---

### EC18: Complaint Rate Exceeds Threshold
**Scenario:** 10 complaints received out of 1000 emails (1%)  
**Expected Behavior:**
- Exceeds 0.1% threshold
- Stop sending from account
- Admin alerted immediately
- Manual review required
- Restrict further sends

---

### EC19: Email Attachment Contains Virus
**Scenario:** Email body includes file attachment  
**Expected Behavior:**
- Wyask doesn't send attachments (policy)
- Links instead of attachments
- Or: Scan attachment before send
- Reject if malware detected

---

### EC20: User Marks Email as Not Spam After Initial Spam Report
**Scenario:** User marks as spam, then clicks "Not spam"  
**Expected Behavior:**
- Feedback sent to provider
- Provider learns legitimate sender
- Future emails pass filters
- User preference updated

---

### EC21: Email Body Includes Unsupported Unicode
**Scenario:** Emoji or rare Unicode character in email  
**Expected Behavior:**
- UTF-8 encoding handles emoji
- Displays correctly in most clients
- Fallback: Text representation if needed
- No corruption

---

### EC22: Retry Delay Increases Exponentially
**Scenario:** Soft bounce on retry 1, 2, 3...  
**Expected Behavior:**
- Retry 1: 5 minutes
- Retry 2: 30 minutes
- Retry 3: 2 hours
- Retry 4: 6 hours
- Retry 5: Fail after 24 hours
