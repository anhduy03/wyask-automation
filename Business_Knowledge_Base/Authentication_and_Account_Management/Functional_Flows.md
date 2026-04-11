# Authentication & Account Management - Functional Flows

## Flow 1: Freemium Registration (Envelope Creation Without Account)

### Actors
- Visitor (no account)
- Wyask System
- Email Service

### Main Flow

1. **User visits freemium page**
   - Landing page shows "Create a free envelope"
   - CTA button clicked

2. **Email input modal shown**
   - User enters email address
   - System validates email format

3. **Email verification sent**
   - Email sent to provided address
   - Magic link generated (valid 24 hrs)
   - User receives confirmation email

4. **User clicks magic link**
   - Redirects to set password screen
   - OR bypasses to create envelope directly (light account state)
   - User identified by email

5. **Account created in light state**
   - Email stored as account identifier
   - No password set yet
   - User can proceed to envelope creation

### Alternative: Set Password During Onboarding
- User clicks "Set up account" during envelope flow
- Password setup screen shown
- Password set completes full registration
- User can now access Plus/Pro features

---

## Flow 2: Full Registration (Plus/Pro Signup)

### Actors
- User (new)
- Wyask System
- Email Service
- Stripe (billing)

### Main Flow

1. **User navigates to signup**
   - Lands on Plus/Pro plan page
   - Clicks "Get Started" or "Upgrade"

2. **Email input**
   - User enters email address
   - System checks if email already exists
   - Rejects if email already registered

3. **Verification email sent**
   - Confirmation link sent to email
   - Link includes redirect URL to set-password page
   - Link valid for 24 hours

4. **User clicks verification link**
   - Email verified successfully
   - Redirected to set-password screen
   - URL contains email in verified state

5. **Password setup**
   - User enters password (min 8 chars)
   - Password confirmation required
   - Submits to /auth/set-password endpoint

6. **Account creation completed**
   - User account created with email + password
   - Password confirmed via response
   - User logged in automatically
   - Redirect to dashboard or plan selection

7. **Plan selection (if applicable)**
   - Billing information collected
   - Stripe checkout initiated
   - Plan activated after payment
   - Welcome email sent

---

## Flow 3: Login with Existing Account

### Actors
- Registered User
- Wyask System
- Email Service

### Main Flow

1. **User navigates to login**
   - Login page accessed
   - Email and password fields shown

2. **Email entry**
   - User enters registered email
   - System validates format

3. **Authentication method check**
   - System determines available auth methods for email:
     - Magic link (always available)
     - Password (if set)
     - OTP (optional)

4. **User selects password auth**
   - Password field enabled
   - User enters password

5. **Credentials verified**
   - Email and password matched against database
   - Rate limiting checked
   - Failed attempt logged if incorrect

6. **Tokens issued**
   - Access token generated (1 hour)
   - Refresh token generated (7+ days)
   - Session created

7. **User logged in**
   - Tokens stored in secure storage
   - Redirect to dashboard
   - User can access account features

### Alternative: Magic Link Login
1. User enters email on login page
2. Click "Send magic link" button
3. Magic link sent to email
4. User clicks link in email
5. Automatic login, redirect to dashboard

---

## Flow 4: Email Change

### Actors
- Authenticated User
- Wyask System
- Email Service

### Main Flow

1. **User navigates to account settings**
   - Settings page accessed
   - "Change email" option visible

2. **Current password requested**
   - User enters current password
   - System validates password

3. **New email input**
   - User enters new email address
   - System validates format
   - Checks for duplicate registration

4. **Verification emails sent**
   - Notification email to old email: "Your email change request"
   - Confirmation link sent to new email
   - New email link valid for 24 hours

5. **User clicks new email confirmation**
   - Email ownership verified
   - Email updated in database
   - Confirmation sent to both old and new email

6. **Email change completed**
   - User can log in with new email
   - Old email can no longer be used for login

---

## Flow 5: Password Reset (Forgot Password)

### Actors
- User (forgot password)
- Wyask System
- Email Service

### Main Flow

1. **User on login page**
   - Cannot remember password
   - Clicks "Forgot password?"

2. **Email entry**
   - User enters registered email
   - System finds account

3. **Reset email sent**
   - Password reset link sent to email
   - Link contains secure token
   - Valid for 24 hours

4. **User clicks reset link**
   - Opens password reset page
   - Prompts for new password
   - Includes redirect with token

5. **New password set**
   - User enters new password
   - Meets security requirements
   - Submitted to reset endpoint

6. **Password updated**
   - New password saved
   - Reset token invalidated
   - Confirmation email sent
   - User redirected to login

---

## Flow 6: Password Update (Change Password)

### Actors
- Authenticated User
- Wyask System
- Email Service

### Main Flow

1. **User in account settings**
   - "Change password" option
   - Clicks to open dialog

2. **Current password verification**
   - User enters current password
   - System validates against account

3. **New password input**
   - User enters new password
   - Meets security requirements
   - Confirms new password

4. **Password updated**
   - Old password replaced
   - Confirmation email sent
   - Possibly invalidate other sessions

5. **User notified**
   - Confirmation displayed
   - Email received

---

## Flow 7: Session Management

### Token Refresh Flow
1. **Token nearing expiration**
   - Client detects access token within 5 minutes of expiry
   - Refresh token still valid

2. **Refresh request**
   - Client sends refresh token to /auth/refresh endpoint
   - Server validates refresh token

3. **New tokens issued**
   - New access token generated (1 hour)
   - New refresh token issued
   - Old tokens invalidated

4. **Session continues**
   - User unaware of token refresh
   - Seamless experience

### Logout Flow
1. **User clicks logout**
   - Logout button in settings

2. **Session terminated**
   - Current session invalidated
   - Refresh token revoked
   - Access token expired

3. **Client cleanup**
   - Tokens removed from storage
   - User redirected to login page

---

## Flow 8: Account Status Check (/me Endpoint)

### Actors
- Authenticated User
- Wyask System

### Main Flow

1. **App initialization**
   - Frontend calls /me endpoint
   - Access token sent in header

2. **User validated**
   - Token verified
   - User account retrieved

3. **Response data returned**
   ```
   {
     id: "user-uuid",
     email: "user@example.com",
     name: "User Name",
     tier: "Plus",
     password_set: true,
     subscription_status: "Active"
   }
   ```

4. **Frontend uses data**
   - Display user name
   - Show current plan
   - Determine available features
   - Adjust UI based on tier

---

## Edge Cases

### Edge Case 1: Email Already Exists
- **When:** User tries to register with existing email
- **System Action:** Reject registration, show error
- **User Option:** "Already have account? Login here"
- **Prevention:** Check email uniqueness before account creation

### Edge Case 2: Verification Link Expired
- **When:** User clicks link after 24 hours
- **System Action:** Show "Link expired" message
- **User Option:** Request new verification email
- **Implementation:** Send new verification email

### Edge Case 3: Multiple Verification Links
- **When:** User requests email verification multiple times
- **System Action:** Invalidate old links, only latest link works
- **Implementation:** Update token in database, only most recent valid

### Edge Case 4: Token Refresh with Expired Refresh Token
- **When:** Refresh token has also expired
- **System Action:** Deny refresh, force re-authentication
- **User Action:** User must login again
- **Implementation:** Return 401 Unauthorized

### Edge Case 5: Password Set by Freemium User Later
- **When:** Freemium user upgrades and sets password
- **System Action:** Convert light account to full account
- **Password Status:** Update password_set flag to true
