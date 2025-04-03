# Find Your Vibe (FYV) - Backend Requirements

## Authentication Endpoints

### POST /api/auth/register
Create new host account
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/login
Login for hosts
```json
{
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/verify-token
Verify JWT token
```json
{
  "token": "string"
}
```

## Event Management Endpoints

### POST /api/events
Create new event
```json
{
  "eventName": "string",
  "eventType": "string",
  "venue": {
    "name": "string",
    "address": "string"
  },
  "dateTime": "ISO8601",
  "description": "string",
  "ageRange": {
    "min": "number",
    "max": "number"
  },
  "dress": "string",
  "admissionFee": {
    "amount": "number",
    "currency": "string"
  },
  "maxAttendees": "number",
  "countdownDuration": "number",
  "questionSet": "string"
}
```

### GET /api/events
List all events (with filters)
Query params:
- status: "upcoming" | "active" | "completed"
- search: string
- page: number
- limit: number

### GET /api/events/{eventCode}
Get event details by code

### PUT /api/events/{eventId}
Update event details

### DELETE /api/events/{eventId}
Delete event

## Participant Management

### POST /api/events/{eventCode}/join
Join event as participant
```json
{
  "nickname": "string",
  "questionnaire": {
    "q1": "number",
    "q2": "number",
    "q3": "number"
    // Additional questions as needed
  }
}
```

### GET /api/events/{eventId}/participants
List event participants

### POST /api/events/{eventId}/start-matching
Start the matching process

## Match Management

### GET /api/events/{eventId}/matches
Get all matches for an event

### POST /api/matches/{matchId}/interest
Express interest in a match
```json
{
  "interested": "boolean"
}
```

## Analytics Endpoints

### GET /api/analytics/dashboard
Get host dashboard analytics
```json
{
  "totalEvents": "number",
  "totalParticipants": "number",
  "totalMatches": "number",
  "matchRate": "number",
  "followUpRate": "number"
}
```

### GET /api/analytics/events/{eventId}
Get specific event analytics
```json
{
  "participants": "number",
  "matches": "number",
  "followUps": "number",
  "matchRate": "number",
  "outfitVotes": "number"
}
```

## Real-time Requirements

- WebSocket connection for:
  - Live participant updates
  - Countdown synchronization
  - Match reveals
  - Interest notifications

## Database Schema Requirements

### Users Collection
- id
- name
- email
- password (hashed)
- createdAt
- profile data

### Events Collection
- id
- hostId
- eventCode
- eventName
- eventType
- venue
- dateTime
- status
- settings
- participantCount
- maxAttendees

### Participants Collection
- id
- eventId
- nickname
- joinedAt
- questionnaire responses
- matches

### Matches Collection
- id
- eventId
- participant1Id
- participant2Id
- status
- matchScore
- mutualInterest

## Security Requirements

1. JWT Authentication
2. Rate limiting
3. Input validation
4. Data encryption
5. CORS configuration
6. Error handling

## Performance Requirements

1. Maximum response time: 500ms
2. Support for concurrent users: 1000+
3. Real-time updates latency: <100ms
4. Database indexing for:
   - Event codes
   - User email
   - Event status
   - Date ranges

## Monitoring Requirements

1. Error tracking
2. Performance metrics
3. User activity logs
4. Match success rate
5. API usage statistics

## Additional Notes

- All timestamps should be in ISO8601 format
- Implement proper error handling with status codes
- Include pagination for list endpoints
- Cache frequently accessed data
- Document all error responses
- Implement proper logging
