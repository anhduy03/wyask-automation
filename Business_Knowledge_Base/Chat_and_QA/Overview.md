# Chat & Q&A - Overview

## Purpose

Enables interactive communication between envelope creators and recipients through a real-time chat interface. Users can ask questions about envelope content, and AI provides context-aware answers. Creators can moderate and respond to questions.

## Scope

- **Message Sending & Display** (user questions, AI responses)
- **Real-time Chat Stream** (live message updates)
- **AI-Powered Q&A** (intelligent answers to questions)
- **Message History** (persistent chat records)
- **Typing Indicators** (real-time user feedback)
- **Message Search & Filtering**
- **Chat Moderation** (flag inappropriate content)
- **Query Usage Tracking** (track AI queries consumed)

## Core Features

### Q&A Answering
- **AI-Powered Responses** - LLM-based answers to questions
- **Context-Aware** - Answers based on envelope content
- **Citation Tracking** - Link answers to source documents
- **Confidence Scoring** - Show relevance/confidence of answers

### Message Management
- **Message Persistence** - Store all questions/answers
- **Streaming Response** - Display answers as they generate
- **Typing Indicators** - Show when user typing or AI thinking
- **Message Timestamps** - Track when each message sent

### Engagement Features
- **Message Reactions** (emoji responses) - Future
- **Message Threads** (nested conversations) - Future
- **Rich Message Format** (markdown, code blocks) - Planned
- **Attachment Support** (images in chat) - Future

## User Roles in Chat

1. **Envelope Creator** - Can view all questions, respond, moderate
2. **Recipient (Invited)** - Can ask questions, see public answers
3. **Public Visitor** - Can ask questions if enabled
4. **Support Team** (Future) - Can help with moderation

## Query Management

- **Queries per Plan** - Limited by subscription tier
- **Freemium** - Limited queries
- **Plus** - Higher query quota
- **Pro** - Highest query quota
- **Usage Tracking** - Monitor queries remaining

## Integration Points

- **LLM Service** (OpenAI, Claude) - AI response generation
- **Envelope Service** - Context/document retrieval
- **Authentication Service** - User identification
- **Real-time Service** (WebSocket) - Live chat streaming
- **Analytics Service** - Track engagement metrics
- **Moderation Service** - Content filtering
