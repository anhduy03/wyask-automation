# Analytics & Tracking - Functional Flows

## Flow 1: Track Envelope View Event

1. **User clicks shared envelope link**
   - Page loads

2. **Frontend SDK initializes**
   - Detects page context
   - Extracts envelope ID from URL

3. **Page view event captured**
   - Event: "envelope_viewed"
   - Properties:
     - envelope_id
     - user_id (if known) or session_id
     - referrer
     - device type

4. **Event sent to analytics**
   - Batched with other events
   - Sent to Amplitude/Mixpanel
   - Or: Sent to backend then forwarded

5. **Event stored**
   - Database records event
   - Timestamp recorded
   - User properties stored

6. **Realtime dashboard updated**
   - Live visitor count incremented
   - Heatmap updated
   - Engagement metrics refreshed

---

## Flow 2: Track Signup Funnel

1. **User visits landing page**
   - Event: "landing_page_viewed"
   - Referrer captured

2. **User clicks signup**
   - Event: "signup_initiated"
   - Source recorded

3. **User enters email**
   - Event: "email_entered"
   - Email format stored (not plain email)

4. **Verification email sent**
   - Event: "verification_email_sent"
   - Timestamp

5. **User clicks verification link**
   - Event: "email_verified"
   - Time to verify recorded

6. **User sets password**
   - Event: "password_set"
   - Account creation flow completed

7. **Signup complete**
   - Event: "signup_completed"
   - Cohort assigned (week X signup)
   - User properties set

### Funnel Analysis
- Landing: 1000 users
- Signup Initiate: 500 users (50% dropout)
- Email Verified: 400 users (20% dropout)
- Signup Complete: 350 users (12.5% total conversion)

---

## Flow 3: Track Question Engagement

1. **Recipient views envelope**
   - Chat panel loaded
   - Event: "chat_panel_opened"

2. **Recipient types question**
   - Keystroke detected (optional)
   - Event: "question_drafted"

3. **Question submitted**
   - Event: "question_submitted"
   - Question properties:
     - Word count
     - Is first question (flag)
     - Time to ask

4. **AI response generated**
   - Event: "response_generated"
   - Response properties:
     - Word count
     - Generation time

5. **Recipient reads response**
   - Event: "response_viewed"
   - Time spent reading
   - Scroll depth

6. **Recipient rates response**
   - Event: "response_rated"
   - Rating: thumbs up/down
   - User sentiment captured

---

## Flow 4: Track Revenue Metrics

1. **User upgrades to Plus**
   - Event: "upgrade_initiated"
   - Source recorded (limit warning? Feature request?)

2. **Checkout page shown**
   - Event: "checkout_viewed"
   - Referring feature

3. **Payment entered**
   - Event: "payment_attempted"
   - Amount: $12
   - Plan: Plus

4. **Payment succeeds**
   - Event: "payment_succeeded"
   - Event: "subscription_created"
   - New MRR: +$12

5. **Invoice generated**
   - Event: "invoice_sent"
   - Receipt confirmed

6. **User now Plus**
   - User property updated: tier = "Plus"
   - Access to Plus features
   - Event: "user_upgraded"

---

## Flow 5: Track Feature Adoption

1. **Folder feature introduced**
   - Feature flag: folder_feature_enabled = true

2. **Plus user sees folder button**
   - Event: "folder_feature_exposed"
   - User property: exposed_to_folders = true

3. **User clicks create folder**
   - Event: "folder_create_attempted"
   - Feature adoption flagged

4. **Folder created**
   - Event: "folder_created"
   - Adoption confirmed
   - User property: has_used_folders = true

5. **User organizes envelopes**
   - Event: "envelope_moved_to_folder"
   - Feature engagement tracked

6. **Analytics updated**
   - Folder adoption % calculated
   - Engagement metrics updated
   - Feature success measured

---

## Flow 6: Track Churn Indicators

1. **User inactive for 30 days**
   - Event: "user_inactive_30_days"
   - Flag set: at_risk = true

2. **User logs in**
   - Event: "user_login"
   - Re-engagement tracked

3. **If no login after 30 days**
   - Event: "user_likely_churned"
   - Churn indicator set

4. **Subscription cancellation**
   - Event: "subscription_cancelled"
   - Reason captured (if provided)
   - MRR decreased
   - Event: "user_churned"

---

## Flow 7: Dashboard View

1. **Plus user opens analytics**
   - Analytics page loaded
   - User authorization checked

2. **Dashboard rendered**
   - Queries recent data
   - Displays:
     - Total views
     - Unique visitors
     - Engagement metrics
     - Popular questions
     - Trending documents

3. **Date range selected**
   - User chooses date range
   - Dashboard re-queries
   - Data filtered and displayed

4. **Filter applied**
   - Filter by document, or date
   - Dashboard re-calculated
   - Subset of metrics shown

5. **Export report**
   - User clicks "Export"
   - Data generated as CSV
   - Downloaded to device

---

## Flow 8: Realtime Visitor Tracking

1. **Envelope receives view**
   - Page loads
   - Event sent to analytics

2. **Realtime counter incremented**
   - Live visitor count updated
   - Shows on creator's dashboard (if viewing)

3. **Multiple visitors**
   - Each view captured
   - Realtime updates flowing
   - Dashboard shows live activity

4. **Heatmap building**
   - Click data collected
   - Scroll depth tracked
   - Heatmap visualization updated

---

## Edge Cases

### EC1: Offline Event Tracking
- User offline, events queued
- Connection restored, batched events sent
- No event loss

### EC2: User Blocks Analytics (uBlock Origin)
- Analytics events not sent
- No tracking occurs
- System gracefully degrades

### EC3: Event Deduplication
- Same event sent twice
- Deduplication logic prevents double-count
- Idempotent event processing

### EC4: Timestamp Skew
- Client clock wrong
- Server validates timestamp
- Uses server time if invalid
- Discrepancy logged
