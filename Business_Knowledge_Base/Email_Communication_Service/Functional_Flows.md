# Email Communication Service - Functional Flows

## Flow 1: Send Envelope Invitation Email

1. **User invites recipients**
   - Envelope sharing page
   - Enter recipient emails
   - Optional personal message

2. **System validates emails**
   - Format check
   - Bounce list check
   - Duplicate check

3. **Generate invite links**
   - Create unique token per recipient
   - Set 30-day expiry
   - Store in database

4. **Compose email**
   - Load invitation template
   - Insert personalization:
     - Recipient name
     - Sender name
     - Envelope name
     - Personal message
     - Unique invite link

5. **Email queued**
   - Add to sending queue
   - Marked as "pending"
   - Set priority

6. **Email sent**
   - Queue processor sends
   - Status updated to "sent"
   - Log delivery attempt

7. **Recipient receives**
   - Email in inbox
   - Contains personal message
   - "Claim Access" button with unique link

---

## Flow 2: Password Reset Email

1. **User clicks "Forgot Password"**
   - Enters email address
   - Validation succeeds

2. **Generate reset token**
   - Create secure token (256-bit)
   - Set 24-hour expiry
   - Store in database

3. **Compose reset email**
   - Load password reset template
   - Insert:
     - Reset link with token
     - Expiry information
     - Support contact

4. **Send immediately**
   - Transactional priority
   - No delay
   - Retry on failure

5. **User receives email**
   - "Reset your password"
   - "Reset Password" button
   - Backup link in text

6. **User clicks link**
   - Validation checks token
   - Checks expiry
   - Shows password reset form

7. **Password reset**
   - User sets new password
   - Confirmation email sent
   - Reset token invalidated

---

## Flow 3: Email Verification After Signup

1. **User completes signup**
   - Email provided
   - Account created (unverified)

2. **Generate verification token**
   - Secure token created
   - 24-hour expiry
   - Stored in database

3. **Compose verification email**
   - Load verification template
   - Insert:
     - Verification link
     - Expiry time
     - Account info

4. **Send email**
   - Transactional (immediate)
   - Retry on failure
   - No unsubscribe (transactional)

5. **User receives**
   - "Verify your email"
   - "Verify Email" button

6. **User clicks link**
   - Token validated
   - Email marked verified
   - Account activated
   - Redirect to dashboard

---

## Flow 4: New Question Notification

1. **Recipient asks question**
   - Question submitted in chat
   - Processed by system

2. **Notify creator (optional)**
   - Check notification preference
   - Is creator opted in?
   - Yes: proceed

3. **Compose notification**
   - Load question notification template
   - Insert:
     - Envelope name
     - Question preview
     - Direct link to view

4. **Send notification**
   - Normal priority (not transactional)
   - Check user preferences
   - Respect unsubscribe preference

5. **Creator receives email**
   - "New question on envelope..."
   - Question snippet
   - Direct link to answer

---

## Flow 5: Batch Invitation Send

1. **Admin sends invite to 1000 users**
   - Bulk operations
   - Select recipients
   - Compose message

2. **Queue all emails**
   - Add 1000 emails to queue
   - Each with unique token
   - Batch ID assigned

3. **Throttled sending**
   - Send 100/minute (example rate limit)
   - Spread across time
   - Monitor bounce rate

4. **Tracking**
   - Track delivery for each
   - Log open/click events
   - Failure notifications

5. **Completion notification**
   - Admin notified when done
   - Summary: sent, bounced, failed
   - Report available

---

## Flow 6: Bounce Handling

1. **Email provider reports bounce**
   - Hard bounce: Invalid address
   - Soft bounce: Temporary issue

2. **Hard bounce**
   - Add to suppress list
   - Don't try again
   - Update user record
   - Notification to admin

3. **Soft bounce**
   - Retry logic triggers
   - Retry in 5 minutes
   - If repeated, mark as hard bounce

4. **After max retries**
   - Mark as "failed"
   - Admin notification
   - Update delivery status

5. **Suppress list**
   - Future sends skip bounced emails
   - Cannot be overridden (auto)
   - User must update email address

---

## Flow 7: Unsubscribe Flow

1. **User clicks unsubscribe**
   - In email footer
   - Click link

2. **Preference page**
   - Show what they're subscribed to
   - Unsubscribe options

3. **User selects**
   - "Unsubscribe from all"
   - Or specific categories
   - Confirm

4. **Update preferences**
   - Set user.email_opted_out = true
   - Or specific categories disabled
   - Immediate effect

5. **Confirmation**
   - "You've been unsubscribed"
   - Can resubscribe anytime (link)

6. **System respects**
   - Marketing emails stop
   - Transactional emails still sent
   - Preferences honored going forward

---

## Edge Cases

### EC1: Email Address Misspelled in Invite
- User invites "usre@example.com" (typo)
- Email not received by intended person
- No system prevention
- User must resend/correct

### EC2: Email Provider Down
- SendGrid/AWS SES unavailable
- Emails queued locally
- Automatic retry when available
- Retry for 24 hours

### EC3: User Receives Multiple Emails
- Enrolled in multiple recipient lists
- Gets multiple invites to same envelope
- User manually manages/archives

### EC4: Unsubscribe Then Resubscribe
- User unsubscribes
- Then resubscribes
- Preference changed again
- Effective immediately
