# Sharing & Access Control - Overview

## Purpose

Manages who can access envelopes and how they access them. Controls sharing modes, recipient permissions, and access restrictions across different user tiers.

## Core Access Models

### Public Access
- Unrestricted URL-based sharing
- No authentication required
- Anyone with link can access
- Full document viewing
- Analytics/visitor tracking

### Restricted (Invite-Only)
- Email-based invitations
- Recipient list management
- Per-recipient access control
- Optional authentication
- Access revocation capability

### Private Access
- Creator-only access
- Not shareable
- Internal/personal use
- No public or invited access
- Upgrade required to share

## Key Entities

- **AccessTokens** - Share links/tokens
- **RecipientLists** - Invited users
- **AccessLogs** - Track who accessed when
- **AccessRevocations** - Revoked access records
- **AccessPermissions** - Per-recipient permissions (future)

## Integration Points

- **Envelope Service** - Access enforcement
- **Authentication Service** - Login/identity
- **Email Service** - Invite delivery
- **Analytics** - Visitor tracking
- **Plan Service** - Feature availability
