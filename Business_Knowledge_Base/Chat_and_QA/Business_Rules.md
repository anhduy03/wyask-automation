# Chat & Q&A - Business Rules

## Message Rules

### Message Sending
1. **Authenticated Required** - User must be logged in (or allow anonymous)
2. **Message Length** - Min 1 char, Max 2000 chars
3. **Rate Limiting** - Max 1 message per second per user
4. **Content Validation** - No profanity/spam (moderation check)
5. **Timestamp** - Server-generated, cannot be spoofed

### Message Types
1. **User Question** - Natural language query about envelope
2. **AI Response** - Generated answer from LLM
3. **Creator Response** - Manual reply from envelope creator
4. **System Message** - Notifications (query limit reached, etc.)

### Anonymous Messaging
- **Public Envelopes** - Can ask without account
- **Email Capture** (Optional) - Collect email for follow-up
- **Session Tracking** - Track by session ID, not user
- **Moderation** - Apply to all messages regardless

## Query Management Rules

### Query Quotas
**Freemium Plan**
- 5 queries/month
- Shared across all envelopes
- Resets on calendar month

**Plus Plan**
- 50 queries/month
- Shared across all envelopes
- Resets on calendar month

**Pro Plan**
- 500 queries/month
- Shared across all envelopes
- Resets on calendar month

### Query Definition
- **1 Query = 1 Question** - Each question consumes 1 query
- **AI Response Generation** - Counts as query consumption
- **Manual Responses** - Do NOT consume queries
- **Draft Messages** - Do NOT consume until sent

### Query Enforcement
1. **Pre-submission Check** - Show "queries remaining" before sending
2. **Block at Zero** - Cannot send if no queries remaining
3. **Upgrade Prompt** - Suggest plan upgrade when low
4. **Overage Handling** - Pro users can purchase additional queries

### Query Reset
- **Monthly Cadence** - Resets on 1st of month (UTC)
- **Grandfathering** - New users get full quota for current month
- **Upgrade/Downgrade** - Quota adjusts immediately, no proration
- **Usage Tracking** - Visible in dashboard

## AI Response Rules

### Response Generation
1. **Context Selection** - Pull relevant documents from envelope
2. **Prompt Engineering** - Construct LLM prompt with context
3. **Temperature Control** - Balance accuracy vs. creativity
4. **Token Limits** - Max response length (~500-1000 tokens)
5. **Timeout** - Max 30 seconds to generate response

### Response Accuracy
1. **Confidence Threshold** - Only show if sufficiently confident
2. **Hallucination Check** - Verify answer references documents
3. **Citation Required** - Answer must cite source if claiming fact
4. **Fallback Response** - "I don't have enough information to answer" if unclear

### Response Format
1. **Markdown Support** - Format with **bold**, _italic_, links
2. **Code Blocks** - Support ```code``` for technical content
3. **Lists** - Support bullet points and numbered lists
4. **Line Breaks** - Preserve formatting from document

## Creator Response Rules

### Manual Responses
1. **No Query Cost** - Creator responses don't consume queries
2. **Manual Entry** - Type response directly in chat
3. **Timestamp** - Show when creator responded
4. **Attribution** - Mark as "Creator" vs. "AI"
5. **Edit/Delete** - Can edit or delete own response (within 5 mins)

### Creator Moderation
1. **View All Questions** - See every question asked
2. **Flag Inappropriate** - Mark questions for removal
3. **Hide Question** - Remove from public view (soft delete)
4. **Block User** - Prevent future questions from user
5. **Bulk Actions** - Delete multiple questions at once

## Message Streaming Rules

### Real-time Chat Stream
1. **WebSocket Connection** - Persistent connection per session
2. **Live Updates** - New messages push to all viewers
3. **Typing Indicators** - Show when other user typing
4. **Thinking Indicator** - Show when AI generating response
5. **Presence** - Show who's currently in chat

### Streaming Response (Tokens)
1. **Token Streaming** - AI response tokens stream as generated
2. **Progressive Display** - User sees partial response building
3. **Streaming Complete** - Message finalized when done
4. **Error Handling** - If generation fails mid-stream, show error

## Message History Rules

### Persistence
1. **Stored Forever** - Messages kept indefinitely
2. **Searchable** - Index for full-text search
3. **Immutable** - Cannot delete creator/AI messages (can soft-delete)
4. **User Messages** - Users can delete own messages (60 second window)
5. **Audit Trail** - Log all deletions

### Search & Retrieval
1. **Search Envelope Chat** - Find messages by keyword
2. **Filter by Type** - Show only questions, answers, or responses
3. **Date Range** - Filter by time period
4. **User Filter** - Show messages from specific person
5. **Limit Results** - Show most recent 100 by default

## Engagement Rules

### Reactions/Feedback
1. **Thumbs Up/Down** - Rate answer helpfulness (planned)
2. **Report Harmful** - Flag inappropriate content
3. **Follow-up Questions** - Related question suggestions
4. **Export Chat** - Download conversation as PDF (future)

### User Experience
1. **First-time UX** - Tutorial on how to use chat
2. **Empty State** - Show starter questions as examples
3. **Help Text** - Show available query count
4. **Success Feedback** - Confirmation message when question sent

## Moderation Rules

### Content Filtering
1. **Spam Detection** - Flag repetitive/bot-like messages
2. **Profanity Filter** - Block offensive content
3. **PII Detection** - Warn if personal data shared
4. **URL Filtering** - Restrict malicious URLs

### Moderation Actions
1. **Auto-flag** - High-confidence spam/abuse auto-blocked
2. **Manual Review** - Medium-confidence items queued for review
3. **Removal** - Creator can delete flagged messages
4. **Blocking** - Can block specific users

## Analytics Rules

### Tracking
1. **Message Count** - Total messages per envelope
2. **Query Usage** - Track queries consumed
3. **Response Time** - Time to answer question
4. **Engagement** - % of visitors who asked questions
5. **Satisfaction** - Thumbs up/down ratio

### Retention
1. **30-day Analytics** - Default reporting window
2. **Export** - Download analytics as CSV
3. **Real-time Dashboard** - View live chat metrics
4. **Trends** - Show popular questions/topics

## Tier-Specific Rules

### Freemium
- **Limited Access** - Basic Q&A functionality
- **No Custom Responses** - Only AI responses
- **Public View Only** - Can't hide/moderate content
- **Query Limit** - 5 queries/month

### Plus
- **Full Chat** - Ask and answer questions
- **Moderation** - Can hide questions, flag spam
- **Manual Responses** - Creator can respond to questions
- **Query Limit** - 50 queries/month

### Pro
- **Advanced Moderation** - Block users, bulk delete
- **Analytics Dashboard** - Detailed engagement metrics
- **Custom System Prompt** - Define AI answer style
- **Query Limit** - 500 queries/month

## Constraints

1. **One Chat Per Envelope** - Cannot have multiple chat rooms
2. **No Private Messages** - All chat is public (within access group)
3. **No File Upload** - Text-only messaging
4. **No Voice Chat** - Text-based only
5. **No End-to-End Encryption** - Standard HTTPS
