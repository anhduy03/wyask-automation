# Authentication & Account Management - Edge Cases

## Authentication Edge Cases

### EC1: Email Exists But User Tries to Register Again
**Scenario:** User has account, clicks "Sign up" link again with same email  
**Expected Behavior:**
- System detects email already registered
- Show error: "An account with this email already exists"
- Offer "Login" button instead
- Optionally trigger password reset flow

**Implementation:**
- Check email existence before account creation
- Return specific error code for duplicate email
- Suggest alternative actions

---

### EC2: Verification Link Used Multiple Times
**Scenario:** User shares verification link with someone, both click it  
**Expected Behavior:**
- First click: Email verified, user logged in
- Second click: Link already used, show "Link has expired"
- Offer option to request new verification email

**Implementation:**
- Mark verification token as "used" after first successful verification
- Check token status before allowing verification
- Prevent token reuse

---

### EC3: Verification Link Clicked After Account Deleted
**Scenario:** User deletes account, then clicks old verification link  
**Expected Behavior:**
- Link invalid because account no longer exists
- Show error: "User account not found"
- Offer to create new account or contact support

**Implementation:**
- Verify user still exists before completing verification
- Handle account deletion cascading to invalidate tokens

---

### EC4: User Requests Multiple Password Resets
**Scenario:** User clicks "Forgot password" multiple times rapidly  
**Expected Behavior:**
- Each request generates new reset link
- Only most recent reset link is valid
- Previous links become invalid

**Implementation:**
- One active reset token per user at a time
- Invalidate old reset tokens when new one requested
- Rate limit reset requests (max 3 per hour)

---

### EC5: Login Attempt During Email Verification
**Scenario:** User tries to login before completing email verification  
**Expected Behavior:**
- Login fails: "Email not yet verified"
- Offer to resend verification email
- After verification, login succeeds

**Implementation:**
- Check email_verified flag on user record
- Don't allow login until verified
- Provide clear feedback

---

### EC6: Session Expires Mid-Action
**Scenario:** User's access token expires while filling form  
**Expected Behavior:**
- Automatic token refresh attempt
- If successful, action continues transparently
- If refresh fails, redirect to login with message

**Implementation:**
- Automatic refresh before expiry
- Retry mechanism with fresh token
- Graceful fallback to login

---

### EC7: Refresh Token Rotation
**Scenario:** User logs in on multiple devices, tokens rotate  
**Expected Behavior:**
- Each device has independent refresh token
- Refresh on one device doesn't affect others
- Old refresh tokens become invalid after rotation

**Implementation:**
- Per-device session tracking
- Unique refresh token per session
- Invalidate old token on new refresh

---

### EC8: User Tries to Change Email to Already Registered Email
**Scenario:** User A wants to change email to User B's email  
**Expected Behavior:**
- System rejects: "Email already in use"
- User A must choose different email
- No partial state created

**Implementation:**
- Check email uniqueness before change
- Require verification from new email first
- Atomic transaction for email update

---

## Account State Edge Cases

### EC9: User Sets Password While in Freemium
**Scenario:** Freemium user upgrades to Plus and sets password  
**Expected Behavior:**
- Light account converted to full account
- password_set flag updated to true
- User can now login with password
- Access to Plus features enabled

**Implementation:**
- Update password_set status atomically
- Update user tier
- No session interruption

---

### EC10: User Logs Out Across Multiple Devices
**Scenario:** User logs out on web, checks if logged out on mobile  
**Expected Behavior:**
- Web session terminated
- Mobile session NOT affected (independent)
- User can still use mobile app without re-login
- Logout only affects current device

**Implementation:**
- Per-device session management
- Don't invalidate all refresh tokens globally
- Only invalidate tokens for current session

---

### EC11: Account Without Password Tries to Login
**Scenario:** Freemium user without password set tries password login  
**Expected Behavior:**
- Password login fails: "No password set for this account"
- Suggest magic link or set password flow
- Offer password setup

**Implementation:**
- Check password_set flag
- Return appropriate error message
- Guide user to password setup

