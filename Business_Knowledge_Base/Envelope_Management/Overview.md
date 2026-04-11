# Envelope Management - Overview

## Purpose

Manages the creation, storage, organization, and lifecycle of envelopes—the core content containers in Wyask. Envelopes hold documents, AI-generated descriptions, sharing settings, and recipient access information.

## Scope

- **Envelope Creation** (from document upload, URL, or AI-generated)
- **Document Upload & Storage** (files, URLs, images)
- **Envelope Naming & Organization** (custom names, folders)
- **Sharing Configuration** (modes: Public, Restricted, Private)
- **Recipient Access Management** (invite-only, public links)
- **Envelope Status Tracking** (draft, active, expired, archived)
- **Envelope Deletion & Archival**
- **Envelope Preview & Display**
- **Folder Organization**

## Core Entities

- **Envelopes** - Main content container
- **Documents** - Files/URLs within envelopes
- **EnvelopeShares** - Sharing instances
- **Recipients** - Users/groups with access
- **EnvelopeFolders** - Organization hierarchy
- **EnvelopeHistory** - Audit trail
- **EnvelopeMetadata** - AI descriptions, tags

## Supported Document Types

1. **Uploaded Files**
   - PDFs
   - Images (JPG, PNG, WebP)
   - Documents (DOCX, XLSX, PPTX)
   - Audio files
   - Video files

2. **URLs**
   - Web links
   - YouTube videos
   - Social media posts
   - Article links

3. **AI-Generated Content**
   - Text descriptions
   - Summaries

## Sharing Modes

### Public
- Accessible via public link
- No login required
- No recipient restrictions
- Analytics tracked

### Restricted
- Invite-only via email
- Recipient list managed
- Login optional based on settings
- Per-recipient access control

### Private
- Only creator/owner access
- Not shareable publicly
- Internal use only

## Key Features

- **Folder Organization** - Create folders to organize envelopes (Q2 2025)
- **Envelope Status Indicator** - Visual status badges (active, expired, draft)
- **Envelope Preview** - Quick preview without opening
- **Soft Delete** - Archive instead of permanent deletion
- **Bulk Operations** - Move, delete, share multiple envelopes
- **Custom Sender Identity** - Display custom name/brand on envelope (Q2)

## Integration Points

- **Document Storage** - Cloud storage backend (S3/Vercel)
- **AI Service** - Description generation
- **Email Service** - Invite delivery
- **Chat Service** - Related Q&A
- **Analytics** - Envelope usage tracking
- **Plan Service** - Feature availability by tier
