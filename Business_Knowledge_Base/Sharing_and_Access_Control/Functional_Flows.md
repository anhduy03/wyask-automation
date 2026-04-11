# Sharing & Access Control - Functional Flows

## Flow 1: Share Envelope via Invite-Only Link

1. **User selects envelope**
   - Opens envelope details
   - Clicks "Share" button

2. **Share mode selection**
   - Choose "Restricted (Invite-Only)"
   - Confirm action

3. **Add recipients**
   - Enter recipient email addresses
   - One or multiple
   - Add custom message (optional)

4. **Review before sending**
   - Confirm recipient list
   - Verify message
   - Click "Send Invites"

5. **Invites sent**
   - Email sent to each recipient
   - Unique claim link in email
   - Confirmation shown

6. **Recipient claims access**
   - Clicks link in email
   - Access granted
   - Can view envelope

---

## Flow 2: Access Public Envelope via Link

1. **Visitor receives link**
   - Via email, Slack, social media, etc.
   - Clicks link

2. **Token validation**
   - System validates token
   - Check expiry
   - Check revocation status

3. **Grant access**
   - If valid, show envelope
   - Set access session
   - Record visit

4. **View content**
   - Document displayed
   - Chat available
   - Download option shown

5. **Analytics recorded**
   - Visit tracked
   - IP recorded
   - Time spent tracked

---

## Flow 3: Revoke Access

1. **Envelope owner views recipients**
   - Open sharing settings
   - See recipient list

2. **Select recipient to remove**
   - Click "X" or "Remove" button
   - Confirmation dialog

3. **Revoke confirmed**
   - Access token invalidated
   - Recipient removed from list
   - Notification sent (optional)

4. **Next access attempt**
   - Recipient tries to access
   - Token rejected
   - Error: "Access has been revoked"

---

## Flow 4: Change Sharing Mode

1. **User views envelope**
   - Sees current sharing mode
   - Badge shows: "Private" / "Public" / "Restricted"

2. **Click share mode**
   - Opens share settings modal

3. **Select new mode**
   - Private → Public (requires Plus+)
   - Public → Private
   - Private → Restricted (Plus+)

4. **Apply change**
   - New mode saved
   - Previous tokens invalidated
   - Confirmation shown

---

## Flow 5: Access Control Check (System Flow)

1. **Visitor clicks envelope link**
   - Browser makes request with token

2. **Server validates**
   - Extract token from URL
   - Check token signature
   - Check expiry time
   - Check revocation list

3. **Decision**
   - Valid: Grant access
   - Expired: Show error, offer resend
   - Revoked: Show error, suggest contact owner
   - Invalid: Show error

4. **If granted**
   - Set session/cookie
   - Record access log
   - Serve content

---

## Edge Cases

### EC1: Recipient Claims Invite, Email Already Registered
- Existing user clicks invite link
- System recognizes email
- Can login and auto-grant access
- Or prompt to link accounts

### EC2: Public Link Accessed After Expiry
- Link set to expire in 30 days
- User tries after 31 days
- Error: "This link has expired"
- Option: Request new link from owner

### EC3: Revoke While User Actively Viewing
- Recipient viewing envelope
- Owner revokes access
- Current page may still show content (cached)
- On refresh/reload: Access denied

### EC4: Duplicate Invite Attempts
- User invites same email twice
- Only one invite sent
- Or: Resend option appears
- No duplicate entries in recipient list
