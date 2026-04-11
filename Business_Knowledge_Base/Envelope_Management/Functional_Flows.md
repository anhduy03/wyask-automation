# Envelope Management - Functional Flows

## Flow 1: Create Envelope from Document Upload

### Actors
- Creator User
- Wyask System
- Storage Service
- AI Service (optional)

### Main Flow

1. **User initiates creation**
   - Clicks "Create Envelope" button
   - Navigates to envelope creation screen

2. **Document upload**
   - User selects files to upload (or drag-drop)
   - System validates file type
   - System checks file size (< 100 MB)
   - Upload progress shown

3. **Upload processing**
   - File sent to storage backend
   - Virus scan performed
   - File indexed for search
   - Metadata extracted

4. **Envelope details input**
   - User enters envelope name (or auto-generated)
   - Optional description entered
   - User can request AI description generation

5. **AI Description (optional)**
   - System analyzes document
   - Generates summary/description
   - User reviews generated text
   - User can edit or regenerate

6. **Sharing configuration**
   - User selects sharing mode:
     - Private (default)
     - Public
     - Restricted (Plus+)
   - If Restricted: add recipient emails

7. **Review & Create**
   - User confirms details
   - System validates all inputs
   - Envelope created in database

8. **Envelope created successfully**
   - Envelope assigned unique ID
   - Status: "Draft"
   - URL generated (if public/restricted)
   - Confirmation shown to user

### Alternative: From URL
1. User pastes URL instead of uploading file
2. System extracts content from URL
3. Generates preview/thumbnail
4. Continues from step 4 above

---

## Flow 2: Share Envelope (Invite-Only)

### Actors
- Envelope Owner
- Wyask System
- Email Service
- Recipients (external users)

### Main Flow

1. **User opens envelope**
   - Views envelope details
   - Clicks "Share" or "Invite Recipients"

2. **Share configuration**
   - User selects "Restricted" sharing mode
   - Restricted mode: invite-only

3. **Add recipients**
   - User enters recipient email addresses
   - Can add one or multiple emails
   - Email validation performed
   - Duplicate check

4. **Personalization (optional)**
   - User adds personal message
   - Message included in invite email
   - User sets optional expiry date

5. **Send invites**
   - System generates unique invite links
   - Email sent to each recipient
   - Email contains:
     - Personalized message
     - "Claim Access" button/link
     - Direct claim link in email

6. **Recipients receive email**
   - Email arrives at recipient inbox
   - Link points to claim page
   - No login required yet

7. **Recipient claims access**
   - Clicks link from email
   - Taken to claim/access page
   - Can view envelope immediately (if no auth required)
   - OR shown login/signup page

8. **Recipient granted access**
   - Access recorded in database
   - Recipient email added to recipients list
   - Can now access envelope any time
   - Tracking enabled

### Alternative: Copy Public Link
1. User clicks "Get public link"
2. Unique public URL generated
3. User copies link
4. User shares via other channels (Slack, etc.)
5. Anyone with link can access

---

## Flow 3: Access Public Envelope

### Actors
- Visitor (any user)
- Wyask System
- Analytics Service

### Main Flow

1. **Visitor receives public link**
   - Via email, Slack, social media, etc.
   - Clicks link

2. **Page load**
   - System validates token/ID
   - Envelope retrieved from database
   - User identified as anonymous if not logged in

3. **Envelope preview shown**
   - Document preview displayed
   - Envelope metadata shown
   - Chat/Q&A section loaded (if enabled)

4. **Optional: Enter email**
   - System may request email for tracking
   - Optional consent collection
   - Email captured for analytics

5. **Interact with content**
   - View documents
   - Ask questions in chat
   - Follow embedded links

6. **Analytics recorded**
   - Visit tracked
   - Time spent recorded
   - Interaction recorded
   - Source recorded

---

## Flow 4: Organize Envelopes into Folders

### Actors
- Envelope Owner
- Wyask System

### Main Flow

1. **User in envelopes list**
   - Sees list of all envelopes
   - Sees "Create Folder" option

2. **Create folder**
   - User clicks "New Folder"
   - Prompted for folder name
   - Name entered and confirmed

3. **Folder created**
   - Folder appears in list
   - Empty state shown initially

4. **Move envelope to folder**
   - User selects envelope
   - Right-click context menu
   - Select "Move to Folder"
   - Choose destination folder

5. **Envelope moved**
   - Envelope association updated
   - List refreshed
   - Envelope now appears in folder view

6. **Bulk operations**
   - User selects multiple envelopes (checkboxes)
   - Bulk action menu appears
   - "Move to folder" option
   - All selected envelopes moved to same folder

---

## Flow 5: View Envelope Status & Metadata

### Actors
- Envelope Owner/Viewer
- Wyask System

