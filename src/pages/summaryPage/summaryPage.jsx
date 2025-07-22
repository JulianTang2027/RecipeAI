import styles from './summaryPage.module.css';
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {

    const navigate = useNavigate();

    const handleShowClick = () => {
        navigate('/recommendations');
    }
    const lobbyPIN = '57892';
    const recommendationSummary = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio praesentium nihil unde eveniet doloremque odit expedita dignissimos placeat omnis deserunt tempore aliquid veniam, ipsam voluptates incidunt numquam impedit quis obcaecati!';
    return (
        <div className={styles.summaryPage}>
                <div className={styles.summaryPageHeader}>
                    <div className={styles.lobbyPINcontainer}>
                        <span className={styles.lobbyPINheader}>Lobby PIN:</span>
                        <span className={styles.lobbyPINnumber}>{lobbyPIN}</span>
                    </div>
                    <div className={styles.summaryPageContent}>
                        <div className={styles.recommendationSummaryContainer}>
                            <div className={styles.recommendationSummaryHeader}>Group Summary</div>
                            <div className={styles.recommendationSummaryText}>{recommendationSummary}</div>
                        </div>
                        <div className={styles.recommendationsBtnContainer}>
                            <button onClick={handleShowClick} className={styles.recommendationBtn}>Show recommendations!</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default SummaryPage;