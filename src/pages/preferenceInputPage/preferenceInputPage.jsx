import { useState } from 'react';
import styles from './preferenceInputPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from '../../utilities/formContext';

const PreferenceInputPage = () => {
    const { roomId } = useParams();
    const [budget, setBudget] = useState("")
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [name, setName] = useState("")
    const [distance, setDistance] = useState("")
    const [mood, setMood] = useState("")

    const { addDinerForm } = useFormContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addDinerForm({
            name, 
            cusines: selectedCuisines,
            budget,
            distance,
            mood,
        });
        navigate(`/room/${roomId}/lobby`)
    }

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

    const moodOptions = [
        { value: "excited", label: "Excited! 🎉", emoji: "🎉" },
        { value: "hungry", label: "Hungry! 🍕", emoji: "🍕" },
        { value: "casual", label: "Casual 😊", emoji: "😊" },
        { value: "fancy", label: "Fancy! ✨", emoji: "✨" },
        { value: "adventurous", label: "Adventurous! 🌟", emoji: "🌟" }
    ];

    const travelRange = [
    { value: "nearby", label: "Nearby, I'm tired.", icon: "🏠" },
    { value: "moderate", label: "Not too far, but willing to travel a bit!", icon: "🚗" },
    { value: "far", label: "Far!", icon: "✈️" },
    ]

  const budgetOptions = [
    {value: "$", label: "$", description: "Budget-friendly"},
    {value: "$$", label: "$$", description: "Moderate"},
    {value: "$$$", label: "$$$", description: "Upscale"},
    {value: "$$$$", label: "$$$$", description: "Fine Dining"}
  ]

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines((prev) => {
        return prev.includes(cuisine)
            ? prev.filter((c) => c !== cuisine) 
            : [...prev, cuisine];
    })
  }

    return (
        <div className={styles.preferenceInputPage}>
            <div className={styles.header}>
                <div className={styles.lobbyPINcontainer}>
                    <span className={styles.lobbyPINlabel}>Room Code:</span>
                    <span className={styles.lobbyPINnumber}>{roomId}</span>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <h2 className={styles.title}>Tell us about your dinner vibe! 🍽️</h2>
                    <p className={styles.subtitle}>We'll use this info to recommend a place that everyone will love.</p>
                </div>

                 <div className={styles.formContainer}>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>
                                What's your name?
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className={styles.textInput}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>What's your mood?</label>
                            <div className={styles.moodOptions}>
                                {moodOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setMood(option.value)}
                                    className={`${styles.moodButton} ${mood === option.value ? styles.moodButtonActive : ""}`}
                                >
                                    <span className={styles.moodEmoji}>{option.emoji}</span>
                                    <span className={styles.moodLabel}>{option.label}</span>
                                </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <fieldset className={styles.fieldset}>
                                <legend className={styles.legend}>Which cuisines are you in the mood for?</legend>
                                <div className={styles.cuisineGrid}>
                                {cuisineArr.map((cuisine) => (
                                    <label key={cuisine} className={styles.cuisineOption}>
                                    <input
                                        type="checkbox"
                                        name="cuisine"
                                        value={cuisine}
                                        checked={selectedCuisines.includes(cuisine)}
                                        onChange={() => handleCuisineChange(cuisine)}
                                        className={styles.cuisineCheckbox}
                                    />
                                    <span className={styles.cuisineLabel}>{cuisine}</span>
                                    </label>
                                ))}
                                </div>
                            </fieldset>
                        </div>
                            
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>What's your budget?</label>
                            <div className={styles.budgetOptions}>
                                {budgetOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setBudget(option.value)}
                                    className={`${styles.budgetButton} ${budget === option.value ? styles.budgetButtonActive : ""}`}
                                >
                                    <span className={styles.budgetSymbol}>{option.label}</span>
                                    <span className={styles.budgetDescription}>{option.description}</span>
                                </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="distanceSelect" className={styles.label}>
                                How far are you willing to travel?
                            </label>
                            <div className={styles.distanceOptions}>
                                {travelRange.map((option) => (
                                <label key={option.value} className={styles.distanceOption}>
                                    <input
                                    type="radio"
                                    name="distance"
                                    value={option.value}
                                    checked={distance === option.value}
                                    onChange={(e) => setDistance(e.target.value)}
                                    className={styles.distanceRadio}
                                    />
                                    <div className={styles.distanceContent}>
                                    <span className={styles.distanceIcon}>{option.icon}</span>
                                    <span className={styles.distanceLabel}>{option.label}</span>
                                    </div>
                                </label>
                                ))}
                            </div>
                        </div>

                        <button className={styles.submitButton} onClick={handleSubmit} type="button">Add Your Preferences</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PreferenceInputPage;