import styles from './dinersCard.module.css';
import avatar from '../../assets/avatar.jpg';

const DinersCard = () => {

    const name = 'Jules!'
    const budget = '$';
    const cuisine = 'Thai';
    const distance = '2';
    return (
        <div className={styles.dinersCard}>
            <div className={styles.imageWrapper}>
                <img src={avatar}></img>
            </div>
            <div className={styles.dinersInfo}>
                <span className={styles.dinersName}>{name}</span>
                <div className={styles.budgetIcon}>{budget}</div>
                <div className={styles.cuisineIcon}>{cuisine}</div>
                <div className={styles.distanceIcon}>{distance}</div>
            </div>
        </div>
    )
}

export default DinersCard;