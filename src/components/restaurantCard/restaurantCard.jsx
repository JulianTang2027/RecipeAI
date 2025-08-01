import { Star, MapPin, DollarSign, Utensils, Heart } from "lucide-react";
import styles from "./restaurantCard.module.css";

const RestaurantCard = ({ restaurant, votes = 0, onVote }) => {
    const {
        name,
        cuisine,
        price,
        rating,
        distance,
        description,
        image,
        tags = []
    } = restaurant;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className={styles.star} fill="gold" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className={styles.star} fill="gold" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className={styles.star} />);
        }

        return stars;
    };

    return (
        <div className={styles.restaurantCard}>
            <div className={styles.imageContainer}>
                <img
                    src={image}
                    alt={`${name} restaurant`}
                    className={styles.restaurantImage}
                />
                <div className={styles.overlay}>
                    <div className={styles.ratingContainer}>
                        {renderStars(rating)}
                        <span className={styles.ratingText}>{rating}</span>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.restaurantName}>{name}</h3>
                    <div className={styles.priceBadge}>
                        <DollarSign className={styles.priceIcon} />
                        <span>{price}</span>
                    </div>
                </div>

                <div className={styles.badges}>
                    <div className={styles.badge}>
                        <Utensils className={styles.badgeIcon} />
                        <span>{cuisine}</span>
                    </div>
                    <div className={styles.badge}>
                        <MapPin className={styles.badgeIcon} />
                        <span>{distance}</span>
                    </div>
                </div>

                <p className={styles.description}>{description}</p>

                {tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={styles.voteSection}>
                    <div className={styles.voteCount}>
                        <Heart className={styles.voteIcon} />
                        <span>{votes} votes</span>
                    </div>
                    <button onClick={onVote} className={styles.voteBtn}>
                        Vote
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard; 