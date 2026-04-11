# Chat & Q&A - Functional Flows

## Flow 1: Ask a Question (AI Response)

### Actors
- Envelope Recipient/Visitor
- Wyask System
- LLM Service
- Analytics Service

### Main Flow

1. **User views envelope**
   - Envelope content displayed
   - Chat/Q&A section loaded at bottom
   - "Ask a question" input field shown

2. **Check query availability**
   - System queries database for remaining quota
   - Display "X queries remaining"
   - Show quota status

3. **User types question**
   - Types natural language question
   - Auto-save draft (no consumption)
   - Submit button enabled when text present

4. **User submits question**
   - Clicks "Send" or presses Enter
   - Question sent to backend
   - Query count decreased immediately (optimistic UI)

5. **Backend validation**
   - Verify user has remaining queries
   - Validate message content (spam/profanity)
   - If invalid, rollback and show error

6. **Question stored**
   - Question persisted to database
   - Timestamp recorded
   - User/session identified

7. **AI response generation**
   - System retrieves envelope documents
   - Constructs LLM prompt with context
   - Sends to OpenAI/Claude API
   - "AI is thinking..." indicator shown

8. **Response streaming**
   - LLM response tokens stream in
   - Displayed progressively in chat
   - Typing indicator while generating
   - User sees partial response building

9. **Response complete**
   - Full response displayed
   - Timestamp shown
   - Mark as "AI Response"
   - Display confidence score

10. **Message history updated**
    - Question and answer stored together
    - Visible in chat history
    - Searchable

### Alternative: Query Limit Reached
- User submits question
- System checks: 0 queries remaining
- Show error: "You've reached your query limit this month"
- Offer upgrade link to Plus/Pro

---

## Flow 2: Creator Responds to Question

### Actors
- Envelope Creator
- Wyask System
- Email Service (optional)

### Main Flow

1. **Creator views question**
   - Opens envelope
   - Sees chat section
   - Question from recipient visible

2. **Creator reads question**
   - Reviews full question text
   - May want to provide custom answer
   - Clicks "Reply" button

3. **Compose response**
   - Text field opens
   - Creator types response
   - Markdown formatting available
   - Preview shown

4. **Submit response**
   - Clicks "Send" button
   - Response submitted

5. **Response stored**
   - Creator response saved to database
   - Marked as "Creator Response"
   - No query consumption
   - Timestamp recorded

6. **Response displayed**
   - Both chat participants see new response
   - Real-time update via WebSocket
   - Response highlighted as from creator

7. **Optional notification**
   - Email can be sent to original questioner
   - "The envelope creator responded to your question"
   - Direct link to response

### Moderation Alternative
1. Creator sees inappropriate question
2. Clicks "Delete" or "Hide"
3. Question removed from public view
4. Questioner notified (optional)

---

## Flow 3: Message History & Search

### Actors
- Any User with Envelope Access
- Wyask System

### Main Flow

1. **User opens envelope**
   - Chat section loaded
   - Shows recent messages first

2. **Scroll history**
   - Messages load paginated (newest first)
   - Load "earlier messages" when scrolling up
   - Messages display with:
     - Question/answer text
     - Timestamp
     - Author (AI/Creator/Visitor)

3. **Search messages**
   - Search box in chat header
   - User types search term
   - Results filter in real-time

4. **Filter by type**
   - Dropdown: Show "All", "Questions", "Answers", "Creator Responses"
   - Chat filtered by selection

5. **Date range**
   - Calendar picker (optional)
   - Filter messages to date range
   - Combined with search/type filters

---

## Flow 4: Real-time Typing Indicators

### Actors
- Multiple Chat Participants
- Wyask System
- WebSocket Service

### Main Flow

1. **User starts typing**
   - WebSocket message: { type: "typing", user_id: "...", envelope_id: "..." }

2. **Server broadcasts**
   - Message sent to all connected participants
   - Shows "User is typing..."

3. **Typing indicator displayed**
   - Animation shows "[User] is typing..."
   - Appears above input field
   - Disappears when user stops typing

4. **User finishes/stops typing**
   - WebSocket message: { type: "stopped_typing" }
   - Typing indicator removed
   - Chat returns to normal

### AI Thinking Indicator
1. Question submitted
2. System shows "AI is thinking..."
3. Real-time token streaming begins
4. Transitions to response display

---

## Flow 5: Query Usage Tracking & Dashboard

