# Chat & Q&A - Edge Cases

## Query & Quota Edge Cases

### EC1: User Reaches Query Limit Mid-Month
**Scenario:** User consumes all 50 Plus queries by mid-month  
**Expected Behavior:**
- Next question submission shows: "No queries remaining"
- Suggest upgrade to Pro (500 queries)
- Show "Upgrade now" button
- Can still view existing answers

**Implementation:**
- Check quota before processing question
- Display clear messaging

---

### EC2: Plan Downgrade After Using Queries
**Scenario:** Plus user (50 queries) downgrades to Freemium (5 queries)  
**Expected Behavior:**
- Already-used queries don't roll back
- New limit is 5/month going forward
- Cannot use more queries until month resets
- Warning shown at downgrade

**Implementation:**
- Enforce new tier's query limit immediately
- No refund of used queries

---

### EC3: Query Refresh at Month Boundary
**Scenario:** User at 49/50 queries, submits question at 11:59:59 PM on last day of month  
**Expected Behavior:**
- Question processes with last query
- At 00:00 UTC (month end), queries reset
- User can submit new question immediately
- No conflict in reset timing

**Implementation:**
- Month boundary: UTC-based reset
- Atomic transaction for query consumption
- Reset happens server-side automatically

---

### EC4: Multiple Subscriptions/Plan Conflicts
**Scenario:** User somehow has overlapping Plus and Pro subscriptions  
**Expected Behavior:**
- Use highest quota (Pro: 500 queries)
- System resolves to single active plan
- Manual cleanup if detected

**Implementation:**
- Detect duplicate active subscriptions
- Use max quota while resolving
- Alert support team

---

### EC5: Free Trial Query Quota
**Scenario:** User in free trial period for Plus plan  
**Expected Behavior:**
- Trial period has full query quota (50)
- After trial ends, quota resets to Freemium (5)
- Warning shown before trial expiry
- Option to convert to paid

**Implementation:**
- Track trial end date
- Apply tier's quota based on subscription state

---

## Message Handling Edge Cases

### EC6: Message with All Whitespace
**Scenario:** User submits message that's only spaces  
**Expected Behavior:**
- Reject with error: "Message cannot be empty"
- Don't consume query
- Focus input field

**Implementation:**
- Trim and validate non-empty
- Client-side and server-side checks

---

### EC7: Message with XSS/Script Injection
**Scenario:** User tries: `<img src=x onerror='alert("xss")'>`  
**Expected Behavior:**
- Content sanitized before storage
- Rendered as safe HTML
- No script execution
- Message stored as plain text or safe HTML

**Implementation:**
- Use HTML sanitizer library
- Escape dangerous content
- Store safe version

---

### EC8: Very Long Message (> 2000 chars)
**Scenario:** User pastes 5000-character message  
**Expected Behavior:**
- Validation fails: "Message too long (max 2000 chars)"
- Message not sent
- Character counter shows excess

**Implementation:**
- Client-side counter
- Server-side validation
- Clear feedback about limit

---

### EC9: Message with Profanity
**Scenario:** Question contains offensive language  
**Expected Behavior:**
- Option 1: Block immediately, show "Message contains inappropriate content"
- Option 2: Flag for review, show to creator
- Depends on moderation setting

**Implementation:**
- Profanity filter API
- Configurable strictness
- Creator approval option

---

### EC10: Double-Submission (User Clicks Send Twice Rapidly)
**Scenario:** User clicks "Send" button twice in quick succession  
**Expected Behavior:**
- First submission processes
- Second submission ignored/queued
- Only one message created
- No duplicate queries consumed

**Implementation:**
- Debounce button (disable after click)
- Client-side duplicate prevention
- Server-side idempotent key
- Deduplication logic

---

## AI Response Edge Cases

### EC11: LLM Returns Empty Response
**Scenario:** API call succeeds but response is blank  
**Expected Behavior:**
- Show: "I couldn't generate an answer to that question"
- Query IS consumed (API called)
- Suggest trying different question
- Log for debugging

**Implementation:**
- Check response length
- Fallback message
- Query still charged

---

### EC12: LLM Returns Obvious Hallucination
**Scenario:** Question: "What's in this PDF?" LLM: "It contains information about quantum computing" (but PDF is about cooking)  
**Expected Behavior:**
- Show response (user decides credibility)
- User can rate unhelpful
- System learns to improve prompt
- Query consumed regardless

**Implementation:**
- Confidence scoring
- User feedback mechanism
- Prompt refinement

---

### EC13: Document Context Too Large for LLM
**Scenario:** Envelope has 500-page PDF, LLM can't fit all in context  
**Expected Behavior:**
- System chunks/summarizes documents
- Uses most relevant sections
- Note: "Answer based on excerpts from envelope"
- Still provides useful response

**Implementation:**
- Document chunking strategy
- Relevance ranking
- Semantic search for context

---

### EC14: LLM API Rate Limited
**Scenario:** System hits OpenAI rate limit during peak usage  
**Expected Behavior:**
- Show: "System busy, please try again in a moment"
- Queue question for retry
- Don't consume query yet
- Retry automatically after 30 seconds

**Implementation:**
- Queue system for backoff
- Exponential retry logic
- Query consumption deferred until success

---

