import React from 'react';
import styles from './lobby.module.css';
import DinersBox from '../../components/dinersBox/dinersBox';
import DinersCard from '../../components/dinersCard/dinersCard';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {

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

    const handleStartClick = () => {
        const navigate = useNavigate();

        navigate('/summary')
    }

    return (
        <div className={styles.lobbyPage}>
            <div className={styles.header}>
                <div className={styles.lobbyPINcontainer}>
                    <span className={styles.lobbyPINheader}>Join the lobby at eatery.io</span>
                    <span className={styles.lobbyPIN}>with lobby PIN 57892</span>
                </div>
                <div className={styles.dinersCardBox}>
                    <button className={styles.startBtn}>Start</button>
                    <DinersCard></DinersCard>
                </div>
            </div>
        </div>
    )
}

export default Lobby;