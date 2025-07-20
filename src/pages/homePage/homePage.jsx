import styles from './homePage.module.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pick');
    }

    return (
            <div className={styles.homePage}>
              <div className={styles.headerContainer}>
                <h2 className={styles.recipeAIheader}>Welcome to RecipeAI</h2>
                <h3 className={styles.recipeAIsubheader}>Solve all your dinner making struggles</h3>
                <button onClick={handleClick} className={styles.startButton}>Get started!</button>
              </div>
            </div>
    )
}

export default HomePage;