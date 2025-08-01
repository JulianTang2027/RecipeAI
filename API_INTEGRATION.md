# API Integration Guide

This document explains how the API integrations work in ForkCast.

## Environment Variables

Create a `.env` file in the root directory with your API keys:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_YELP_API_KEY=your_yelp_api_key_here
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

## Yelp Integration

### Restaurant Recommendations
- **Function**: `getRestaurantRecommendations(preferences)`
- **Purpose**: Fetches restaurant suggestions based on group preferences and user location
- **Location**: `src/utilities/api.js`
- **Usage**: Called in `SuggestionsPage` component

### Features
- **Location-based search**: Uses browser geolocation to find nearby restaurants
- **Preference filtering**: Filters by cuisine, budget, and distance preferences
- **Fallback system**: Uses mock data if API fails or location is unavailable
- **Error handling**: Graceful degradation with user-friendly error messages

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