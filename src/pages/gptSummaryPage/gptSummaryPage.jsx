import { useState, useEffect } from 'react';
import styles from './gptSummaryPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from '../../utilities/formContext';
import { generateGPTSummary } from '../../utilities/api';

const GPTSummaryPage = () => {
    const { dinerForms } = useFormContext();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasGenerated, setHasGenerated] = useState(false);

    useEffect(() => {
        if (!hasGenerated && dinerForms.length > 0) {
            generateSummary();
            setHasGenerated(true);
        }
    }, [dinerForms, hasGenerated]);

    const generateSummary = async () => {
        if (dinerForms.length === 0) {
            setSummary("No participants have joined yet. Once everyone has added their preferences, we'll generate a personalized summary for your group!");
            setLoading(false);
            return;
        }

        try {
            // Call OpenAI API to generate summary
            const generatedSummary = await generateGPTSummary(dinerForms);
            setSummary(generatedSummary);
        } catch (error) {
            console.error('Error generating summary:', error);
            
            // Check if it's a rate limit error
            if (error.message.includes('Rate limit exceeded')) {
                setSummary("We're experiencing high demand right now. Using a local summary while we wait for the AI to be available again.");
            } else {
                setSummary("We're having trouble connecting to our AI service. Using a local summary instead.");
            }
            
            // Fallback to local summary if API fails
            const groupData = {
                participantCount: dinerForms.length,
                participants: dinerForms.map(diner => ({
                    name: diner.name,
                    mood: diner.mood,
                    cuisines: diner.cusines || [],
                    budget: diner.budget,
                    distance: diner.distance
                }))
            };
            const fallbackSummary = generateLocalSummary(groupData);
            setSummary(prev => prev + "\n\n" + fallbackSummary);
        } finally {
            setLoading(false);
        }
    };

    const generateLocalSummary = (groupData) => {
        const { participantCount, participants } = groupData;
        
        const allCuisines = participants.flatMap(p => p.cuisines);
        const allBudgets = participants.map(p => p.budget).filter(Boolean);
        const allMoods = participants.map(p => p.mood).filter(Boolean);
        const allDistances = participants.map(p => p.distance).filter(Boolean);

        const uniqueCuisines = [...new Set(allCuisines)];
        const uniqueBudgets = [...new Set(allBudgets)];
        const uniqueMoods = [...new Set(allMoods)];
        const uniqueDistances = [...new Set(allDistances)];

        let summary = `Your group of ${participantCount} people has diverse dining preferences! `;

        if (uniqueMoods.length > 0) {
            const moodLabels = uniqueMoods.map(mood => {
                switch(mood) {
                    case 'excited': return 'excited';
                    case 'hungry': return 'hungry';
                    case 'casual': return 'casual';
                    case 'fancy': return 'fancy';
                    case 'adventurous': return 'adventurous';
                    default: return mood;
                }
            });
            summary += `The group mood ranges from ${moodLabels.join(' to ')}. `;
        }

        if (uniqueCuisines.length > 0) {
            summary += `Cuisine interests include ${uniqueCuisines.length > 1 ? uniqueCuisines.slice(0, -1).join(', ') + ' and ' + uniqueCuisines.slice(-1) : uniqueCuisines[0]}. `;
        }

        if (uniqueBudgets.length > 0) {
            summary += `Budget preferences range from ${uniqueBudgets[0]} to ${uniqueBudgets[uniqueBudgets.length - 1]}. `;
        }

        if (uniqueDistances.length > 0) {
            const distanceLabels = uniqueDistances.map(d => {
                if (d === 'nearby') return 'nearby';
                if (d === 'moderate') return 'moderate distance';
                if (d === 'far') return 'longer distances';
                return d;
            });
            summary += `Travel preferences vary from ${distanceLabels.join(' to ')}. `;
        }

        summary += "We'll find restaurants that balance everyone's preferences to ensure a great dining experience for the whole group!";

        return summary;
    };

    const handleProceed = () => {
        navigate(`/room/${roomId}/suggestions`);
    };

    return (
        <div className={styles.gptSummaryPage}>
            <div className={styles.header}>
                <div className={styles.roomInfo}>
                    <span className={styles.roomLabel}>Room Code:</span>
                    <span className={styles.roomCode}>{roomId}</span>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.summaryContainer}>
                    <h2 className={styles.title}>🤖 AI Group Summary</h2>
                    <p className={styles.subtitle}>Analyzing your group's preferences...</p>
                    
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Generating personalized summary...</p>
                        </div>
                    ) : (
                        <div className={styles.summaryText}>
                            <p>{summary}</p>
                        </div>
                    )}
                </div>
                
                <div className={styles.actions}>
                    <button 
                        onClick={handleProceed} 
                        className={styles.proceedBtn}
                        disabled={loading}
                    >
                        Get Restaurant Suggestions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GPTSummaryPage; 