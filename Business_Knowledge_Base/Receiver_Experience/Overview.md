# Receiver Experience - Overview

## Purpose

Manages the experience for users who access and interact with shared envelopes as recipients or public visitors. Includes viewing, navigation, engagement, and personalization features.

## User Types

1. **Public Visitor** - Accesses via public link, no account
2. **Invited Recipient** - Has email invite, may be logged in
3. **Anonymous Recipient** - Accesses restricted envelope, not logged in
4. **Authenticated Recipient** - Logged in user with access

## Core Experience Elements

### Content Display
- **Responsive Design** - Works on desktop, tablet, mobile
- **Document Preview** - Display PDF, images, videos
- **Pagination** - Navigate multiple pages/documents
- **Full-Screen Mode** - Immersive viewing
- **Zoom Controls** - Scale content up/down

### Navigation
- **Document Tabs** - Switch between files
- **Envelope Header** - Creator info, title, description
- **Chat Section** - Q&A panel
- **Action Bar** - Download, share, report buttons

### Engagement
- **Chat/Q&A Access** - Ask questions
- **Responses Display** - View answers
- **Share Options** - Forward envelope link
- **Feedback** - Rate helpfulness

### Personalization
- **Dark Mode** - Eye-friendly theme
- **Font Size** - Adjust text size
- **Language** - Multi-language support (future)
- **Layout Options** - Side panel vs full-width

## Device Support

- **Desktop** - Chrome, Firefox, Safari, Edge
- **Tablet** - iPad, Android tablets
- **Mobile** - iOS (Safari), Android (Chrome)
- **Progressive Web App** - Offline access (future)

## Key Entities

- **EnvelopeViews** - Track viewing sessions
- **ViewerPreferences** - User personalization settings
- **ViewerFeedback** - Ratings and feedback
- **InteractionEvents** - Clicks, views, shares
- **AccessMetrics** - Usage analytics

## Integration Points

- **Envelope Service** - Retrieve content
- **Chat Service** - Q&A rendering
- **Analytics Service** - Event tracking
- **Storage Service** - Asset delivery
- **Email Service** - Share via email
