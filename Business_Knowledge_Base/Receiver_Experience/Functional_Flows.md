# Receiver Experience - Functional Flows

## Flow 1: Open Shared Envelope

1. **User receives link**
   - Via email, Slack, SMS, etc.
   - Clicks link

2. **Page loads**
   - Envelope validated
   - Content retrieved
   - UI rendered

3. **First document displayed**
   - Lazy-loaded for speed
   - Progress indicator shown
   - No content yet

4. **Content streamed**
   - First page/preview loaded
   - Document becomes interactive

5. **User views envelope**
   - Title, description shown
   - Chat panel visible
   - Navigation available

---

## Flow 2: Navigate Multi-Document Envelope

1. **User sees document tabs**
   - Tab 1: Presentation.pdf (active)
   - Tab 2: Budget.xlsx
   - Tab 3: Video.mp4

2. **Click Tab 2**
   - Tab 2 becomes active
   - Document loads
   - Progress shown

3. **Excel file displays**
   - Spreadsheet rendered
   - Scrollable if large
   - Zoom controls available

4. **Navigate within document**
   - Scroll through sheets
   - Or click Tab 3

5. **Video plays**
   - Embedded video player
   - Full controls (play, pause, seek)

---

## Flow 3: Download Envelope Content

1. **User clicks download button**
   - Single file or all files

2. **Single file download**
   - Select file from envelope
   - Click download icon
   - Browser downloads file

3. **Download all as ZIP**
   - Click "Download All"
   - System packages files
   - ZIP file generated

4. **ZIP download**
   - Browser starts download
   - ZIP file saved locally
   - Contains all files

---

## Flow 4: Ask Question in Chat

1. **User scrolls to chat**
   - Chat panel visible
   - "Ask a question" input

2. **Type question**
   - "What is the budget allocation?"
   - Character counter shown

3. **Submit question**
   - Click Send or Enter
   - Question transmitted

4. **AI thinking**
   - Loading spinner shown
   - "AI is thinking..." message

5. **Response streams**
   - Answer displays progressively
   - Tokens appear in real-time

6. **Response complete**
   - Full answer visible
   - Timestamp shown
   - Can ask follow-up

---

## Flow 5: Personalize Display Settings

1. **User opens settings**
   - Gear icon in header
   - Click to open

2. **Settings panel**
   - Theme: Light / Dark toggle
   - Font size: 100% / 125% / 150%
   - Layout: Side-by-side / Stacked

3. **Change theme to Dark**
   - Toggle clicked
   - UI turns dark
   - Setting saved

4. **Change font size**
   - Select 150%
   - Text enlarges
   - Responsive layout adjusts

5. **Settings persist**
   - Reload page
   - Settings retained
   - Applied immediately

---

## Flow 6: Share Envelope via Email

1. **User clicks share**
   - Share button in header
   - "Send to a friend" option

2. **Share dialog**
   - Email input field
   - Message template
   - Personal note (optional)

3. **Add recipient**
   - Type email address
   - Optional personal message
   - Review before sending

4. **Send email**
   - Click "Share"
   - Email sent
   - Confirmation shown

5. **Recipient receives email**
   - "Check this out" message
   - Link included
   - Optional personal note

---

## Flow 7: Full-Screen Viewing

1. **User clicks fullscreen**
   - Fullscreen button (corner)
   - Or press F

2. **Document expands**
   - Takes entire screen
   - Minimal UI
   - Immersive experience

3. **Navigation available**
   - Keyboard arrows work
   - Or mouse hover for controls

4. **Exit fullscreen**
   - Escape key
   - Or click exit button

---

## Flow 8: Mobile Experience

1. **User opens link on phone**
   - Mobile viewport (< 768px)
   - Responsive layout loaded

2. **Single-column layout**
   - Document fullwidth
   - Navigation at top
   - Chat as modal

3. **Tap document**
   - Touch to open/close UI
   - Minimal controls shown
   - Gesture support (pinch-zoom)

4. **Open chat**
   - Tap chat icon
   - Modal pops up
   - Ask question in modal

5. **Return to document**
   - Tap close or outside modal
   - Back to document view

---

## Edge Cases

### EC1: Document Fails to Load
- Progress bar stuck
- Show error: "Document could not be loaded"
- Retry button
- Fallback to file download

### EC2: User Zooms, then Changes Font Size
- Document zoom: 150%
- Font size change to 200%
- Both settings apply
- User can independent adjust

### EC3: Mobile User Rotates Device
- Portrait mode viewing PDF
- Rotate to landscape
- Document reflows
- Chat panel if available
- Layout adapts smoothly

### EC4: Internet Connection Lost
- Document cached in browser
- Still viewable (cached version)
- Chat unavailable
- Download unavailable
- "Offline mode" indication

### EC5: Very Large Document (1000+ pages)
- Progressive load only
- First 10 pages loaded
- Load more on scroll
- Search indexes progressively
- Performance maintained
