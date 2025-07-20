import styles from './App.module.css'
import UploadBox from './components/uploadBox/uploadBox'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import PickRoomPage from './pages/pickRoomPage/pickRoomPage';
import Lobby from './pages/preferencesPage/lobby';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/pick" element={<PickRoomPage></PickRoomPage>}></Route>
        <Route path="/lobby" element={<Lobby></Lobby>}></Route>
      </Routes>
    </Router>
  )
}

export default App
