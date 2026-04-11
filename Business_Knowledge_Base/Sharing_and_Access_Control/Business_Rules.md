# Sharing & Access Control - Business Rules

## Access Mode Rules

### Public Sharing
1. **No Authentication** - Access without login
2. **Unique URLs** - Each share gets public token
3. **Unlimited Recipients** - No recipient limit
4. **Optional Expiry** - Can set time-based expiry
5. **Tracking Enabled** - Capture visitor info
6. **Revokable** - Can toggle public access off

### Restricted Sharing (Invite-Only)
1. **Email Required** - Must provide recipient emails
2. **Invite Delivery** - Verification email sent
3. **Unique Links** - Each recipient gets unique token
4. **Expiry Date** - Invites expire (30 days default)
5. **Optional Auth** - Can require login
6. **Revocable** - Remove recipients individually
7. **Accept Required** - Recipient must claim access

### Private Access
1. **Creator Only** - Single owner access
2. **No Sharing** - Cannot change mode without upgrade
3. **Not Invitable** - Cannot invite users
4. **Protected** - No public discovery
5. **Freemium Default** - Free tier defaults to private initially

## Recipient Management Rules

### Adding Recipients
1. **Email Validation** - Valid email format required
2. **Duplicate Prevention** - Cannot invite same email twice
3. **Batch Addition** - Can add multiple at once
4. **Auto-Duplicate Check** - System prevents duplicates

### Invitation Flow
1. **Unique Invite Link** - Each recipient gets unique URL
2. **Email Delivery** - Invitation sent via email service
3. **Personalization** - Optional custom message
4. **Resend Available** - Can resend expired invites
5. **Tracking** - Record when invite sent/claimed

### Removing Recipients
1. **Immediate Revocation** - Access removed instantly
2. **Cannot Re-download** - Already downloaded content not affected
3. **Next Access Fails** - Link becomes invalid
4. **Audit Trail** - Log who removed when
5. **Optional Notification** - Notify removed recipient

## Access Control Rules

### Token Validation
1. **Token Signature** - Cryptographically signed
2. **Expiration Check** - Time-based expiry enforced
3. **Revocation Check** - Revoked tokens rejected
4. **Rate Limiting** - Prevent brute force token guessing
5. **Single Use** - Invite tokens consumed on claim

### Session Management
1. **Access Cookie** - Set after claiming invite
2. **Session Duration** - Browser session or timed
3. **Device Specific** - Session per device/browser
4. **Logout** - Clear session, revoke cookie
5. **Refresh** - Session can be extended

## Permission Rules

### What Recipients Can Do
1. **View Content** - Access documents in envelope
2. **Ask Questions** - Post questions in chat
3. **View Responses** - See answers to questions
4. **Download** - Save files locally
5. **Share Further** - NOT allowed (unless future feature)

### What Recipients Cannot Do
1. **Modify Content** - Cannot edit documents
2. **Delete Envelope** - Cannot remove envelope
3. **Manage Recipients** - Cannot invite others
4. **Change Sharing** - Cannot alter sharing settings
5. **See Analytics** - Cannot view visitor stats

## Data Protection Rules

### Access Logging
1. **Log All Access** - Record each view
2. **Capture IP** - Store visitor IP address
3. **Timestamp** - Record exact access time
4. **User Identification** - Identify by email/ID if known
5. **Retention** - Keep logs for 90 days

### Privacy Rules
1. **IP Address** - Stored for analytics/security
2. **Email Tracking** - Capture optional email
3. **Consent** - Optional for anonymous visitors
4. **GDPR Compliance** - Allow deletion of personal data
5. **Data Minimization** - Only collect necessary data

## Tier-Specific Rules

### Freemium
- **Default: Private** - Start with no sharing
- **No Restricted** - Cannot use invite-only mode
- **Public Option** - Can enable public if desired
- **No Control** - Cannot manage who accesses

### Plus
- **All Modes** - Public, Restricted, Private
- **Recipient Management** - Full invite control
- **Per-Recipient Revocation** - Remove individual access
- **Access Analytics** - View visitor stats

### Pro
- **Advanced Control** - Permissions per recipient (future)
- **Bulk Operations** - Manage many recipients
- **API Access** - Programmatic share management
- **Custom Tokens** - Branded share links (future)

## Security Constraints

1. **No Token Reuse** - Invite tokens consumed on use
2. **No Token Guessing** - Strong random tokens (256-bit)
3. **HTTPS Only** - All shares over secure connection
4. **No Plaintext Passwords** - Never share in URL
5. **No Hardcoded Expiry** - Configurable per share
