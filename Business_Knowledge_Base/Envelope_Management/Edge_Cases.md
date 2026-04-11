# Envelope Management - Edge Cases

## Document Upload Edge Cases

### EC1: File Upload Mid-Interrupt
**Scenario:** User uploads 50 MB file, internet disconnects at 75% progress  
**Expected Behavior:**
- Upload paused/failed
- Partial file not stored
- Error message shown
- Retry option available
- Resumable upload (if supported)

**Implementation:**
- Validate complete file before storage
- Cleanup partial uploads after timeout
- Provide clear retry mechanism

---

### EC2: Duplicate File Upload
**Scenario:** User uploads same file twice to same envelope  
**Expected Behavior:**
- System detects identical file (by hash)
- Option to skip duplicate
- Or allow duplicate if intentional
- Clear user feedback

**Implementation:**
- Hash-based duplicate detection
- User choice for handling

---

### EC3: Virus Detected During Upload
**Scenario:** File scanned, virus/malware detected  
**Expected Behavior:**
- File rejected, not stored
- Clear error: "File failed security scan"
- Suggestion to check file source
- No access to flagged file

**Implementation:**
- Quarantine suspicious file
- Alert admin
- Block user access

---

### EC4: Storage Quota Exceeded
**Scenario:** Freemium user (1 GB limit) tries to upload 500 MB file when 700 MB used  
**Expected Behavior:**
- Upload rejected
- Message: "Insufficient storage. Upgrade or delete content."
- Show storage usage breakdown
- Link to upgrade plan

**Implementation:**
- Pre-flight quota check
- Clear messaging about limits
- Easy upgrade path

---

### EC5: Corrupted/Invalid File Format
**Scenario:** User uploads file with fake extension (e.g., .txt renamed to .pdf)  
**Expected Behavior:**
- System validates file header
- If incompatible, reject with error
- Or auto-correct file type in metadata
- User informed of actual format

**Implementation:**
- Magic number validation
- File type verification beyond extension

---

## Sharing & Access Edge Cases

### EC6: Invite Same Email Multiple Times
**Scenario:** User invites same email address twice to same envelope  
**Expected Behavior:**
- System detects duplicate invite
- Option to skip or resend
- Only one entry in recipient list
- No duplicate access rights

**Implementation:**
- Check for existing recipient
- Prevent duplicate entries
- Or resend invite if opted

---

### EC7: Public Link Shared, Then Revoked to Private
**Scenario:** Envelope was public, user changes to Private sharing  
**Expected Behavior:**
- Public link becomes invalid
- Existing public link access fails: "This envelope is no longer public"
- Share mode changed successfully
- No external access possible

**Implementation:**
- Invalidate old share tokens
- Update share mode atomically

---

