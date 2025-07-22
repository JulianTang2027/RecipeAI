import styles from './pickRoomPage.module.css';
import { useNavigate } from 'react-router-dom'

const PickRoomPage = () => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/preference');
    }

    const handleJoinClick = (e) => {
        const pin = e.target.value;

        navigate('/preference');
    }

    return (
        <div className={styles.pickRoomPage}>
            <div className={styles.optionsWrapper}>
                <div className={styles.createRoom}>
                    <button onClick={handleCreateClick}>Create a dining room!</button>
                </div>
                <div className={styles.joinRoom}>
                    <div className={styles.joinRoomForm}>
                        <span>Join an existing dining room!</span>
                        <div className={styles.pinWrapper}>
                            <input type='text' id='roomID' placeholder="Room PIN"></input>
                            <button onClick={handleJoinClick} type='submit'>Enter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PickRoomPage; 