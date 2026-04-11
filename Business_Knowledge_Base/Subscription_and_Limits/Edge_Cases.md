# Subscription & Limits - Edge Cases

### EC1: User at Exactly Storage Limit
**Scenario:** Plus user 10 GB used, tries to upload 1 byte file  
**Expected Behavior:**
- Rejected with "Storage limit exceeded"
- Must delete something first
- Or upgrade to Pro

---

### EC2: Plan Downgrade Mid-Month
**Scenario:** Pro user (Pro-rated refund?)  
**Expected Behavior:**
- Option 1: Immediate downgrade, refund overpayment
- Option 2: Downgrade at next billing cycle
- Clear communication about timing

---

### EC3: Subscription Reactivation After Cancellation
**Scenario:** User cancels Plus, then wants to reactivate 6 months later  
**Expected Behavior:**
- Can restart subscription
- No new trial (already used)
- Regular pricing applies
- Previous plan history preserved

---

### EC4: Multiple Failed Charges in Sequence
**Scenario:** Card declined, user doesn't update for 30 days  
**Expected Behavior:**
- After grace period, subscription suspended
- Features disabled
- Escalating email warnings
- Automatic re-enable when payment succeeds

---

### EC5: User Deletes Account During Trial
**Scenario:** User in 14-day Plus trial, deletes account on day 8  
**Expected Behavior:**
- Trial ends immediately
- No charge occurs
- Account and all data deleted
- Trial cannot be reused

---

### EC6: Tier Downgrade, Envelopes Over New Limit
**Scenario:** Plus user (unlimited) has 50 envelopes, downgrades to Freemium (1 max)  
**Expected Behavior:**
- Grace period: 30 days
- Cannot create new envelopes
- 49 existing envelopes archived
- After 30 days, enforce 1 envelope limit
- User must permanently delete 48

---

### EC7: Query Count Shows Negative (Bug)
**Scenario:** System glitch shows -5 queries remaining  
**Expected Behavior:**
- Cannot submit questions
- System blocks at 0 minimum
- Admin fix needed
- User support requested

---

### EC8: Subscription Change During Feature Use
**Scenario:** User has folders (Plus feature), downgrades to Freemium  
**Expected Behavior:**
- Folders no longer accessible
- UI hides folder functionality
- Existing folders preserved (read-only)
- Warning: "Folders available only with Plus plan"

---

### EC9: Query Limit Reset During Grace Period
**Scenario:** Pro user cancels subscription on 15th, month ends on 31st  
**Expected Behavior:**
- Pro queries reset to 0 on 1st of next month
- New tier is Freemium (5 queries)
- No queries from cancelled tier

---

### EC10: Duplicate Charges
**Scenario:** System charges user twice for same subscription  
**Expected Behavior:**
- Stripe idempotency prevents duplicates
- Or: Detect duplicate, issue refund
- Support notified
- Audit log created

---

### EC11: Upgrade While Upgrade Processing
**Scenario:** User clicks "Upgrade to Pro" twice rapidly  
**Expected Behavior:**
- First click processes
- Second click disabled (button state)
- No duplicate charges
- Single upgrade confirmation

---

### EC12: Billing Timezone Issues
**Scenario:** User in Tokyo, billing timezone is UTC  
**Expected Behavior:**
- Clear communication about billing timezone
- Consistent monthly reset time
- No confusion about when charges/resets occur

---

### EC13: Storage Calculation Error
**Scenario:** Files total to 9.9 GB, system shows 12 GB used  
**Expected Behavior:**
- Audit storage calculation
- Fix discrepancy
- Recalculate usage
- User credited/refunded if wrongly limited

---

### EC14: Query Consumption Without Response
**Scenario:** User submits question, API error, no response generated  
**Expected Behavior:**
- Query still consumed (API called)
- Or: Don't consume if error (depends on UX)
- Error message explains
- Can retry

---

### EC15: Trial Conversion Issue
**Scenario:** Trial ends, card is declined converting to paid  
**Expected Behavior:**
- Downgrade to Freemium immediately
- Email: "Trial ended, could not charge card"
- Update payment method to reactivate

---

### EC16: Annual Billing Option Not Available
**Scenario:** User wants annual billing, system only offers monthly  
**Expected Behavior:**
- Contact support for annual plan
- Or: Manual setup in backend
- No current UI for annual billing

---

### EC17: Coupon Code During Checkout
**Scenario:** User has coupon code "SAVE10"  
**Expected Behavior:**
- Enter code at checkout
- Stripe applies discount
- Reduced amount charged
- Discount shown in invoice

---

### EC18: Usage Spike Near Month-End
**Scenario:** User creates 500 MB files in last hour of month  
**Expected Behavior:**
- Storage check still enforced
- At/over limit, error shown
- Cannot exceed quota regardless of timing
