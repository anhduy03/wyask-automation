# Email Communication Service - Overview

## Purpose

Manages all outbound email communications from the Wyask platform. Handles transactional emails, notifications, invitations, and confirmations with reliable delivery and tracking.

## Email Types

### Authentication Emails
- Magic link for passwordless login
- Password reset links
- Email verification confirmations
- Account confirmation after signup

### Sharing & Collaboration
- Envelope invitation emails
- Recipient notifications
- Access revocation notices
- Share request acknowledgments

### Notifications
- New question in chat
- Creator response posted
- Envelope shared with you
- Usage alerts (near quota)

### Account & Billing
- Password changed confirmation
- Email address changed notification
- Subscription confirmation
- Payment failure notices
- Invoice/receipt delivery

### System Notifications
- Account security alerts
- Suspicious login attempt
- New device access
- Plan upgrade/downgrade

## Email Configuration

### Provider
- **Primary** - SendGrid, AWS SES, or similar
- **Fallback** - Backup provider for reliability
- **Rate Limiting** - Throttled to prevent bounce

### Sender Identity
- **From Address** - noreply@wyask.com
- **From Name** - "Wyask" or custom
- **Reply-To** - support@wyask.com (when appropriate)
- **Branding** - Company logo, colors

### Templates
- **Responsive Design** - Mobile-friendly emails
- **Plain Text** - Fallback for HTML failures
- **Dynamic Content** - Personalized fields
- **Unsubscribe Link** - Comply with CAN-SPAM

## Key Entities

- **EmailTemplates** - Predefined email formats
- **EmailLogs** - Send history and status
- **EmailPreferences** - User subscription choices
- **EmailQueue** - Pending emails for delivery
- **EmailBounces** - Hard/soft bounce tracking

## Integration Points

- **Auth Service** - Generate verification links
- **User Service** - Retrieve recipient emails
- **Envelope Service** - Envelope details for emails
- **Email Provider API** - SendGrid, AWS SES
- **Analytics** - Track opens, clicks
- **Queue Service** - Async email delivery

## Compliance

- **CAN-SPAM Compliance** - Unsubscribe links, sender info
- **GDPR Compliance** - Consent management
- **DKIM/SPF/DMARC** - Email authentication
- **Bounce Management** - Handle invalid emails
- **Rate Limiting** - Prevent spam reputation damage