### Actors
- Plan Holder
- Wyask System
- Analytics Service

### Main Flow

1. **User opens dashboard**
   - Account settings page
   - Usage section visible

2. **View query usage**
   - Display shows:
     - Queries used this month: 23/50
     - Progress bar
     - Reset date
     - Usage breakdown by envelope

3. **Envelope-level tracking**
   - Click on envelope to see:
     - Questions asked: 5
     - Responses generated: 5
     - Creator responses: 2

4. **Usage history**
   - Table showing:
     - Date
     - Envelope name
     - Question text
     - Timestamp

5. **Export usage**
   - Click "Export" button
   - Download as CSV

---

## Flow 6: Moderate Questions (Creator)

### Actors
- Envelope Creator
- Wyask System
- Email Service (optional)

### Main Flow

1. **Creator in moderation view**
   - Envelope chat section
   - See flagged questions
   - Or manual flag buttons visible

2. **Review flagged question**
   - Click question to expand
   - See full text
   - View auto-flag reason (if applicable)

3. **Take action**
   - Option 1: Approve (keep visible)
   - Option 2: Hide (remove from public)
   - Option 3: Delete (permanent removal)
   - Option 4: Block User (prevent future messages)

4. **Apply moderation**
   - Question status updated
   - If hidden/deleted, removed from view
   - Notification sent (if enabled)
   - Action logged in audit trail

---

## Flow 7: Bulk Moderation

### Actors
- Envelope Creator
- Wyask System

### Main Flow

1. **Creator in chat**
   - Multiple questions visible
   - Checkboxes to select questions

2. **Select questions**
   - Check "Select All" or individual questions
   - Selection counter shown

3. **Bulk action**
   - "Delete Selected" or "Hide Selected" button
   - Choose action from dropdown

4. **Confirm action**
   - Dialog: "Delete 5 messages?"
   - Confirm button

5. **Execute bulk action**
   - All selected messages removed
   - Chat refreshed
   - Confirmation shown

---

## Flow 8: Export Chat History

### Actors
- Envelope Creator/Owner
- Wyask System

### Main Flow

1. **Creator opens envelope**
   - Chat section visible
   - Click "Export" button

2. **Export options**
   - Format: PDF or TXT
   - Include: Questions, Answers, Creator Responses
   - Date range (optional)

3. **Generate export**
   - System compiles messages
   - Formats as selected
   - Generates downloadable file

4. **Download**
   - File starts downloading
   - User saves to device

---

## Flow 9: Notification on New Response

### Actors
- Question Asker
- Wyask System
- Email Service

### Main Flow

1. **Creator submits response**
   - Response stored
   - System identifies original questioner

2. **Check notification preference**
   - User has notifications enabled?
   - Email notification preferred?

3. **Send notification**
   - Email sent: "Someone responded to your question"
   - Includes response snippet
   - Direct link to envelope

4. **User receives notification**
   - Click link in email
   - Navigate to envelope chat
   - See creator's response

---

## Flow 10: First-Time Chat UX

### Actors
- New User to Envelope
- Wyask System

### Main Flow

1. **User first opens envelope with chat**
   - Chat section empty
   - Onboarding overlay shown

2. **Tutorial displayed**
   - "How to use Q&A:"
   - Example questions shown
   - Starter prompts: "What is...?", "How do I...?", "Tell me about..."

3. **User dismisses tutorial**
   - Click "Got it"
   - Chat input ready for real questions

4. **User asks question**
   - Types in text field
   - Sees query count
   - Sends question
   - Continues normally

---

## Edge Cases

### EC1: Question Asked After Envelope Access Revoked
- User had access, asked question
- Owner revokes access
- Question remains in history
- User cannot add new questions
- Notification of revocation shown

### EC2: Creator Deletes Question While User Viewing
- User viewing envelope, question visible
- Creator deletes question
- User's browser doesn't auto-refresh
- On next refresh, question gone
- "Question has been removed" if still selected

### EC3: LLM Response Generation Timeout
- Question submitted
- AI starts generating response
- After 30 seconds, no response
- Show error: "Response took too long. Please try again."
- Query count NOT consumed (refunded)

### EC4: AI Generates Completely Wrong Answer
- Answer displayed to user
- User rates it "unhelpful" (thumbs down)
- System logs poor response
- Can improve LLM prompt for future
- Query still consumed (no refund)
