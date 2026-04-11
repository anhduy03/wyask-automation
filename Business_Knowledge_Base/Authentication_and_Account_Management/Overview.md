# Authentication & Account Management - Overview

## Purpose

Manages user identity, account creation, authentication, and account credential management across the Wyask platform. Supports multiple authentication methods and account registration flows for different user tiers.

## Scope

- **Account Registration** (Email-based)
- **Login & Authentication**
- **Email Verification & Confirmation**
- **Password Management** (Set, Update, Reset)
- **Session Management & Refresh Tokens**
- **Account Details Management**
- **Social Authentication** (Google, Apple, Facebook) - Planned

## Supported Authentication Methods

1. **Magic Link** - Email-based passwordless entry
2. **Password-based Login** - Traditional email + password
3. **OTP (One-Time Password)** - Email-based OTP
4. **Biometric** (Mobile) - Fingerprint & Face ID - Planned

## Account Types

### Freemium Account
- Light account state (email-based)
- No password required for initial signup
- Can create one free envelope
- Can upgrade to Plus or Pro

### Plus/Pro Account
- Full account with password
- Complete account registration required
- Access to plan-specific features
- Can manage subscriptions

## Key Entities

- **Users** - Core user profile (email, name, preferences)
- **Auth_Tokens** - Access and refresh tokens
- **Email_Verifications** - Email verification tracking
- **Password_History** - Password change audit trail
- **User_Sessions** - Active session management

## Integration Points

- **Supabase Auth** - Core authentication provider
- **Email Service** - Magic links and OTP delivery
- **Plan Service** - User plan determination
- **Sessions** - Token and session management
