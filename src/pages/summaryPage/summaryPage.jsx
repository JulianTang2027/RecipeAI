import styles from './summaryPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../utilities/formContext';
import { generateGroupSummary } from '../../utilities/recommendRestaurants';

const SummaryPage = () => {
    const { dinerForms } = useFormContext();
    const navigate = useNavigate();

    const handleShowClick = () => {
        navigate('/recommendations');
    }

    const lobbyPIN = '57892';
    const recommendationSummary = generateGroupSummary(dinerForms);

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
                        <button 
                            onClick={handleShowClick} 
                            className={styles.recommendationBtn}
                            disabled={dinerForms.length === 0}
                        >
                            Show recommendations!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryPage;