# Subscription & Limits - Functional Flows

## Flow 1: Upgrade from Freemium to Plus

1. **User reaches Freemium limit**
   - Tries to create 2nd envelope
   - Error: "Freemium limited to 1 envelope"
   - Upgrade button shown

2. **Click upgrade**
   - Navigates to Plus plan page
   - Plan details shown
   - "Get Started" button

3. **Stripe checkout**
   - Collects card information
   - Billing address (if needed)
   - Subscription summary

4. **Payment processed**
   - Card charged
   - Stripe confirms
   - Invoice generated

5. **Plan activated**
   - Plan updated to Plus
   - Features enabled
   - Confirmation email sent

6. **User can now**
   - Create unlimited envelopes
   - Use folders
   - Use all sharing modes
   - 50 chat queries/month

---

## Flow 2: Chat Query Submission with Check

1. **User opens envelope**
   - Asks question in chat
   - Query count shown: "5/50 remaining"

2. **User submits question**
   - Question sent to backend
   - System checks plan: Plus tier
   - Queries remaining: 5

3. **Pre-flight check passes**
   - User has queries available
   - Process question
   - Consume 1 query

4. **AI generates response**
   - Response shown
   - Query count updated: "4/50"

### Alternative: At Limit
1. User at 0/50 queries
2. Try to submit question
3. Error: "No queries remaining"
4. Upgrade to Pro suggested

---

## Flow 3: Storage Quota Check

1. **User tries to upload file**
   - 50 MB file
   - Currently using 9.5 GB of 10 GB (Plus)

2. **Storage check**
   - 9.5 GB + 50 MB = 9.55 GB
   - Still under 10 GB limit
   - Upload allowed

3. **File uploaded**
   - Stored in S3
   - Storage updated: 9.55 GB

### At Limit
1. User using 10 GB of 10 GB
2. Try to upload 10 MB file
3. Error: "Storage quota exceeded"
4. Delete option shown or upgrade to Pro

---

## Flow 4: Downgrade Plan

1. **User in account settings**
   - Subscription section
   - "Manage subscription" link

2. **View current plan**
   - Plus: $12/month
   - Cancel or change button

3. **Select downgrade**
   - Choose Freemium
   - Confirmation dialog:
     - "Lose access to: Folders, unrestricted sharing, etc."
     - "Must reduce to 1 envelope"
     - "Lose 40 chat queries/month"

4. **Confirm downgrade**
   - Subscription ends
   - Grace period: 30 days
   - After 30 days: Enforce limits

5. **Action taken**
   - Billing stopped
   - User notified
   - Features gradually disabled

---

## Flow 5: Monthly Query Reset

1. **Last day of month (29th, 30th, or 31st)**
   - User at 45/50 queries (Plus)

2. **Calendar rolls to next month (1st)**
   - Batch job runs: "reset_monthly_quotas"
   - Queries reset to 50

3. **User can now ask 50 more questions**
   - Query counter: "50/50"
   - No manual action needed

---

## Flow 6: Failed Billing & Retry

1. **Billing date arrives**
   - Charge $12 to user's card
   - Card declined (expired)

2. **Charge fails**
   - Retry logic triggers
   - Retry again in 3 days

3. **Retry 1 (3 days later)**
   - Charge $12 again
   - Still fails
   - User notified

4. **Retry 2 (3 days later)**
   - Final attempt
   - Charge fails
   - Subscription suspended

5. **User notified**
   - Email: "Payment failed, please update card"
   - Plus features disabled
   - Downgraded to Freemium temporarily

6. **User updates card**
   - Logs in, updates payment method
   - Retry charge immediately
   - Success
   - Plus features re-enabled

---

## Flow 7: Envelope Limit Enforcement

1. **Freemium user has 1 envelope**

2. **Try to create 2nd envelope**
   - System checks: Is user Freemium?
   - Count active envelopes: 1
   - At limit? Yes
   - Block action

3. **Show error**
   - "Freemium limited to 1 envelope"
   - Upgrade button
   - Can archive existing to clear slot (not actually delete)

---

## Edge Cases

### EC1: Upgrade at Month-End
- User upgrades Plus to Pro on 28th of month
- Pro queries start: 500 for this month
- No proration of Plus queries
- Full Pro benefit immediately

### EC2: Query Consumed, Then Quota Changed
- User has 2 queries left (Plus)
- Downgrade to Freemium (5 queries/month)
- Next month: Fresh 5 queries
- No rollback of consumed queries

### EC3: Storage Exceeds Limit After Downgrade
- Plus user (10 GB) using 9.5 GB
- Downgrade to Freemium (1 GB)
- Cannot add new files
- Must delete to go under 1 GB
- Existing files stay (grace period)
