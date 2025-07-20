import React from 'react';
import styles from './lobby.module.css';
import DinersBox from '../../components/dinersBox/dinersBox';

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

    return (
        <div className={styles.lobbyPage}>
            <div className={styles.header}>
                <div className={styles.lobbyPINcontainer}>
                    <span className={styles.lobbyPINheader}>Lobby PIN</span>
                    <span className={styles.lobbyPIN}>57892</span>
                </div>
                <div className={styles.dinersBoxWrapper}>
                    <DinersBox></DinersBox>
                </div>
            </div>
        </div>
    )
}

export default Lobby;