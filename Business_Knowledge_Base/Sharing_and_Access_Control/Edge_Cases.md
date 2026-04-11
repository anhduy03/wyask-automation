# Sharing & Access Control - Edge Cases

### EC1: Token Brute Force Attack
**Scenario:** Attacker tries random tokens to access envelopes  
**Expected Behavior:**
- Rate limiting on token validation
- After 5 failed attempts, IP blocked temporarily
- Tokens are 256-bit (cryptographically secure)
- Probability of guessing: negligible
- Security alert logged

---

### EC2: Share Token Intercepted in URL
**Scenario:** User shares public link via email, email hacked  
**Expected Behavior:**
- Token exposed to attacker
- Attacker can access envelope
- Owner can revoke and recreate token
- Recommend HTTPS always used
- Consider additional auth layer

---

### EC3: Recipient Claims Invite, Creates Account with Different Email
**Scenario:** Invite sent to user@example.com, recipient creates account as user2@example.com  
**Expected Behavior:**
- Invite token specific to email
- Cannot use invite with different account
- Must use correct email account
- Can request new invite if needed

---

### EC4: Access Revoked, Recipient Still Has Cached Content
**Scenario:** Recipient downloaded envelope, access revoked  
**Expected Behavior:**
- Downloaded file still accessible locally (user's device)
- Cannot re-download or access online version
- No way to prevent local copy usage
- This is expected behavior

---

### EC5: Very Long Recipient List
**Scenario:** User invites 10,000 recipients to one envelope  
**Expected Behavior:**
- System accepts large list
- Email sending queued/throttled
- Takes time to send all invites
- UI shows progress
- Performance not degraded

---

### EC6: Invalid Email in Recipient List
**Scenario:** User enters "invalid@email" or "user@.com"  
**Expected Behavior:**
- Validation fails before sending
- Error shows invalid email
- Prompt to correct
- Don't send any invites until fixed

---

### EC7: Recipient Email Domain Typo
**Scenario:** Invite sent to "user@gmial.com" instead of "user@gmail.com"  
**Expected Behavior:**
- Email sent to typo address
- Owner doesn't notice mistake
- Invite not received by intended person
- No system prevention (human error)

---

### EC8: Share Mode Changed While Invites Pending
**Scenario:** Invite-only mode, user changes to Private before recipients claim  
**Expected Behavior:**
- Invite links become invalid
- Recipients clicking links get: "Access no longer available"
- Pending invites cancelled
- Envelope now Private

---

### EC9: Multiple Shares of Same Envelope with Different Tokens
**Scenario:** User creates public link once, then again  
**Expected Behavior:**
- Each public share gets same token (idempotent)
- Or: Each share gets new token, old tokens still work
- Depends on implementation

---

### EC10: Access Log Storage Limit
**Scenario:** Popular envelope accessed 1 million times, logs full  
**Expected Behavior:**
- Oldest logs deleted after retention (90 days)
- Analytics aggregated/archived
- No data loss of key metrics
- Detailed logs pruned automatically

---

### EC11: User Account Deleted, Active Shares Still Exist
**Scenario:** User deletes account, envelope still publicly shared  
**Expected Behavior:**
- Share links become invalid
- Public access revoked immediately
- Envelopes deleted with account (cascade)
- Notification: "This envelope is no longer available"

---

### EC12: Session Fixation Attack
**Scenario:** Attacker tries to force user into known session  
**Expected Behavior:**
- New session generated per access
- Session tokens regenerated on login
- No reuse of old tokens
- Secure cookie flags set (HttpOnly, Secure, SameSite)

---

### EC13: CSRF (Cross-Site Request Forgery) on Share Action
**Scenario:** Attacker tricks user to click link that changes sharing  
**Expected Behavior:**
- CSRF tokens required for state changes
- Verified before executing
- Can't change sharing without valid token
- GET requests don't modify state

---

### EC14: Recipient List Leaked
**Scenario:** Recipient list becomes visible to public (privacy breach)  
**Expected Behavior:**
- This is a serious bug
- Audit who has list access
- Fix access control immediately
- Notification requirements (GDPR, etc.)

---

### EC15: Token Expiration Race Condition
**Scenario:** User accesses envelope at exact expiry time  
**Expected Behavior:**
- Token still valid (expires at end of period)
- Or: Expires, shows error
- Consistent behavior, no ambiguity
- Use server time (not client time)

---

### EC16: Public Link Accessed by Logged-In User
**Scenario:** Authenticated user clicks public envelope link  
**Expected Behavior:**
- Access granted (public)
- Still shows as public access
- Doesn't count as authenticated access
- Optional: Offer to save to personal account

---

### EC17: Rate Limiting Blocks Legitimate User
**Scenario:** User refreshing page repeatedly, hits rate limit  
**Expected Behavior:**
- Show: "Too many requests, please wait 60 seconds"
- After timeout, access restored
- CAPTCHA optional for humans to verify
- Not permanent ban
