# Subscription & Limits - Business Rules

## Plan Tier Rules

### Freemium Rules
1. **One Envelope** - Max 1 envelope per user
2. **1 GB Storage** - Cannot exceed storage quota
3. **5 Queries/Month** - Chat query limit
4. **Basic Features** - Only core features enabled
5. **No Password Required** - Can use without password setup
6. **Automatic Tier** - Default for new users

### Plus Rules
1. **Unlimited Envelopes** - Create as many as needed
2. **10 GB Storage** - Total storage allocated
3. **50 Queries/Month** - Chat query limit
4. **All Sharing Modes** - Public, Restricted, Private
5. **Folder Organization** - Can create folders
6. **Moderation Tools** - Manage questions/responses
7. **Monthly Billing** - $12/month recurring

### Pro Rules
1. **Unlimited Envelopes** - No envelope limit
2. **100 GB Storage** - Enterprise-level storage
3. **500 Queries/Month** - High query limit
4. **Advanced Branding** - Custom sender identity
5. **Custom System Prompt** - Define AI behavior
6. **API Access** - Programmatic integration
7. **Monthly Billing** - $99/month (or custom)

## Usage & Quota Rules

### Storage Management
1. **Track Usage** - Monitor all file sizes
2. **Soft Limit** - Warn at 80% usage
3. **Hard Limit** - Block at 100% usage
4. **Overage Handling** - Cannot create new envelopes when full
5. **File Deletion** - Frees up storage immediately

### Envelope Limit
1. **Freemium Check** - Count envelopes before creation
2. **Block if At Limit** - Error: "Plan limited to 1 envelope"
3. **Archival** - Archived envelopes count toward limit
4. **Unarchive** - Restore doesn't consume new limit

### Chat Query Quota
1. **Monthly Reset** - 1st of month (UTC)
2. **Pre-check** - Verify before processing question
3. **Consumption** - One query per question
4. **Overage** - Cannot send query if at 0
5. **Upgrade Path** - Suggest Pro plan when low

## Billing Rules

### Subscription Lifecycle
1. **Creation** - Start on signup
2. **Active** - Recurring billing active
3. **Trial Period** - 14 days free (optional)
4. **Renewal** - Auto-renew on billing date
5. **Cancellation** - Stop recurring charges
6. **Downgrade** - Reduce to lower tier
7. **Reactivation** - Resume cancelled subscription

### Payment Processing
1. **Stripe Integration** - All payments via Stripe
2. **Card Storage** - Secure tokenization
3. **Failed Charges** - Retry up to 3 times
4. **Invoice Generation** - Create receipt on each charge
5. **Tax Calculation** - Apply sales tax if required

### Refunds & Credits
1. **30-day Guarantee** - Full refund if requested
2. **Proration** - Refund unused days on downgrade
3. **Upgrade Credit** - Credit on upgrade mid-month
4. **Failed Charge Waiver** - No penalty for system failure

## Downgrade Rules

### Downgrade Process
1. **Immediate** - Downgrade effective immediately
2. **Feature Loss** - Features of higher tier no longer available
3. **Grace Period** - 30 days before hard limit enforcement
4. **Storage Adjustment** - If over new tier limit, can't add new
5. **Query Adjustment** - New monthly quota applies immediately

### Downgrade Scenarios
1. **Plus to Freemium**
   - Envelopes: Must reduce to 1 (rest archived)
   - Storage: Must reduce to 1 GB
   - Features: Basic only
   - Grace period: 30 days to comply

2. **Pro to Plus**
   - Storage: Max 10 GB (reduce or delete)
   - Features: Advanced features disabled
   - Queries: 50/month (down from 500)

## Feature Gate Rules

### Feature Availability
1. **Folder Organization** - Plus+ only
2. **Restricted Sharing** - Plus+ only
3. **Moderation Tools** - Plus+ only
4. **Custom Branding** - Pro only
5. **API Access** - Pro only
6. **Advanced Analytics** - Pro only

### Enforcement
1. **UI Hiding** - Disable buttons for unavailable features
2. **Backend Blocking** - Reject API calls for unavailable features
3. **Error Messages** - "Upgrade to use this feature"
4. **Upgrade Prompt** - Link to upgrade page

## Tier-Specific Business Rules

### Freemium Constraints
- Default public sharing if enabled
- Limited to one active envelope
- No folder support
- No moderation capabilities
- Queries reset monthly

### Plus Advantages
- Unlimited envelopes
- Full sharing control
- Folder organization
- Question moderation
- Higher query limit

### Pro Advantages
- Maximum storage
- Custom branding
- API integration
- Advanced prompt control
- Highest query limit

## Enforcement Rules

### Pre-flight Checks
1. **Envelope Creation** - Check limit before create
2. **File Upload** - Check storage before upload
3. **Question Submit** - Check queries before submit
4. **Feature Access** - Check tier before enabling

### Blocking Actions
1. **At Limit** - Block completely
2. **Error Message** - Clear explanation
3. **Upgrade Path** - Easy upgrade option
4. **Support Link** - Contact support if stuck

## Constraints

1. **No Retroactive Limits** - Existing envelopes safe if tier downgraded
2. **Plan Lock** - Cannot change plan mid-month (optional)
3. **Single Plan** - One active plan per user
4. **Trial Once** - Can only use trial once per user
5. **No Sharing Plans** - Plans are per-user (not shared)
