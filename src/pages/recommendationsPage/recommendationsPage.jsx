import { useState, useEffect } from 'react';
import styles from './recommendationsPage.module.css';
import { useFormContext } from '../../utilities/formContext';
import RecommendationsCard from '../../components/recommendationsCard/recommendationsCard';
import { getRecommendations, generateGroupSummary } from '../../utilities/recommendRestaurants';
import { useNavigate } from 'react-router-dom';

const RecommendationsPage = () => {
    const { dinerForms, clearDinerForms } = useFormContext();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call to get recommendations
        setTimeout(() => {
            const restaurantRecommendations = getRecommendations(dinerForms);
            setRecommendations(restaurantRecommendations);
            setLoading(false);
        }, 2000);
    }, [dinerForms]);

    const getGroupPreferences = () => {
        if (dinerForms.length === 0) return { cuisines: [], budgets: [], distances: [] };
        
        const allCuisines = dinerForms.flatMap(diner => diner.cusines || []);
        const allBudgets = dinerForms.map(diner => diner.budget).filter(Boolean);
        const allDistances = dinerForms.map(diner => diner.distance).filter(Boolean);
        
        return {
            cuisines: [...new Set(allCuisines)],
            budgets: [...new Set(allBudgets)],
            distances: [...new Set(allDistances)]
        };
    };

    const handleNewSearch = () => {
        // Clear the form data and navigate to home
        clearDinerForms();
        navigate('/');
    };

    const handleShareResults = () => {
        // Create shareable text
        const shareText = `Check out these restaurant recommendations from ForkCast!\n\n${recommendations.map(r => `🍽️ ${r.name} - ${r.cuisine} (${r.price}) - ${r.rating}⭐`).join('\n')}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'ForkCast Recommendations',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Recommendations copied to clipboard!');
            });
        }
    };

    const preferences = getGroupPreferences();
    const groupSummary = generateGroupSummary(dinerForms);

    if (loading) {
        return (
            <div className={styles.recommendationsPage}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <h2>Finding the perfect restaurant for your group...</h2>
                    <p>Analyzing {dinerForms.length} diner preferences</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.recommendationsPage}>
            <div className={styles.header}>
                <h1>🍽️ Restaurant Recommendations</h1>
                <p>Based on your group's preferences</p>
            </div>

            <div className={styles.groupSummary}>
                <h3>Group Preferences Summary</h3>
                <div className={styles.preferencesGrid}>
                    <div className={styles.preferenceItem}>
                        <span className={styles.preferenceLabel}>Cuisines:</span>
                        <span className={styles.preferenceValue}>
                            {preferences.cuisines.length > 0 
                                ? preferences.cuisines.join(', ') 
                                : 'No preferences selected'}
                        </span>
                    </div>
                    <div className={styles.preferenceItem}>
                        <span className={styles.preferenceLabel}>Budget Range:</span>
                        <span className={styles.preferenceValue}>
                            {preferences.budgets.length > 0 
                                ? preferences.budgets.join(' - ') 
                                : 'No budget specified'}
                        </span>
                    </div>
                    <div className={styles.preferenceItem}>
                        <span className={styles.preferenceLabel}>Distance:</span>
                        <span className={styles.preferenceValue}>
                            {preferences.distances.length > 0 
                                ? preferences.distances.join(', ') 
                                : 'No distance specified'}
                        </span>
                    </div>
                </div>
                <div className={styles.summaryText}>
                    <p>{groupSummary}</p>
                </div>
            </div>

            <div className={styles.recommendationsContainer}>
                <h3>Top Recommendations</h3>
                <div className={styles.recommendationsGrid}>
                    {recommendations.map((restaurant) => (
                        <RecommendationsCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={handleNewSearch} className={styles.newSearchBtn}>Start New Search</button>
                <button onClick={handleShareResults} className={styles.shareBtn}>Share Results</button>
            </div>
        </div>
    );
};

export default RecommendationsPage;