### EC15: User Question About Envelope They Don't Own
**Scenario:** Recipient asks question about envelope, owner deletes envelope  
**Expected Behavior:**
- Question becomes orphaned
- Error on retrieval: "Envelope no longer exists"
- Chat history kept in archive
- No new questions possible

**Implementation:**
- Soft-delete envelope
- Keep chat history
- Handle missing envelope gracefully

---

## Real-time & Streaming Edge Cases

### EC16: WebSocket Connection Drops Mid-Streaming
**Scenario:** Response streaming, user's connection cuts  
**Expected Behavior:**
- Partial response shown to user
- "Connection lost" message
- Button to "Resume" or "Retry"
- Message stored as-is (partial)
- User can refresh and see what was received

**Implementation:**
- Save partial messages
- Reconnect logic
- Resume from checkpoint

---

### EC17: Typing Indicator Never Stopped
**Scenario:** User closes browser without sending "stopped_typing"  
**Expected Behavior:**
- WebSocket auto-cleans after timeout (30 seconds)
- Typing indicator disappears after timeout
- No orphaned "User is typing" indefinitely

**Implementation:**
- Server-side timeout on typing state
- Auto-cleanup after inactivity

---

### EC18: Multiple Tabs Open, Same Envelope
**Scenario:** User opens envelope in 2 tabs, asks question in tab 1  
**Expected Behavior:**
- Question appears in both tabs (via WebSocket)
- No query double-charged
- Both tabs stay in sync
- Real-time sync across tabs

**Implementation:**
- WebSocket broadcasts to all sessions
- Client-side deduplication
- Single query charge

---

## Moderation Edge Cases

### EC19: Creator Tries to Delete AI-Generated Response
**Scenario:** AI answered question, creator wants to remove answer  
**Expected Behavior:**
- System prevents deletion of AI responses
- Only own manual responses deletable
- Message: "Cannot delete AI-generated responses"
- Can only hide or mark controversial

**Implementation:**
- Permission check on delete
- Only allow creator manual responses deletion
- Hide functionality as workaround

---

### EC20: Bulk Delete All Questions
**Scenario:** Creator selects all 200 questions, clicks "Delete"  
**Expected Behavior:**
- Confirmation: "Delete all 200 messages? This cannot be undone"
- Require double-confirmation
- All messages hard-deleted
- Audit logged
- Notification sent to support (suspicious activity)

**Implementation:**
- Double-confirmation for bulk delete
- Audit trail
- Rate limit bulk delete operations

---

### EC21: Block User, They Try to Ask Question
**Scenario:** Creator blocks user, user tries to post question  
**Expected Behavior:**
- Message submission fails
- Error: "You cannot post to this envelope"
- No specific "you're blocked" message (privacy)
- User cannot see why they can't post

**Implementation:**
- Check blocked list on submit
- Generic error message
- Silent failure (don't reveal block)

---

### EC22: Inappropriate Question Caught by Auto-Filter
**Scenario:** Spam-like question detected automatically  
**Expected Behavior:**
- Question held for review
- Not visible to public immediately
- Creator notified: "New question flagged for review"
- Creator can approve or delete
- Query IS consumed (if approved)

**Implementation:**
- Auto-filter flags questions
- Pending state for review
- Query charge on approval only (or always?)

---

## Analytics & Reporting Edge Cases

### EC23: Export Contains Deleted Messages
**Scenario:** User deletes some messages, then exports  
**Expected Behavior:**
- Export shows only non-deleted messages
- Deleted messages excluded
- Or: Note "Deleted" next to removed items
- Be transparent about what's included

**Implementation:**
- Filter deleted messages from export
- Or include with [DELETED] marker

---

### EC24: Analytics for Archived Envelope
**Scenario:** Envelope archived, creator views chat analytics  
**Expected Behavior:**
- Analytics still accessible
- Shows historical data
- Cannot add new questions (archived)
- Can unarchive to resume chat

**Implementation:**
- Keep analytics independent of archive state
- Read-only view for archived

---

## Notification Edge Cases

### EC25: User Disabled Notifications, Creator Responds
**Scenario:** Questioner disabled notifications, creator responds  
**Expected Behavior:**
- Response posted
- No email sent (per user preference)
- Response visible when user next views envelope
- User control respected

**Implementation:**
- Check notification preferences
- Store but don't send based on setting
- Make preferences easy to find

---

### EC26: Invalid Email in Notification Delivery
**Scenario:** System tries to send notification email, email address invalid  
**Expected Behavior:**
- Email delivery fails silently
- Log error for debugging
- Don't retry indefinitely
- User still sees response in chat when they visit

**Implementation:**
- Email validation
- Failure logging
- Graceful fallback to in-app notification only

---

## Conflict & Consistency Edge Cases

### EC27: Same Question Asked Twice Within Seconds
**Scenario:** User submits identical question twice rapidly  
**Expected Behavior:**
- First submission processes
- Second detected as duplicate
- Error: "You already asked this question recently"
- Don't consume second query
- Link to original answer

**Implementation:**
- Deduplication by content hash
- Recent history check (last 1 minute)

---

### EC28: Creator Response Posted While AI Generating
**Scenario:** AI generating response, simultaneously creator posts manual response  
**Expected Behavior:**
- Both appear in sequence
- Proper ordering by timestamp
- No conflicts in display
- Clear attribution to each

**Implementation:**
- Atomic inserts
- Timestamp-based ordering
- Concurrent request handling
