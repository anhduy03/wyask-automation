# Settings & Security - Business Rules

## Profile Management Rules

### Edit Profile
1. **Name Update** - Can change display name anytime
2. **Avatar/Photo** - Optional profile picture
3. **Bio** - Optional short biography (future)
4. **Public Profile** - Can be viewed by others (future)
5. **Changes Immediate** - No approval needed

### Email Update
1. **Verification Required** - New email must be verified
2. **Old Email Notification** - Send confirmation to old email
3. **New Email Notification** - Confirm new email received
4. **Grace Period** - 24 hours to verify
5. **Verification Link Expiry** - 24 hours (standard)

## Password Rules

### Password Requirements
- **Minimum 8 characters**
- **At least 1 uppercase letter**
- **At least 1 lowercase letter**
- **At least 1 number**
- **At least 1 special character** (optional)

### Password Update
1. **Current Password Required** - Verify identity
2. **Cannot Reuse** - Last 5 passwords blocked
3. **Confirmation Required** - Type new password twice
4. **Immediate Effect** - No other sessions affected
5. **Email Confirmation** - Notified of change

### Password Reset
1. **Forgot Password Link** - Request reset
2. **Email Verification** - Link sent to email
3. **Reset Link Valid** - 24 hours only
4. **One-Time Use** - Link consumed after use
5. **Email Notification** - Confirm password changed

## Session Management Rules

### Active Sessions
1. **View All Sessions** - List all active logins
2. **Session Details** - Device, IP, location, last active
3. **Logout Remotely** - Terminate session from settings
4. **Single Logout** - Doesn't affect other sessions
5. **Multi-Device** - Independent sessions per device

### Session Timeout
1. **Inactivity Timeout** - 30 minutes default
2. **Automatic Logout** - Session ends after timeout
3. **Refresh Before Timeout** - Activity resets timer
4. **Grace Period** - 5-minute warning before timeout
5. **Logout on Close** - Optional browser window close

### Two-Factor Authentication (Planned)
1. **Optional** - User opt-in
2. **Methods** - Authenticator app, SMS
3. **Recovery Codes** - Backup access if lost 2FA device
4. **Enforcement** - Can require for all users (Pro)

## Security Logging Rules

### Login History
1. **All Attempts** - Record every login attempt
2. **Failed Attempts** - Track failed logins
3. **Success Timestamp** - When login succeeded
4. **IP Address** - Store visitor IP
5. **Device Info** - Browser, OS, device type
6. **Location** - Approximate location from IP

### Suspicious Activity Detection
1. **New Location** - Alert if login from new country
2. **Multiple Failures** - Alert after 3+ failed attempts
3. **Unusual Time** - Alert for off-hours access
4. **Rapid Logins** - Alert if multiple logins in short time
5. **Account Recovery** - Require email confirmation

### Action Logging
1. **Account Changes** - Log name, email, password changes
2. **Data Export** - Log data download requests
3. **Permission Changes** - Log sharing changes
4. **Sensitive Actions** - Detailed audit trail
5. **Retention** - Keep logs for 1 year

## Privacy & Data Rules

### Data Export (GDPR Right to Portability)
1. **Requestable Anytime** - User can request any time
2. **Format** - JSON, CSV, or Wyask format
3. **Includes** - All personal data, envelopes, chat history
4. **Delivery** - Download link emailed
5. **Timeout** - Link valid for 7 days

### Data Deletion (GDPR Right to Be Forgotten)
1. **Request Deletion** - User initiates deletion
2. **Confirmation** - Require email confirmation
3. **Grace Period** - 30 days before hard delete
4. **Final Notification** - Warning about irreversibility
5. **Irreversible** - Cannot undo after period

### Email Preferences
1. **Marketing Emails** - Opt-in/out
2. **Transactional Emails** - Cannot opt-out (password reset, etc.)
3. **Notifications** - Customize notification types
4. **Frequency** - Digest emails, daily, weekly, none
5. **Unsubscribe** - Easy unsubscribe link in emails

## IP & Device Management Rules

### Device Trust (Future)
1. **Remember Device** - Trust this computer
2. **Auto-Login** - Skip password on trusted device
3. **Trust List** - Manage trusted devices
4. **Remove Trust** - Revoke trusted device
5. **Security Code** - Required for new device

### IP Whitelisting (Pro Feature)
1. **Manual Addition** - Add allowed IPs
2. **CIDR Notation** - Support IP ranges
3. **Enforcement** - Only IPs on whitelist can access
4. **Exceptions** - 2FA bypass with code
5. **Alert On Block** - Notify user of blocked attempt

## Notification Settings Rules

### Notification Types
1. **Account Activity** - Login, password change
2. **Envelope Activity** - New questions, responses
3. **Sharing Events** - Envelope shared with user
4. **Plan Events** - Payment charged, renewal approaching
5. **Support** - Help center articles, tips

### Delivery Methods
1. **Email** - Primary notification method
2. **In-App** - Notification bell in app (future)
3. **SMS** - Text message (Pro feature, future)
4. **Disable All** - Turn off all notifications

## Consent & Privacy Rules

### Cookie Consent
1. **Essential** - Always required
2. **Analytics** - User opt-in
3. **Marketing** - User opt-in
4. **Save Consent** - Remember preferences
5. **Revoke Anytime** - Can change consent

### Privacy Policy & Terms
1. **Linked** - Accessible from settings
2. **Current Version** - Show effective date
3. **Notify Changes** - Email on policy updates
4. **Accept Required** - Must agree to use service

## Tier-Specific Rules

### Freemium
- Basic profile settings
- Password management
- Email preferences
- Login history (basic)
- No 2FA

### Plus
- All Freemium features
- Data export
- Advanced session management
- Suspicious activity alerts
- Detailed login history

### Pro
- All Plus features
- IP whitelisting
- API keys for integration
- Advanced audit logs
- Custom security policies

## Constraints

1. **Email Unique** - Cannot use existing email
2. **Password Non-Reusable** - Cannot reuse recent passwords
3. **Session Limit** - Maximum concurrent sessions (policy-dependent)
4. **Data Export Rate Limit** - Can export once per day
5. **Deletion Irreversible** - No recovery after grace period
