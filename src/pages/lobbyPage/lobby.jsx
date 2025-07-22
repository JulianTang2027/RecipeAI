import React from 'react';
import styles from './lobby.module.css';
import DinersCard from '../../components/dinersCard/dinersCard';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {

    const navigate = useNavigate();

    const cuisineArr = [
        'American',
        'Thai',
        'Japanese',
        'Mexican',
        'Indian',
        'Korean',
        'Malaysian',
        'British',
        'Italian',
        'French',
        'Spanish'
    ];

    const priceArr = [
        '$',
        '$$',
        '$$$',
        '$$$$'
    ]

    const travelRange = [
        'Nearby, I\'m tired.',
        'Not too far, but willing to travel a bit!',
        'Far!'
    ]

    const dinerCount = '5';

    const handleStartClick = () => {

        navigate('/summary')
    }

    return (
        <div className={styles.lobbyPage}>
            <div className={styles.header}>
                <div className={styles.lobbyPINcontainer}>
                    <span className={styles.lobbyPINheader}>Join the lobby at ForkCast.io</span>
                    <span className={styles.lobbyPIN}>with lobby PIN 57892</span>
                </div>
                <div className={styles.lobbyContent}>
                    <div className={styles.dinerContainer}>
                        <div className={styles.dinerCountWrapper}>
                            <span className={styles.dinerCountNumber}>{dinerCount}</span>
                            <span className={styles.dinerCountText}>Diners</span>
                        </div>
                    </div>
                    <div className={styles.dinersCardsWrapper}>
                        <DinersCard></DinersCard>
                    </div>
                    <div className={styles.startBtnWrapper}>
                        <button onClick={handleStartClick} className={styles.startBtn}>Start</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LobbyPage;