import React from 'react';
import styles from './lobby.module.css';
import DinersCard from '../../components/dinersCard/dinersCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from '../../utilities/formContext';

const LobbyPage = () => {
    const { dinerForms } = useFormContext();
    const navigate = useNavigate();
    const { roomId } = useParams();

    const handleStartClick = () => {
        navigate(`/room/${roomId}/summary`);
    }

    const handleAddPreferences = () => {
        navigate(`/room/${roomId}/preferences`);
    }

    return (
        <div className={styles.lobbyPage}>
            <div className={styles.header}>
                <div className={styles.lobbyPINcontainer}>
                    <span className={styles.lobbyPINheader}>Room Code</span>
                    <span className={styles.lobbyPIN}>{roomId}</span>
                </div>
            </div>
            <div className={styles.lobbyContent}>
                <div className={styles.dinerContainer}>
                    <div className={styles.dinerCountWrapper}>
                        <span className={styles.dinerCountNumber}>{dinerForms.length}</span>
                        <span className={styles.dinerCountText}>Participants</span>
                    </div>
                </div>
                <div className={styles.dinersCardsWrapper}>
                    {dinerForms.length > 0 ? (
                        dinerForms.map((diner, index) => (
                            <DinersCard
                                key={index}
                                name={diner.name || `Participant ${index + 1}`}
                                budget={diner.budget ? diner.budget.length : 2}
                                cuisine={diner.cusines && diner.cusines.length > 0 ? diner.cusines[0] : "Any"}
                                distance={diner.distance || "2 km"}
                            />
                        ))
                    ) : (
                        <div className={styles.noDiners}>
                            <p>No participants have joined yet...</p>
                            <button onClick={handleAddPreferences} className={styles.addPreferencesBtn}>
                                Add Your Preferences
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.startBtnWrapper}>
                    <button 
                        onClick={handleStartClick} 
                        className={styles.startBtn}
                        disabled={dinerForms.length === 0}
                    >
                        Start Session
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LobbyPage;