# Frontend Requirements for Dating Game App

## Questionnaire Interface Updates

### New Question Types
The questionnaire system has been updated with multiple-choice questions. The UI needs to:

1. Support choice-based questions (A,B,C,D,E options)
2. Display question categories:
   - Personality Questions (P1, P2)
   - Flirting Style (F1)
   - Social Preferences (S1)
   - Decision Making (D1, D2)
   - Dating Preferences (O1)

### Required Components

1. **Question Card Component**
```typescript
interface QuestionOption {
  value: string;  // 'A', 'B', 'C', 'D', 'E'
  label: string;  // Full text of option
}

interface Question {
  questionId: string;  // 'P1', 'P2', 'F1', etc.
  text: string;
  type: 'choice';
  options: QuestionOption[];
}
```

2. **Progress Indicator**
- Show current question number
- Indicate category being answered
- Progress bar for completion

3. **Answer Review Screen**
- Allow users to review and modify answers
- Group questions by category
- Show completion status

## Real-time Features

### Countdown Timer
- Prominent display of time remaining
- Animated transitions between states
- Clear indication when matching starts

### Match Reveal
- Staged reveal animation
- Display compatibility score
- Show matching answers and differences
- Category-wise compatibility breakdown

## Required Pages/Views

1. **Questionnaire Flow**
```typescript
interface QuestionnaireProps {
  eventId: string;
  participantId: string;
  questions: Question[];
  onComplete: (answers: Answer[]) => void;
}
```

2. **Match Results View**
```typescript
interface MatchResultsProps {
  eventId: string;
  matchId: string;
  participants: {
    participant1: {
      nickname: string;
      answers: Answer[];
    };
    participant2: {
      nickname: string;
      answers: Answer[];
    };
  };
  compatibilityScores: {
    personality: number;
    flirting: number;
    social: number;
    decision: number;
    interests: number;
    overall: number;
  };
}
```

3. **Category-based Results**
- Radar chart showing match strength in different categories
- Highlight strongest connection areas
- Show complementary traits

## API Integration Requirements

### Submit Answers
```typescript
const submitAnswers = async (eventId: string, participantId: string, answers: Answer[]) => {
  const response = await api.post(
    `/events/${eventId}/participants/${participantId}/questionnaire`,
    { answers }
  );
  return response.data;
};
```

### Get Match Results
```typescript
const getMatch = async (eventId: string, participantId: string) => {
  const response = await api.get(
    `/events/${eventId}/participants/${participantId}/match`
  );
  return response.data;
};
```

## Socket Event Handlers

```typescript
socket.on('matchReady', ({ eventId }) => {
  // Trigger match reveal animation
  showMatchReveal();
});

socket.on('countdown', ({ timeLeft }) => {
  // Update countdown display
  updateCountdown(timeLeft);
});
```

## Design Requirements

### Color Coding
- Personality questions: Purple (#7B2CBF)
- Flirting questions: Pink (#FF4D6D)
- Social questions: Blue (#4CC9F0)
- Decision questions: Green (#2D6A4F)
- Interest questions: Orange (#FB8500)

### Animations
1. Question transitions
2. Answer selection feedback
3. Match reveal sequence
4. Compatibility score counters
5. Category score reveals

### Mobile Responsiveness
- Full support for mobile devices
- Touch-friendly option selection
- Swipeable question cards
- Responsive charts and graphics

## Accessibility Requirements

1. WCAG 2.1 AA compliance
2. Keyboard navigation support
3. Screen reader compatibility
4. High contrast mode support
5. Motion reduction option for animations

## Error Handling

1. Connection loss during questionnaire
2. Match reveal failures
3. Answer submission retries
4. Loading states for all async operations
5. Friendly error messages

## Performance Requirements

1. < 2s initial load time
2. Smooth animations (60fps)
3. Offline support for questionnaire
4. Efficient state management
5. Optimized assets

## Testing Requirements

1. Unit tests for all components
2. Integration tests for questionnaire flow
3. E2E tests for complete matching process
4. Mobile compatibility testing
5. Cross-browser testing

## Nice to Have Features

1. Share match results
2. Save match history
3. Export compatibility report
4. Theme customization
5. Animated celebrations for high matches

## Implementation Timeline

1. Week 1: Basic questionnaire UI
2. Week 2: Real-time features
3. Week 3: Match reveal experience
4. Week 4: Polish and optimization

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "socket.io-client": "^4.8.1",
    "chart.js": "^4.0.0",
    "framer-motion": "^10.0.0",
    "react-hook-form": "^7.0.0"
  }
}
```

## API Documentation
Refer to `/api-docs` for complete API documentation and example requests/responses.
