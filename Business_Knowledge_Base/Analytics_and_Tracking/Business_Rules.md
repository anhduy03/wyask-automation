# Analytics & Tracking - Business Rules

## Event Tracking Rules

### Event Capture
1. **Automatic Capture** - Events auto-tracked without user action
2. **Event Naming** - Consistent naming convention
3. **Timestamp** - Server-time recorded for each event
4. **User ID** - Identify which user or session
5. **Device Info** - Capture device/browser/OS

### Event Data
1. **Session ID** - Link events to session
2. **Page URL** - Track which page
3. **Referrer** - Track traffic source
4. **User Properties** - Tier, location, signup date
5. **Event Properties** - Event-specific data

### Personally Identifiable Information (PII)
1. **Collect Minimally** - Only necessary data
2. **No Passwords** - Never tracked
3. **No Payment Details** - Never tracked
4. **Hashed Email** - If needed, hashed
5. **User Consent** - Verify opt-in

## Page View Tracking

### View Events
1. **Envelope Opened** - User opens shared envelope
2. **Document Tab Changed** - Switch between documents
3. **Chat Opened** - Chat panel expanded
4. **Question Asked** - Question submitted event
5. **Download Started** - File download initiated

### Tracking Data
1. **Envelope ID** - Which envelope viewed
2. **Document ID** - Specific document viewed
3. **Time on Page** - Duration before leaving
4. **Exit Event** - When user leaves
5. **Referrer** - How user arrived

## Session Management

### Session Definition
1. **Start** - User loads envelope
2. **Duration** - How long they stay
3. **End** - User closes or times out
4. **Events** - All events within session
5. **Session ID** - Unique identifier

### Session Properties
1. **Device Type** - Desktop/tablet/mobile
2. **Browser** - Chrome/Firefox/Safari/Edge
3. **Operating System** - Windows/Mac/iOS/Android
4. **Country** - From IP geolocation
5. **Source** - Direct/email/search/referral

## User Behavior Analysis

### Feature Usage Tracking
1. **Feature Activated** - User uses feature
2. **Usage Count** - How many times per period
3. **Adoption** - % users using feature
4. **Retention** - Still using after 30 days
5. **Feature Affinity** - Which features used together

### User Journey Tracking
1. **Signup Path** - How users sign up
2. **Upgrade Path** - What triggers upgrade
3. **Feature Discovery** - How users find features
4. **Churn Path** - What precedes cancellation
5. **Success Path** - What correlates with retention

## Engagement Metrics

### Content Engagement
1. **Views per Envelope** - How many see it
2. **Unique Viewers** - How many different people
3. **Repeat Visitors** - % who return
4. **Time per Document** - Average viewing duration
5. **Download Rate** - % who download files

### Question Engagement
1. **Questions per Envelope** - Average questions asked
2. **Questions per Visitor** - % visitors asking
3. **Questions Answered** - % of questions answered
4. **Response Time** - Time to answer
5. **Satisfaction** - Thumbs up/down ratio

## Funnel Analysis

### Signup Funnel
1. **Landing Page Visits** - Initial view
2. **Signup Initiation** - Start signup
3. **Email Entry** - Provide email
4. **Email Verification** - Confirm email
5. **Account Creation** - Complete signup
6. **Dropoff Analysis** - Where users abandon

### Upgrade Funnel
1. **Free User** - Starting point
2. **Upgrade Modal Shown** - See upgrade option
3. **Checkout Started** - Click upgrade
4. **Payment Entered** - Enter card
5. **Payment Confirmed** - Success
6. **Upgrade Complete** - Plan activated

## Cohort Analysis

### Cohort Definition
1. **Signup Cohort** - Users by signup week/month
2. **Feature Cohort** - Users who used feature
3. **Paid Cohort** - Users on paid plan
4. **Geographic Cohort** - Users by region
5. **Device Cohort** - Mobile vs desktop

### Retention Metrics
1. **Day 1 Retention** - % active day after signup
2. **Day 7 Retention** - % active 7 days after
3. **Day 30 Retention** - % active 30 days after
4. **Month-over-Month** - Churn tracking
5. **Feature Retention** - Continued feature use

## Business Metrics

### Revenue Metrics
1. **New MRR** - New revenue this month
2. **Expansion MRR** - Increased existing revenue
3. **Churn MRR** - Lost revenue
4. **ARR** - Annual recurring revenue
5. **LTV** - Lifetime value per user

### Conversion Metrics
1. **Signup Conversion** - % of visitors who signup
2. **Free-to-Paid** - % of free who convert
3. **Plan Upgrade** - % upgrading to higher plan
4. **Activation** - % completing onboarding
5. **Feature Adoption** - % using new feature

### Usage Metrics
1. **DAU** - Daily active users
2. **WAU** - Weekly active users
3. **MAU** - Monthly active users
4. **Stickiness** - DAU/MAU ratio
5. **Feature Usage** - % using specific feature

## Data Retention Rules

### Retention Periods
1. **Raw Events** - 90 days (S3 archive after)
2. **Aggregated Data** - 2 years (database)
3. **User Properties** - Keep indefinitely (linked to user)
4. **Session Data** - 1 year
5. **Personally Identifiable** - Delete on request

### Deletion & Privacy
1. **GDPR Right to Erasure** - Delete on request
2. **Anonymization** - Remove PII, keep event data
3. **User Opt-Out** - Stop tracking going forward
4. **Audit Trail** - Log all deletions
5. **Compliance** - Follow regulations

## Consent & Privacy

### Opt-In/Opt-Out
1. **Default** - Tracking enabled by default
2. **Opt-Out** - User can disable analytics
3. **Setting** - Toggle in settings page
4. **Persistence** - Preference saved
5. **Respect** - Don't track if opted out

### Cookie Consent
1. **Analytics Cookies** - User must consent
2. **Essential Cookies** - Always used (no consent)
3. **Marketing Cookies** - User must consent
4. **Save Preference** - Remember choice

## Tier-Specific Rules

### Freemium Analytics
- Basic event tracking
- No detailed reports
- Envelope-level metrics only
- No cohort analysis

### Plus Analytics
- All Freemium tracking
- Basic dashboard
- Weekly digest
- Engagement reports
- Visitor analytics

### Pro Analytics
- All Plus tracking
- Advanced dashboards
- Custom date ranges
- Cohort analysis
- Revenue metrics
- API access to data

## Constraints

1. **No PII Tracking** - Personal data minimized
2. **User Consent** - Analytics requires consent
3. **Data Accuracy** - Validate event data
4. **Real-time Limits** - Slight delay in reporting
5. **Sampling** - High-volume events may be sampled
