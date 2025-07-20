import styles from './App.module.css'
import UploadBox from './components/uploadBox/uploadBox'

function App() {

  return (
    <div className={styles.homePage}>
      <div className={styles.headerContainer}>
        <h2 className={styles.recipeAIheader}>Welcome to RecipeAI</h2>
        <h3 className={styles.recipeAIsubheader}>Submit a link to a tiktok or ig reel below!</h3>
        <UploadBox></UploadBox>
      </div>
    </div>
  )
}

export default App
