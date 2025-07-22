import styles from './App.module.css'
import UploadBox from './components/uploadBox/uploadBox'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import PickRoomPage from './pages/pickRoomPage/pickRoomPage';
import LobbyPage from './pages/lobbyPage/lobby';
import SummaryPage from './pages/summaryPage/summaryPage';
import RecommendationsPage from './pages/recommendationsPage/recommendationsPage';
import PreferenceInputPage from './pages/preferenceInputPage/preferenceInputPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/pick" element={<PickRoomPage></PickRoomPage>}></Route>
        <Route path="/preference" element={<PreferenceInputPage></PreferenceInputPage>}></Route>
        <Route path="/lobby" element={<LobbyPage></LobbyPage>}></Route>
        <Route path="/summary" element={<SummaryPage></SummaryPage>}></Route>
        <Route path="/recommendations" element={<RecommendationsPage></RecommendationsPage>}></Route>
      </Routes>
    </Router>
  )
}

export default App
