import { useState, useEffect } from 'react';
import styles from './suggestionsPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from '../../utilities/formContext';
import RestaurantCard from '../../components/restaurantCard/restaurantCard';
import { getRestaurantRecommendations, getFallbackRestaurants } from '../../utilities/api';

const SuggestionsPage = () => {
    const { dinerForms } = useFormContext();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votes, setVotes] = useState({});

    useEffect(() => {
        fetchRestaurantSuggestions();
    }, [dinerForms]);

    const fetchRestaurantSuggestions = async () => {
        try {
            setLoading(true);
            
            // Prepare preferences for API call
            const preferences = {
                participants: dinerForms.map(diner => ({
                    name: diner.name,
                    mood: diner.mood,
                    cuisines: diner.cusines || [],
                    budget: diner.budget,
                    distance: diner.distance
                }))
            };

            // Try to get recommendations from Qloo API
            let restaurantData;
            try {
                restaurantData = await getRestaurantRecommendations(preferences);
            } catch (apiError) {
                console.error('Qloo API failed, using fallback:', apiError);
                restaurantData = getFallbackRestaurants();
            }
            
            setRestaurants(restaurantData);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = (restaurantId) => {
        setVotes(prev => ({
            ...prev,
            [restaurantId]: (prev[restaurantId] || 0) + 1
        }));
    };

    const handleViewResults = () => {
        navigate(`/room/${roomId}/results`);
    };

    const handleChatWithGPT = () => {
        navigate(`/room/${roomId}/chat`);
    };

    if (loading) {
        return (
            <div className={styles.suggestionsPage}>
                <div className={styles.header}>
                    <div className={styles.roomInfo}>
                        <span className={styles.roomLabel}>Room Code:</span>
                        <span className={styles.roomCode}>{roomId}</span>
                    </div>
                </div>
                
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <h2>Finding perfect restaurants for your group...</h2>
                    <p>Analyzing preferences and searching for matches</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.suggestionsPage}>
            <div className={styles.header}>
                <div className={styles.roomInfo}>
                    <span className={styles.roomLabel}>Room Code:</span>
                    <span className={styles.roomCode}>{roomId}</span>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.headerSection}>
                    <h1>🍽️ Restaurant Suggestions</h1>
                    <p>Based on your group's preferences</p>
                </div>

                <div className={styles.restaurantsGrid}>
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            votes={votes[restaurant.id] || 0}
                            onVote={() => handleVote(restaurant.id)}
                        />
                    ))}
                </div>

                <div className={styles.actions}>
                    <button onClick={handleViewResults} className={styles.resultsBtn}>
                        View Voting Results
                    </button>
                    <button onClick={handleChatWithGPT} className={styles.chatBtn}>
                        Chat with AI
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuggestionsPage; 