### Main Flow

1. **User opens envelope details**
   - Envelope list view
   - Clicks on envelope

2. **Status displayed**
   - Visual indicator shows current status:
     - Green: Active
     - Yellow: Draft
     - Gray: Archived
     - Red: Expired
   - Status text shown

3. **Metadata displayed**
   - Created date
   - Last modified date
   - Creator name
   - Share mode (Public/Restricted/Private)
   - View count (if public/shared)
   - Recipient list (if restricted)

4. **Additional info**
   - File sizes
   - Document count
   - Storage usage
   - Expiry date (if applicable)

5. **Actions available**
   - Share button
   - Edit button
   - Delete/Archive button
   - Download button

---

## Flow 6: Archive Envelope

### Actors
- Envelope Owner
- Wyask System

### Main Flow

1. **User initiates archive**
   - Opens envelope
   - Clicks three-dot menu
   - Selects "Archive"

2. **Confirmation shown**
   - Dialog: "Archive this envelope?"
   - Explains envelope will be hidden
   - Option to undo

3. **Archive confirmed**
   - Envelope status changed to "Archived"
   - Removed from main list view
   - Still recoverable

4. **View archived envelopes**
   - User clicks "Archived" filter
   - Or views trash/archive folder
   - Archived envelopes shown
   - Restore option available

5. **Restore if needed**
   - User selects archived envelope
   - Clicks "Restore"
   - Envelope moves back to active
   - Status reset to "Active"

### Hard Delete (after 30 days)
1. **Auto-deletion scheduled**
   - Archived envelope older than 30 days
   - System marks for deletion
   - Final notification sent

2. **Permanent deletion**
   - Envelope permanently removed
   - All documents deleted
   - Storage freed up
   - Unrecoverable

---

## Flow 7: Revoke Recipient Access

### Actors
- Envelope Owner
- Wyask System
- Email Service

### Main Flow

1. **User opens envelope**
   - Views sharing settings
   - Sees list of recipients (if restricted)

2. **View recipients**
   - List shows:
     - Recipient emails
     - Access date
     - Last access date
     - Remove option

3. **Revoke access**
   - User clicks "X" or "Remove" on recipient
   - Confirmation: "Revoke access for [email]?"

4. **Access revoked**
   - Recipient removed from list
   - Access token invalidated
   - Next access attempt fails

5. **Optional notification**
   - System can send email
   - "Your access to envelope [name] has been revoked"
   - Explains removal reason (optional)

---

## Flow 8: Download Envelope Content

### Actors
- Envelope Owner
- Wyask System
- Storage Service

### Main Flow

1. **User opens envelope**
   - Views content
   - Clicks download button

2. **Download options shown**
   - Download all files (as ZIP)
   - Download specific file
   - Download as PDF (if applicable)

3. **Preparation**
   - System packages files
   - Creates download archive if multiple files
   - Generates secure download link

4. **Download starts**
   - Browser initiates download
   - Progress shown
   - File saved to user's device

---

## Flow 9: Bulk Envelope Operations

### Actors
- Envelope Owner
- Wyask System

### Main Flow

1. **User selects envelopes**
   - Checkbox to select multiple
   - "Select all" option available
   - Selection counter shown

2. **Bulk action menu appears**
   - Available actions:
     - Move to Folder
     - Archive
     - Delete
     - Share/Copy link
     - Download all as ZIP

3. **Select action**
   - User chooses action from menu
   - System applies to all selected

4. **Confirm action**
   - Confirmation dialog if destructive
   - Proceed or cancel

5. **Action applied**
   - All selected envelopes updated
   - List refreshed
   - Success message shown

---

## Edge Cases

### EC1: Upload Virus-Infected File
- **Detection:** File scanned, virus found
- **System Action:** File quarantined, not stored
- **User Feedback:** "File flagged as potentially unsafe. Contact support."
- **Admin Action:** Review flagged file

### EC2: Envelope Storage Quota Exceeded
- **Detection:** User tries to add file, quota full
- **System Action:** Reject upload
- **User Feedback:** "Storage quota exceeded. Upgrade plan or delete files."
- **Options:** Upgrade or delete envelope

### EC3: Public Link Accessed After Expiry
- **Expiry set:** 30 days from creation
- **After expiry:** Link becomes invalid
- **System Response:** "This link has expired"
- **Envelope owner:** Can extend or recreate link

### EC4: Recipient Claims Envelope Multiple Times
- **First claim:** Access granted
- **Subsequent claims:** Already granted, display envelope
- **No duplicate records:** Use idempotent operation

### EC5: Move Envelope to Folder While Sharing
- **Sharing mode:** Remain unchanged
- **Folder:** Envelope moved
- **Access:** Recipients can still access
- **Folder view:** Different from shared view