### EC8: Recipient Email Typo in Invitation
**Scenario:** User invites to "usre@example.com" instead of "user@example.com"  
**Expected Behavior:**
- Email sent to typo address (they likely don't own it)
- Original user doesn't notice invitation didn't go to correct person
- After time, realize mistype

**Mitigation:**
- Email validation on input
- Confirmation before sending: "Inviting usre@example.com?"
- Resend to correct email option

---

### EC9: Invite Expires Before Recipient Claims
**Scenario:** Invite set to expire in 30 days, recipient doesn't click before expiry  
**Expected Behavior:**
- Invite link becomes invalid
- Recipient clicks link: "Invite has expired"
- Envelope owner can resend new invite
- Old link permanently invalid

**Implementation:**
- Store invite expiry timestamp
- Check on claim attempt
- Offer resend option

---

### EC10: Revoke Access, Recipient Refreshes Browser
**Scenario:** Recipient has envelope open, owner revokes access, recipient hits refresh  
**Expected Behavior:**
- New page load attempts to fetch content
- Access check fails
- Error message: "Your access to this envelope has been revoked"
- Redirect to denied page

**Implementation:**
- Access validation on each load
- Session invalidation
- Clear error message

---

## Envelope Organization Edge Cases

### EC11: Move Envelope During Live Share
**Scenario:** Recipient viewing envelope, owner moves it to different folder  
**Expected Behavior:**
- Recipient's view unaffected
- Sharing continues to work
- Folder move transparent to recipient
- No access interruption

**Implementation:**
- Folder move doesn't affect share tokens
- Access based on envelope ID, not folder

---

### EC12: Delete Folder Containing Envelopes
**Scenario:** User tries to delete folder with active envelopes inside  
**Expected Behavior:**
- Option 1: Reject, show "Folder not empty"
- Option 2: Move envelopes to root, delete folder
- Clear behavior defined

**Implementation:**
- Choose and implement one strategy
- User feedback clear

---

### EC13: Rename Folder While Envelopes Inside
**Scenario:** User renames folder, envelopes currently viewing from folder list  
**Expected Behavior:**
- Folder name updated in UI
- Envelopes unaffected
- No loss of access
- User sees new folder name on refresh

**Implementation:**
- Atomic folder rename
- Update UI reactively
- No cascade changes

---

## Status & Lifecycle Edge Cases

### EC14: Envelope Status Stuck in Draft
**Scenario:** Envelope created but never finalized/published  
**Expected Behavior:**
- Draft envelopes hidden from default view
- Can still be found in "Drafts" filter
- Can be published/shared anytime
- Auto-cleanup after 30 days (optional)

**Implementation:**
- Track draft timestamp
- Optional auto-delete after period
- Clear draft filtering

---

### EC15: Envelope Expires While Being Viewed
**Scenario:** Recipient viewing envelope, expiry time reached  
**Expected Behavior:**
- Existing browser view may still work (loaded)
- Next refresh/reload: "This envelope has expired"
- No further access possible
- Owner notified of expiry

**Implementation:**
- Server-side expiry enforcement
- Session expiry check on refresh
- Client-side warning before expiry

---

### EC16: Restore Envelope That Was Modified After Archive
**Scenario:** Envelope archived, then contents updated, then restore requested  
**Expected Behavior:**
- Restore shows latest content (post-update)
- User can restore or keep archived
- Restore brings all modifications

**Implementation:**
- Track modifications independent of archive state
- Restore to latest version

---

## Preview & Display Edge Cases

### EC17: Preview Image Not Renderable
**Scenario:** File type not previewable (e.g., .exe, .zip)  
**Expected Behavior:**
- Generic file icon shown
- File name and size displayed
- Download option available
- "Preview not available for this file type"

**Implementation:**
- Handle unsupported file types gracefully
- Fallback to file info display

---

### EC18: URL Embed Becomes Unreachable
**Scenario:** Embedded URL (YouTube video, article) moves or becomes private  
**Expected Behavior:**
- Cached preview shows (if available)
- Or error: "Original content unavailable"
- Download still works if original file stored
- Clear indication of issue

**Implementation:**
- Cache preview at envelope creation
- Graceful fallback on embed failure

---

### EC19: Very Large PDF File Preview
**Scenario:** 100 MB PDF file, trying to generate preview  
**Expected Behavior:**
- Preview generation takes time
- Loading indicator shown
- Timeout if takes too long
- Fallback to file info display

**Implementation:**
- Async preview generation
- Loading state UI
- Timeout handling

---

## Quota & Limits Edge Cases

### EC20: User at Exactly Storage Limit
**Scenario:** Freemium user with 1 GB limit, currently using 1 GB exactly  
**Expected Behavior:**
- Any new file rejected
- Clear message about quota
- Upgrade option shown
- Option to delete existing envelope

**Implementation:**
- Exact quota check
- Clear feedback
- Options for resolution

---

### EC21: Envelope Limit Reached (Freemium)
**Scenario:** Freemium user has 1 envelope, tries to create another  
**Expected Behavior:**
- Creation blocked: "Freemium limited to 1 envelope"
- Upgrade prompt shown
- Link to Plus plan

**Implementation:**
- Enforce limit check
- Clear upgrade path

---

### EC22: Plan Downgrade After Exceeding New Limit
**Scenario:** Plus user with 50 envelopes downgrades to Freemium  
**Expected Behavior:**
- New limit applied (1 envelope)
- Existing envelopes kept (grace period or warning)
- Can't create more until below limit
- Warning shown at login

**Implementation:**
- Allow existing over-limit envelopes
- Block new creation until compliant
- Clear messaging about downgrade impact

---

## Concurrent Operations Edge Cases

### EC23: Simultaneous Delete & Share Request
**Scenario:** User deletes envelope while another user tries to access shared link  
**Expected Behavior:**
- Delete succeeds first
- Access attempt fails: "Envelope not found"
- Transaction isolation ensures consistency

**Implementation:**
- Database transaction handling
- Atomic delete operation

---

### EC24: Bulk Move to Folder While Sharing Update
**Scenario:** Bulk move 100 envelopes to folder while access settings changing  
**Expected Behavior:**
- Operations don't conflict
- Folder move completes
- Access changes apply
- No data corruption

**Implementation:**
- Separate transactions for independent operations
- Proper locking/concurrency control

---

## Recovery Edge Cases

### EC25: Recover Permanently Deleted Envelope
**Scenario:** User requests 40 days after archived (past 30-day grace)  
**Expected Behavior:**
- Envelope not recoverable
- Archive view no longer shows it
- Permanent deletion confirmed
- No recovery option

**Implementation:**
- Hard delete after grace period
- No undo possible

---

### EC26: Backup of Shared Envelope Contents
**Scenario:** User requests backup of envelope they're only invited to (not owner)  
**Expected Behavior:**
- Can download shared envelope content
- Creates personal copy
- Doesn't affect original
- Own backup independent

**Implementation:**
- Allow download for recipients
- Permission check for download
