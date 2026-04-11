# Envelope Management - Business Rules

## Envelope Creation Rules

### Basic Creation
1. **Document Required** - Cannot create envelope without content
2. **Naming** - Auto-generated or user-provided name
3. **Ownership** - Creator becomes owner
4. **Default Status** - Created as "Draft" initially
5. **Default Sharing** - Created as Private initially

### Freemium Envelope Creation
- **Limit: One free envelope** - Only one per freemium account
- **No password protection** - Freemium envelopes unprotected
- **Public by default** - Auto-shared publicly
- **No folder support** - Cannot organize into folders

### Plus/Pro Envelope Creation
- **Unlimited envelopes** - Create as many as needed
- **Password protection** - Optional (Pro feature)
- **Custom sharing modes** - Choose from Public/Restricted/Private
- **Folder organization** - Can create folders (Plus+)

### Document Upload Rules

#### File Size Limits
- **Individual file** - Max 100 MB
- **Per envelope** - Max 500 MB total
- **Storage quota** - Plan-dependent (Freemium: 1 GB, Plus: 10 GB, Pro: 100 GB)

#### File Type Restrictions
- **Allowed** - PDF, Images, Documents, Audio, Video
- **Blocked** - Executables, Scripts, Archives (unless embedded)
- **Virus Scanning** - All files scanned before storage
- **Quarantine** - Suspicious files held for review

#### URL Handling
- **Extract Preview** - Generate thumbnail/metadata
- **Embed Link** - Store original URL
- **Fallback Display** - Show link if embed fails
- **HTTPS Only** - Secure URLs preferred

## Envelope Organization Rules

### Folder Structure
1. **Flat Structure** - Folders don't nest (single level)
2. **Naming** - User-defined folder names
3. **Empty Folders** - Can have folders with no envelopes
4. **Default Folder** - "All Envelopes" or uncategorized area

### Envelope Movement
1. **Move to Folder** - Drag/drop or context menu
2. **Multi-select Move** - Bulk move operations
3. **Copy Not Supported** - Envelopes not duplicable
4. **Undo Available** - Recent moves can be undone

## Sharing Rules

### Public Sharing
1. **Unique URL** - Each share gets public link
2. **No Auth Required** - Accessible without login
3. **Expiration Optional** - Can set access expiry
4. **Tracking Enabled** - View count, visitor info
5. **No Recipient Limit** - Unlimited public access

### Restricted Sharing (Invite-Only)
1. **Recipient List** - Manually add email addresses
2. **Email Invites** - Invitation sent to each recipient
3. **Claim Link** - Recipients click to claim access
4. **Optional Auth** - Can require login after invite
5. **Revoke Access** - Can remove recipients anytime
6. **Per-Recipient Control** - Different access levels possible (future)

### Private Sharing
1. **Owner Only** - Only creator can access
2. **Not Shareable** - Cannot change sharing mode directly
3. **Upgrade Required** - Plus/Pro to share publicly
4. **Transfer Ownership** - Can transfer to other user

## Recipient Management Rules

### Invite-Only Access
1. **Email Invites** - Invitations delivered via email
2. **Unique Invite Link** - Each recipient gets unique claim link
3. **Valid for 30 days** - Invite expires after 30 days
4. **Resend Available** - Can resend after expiry
5. **Accept Required** - Recipient must claim to gain access

### Recipient Tracking
1. **Access Log** - Record who accessed and when
2. **Visitor ID** - Anonymous tracking for public access
3. **Email Capture** - Optional email collection on access
4. **IP Tracking** - Store visitor IP for analytics

### Recipient Removal
1. **Revoke Immediately** - Remove access instantly
2. **Cannot Recover Content** - Recipient loses access
3. **Notify Option** - Can notify recipient of removal
4. **Audit Trail** - Removal logged

## Status Rules

### Envelope Status Lifecycle
1. **Draft** - Recently created, not finalized
2. **Active** - Published, accessible
3. **Archived** - Soft-deleted, hidden by default
4. **Expired** - Share link expired (time-based)
5. **Revoked** - Sharing stopped, access denied

### Status Transitions
- Draft → Active (when shared or published)
- Active → Archived (user action)
- Active → Expired (time-based or manual)
- Archived → Active (restore action)

## Envelope Display Rules

### Preview Functionality
1. **Quick Preview** - Thumbnail/summary without full load
2. **Full View** - Complete content display
3. **Search Indexing** - Content searchable
4. **Metadata Display** - Show creator, date, description

### Sender Identity Display
1. **Creator Name** - Show actual creator name
2. **Custom Brand** - Pro feature to override name
3. **Logo/Icon** - Optional custom branding
4. **Professional Display** - Hide technical identifiers

## Soft Delete & Archival Rules

### Archive Actions
1. **Soft Delete** - Marked as archived, not removed
2. **Hidden by Default** - Don't show in main list
3. **Recoverable** - Can restore archived envelope
4. **Hard Delete** - Permanent deletion after grace period (30 days)

### Retention Policies
1. **Active Envelopes** - Kept indefinitely
2. **Archived Envelopes** - Kept 30 days before hard delete
3. **User Deletion** - Hard delete on demand
4. **Account Deletion** - Cascade delete all envelopes

## Quota & Limit Rules

### Freemium Limits
- **Max Envelopes** - 1 (free tier)
- **Storage** - 1 GB total
- **File Size** - 100 MB per file
- **Recipients** - Public only, unlimited
- **Features** - Basic sharing, no folders

### Plus Limits
- **Max Envelopes** - Unlimited (or 1000)
- **Storage** - 10 GB
- **File Size** - 100 MB per file
- **Shared Envelopes** - Unlimited
- **Features** - Folders, status tracking, organized access

### Pro Limits
- **Max Envelopes** - Unlimited
- **Storage** - 100 GB
- **File Size** - 500 MB per file
- **Advanced Sharing** - Per-recipient permissions (future)
- **Features** - Custom branding, advanced analytics

## Business Constraints

1. **Unique Envelope ID** - Each envelope has unique identifier
2. **Created Timestamp** - Record creation time
3. **Modified Timestamp** - Track last change
4. **Creator Always Owner** - Cannot change ownership initially
5. **Immutable History** - Cannot delete creation audit
