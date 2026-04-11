# Receiver Experience - Business Rules

## Display Rules

### Document Rendering
1. **PDF Display** - Client-side PDF.js viewer
2. **Image Display** - Native image tags
3. **Video Display** - Embedded player (YouTube, etc.)
4. **Fallback** - Generic file icon if preview unavailable
5. **Lazy Load** - Load content as needed

### Content Protection
1. **No Right-Click Download** - Disable context menu (cosmetic)
2. **No Copy-Paste** - JavaScript prevents selection (optional)
3. **No Screenshot Prevention** - Cannot prevent (OS-level)
4. **Watermark** - Optional watermark on documents
5. **Print Control** - Can disable printing

### UI Elements
1. **Header** - Envelope title, creator, description
2. **Navigation** - Document tabs, pagination
3. **Chat Panel** - Q&A interface
4. **Footer** - Created date, branding
5. **Action Bar** - Download, share, report

## Interaction Rules

### Page Load
1. **Lazy Loading** - Load first page/tab only
2. **Progress Indicator** - Show loading state
3. **Error Handling** - Graceful fail if content missing
4. **Caching** - Cache accessed documents locally
5. **CDN Delivery** - Serve via CDN for speed

### Navigation
1. **Document Tabs** - Click to switch files
2. **Page Navigation** - Previous/Next buttons
3. **Go to Page** - Jump to specific page
4. **Search** - Find text within document
5. **Keyboard Shortcuts** - Arrow keys for navigation

### Engagement Tracking
1. **Page Views** - Track each page viewed
2. **Time on Page** - Calculate dwell time
3. **Interactions** - Track clicks, scrolls
4. **Exit Events** - Track when user leaves
5. **Heatmaps** - Analyze popular sections

## Responsive Design Rules

### Desktop (1024px+)
- Full layout with sidebars
- Chat panel on right
- Full-size document view
- No viewport constraints

### Tablet (768px - 1023px)
- Flexible layout
- Toggle chat panel
- Optimized for touch
- Landscape/portrait modes

### Mobile (< 768px)
- Single column layout
- Full-width document
- Chat as modal/drawer
- Touch-friendly buttons
- Vertical orientation primary

## Accessibility Rules

### WCAG 2.1 Compliance
1. **Color Contrast** - Minimum 4.5:1 ratio
2. **Keyboard Navigation** - Full keyboard support
3. **Screen Reader** - ARIA labels, semantic HTML
4. **Focus Visible** - Clear focus indicators
5. **Text Alternatives** - Alt text for images

### Mobile Accessibility
1. **Touch Targets** - 48px minimum button size
2. **Mobile Navigation** - Hamburger menu
3. **Zoom Support** - Allow user zoom
4. **Readable Text** - 16px minimum font

## Personalization Rules

### User Preferences
1. **Theme** - Light/dark mode persistence
2. **Font Size** - 100%, 125%, 150%, 200%
3. **Layout** - Side-by-side vs stacked
4. **Zoom Level** - Persistent zoom setting
5. **Language** - Browser language detection

### Preference Storage
1. **Browser Cookies** - 30-day persistence
2. **Local Storage** - Client-side storage
3. **Account Sync** - If logged in, sync preferences
4. **Per-Device** - Independent preferences per device

## Performance Rules

### Load Time Targets
1. **First Contentful Paint** - < 2 seconds
2. **Time to Interactive** - < 5 seconds
3. **Document Load** - Progressive enhancement
4. **Chat Load** - Asynchronous, non-blocking

### Optimization
1. **Asset Compression** - Gzip all resources
2. **Image Optimization** - WebP with fallback
3. **Code Splitting** - Lazy load components
4. **CDN Caching** - Cache static assets

## Share & Forward Rules

### Email Share
1. **Share Button** - "Send to friend"
2. **Email Compose** - Pre-filled message template
3. **Recipient Email** - User can add email
4. **Personal Note** - Optional custom message
5. **Link Included** - Public link in email

### Social Share
1. **Copy Link** - One-click copy to clipboard
2. **Twitter/LinkedIn** - Pre-filled share (future)
3. **QR Code** - Generate QR for link
4. **Email Fallback** - Email as primary method

## Feedback Rules

### Rating System
1. **Thumbs Up/Down** - Simple feedback
2. **Optional** - Not required
3. **Anonymous** - Feedback not tied to user
4. **Storage** - Save feedback for creator
5. **Analytics** - Track satisfaction

### Report Mechanism
1. **Report Button** - Flag inappropriate content
2. **Reason Selection** - Choose issue type
3. **Comment Optional** - Can add details
4. **Admin Review** - Flagged for moderation
5. **Notification** - Creator notified
