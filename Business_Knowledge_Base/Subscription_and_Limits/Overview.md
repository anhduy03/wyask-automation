# Subscription & Limits - Overview

## Purpose

Manages user subscriptions, plan tiers, feature limits, and quota enforcement across the Wyask platform. Tracks usage against plan limits and enables plan upgrades/downgrades.

## Subscription Tiers

### Freemium
- **Cost:** Free
- **Envelopes:** 1 max
- **Storage:** 1 GB
- **Chat Queries:** 5/month
- **Features:** Basic envelope, public sharing, limited chat

### Plus
- **Cost:** $12/month
- **Envelopes:** Unlimited
- **Storage:** 10 GB
- **Chat Queries:** 50/month
- **Features:** Folders, all sharing modes, moderation, analytics

### Pro
- **Cost:** $99/month (or higher)
- **Envelopes:** Unlimited
- **Storage:** 100 GB
- **Chat Queries:** 500/month
- **Features:** Advanced branding, custom prompts, API access

### ProT (Teams)
- **Cost:** Custom pricing
- **Users:** Multiple team members
- **Per-User Quota:** Shared or individual
- **Features:** Team management, bulk operations, advanced analytics

## Key Limits

- **Envelope Limit** - Per plan
- **Storage Quota** - Total GB per plan
- **File Size** - Max per file
- **Chat Queries** - Monthly reset
- **Concurrent Sessions** - Active connections
- **API Rate Limits** - Calls per minute

## Integration Points

- **Payment Processor** (Stripe) - Subscription billing
- **Auth Service** - User tier lookup
- **Feature Gates** - Limit enforcement
- **Analytics** - Usage tracking
- **Email Service** - Subscription notifications

## Key Entities

- **Subscriptions** - Plan records
- **UsageMetrics** - Track usage vs limits
- **BillingHistory** - Invoice records
- **PlanFeatures** - Feature matrix
- **FeatureLimits** - Quota definitions
