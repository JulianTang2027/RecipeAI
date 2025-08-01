# ForkCast - Group Restaurant Recommendations

ForkCast is a React-based web application that helps groups decide where to eat by collecting individual preferences and providing personalized restaurant recommendations.

## Features

### 🏠 **Home Page**
- Welcome screen with app introduction
- "Get Started" button to begin the process

### 🏠 **Room Management**
- Create a new dining room
- Join existing rooms with PIN codes
- Real-time lobby system

### 📝 **Preference Collection**
- Individual diner profiles with names
- Cuisine preferences (American, Thai, Japanese, Mexican, Indian, Korean, Malaysian, British, Italian, French, Spanish)
- Budget selection ($ to $$$$)
- Travel distance preferences (Nearby, Moderate, Far)

### 👥 **Lobby System**
- Real-time display of joined diners
- Shows individual preferences for each diner
- Group summary with preference analytics
- Start button to generate recommendations

### 📊 **Summary Page**
- Group preference analysis
- Intelligent summary generation based on collected data
- Overview of group dining preferences

### 🍽️ **Recommendations**
- AI-powered restaurant recommendations
- Personalized based on group preferences
- Restaurant cards with ratings, prices, and descriptions
- Share functionality for results

## Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **State Management**: React Context API
- **APIs**: OpenAI GPT-3.5 Turbo, Qloo Restaurant API
- **HTTP Client**: Axios

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory with your API keys:
   ```bash
   # API Keys
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_QLOO_API_KEY=your_qloo_api_key_here
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## How It Works

1. **Create/Join Room**: Users can create a new dining room or join an existing one with a PIN
2. **Add Preferences**: Each diner enters their name, mood, cuisine preferences, budget, and travel distance
3. **Lobby**: View all diners and their preferences in real-time
4. **AI Summary**: GPT analyzes group preferences and provides personalized insights
5. **Recommendations**: Get restaurant suggestions from Qloo API based on group preferences
6. **Voting**: Vote on favorite restaurants and see results
7. **Chat with AI**: Ask follow-up questions or request different suggestions

## Key Components

- **Form Context**: Manages diner data across the application
- **API Integration**: OpenAI GPT for summaries and chat, Qloo for restaurant recommendations
- **Recommendation Engine**: Analyzes group preferences to suggest restaurants
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Future Enhancements

- Real-time collaboration with WebSocket
- Integration with restaurant APIs (Yelp, Google Places)
- User accounts and dining history
- Advanced filtering and sorting options
- Restaurant booking integration

## Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React and modern web technologies.
