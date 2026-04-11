# Authentication & Account Management - Business Rules

## Account Registration Rules

### Freemium Registration
1. **Email Entry Required** - User enters email to start
2. **Light Account State** - Account created without password
3. **Magic Link Sent** - Verification link sent to email
4. **Optional Password Setup** - User can set password after envelope creation
5. **No Password Requirement** - Freemium users can remain without password

### Full Registration (Plus/Pro)
1. **Email Input** - User enters email address
2. **Email Verification** - Confirmation link sent to email
3. **Password Required** - Must set password to complete registration
4. **Set Password Flow** - Redirect to set-password screen after email verification
5. **Account Complete** - Can then access all Plus/Pro features

## Authentication Rules

### Magic Link Authentication
- **Valid for 24 hours** - Magic links expire after 1 day
- **One-time use** - Each magic link can only be used once
- **Email verification** - Proves email ownership
- **Automatic login** - User logged in immediately after verification

### Password Authentication
- **Must be set** - Password mandatory for Plus/Pro users
- **Min 8 characters** - Security requirement
- **Email + Password** - Both required for login
- **Rate limiting** - Prevent brute force attempts

### OTP Authentication
- **Valid for 10 minutes** - OTP expires quickly
- **6-digit code** - Standard OTP format
- **Sent via email** - OTP delivery method
- **Single use** - Can only use OTP once

## Session Rules

### Token Management
1. **Access Token** - 1-hour expiration
2. **Refresh Token** - Long-lived (7+ days)
3. **Automatic Refresh** - Client automatically refreshes expired tokens
4. **Token Rotation** - New refresh token issued on refresh
5. **Secure Storage** - Tokens stored securely in client storage

### Session Lifecycle
- **Creation** - Session created on successful authentication
- **Active** - User can access resources
- **Refresh** - Token refreshed before expiration
- **Logout** - Session terminated, tokens invalidated
- **Expiration** - Automatic cleanup of expired sessions

## Email Verification Rules

### Verification Flow
1. **Send Verification Email** - Email sent during signup/email change
2. **Link in Email** - Unique verification token
3. **Link Expiration** - 24-hour validity window
4. **One-click Verification** - User clicks link to verify
5. **Automatic Login Option** - Can auto-login after verification

### Email Confirmation After Verification
- **Follow-up Email** - Confirmation email sent after successful verification
- **Access Link Included** - Direct link to return to envelope
- **Marketing Consent** - Optional marketing communication signup

## Account Details Rules

### /me Endpoint Response
- Returns: ID, Email, Name, Tier, Password-Set Status
- **Password-Set Status** - Boolean indicating if user has set password
- **User Plan** - Current subscription tier
- **Account Status** - Active/Inactive/Suspended

### Account Update Rules
1. **Email Update**
   - Requires current password verification
   - Verification email sent to new email
   - Old email receives change notification
   - Change completes only after new email verification

2. **Password Update**
   - Requires current password
   - New password must meet security requirements
   - Confirmation email sent after change
   - Old sessions may be invalidated

## Tier-Specific Rules

### Freemium Authentication
- **No password initially** - Password optional
- **Magic link only** - Primary auth method
- **Minimal profile** - Email only required
- **No billing** - No payment information required

### Plus/Pro Authentication  
- **Password required** - Full registration mandatory
- **Multiple auth methods** - Magic link, password, OTP
- **Complete profile** - Name and email required
- **Billing info linked** - Payment method on file

## Security Rules

### Password Security
- **Minimum 8 characters**
- **Case-sensitive**
- **No username-based password**
- **Should not match email**

### Account Lockout
- **No auto-lockout** - Currently not implemented
- **Rate limiting** - Request throttling on failed attempts
- **Failed attempt tracking** - Monitor suspicious activity

### Multi-factor Authentication
- **Biometric (Mobile)** - Fingerprint/Face ID optional
- **PIN/Password (Mobile)** - Optional additional security
- **Not mandatory** - User opt-in

## Business Constraints

1. **One Account per Email** - Duplicate email prevention
2. **Email Uniqueness** - Cannot register with existing email
3. **Account Recovery** - Forgot password flow available
4. **Account Deletion** - User can request account deletion
5. **Data Retention** - Comply with GDPR/privacy requirements
