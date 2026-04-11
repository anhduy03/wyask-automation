# Analytics & Tracking - Edge Cases

### EC1: User Opts Out of Analytics
**Scenario:** User disables analytics in settings  
**Expected Behavior:**
- No events tracked for user
- Existing data retained (per privacy policy)
- Future actions not tracked
- Preference persisted across sessions

---

### EC2: High-Volume Event Tracking
**Scenario:** Popular envelope gets 10,000 views in 1 minute  
**Expected Behavior:**
- Events queued and batched
- Database handles high-volume inserts
- Slight delay in realtime reporting (OK)
- No data loss

---

### EC3: User Deletes Analytics Data
**Scenario:** GDPR right to erasure exercised  
**Expected Behavior:**
- All events tied to user deleted
- Aggregated data retained (anonymized)
- User ID removed from event records
- Cannot be tied back to person

---

### EC4: Analytics Provider Outage
**Scenario:** Amplitude/Mixpanel down for 1 hour  
**Expected Behavior:**
- Events queued locally
- Retry when provider restored
- No event loss
- Dashboard shows "Data updating"

---

### EC5: Cookie Blocked by Browser
**Scenario:** User has cookie blocking enabled  
**Expected Behavior:**
- Analytics still works (uses local storage)
- Or: Session-based tracking
- Events still sent (not cookie-dependent)
- Tracking continues

---

### EC6: User on Very Slow Connection
**Scenario:** Event taking 10 seconds to send  
**Expected Behavior:**
- Timeout after 5 seconds
- Queue retry
- App doesn't freeze
- Non-blocking async send

---

### EC7: Duplicate Events Submitted
**Scenario:** Network retry sends same event twice  
**Expected Behavior:**
- Idempotent event IDs (deduplication)
- Only one event recorded
- Deduplication logic prevents duplicates
- Consistent count

---

### EC8: Event Contains PII
**Scenario:** Event accidentally includes email in properties  
**Expected Behavior:**
- Validation catches PII
- Event rejected with error
- Admin alerted
- Redact before storage

---

### EC9: Analytics Data Warehouse Query Slow
**Scenario:** Querying 2 years of data takes 30+ seconds  
**Expected Behavior:**
- Default to 30-day window
- Show cached results while loading
- Pagination for large result sets
- Sampling if needed

---

### EC10: Cohort Definition Changes
**Scenario:** Cohort rule updated mid-analysis  
**Expected Behavior:**
- Historical cohorts unchanged
- New rule applies going forward
- Clearly label which version used
- Avoid confusion about data

---

### EC11: Revenue Tracking During Refund
**Scenario:** User charged $12, then refunded  
**Expected Behavior:**
- Event: "payment_succeeded" (recorded)
- Event: "refund_processed" (recorded)
- MRR adjusted downward
- Revenue metrics updated

---

### EC12: User Signs Up Multiple Times
**Scenario:** User creates accounts with different emails  
**Expected Behavior:**
- Each signup tracked separately
- Or: Identify same person by IP/device
- Mark as duplicate account (optional)
- Metrics aware of duplicates

---

### EC13: Session Timeout Boundary
**Scenario:** Event occurs at exact session boundary  
**Expected Behavior:**
- Assigned to previous or next session
- Consistent logic applied
- Edge case doesn't break analysis

---

### EC14: Timezone Inconsistency
**Scenario:** Server UTC, user PST, dashboard in EST  
**Expected Behavior:**
- All timestamps normalized (UTC)
- Dashboard converts to user's timezone
- Clear timezone display
- No confusion about timing

---

### EC15: Feature Flag Affecting Analytics
**Scenario:** Feature flag toggled, analytics code changes behavior  
**Expected Behavior:**
- Flag state recorded with event
- Event properties show which code path
- Analysis aware of different implementations

---

### EC16: User on Multiple Devices
**Scenario:** Same user accesses from phone and desktop  
**Expected Behavior:**
- Separate sessions per device
- Tracked independently
- Or: Linked by user ID
- User journey shows cross-device activity

---

### EC17: Custom Event Property Missing
**Scenario:** Event sent without required custom property  
**Expected Behavior:**
- Validation fails or accepts with null
- Error logged for debugging
- Analysis can handle missing properties
- Clear error messaging

---

### EC18: Bot Traffic in Analytics
**Scenario:** Web scraper visits and triggers events  
**Expected Behavior:**
- Bot detection identifies non-human
- Filtered from DAU/MAU counts
- Or: Tracked separately
- Analysis excludes bot traffic

---

### EC19: Extreme Data Skew
**Scenario:** One envelope gets 1M views, throws off averages  
**Expected Behavior:**
- Outliers identified
- Analysis can filter outliers
- Median reported alongside mean
- Distribution shown in charts

---

### EC20: Funnel Abandonment Reason Unknown
**Scenario:** User abandons signup after email verification, no explicit error  
**Expected Behavior:**
- Event shows where they drop off
- Cannot determine reason without additional data
- Possible causes: Technical issue, changed mind, etc.
- Follow-up survey option (future)

---

### EC21: Event Ordering Issue
**Scenario:** Network delay causes event B to arrive before event A  
**Expected Behavior:**
- Timestamp used for ordering (not arrival order)
- Proper sequencing reconstructed
- Analysis reflects actual chronology

---

### EC22: Storage Quota Hit for Analytics Database
**Scenario:** Analytics database hits storage limit  
**Expected Behavior:**
- Older data archived to cold storage
- Recent data remains hot
- Queries adjusted for archive
- Admin alerted

---

### EC23: Concurrent Dashboard Queries
**Scenario:** 100 users querying dashboard simultaneously  
**Expected Behavior:**
- Database handles concurrent reads
- Query caching prevents redundant work
- Response time acceptable (< 2 seconds)
- No degradation

---

### EC24: Custom Metric Calculation Error
**Scenario:** Custom metric formula has division by zero  
**Expected Behavior:**
- Error caught, metric returns null/error
- Doesn't crash dashboard
- Clear error message shown
- Admin can fix formula

---

### EC25: Real-time Lag
**Scenario:** Envelope receives 100 views, realtime count shows 95  
**Expected Behavior:**
- Slight delay acceptable (< 1 minute)
- Eventually consistent with final count
- User aware this is near-realtime
- Final reports accurate
