import { useState, useEffect } from 'react';
import styles from './voteResultsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Trophy, MapPin, Phone, Globe } from "lucide-react";

const VoteResultsPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [results, setResults] = useState([]);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading vote results
        setTimeout(() => {
            const mockResults = [
                {
                    id: 1,
                    name: "Thai Palace",
                    cuisine: "Thai",
                    price: "$$",
                    rating: 4.5,
                    distance: "0.8 km",
                    votes: 8,
                    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
                    address: "123 Main St, City, State",
                    phone: "+1 (555) 123-4567",
                    website: "https://thaipalace.com"
                },
                {
                    id: 2,
                    name: "Sakura Sushi",
                    cuisine: "Japanese",
                    price: "$$$",
                    rating: 4.7,
                    distance: "1.2 km",
                    votes: 6,
                    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
                    address: "456 Oak Ave, City, State",
                    phone: "+1 (555) 987-6543",
                    website: "https://sakurasushi.com"
                },
                {
                    id: 3,
                    name: "Taco Fiesta",
                    cuisine: "Mexican",
                    price: "$",
                    rating: 4.3,
                    distance: "0.5 km",
                    votes: 4,
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
                    address: "789 Pine St, City, State",
                    phone: "+1 (555) 456-7890",
                    website: "https://tacofiesta.com"
                }
            ];

            const sortedResults = mockResults.sort((a, b) => b.votes - a.votes);
            setResults(sortedResults);
            setWinner(sortedResults[0]);
            setLoading(false);
        }, 1500);
    }, []);

    const handleNewSession = () => {
        navigate('/');
    };

    const handleRetry = () => {
        navigate(`/room/${roomId}/suggestions`);
    };

    if (loading) {
        return (
            <div className={styles.voteResultsPage}>
                <div className={styles.header}>
                    <div className={styles.roomInfo}>
                        <span className={styles.roomLabel}>Room Code:</span>
                        <span className={styles.roomCode}>{roomId}</span>
                    </div>
                </div>
                
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <h2>Calculating voting results...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.voteResultsPage}>
            <div className={styles.header}>
                <div className={styles.roomInfo}>
                    <span className={styles.roomLabel}>Room Code:</span>
                    <span className={styles.roomCode}>{roomId}</span>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.winnerSection}>
                    <div className={styles.winnerBadge}>
                        <Trophy className={styles.trophyIcon} />
                        <span>Winner!</span>
                    </div>
                    
                    <div className={styles.winnerCard}>
                        <img 
                            src={winner.image} 
                            alt={winner.name}
                            className={styles.winnerImage}
                        />
                        <div className={styles.winnerInfo}>
                            <h2 className={styles.winnerName}>{winner.name}</h2>
                            <p className={styles.winnerCuisine}>{winner.cuisine} • {winner.price}</p>
                            <p className={styles.winnerRating}>⭐ {winner.rating} • {winner.distance}</p>
                            <p className={styles.winnerVotes}>{winner.votes} votes</p>
                        </div>
                    </div>
                </div>

                <div className={styles.contactSection}>
                    <h3>Contact Information</h3>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <MapPin className={styles.contactIcon} />
                            <span>{winner.address}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone className={styles.contactIcon} />
                            <span>{winner.phone}</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Globe className={styles.contactIcon} />
                            <a href={winner.website} target="_blank" rel="noopener noreferrer">
                                Visit Website
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.leaderboardSection}>
                    <h3>Full Results</h3>
                    <div className={styles.leaderboard}>
                        {results.map((restaurant, index) => (
                            <div key={restaurant.id} className={styles.leaderboardItem}>
                                <div className={styles.rank}>#{index + 1}</div>
                                <div className={styles.restaurantInfo}>
                                    <h4>{restaurant.name}</h4>
                                    <p>{restaurant.cuisine} • {restaurant.price}</p>
                                </div>
                                <div className={styles.voteCount}>
                                    {restaurant.votes} votes
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.actions}>
                    <button onClick={handleRetry} className={styles.retryBtn}>
                        Try Again
                    </button>
                    <button onClick={handleNewSession} className={styles.newSessionBtn}>
                        New Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoteResultsPage; 