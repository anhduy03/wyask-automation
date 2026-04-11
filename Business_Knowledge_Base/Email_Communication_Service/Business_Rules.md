# Email Communication Service - Business Rules

## Email Sending Rules

### Transactional Emails
1. **Sent Immediately** - No delay
2. **Critical Delivery** - Retry on failure
3. **No Unsubscribe** - User cannot opt-out (system email)
4. **High Priority** - Queue processing
5. **Examples** - Password reset, email verification, payment confirmation

### Marketing/Notification Emails
1. **Respect Preferences** - Check user opt-in
2. **Unsubscribe Available** - One-click unsubscribe
3. **Batch Processing** - Can be delayed slightly
4. **Lower Priority** - Lower queue priority
5. **Examples** - Tips, feature announcements, digest

### Bulk/Invitation Emails
1. **Throttled** - Not all at once
2. **Rate Limited** - Avoid spam reputation
3. **Monitored** - Track bounce rates
4. **Tracked** - Know delivery status
5. **Examples** - Envelope invitations (multiple recipients)

## Email Content Rules

### Required Elements
1. **From** - Clear sender identification
2. **Subject** - Clear, specific subject line
3. **Body** - Primary message content
4. **CTA** - Call-to-action button/link
5. **Unsubscribe** - Link (for marketing emails)
6. **Footer** - Sender address, privacy link

### Personalization
1. **Recipient Name** - Use "Hi [Name]" greeting
2. **Dynamic Content** - Personalized details
3. **Custom Messages** - User-provided text (invitations)
4. **Branding** - Company logo, colors
5. **Tone** - Professional but friendly

### Security
1. **No Passwords** - Never include in email
2. **No Sensitive Data** - No API keys, tokens
3. **Links Only** - Action via link, not attachment
4. **HTTPS URLs** - Secure links
5. **Expiry** - Links expire after time period

## Recipient Management Rules

### Email Validation
1. **Format Check** - Valid email format
2. **Domain Check** - Known email provider
3. **Typo Detection** - Warn of common typos (optional)
4. **Duplicate Check** - Don't send multiple to same person
5. **Bounce Check** - Skip known invalid addresses

### Bounce Handling
1. **Hard Bounce** - Invalid address, permanently remove
2. **Soft Bounce** - Temporary failure, retry later
3. **Complaint** - User marked as spam, remove
4. **Suppress List** - Skip bounced/complained addresses
5. **Recovery** - Allow re-add after period

### Email Preferences
1. **Opt-In/Out** - User controls which emails
2. **Frequency** - Daily, weekly, none
3. **Type** - Which email categories
4. **Persistence** - Preferences stored and respected
5. **Easy Update** - One-click manage preferences

## Delivery Rules

### Queue Processing
1. **Async Delivery** - Don't block user action
2. **Immediate Processing** - Transactional, ASAP
3. **Batch Processing** - Bulk emails batched
4. **Priority Queue** - Transactional > Marketing
5. **Retry Logic** - Retry failed sends

### Retry Policy
1. **Attempt 1** - Immediate
2. **Attempt 2** - After 5 minutes
3. **Attempt 3** - After 30 minutes
4. **Attempt 4** - After 2 hours
5. **Give Up** - After 5 attempts or 24 hours

### Rate Limiting
1. **Per Provider** - Follow SendGrid, AWS limits
2. **Per User** - Don't spam individual
3. **Per Domain** - Protect sending reputation
4. **Throttled** - Spread out bulk sends
5. **Monitoring** - Alert on anomalies

## Template Rules

### Email Structure
1. **Header** - Wyask branding
2. **Main Content** - Message body
3. **CTA** - Primary action button
4. **Footer** - Links, unsubscribe
5. **Responsive** - Mobile-friendly

### Variable Substitution
1. **User Name** - {{user_name}}
2. **Recipient Email** - {{recipient_email}}
3. **Action Link** - {{action_url}}
4. **Expiry Time** - {{expiry_time}}
5. **Personalization** - {{custom_message}}

### Versioning
1. **Template IDs** - Version each template
2. **A/B Testing** - Test subject lines (future)
3. **Tracking** - Track clicks, opens
4. **Updates** - Update live without breaking

## Link Rules

### Link Generation
1. **Token-Based** - Links contain secure token
2. **Expiration** - Links expire after period
3. **One-Time Use** - Verification links single-use
4. **HTTPS** - Always secure
5. **Tracking** - Links tracked for analytics

### Link Validity
- **Verification Links** - 24 hours
- **Reset Links** - 24 hours
- **Invite Links** - 30 days (configurable)
- **Unsubscribe Links** - Never expires

## Compliance Rules

### CAN-SPAM Compliance
1. **Unsubscribe Link** - Present in marketing emails
2. **Sender ID** - Include sender address
3. **Subject Line** - No deceptive subjects
4. **Prompt Response** - Honor unsubscribe quickly (5 days)
5. **Monitoring** - Track compliance

### GDPR Compliance
1. **Consent Required** - For marketing emails
2. **Easy Opt-Out** - One-click unsubscribe
3. **Data Usage** - Transparent about data use
4. **Retention** - Delete emails after period
5. **Right to Erasure** - Remove user data

## Tier-Specific Rules

### Freemium
- Standard transactional emails
- Basic notifications
- Envelope invitations
- Account management emails

### Plus/Pro
- All Freemium emails
- Advanced notifications
- Weekly digest (optional)
- Custom email settings
- Email preferences fine-tuning

## Constraints

1. **Daily Limit Per User** - Max emails per day (anti-spam)
2. **Bounce Threshold** - Stop sending if bounce rate > 5%
3. **Complaint Threshold** - Stop if complaints > 0.1%
4. **Sender Reputation** - Monitor and maintain
5. **Template Required** - Cannot send custom email (for compliance)
