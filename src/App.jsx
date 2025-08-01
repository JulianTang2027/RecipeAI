import styles from './App.module.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import PickRoomPage from './pages/pickRoomPage/pickRoomPage';
import LobbyPage from './pages/lobbyPage/lobby';
import PreferenceInputPage from './pages/preferenceInputPage/preferenceInputPage';
import GPTSummaryPage from './pages/gptSummaryPage/gptSummaryPage';
import SuggestionsPage from './pages/suggestionsPage/suggestionsPage';
import VoteResultsPage from './pages/voteResultsPage/voteResultsPage';
import ChatWithGPTPage from './pages/chatWithGPTPage/chatWithGPTPage';
import { FormProvider } from './utilities/formContext';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pick" element={<PickRoomPage />} />
          <Route path="/room/:roomId/lobby" element={<LobbyPage />} />
          <Route path="/room/:roomId/preferences" element={<PreferenceInputPage />} />
          <Route path="/room/:roomId/summary" element={<GPTSummaryPage />} />
          <Route path="/room/:roomId/suggestions" element={<SuggestionsPage />} />
          <Route path="/room/:roomId/results" element={<VoteResultsPage />} />
          <Route path="/room/:roomId/chat" element={<ChatWithGPTPage />} />
        </Routes>
      </Router>
    </FormProvider>
  )
}

export default App