---

### EC12: /me Endpoint with Expired Token
**Scenario:** Frontend calls /me with expired access token  
**Expected Behavior:**
- Request fails with 401 Unauthorized
- Frontend automatically refreshes token
- Retry /me endpoint
- If refresh fails, redirect to login

**Implementation:**
- Token validation middleware
- Clear 401 response
- Client-side refresh and retry logic

---

## Email Verification Edge Cases

### EC13: User Changes Email During Verification Period
**Scenario:** User requests email change, doesn't verify, then requests again with different email  
**Expected Behavior:**
- First verification link becomes invalid
- Second verification link becomes active
- Only most recent verification link works
- Previous email change request cancelled

**Implementation:**
- Mark previous verification as superseded
- Generate new verification token
- Only allow latest verification

---

### EC14: Verification Email Lost/Not Received
**Scenario:** User claims they never received verification email  
**Expected Behavior:**
- User can request email resend
- Rate limited (max 5 times per hour)
- Clear UI for "Resend verification email"
- Suggest checking spam folder

**Implementation:**
- Resend endpoint implemented
- Rate limiting on resend
- Error handling for email service failures
- User feedback for each attempt

---

### EC15: Email Verification Bypass Attempt
**Scenario:** User tries to access account features before email verification  
**Expected Behavior:**
- Feature access blocked
- Redirect to "Complete email verification"
- Show verification status

**Implementation:**
- Check email_verified flag on each protected endpoint
- Return 403 Forbidden for unverified users
- Clear message about verification requirement

---

## Session & Token Edge Cases

### EC16: Token Tampered/Modified
**Scenario:** Attacker modifies access token and sends it  
**Expected Behavior:**
- Token validation fails
- Request rejected with 401 Unauthorized
- No sensitive data exposed
- Possible security alert logged

**Implementation:**
- JWT signature verification
- Cryptographic validation
- Security logging

---

### EC17: Multiple Simultaneous Refresh Requests
**Scenario:** Multiple requests try to refresh token at same time  
**Expected Behavior:**
- First request processes, issues new tokens
- Subsequent requests get new tokens
- No race condition or duplicate token issues

**Implementation:**
- Atomic transaction for token refresh
- Mutex/lock on token refresh operation
- Consistent state after concurrent requests

---

### EC18: Refresh Token Becomes Invalid Mid-Session
**Scenario:** Refresh token revoked by admin while user session active  
**Expected Behavior:**
- Next refresh attempt fails
- User forced to login again
- Clear error message

**Implementation:**
- Admin revoke endpoint
- Regular refresh attempts detect revocation
- Graceful session termination

---

## Error Recovery Edge Cases

### EC19: Password Reset Link Clicked After Password Already Changed
**Scenario:** User requests password reset, then manually changes password, then clicks old reset link  
**Expected Behavior:**
- Reset link invalid/expired (time limit passed)
- Show "This password reset link has expired"
- Offer to request new reset

**Implementation:**
- Reset token must be unexpired
- Reset token must be unused
- Reset token must match user's request history

---

### EC20: Concurrent Login Attempts
**Scenario:** User logs in from different device/browser simultaneously  
**Expected Behavior:**
- Both logins succeed
- Each gets unique session/tokens
- Independent sessions
- No conflicts

**Implementation:**
- No global session limit
- Per-device session tracking
- Independent token generation

---

## Data Integrity Edge Cases

### EC21: Account Deletion During Email Verification
**Scenario:** User requests account deletion while email verification pending  
**Expected Behavior:**
- Account deleted
- Verification link becomes invalid
- Related data cleaned up

**Implementation:**
- Cascade delete verification tokens
- Cascade delete sessions
- Cascade delete related data

---

### EC22: Name Update for Freemium User
**Scenario:** Freemium user tries to update name before setting password  
**Expected Behavior:**
- Name update allowed (optional field)
- No password required
- Update successful

**Implementation:**
- Name field can be updated independently
- No password validation required for name change
