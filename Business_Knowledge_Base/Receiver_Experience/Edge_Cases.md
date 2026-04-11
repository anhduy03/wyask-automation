# Receiver Experience - Edge Cases

### EC1: Document Preview Fails
**Scenario:** PDF corrupted or unsupported format  
**Expected Behavior:**
- Show generic file icon
- Display filename and size
- "Preview not available" message
- Download option remains available

---

### EC2: Very Large PDF (500+ pages)
**Scenario:** User tries to view massive document on mobile  
**Expected Behavior:**
- First 10 pages loaded
- Load more on scroll
- "Page X of 1000" shown
- Search available but may be slow

---

### EC3: Embedded Video Doesn't Play
**Scenario:** YouTube link no longer valid or private  
**Expected Behavior:**
- Show "Video unavailable"
- Display original link
- User can click link directly
- Fallback to text/link

---

### EC4: User on Slow Connection
**Scenario:** 3G connection, large envelope  
**Expected Behavior:**
- Loading indicators shown
- Progressive enhancement
- Low-res preview first
- Full quality loads after
- Partial access maintained

---

### EC5: Zoom Gesture on Mobile Conflicts
**Scenario:** Pinch-zoom PDF, accidentally scrolls chat  
**Expected Behavior:**
- Gesture properly isolated to document
- Chat doesn't interfere
- No accidental submissions

---

### EC6: Share Button Clicked Multiple Times
**Scenario:** User rapid-clicks share button  
**Expected Behavior:**
- Only one email sent
- Button disabled after first click
- User not confused

---

### EC7: Accessibility: Screen Reader User
**Scenario:** Blind user with screen reader  
**Expected Behavior:**
- All text read aloud
- Structure announced (headings, lists)
- Alt text for images
- Form labels clear
- Chat fully accessible

---

### EC8: Font Size 200%, Document Width Too Long
**Scenario:** Large font + long lines, wrapping issues  
**Expected Behavior:**
- Document reflows responsively
- No horizontal scroll at very large sizes
- Or: Allow horizontal scroll (acceptable)

---

### EC9: Dark Mode, Embedded Image Has No Contrast
**Scenario:** Dark mode enabled, image hard to see  
**Expected Behavior:**
- Option: Add light background to images
- Or: User can disable dark mode for clarity
- Or: Image border to enhance visibility

---

### EC10: User Rates Answer "Unhelpful"
**Scenario:** Thumbs-down on AI response  
**Expected Behavior:**
- Feedback recorded anonymously
- Creator can see aggregated feedback
- System learns (future: improve prompts)

---

### EC11: Connection Drops During File Download
**Scenario:** User downloading ZIP, connection lost  
**Expected Behavior:**
- Download interrupted
- Partial file saved
- User can resume (if browser supports)
- Or: Restart download

---

### EC12: Copy-Paste Prevention Bypassed
**Scenario:** User disables JavaScript, can copy-paste  
**Expected Behavior:**
- Expected behavior (cannot prevent on client)
- Content protection is cosmetic only
- No security guarantee

---

### EC13: User Has No JavaScript Enabled
**Scenario:** Rare case, JavaScript disabled  
**Expected Behavior:**
- Basic HTML fallback shown
- Links work
- Chat unavailable
- Download links may work
- Graceful degradation

---

### EC14: Multiple Languages, No Translation
**Scenario:** Document in French, UI in English  
**Expected Behavior:**
- UI remains in browser language
- Document in original language
- No automatic translation (unless feature)
- User can copy-paste to translator

---

### EC15: Envelope Owner Deletes During Viewing
**Scenario:** User viewing envelope, owner deletes it  
**Expected Behavior:**
- Current view may still show cached content
- On refresh/reload: "Envelope not found"
- Accessing again: Error message

---

### EC16: Share Link Expires While Viewing
**Scenario:** Public envelope link set to expire, user viewing at expiry time  
**Expected Behavior:**
- Current session continues (cached)
- On page refresh: Expired message
- Cannot access again

---

### EC17: Chat Query Limit Reached During Session
**Scenario:** User has 1 query left, asks question, depleted  
**Expected Behavior:**
- Question processes successfully
- Query count: 0/50
- Next question: Blocked, upgrade prompt shown

---

### EC18: Mobile User Accidentally Zooms PDF
**Scenario:** Double-tap zooms to 200%, hard to read  
**Expected Behavior:**
- Double-tap again to unzoom
- Pinch-zoom available
- Reset zoom button available
- Gesture controls clear

---

### EC19: User Reports Inappropriate Content
**Scenario:** Clicks report button, selects "Inappropriate content"  
**Expected Behavior:**
- Report submitted
- Optional comment allowed
- Confirmation: "Thanks, we'll review"
- Creator notified
- Envelope flagged for moderation

---

### EC20: Print Document from Browser
**Scenario:** User uses browser print (Ctrl+P)  
**Expected Behavior:**
- Document prints as-is
- UI elements filtered out (CSS print styles)
- Watermark shown if configured
- Footer with source URL added

---

### EC21: Envelope Has No Documents
**Scenario:** Somehow envelope created without files (bug)  
**Expected Behavior:**
- Graceful error: "No content in envelope"
- Chat still available
- Contact creator option shown
- Not a crash/blank page

---

### EC22: User Bookmarks Shared Link
**Scenario:** User bookmarks envelope URL  
**Expected Behavior:**
- Link works when revisited (if not expired)
- Bookmarks point to same envelope
- Share history maintained
- Analytics captured each visit

---

### EC23: Viewer Preferences Conflict
**Scenario:** Browser cookie corrupted, preferences lost  
**Expected Behavior:**
- Fallback to defaults
- Reset preferences button
- No error message
- Graceful recovery

---

### EC24: Simultaneous Zoom & Theme Change
**Scenario:** User zooms while changing theme  
**Expected Behavior:**
- Theme change doesn't reset zoom
- Both settings apply independently
- No conflicts

---

### EC25: Mobile User with Broken CSS
**Scenario:** CSS fails to load (CDN issue)  
**Expected Behavior:**
- Fallback styling (browser defaults)
- Content still readable
- Functionality maintained
- Retry CSS load (service worker)
