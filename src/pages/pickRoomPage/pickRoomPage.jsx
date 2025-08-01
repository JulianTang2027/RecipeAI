import styles from './pickRoomPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PickRoomPage = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [joinRoomId, setJoinRoomId] = useState('');

    const generateRoomId = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleCreateClick = () => {
        const newRoomId = generateRoomId();
        navigate(`/room/${newRoomId}/lobby`);
    }

    const handleJoinClick = (e) => {
        e.preventDefault();
        if (joinRoomId.trim()) {
            navigate(`/room/${joinRoomId.trim()}/lobby`);
        }
    }

    return (
        <div className={styles.pickRoomPage}>
            <div className={styles.header}>
                <h1>🍽️ ForkCast</h1>
                <p>Decide where to eat with your group</p>
            </div>
            
            <div className={styles.optionsWrapper}>
                <div className={styles.createRoom}>
                    <h2>Create a New Room</h2>
                    <p>Start a new dining session</p>
                    <button onClick={handleCreateClick} className={styles.createBtn}>
                        Create Room
                    </button>
                </div>
                
                <div className={styles.divider}>
                    <span>or</span>
                </div>
                
                <div className={styles.joinRoom}>
                    <h2>Join Existing Room</h2>
                    <p>Enter the room code from your host</p>
                    <form onSubmit={handleJoinClick} className={styles.joinRoomForm}>
                        <input 
                            type='text' 
                            placeholder="Enter Room Code"
                            value={joinRoomId}
                            onChange={(e) => setJoinRoomId(e.target.value)}
                            className={styles.roomInput}
                            maxLength={6}
                        />
                        <button type='submit' className={styles.joinBtn}>
                            Join Room
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PickRoomPage; 