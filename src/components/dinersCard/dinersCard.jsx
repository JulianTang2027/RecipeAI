import avatar from "../../assets/avatar.jpg";
import { MapPin, DollarSign, Utensils } from "lucide-react"
import styles from "./dinersCard.module.css"

const DinersCard = ({
  name = "Participant",
  budget = 2,
  cuisine = "Thai",
  distance = "2 km",
}) => {

  const budgetSymbols = "$".repeat(budget)

  return (
    <div className={styles.dinersCard}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={avatar || "/placeholder.svg"}
            alt={`${name}'s avatar`}
            width={48}
            height={48}
            className={styles.avatar}
          />
          
        </div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{name}</h3>
          <span className={styles.userStatus}>Ready to eat!</span>
        </div>
      </div>

      {/* Info badges */}
      <div className={styles.badgeContainer}>
        <div className={`${styles.badge} ${styles.budgetBadge}`}>
          <DollarSign className={styles.badgeIcon} />
          <span>{budgetSymbols}</span>
        </div>

        <div className={`${styles.badge} ${styles.cuisineBadge}`}>
          <Utensils className={styles.badgeIcon} />
          <span>{cuisine}</span>
        </div>

        <div className={`${styles.badge} ${styles.distanceBadge}`}>
          <MapPin className={styles.badgeIcon} />
          <span>{distance}</span>
        </div>
      </div>
    </div>
  )
}

export default DinersCard