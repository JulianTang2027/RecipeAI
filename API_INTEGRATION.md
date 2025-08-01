# API Integration Guide

This document explains how the API integrations work in ForkCast.

## Environment Variables

Create a `.env` file in the root directory with your API keys:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_QLOO_API_KEY=your_qloo_api_key_here
```

## OpenAI Integration

### GPT Summary Generation
- **Function**: `generateGPTSummary(dinerForms)`
- **Purpose**: Analyzes group preferences and generates personalized summaries
- **Location**: `src/utilities/api.js`
- **Usage**: Called in `GPTSummaryPage` component

### Chat with GPT
- **Function**: `chatWithGPT(message, conversationHistory)`
- **Purpose**: Handles conversational AI interactions
- **Location**: `src/utilities/api.js`
- **Usage**: Called in `ChatWithGPTPage` component

## Qloo Integration

### Restaurant Recommendations
- **Function**: `getRestaurantRecommendations(preferences)`
- **Purpose**: Fetches restaurant suggestions based on group preferences
- **Location**: `src/utilities/api.js`
- **Usage**: Called in `SuggestionsPage` component

### Current Implementation
The Qloo API integration currently uses fallback data since the exact API structure may vary. In production, you would:

1. Replace the mock API call with actual Qloo API endpoint
2. Transform the response to match the expected format
3. Handle API-specific error cases

## Error Handling

All API calls include:
- Fallback to local/mock data if API fails
- Detailed error logging
- Graceful degradation for user experience

## API Response Format

### Restaurant Object
```javascript
{
  id: number,
  name: string,
  cuisine: string,
  price: string, // "$", "$$", "$$$", "$$$$"
  rating: number,
  distance: string,
  description: string,
  image: string,
  tags: string[],
  address?: string,
  phone?: string
}
```

### GPT Response
- Returns plain text string
- Handles conversation history for chat functionality
- Includes system prompts for context

## Testing

To test the API integration:

1. Set up your `.env` file with valid API keys
2. Run the development server: `npm run dev`
3. Navigate through the app flow
4. Check browser console for API call logs
5. Verify fallback behavior by temporarily using invalid API keys 