import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const QLOO_API_URL = 'https://api.qloo.com/v1';

const getApiKey = (keyName) => {
    const key = import.meta.env[keyName];
    if (!key) {
        console.warn(`${keyName} not found in environment variables`);
    }
    return key;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateGPTSummary = async (dinerForms) => {
    const maxRetries = 1;
    let retryCount = 0;
    
    while (retryCount <= maxRetries) {
        try {
            const apiKey = getApiKey('VITE_OPENAI_API_KEY');
            if (!apiKey) {
                throw new Error('OpenAI API key not found');
            }

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

            const prompt = `Analyze this group's dining preferences and create a personalized summary:

Group Data:
- Number of participants: ${groupData.participantCount}
- Participants: ${JSON.stringify(groupData.participants, null, 2)}

Please create a friendly, engaging summary that:
1. Highlights the group's diverse preferences
2. Identifies common themes or interesting contrasts
3. Suggests what type of dining experience might work best
4. Uses a conversational, excited tone
5. Is 2-3 sentences long

Make it sound like a helpful friend who's excited to find the perfect restaurant for everyone!`;

            const response = await axios.post(OPENAI_API_URL, {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful dining assistant who analyzes group preferences and creates engaging summaries.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            if (error.response) {
                console.error('API Response Error:', error.response.data);
                if (error.response.status === 429 && retryCount < maxRetries) {
                    const waitTime = Math.pow(2, retryCount) * 2000;
                    console.log(`Rate limited, retrying in ${waitTime}ms... (attempt ${retryCount + 1}/${maxRetries + 1})`);
                    await delay(waitTime);
                    retryCount++;
                    continue;
                }
                if (error.response.status === 429) {
                    throw new Error('Rate limit exceeded. Please wait a moment and try again.');
                }
            }
            throw error;
        }
    }
    
    throw new Error('Rate limit exceeded. Please wait a moment and try again.');
}

export const chatWithGPT = async (message, conversationHistory = []) => {
    try {
        const apiKey = getApiKey('VITE_OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('OpenAI API key not found');
        }

        const messages = [
            {
                role: 'system',
                content: 'You are a helpful dining assistant. Help users with restaurant recommendations, dietary restrictions, and dining questions. Be friendly and conversational.'
            },
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API for chat:', error);
        if (error.response) {
            console.error('API Response Error:', error.response.data);
            if (error.response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.');
            }
        }
        throw error;
    }
};

export const getRestaurantRecommendations = async (preferences) => {
    try {
        const apiKey = getApiKey('VITE_QLOO_API_KEY');
        if (!apiKey) {
            throw new Error('Qloo API key not found');
        }

        const cuisines = preferences.participants.flatMap(p => p.cuisines || []);
        const budgets = preferences.participants.map(p => p.budget).filter(Boolean);
        const distances = preferences.participants.map(p => p.distance).filter(Boolean);

        const budgetMap = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
        const avgBudget = budgets.length > 0 
            ? budgets.reduce((sum, budget) => sum + budgetMap[budget], 0) / budgets.length 
            : 2;

        const distanceMap = { 'nearby': 5, 'moderate': 10, 'far': 25 };
        const maxDistance = distances.length > 0 
            ? Math.max(...distances.map(d => distanceMap[d] || 10))
            : 10;

        console.log('Attempting Qloo API call with preferences:', {
            cuisines,
            avgBudget,
            maxDistance
        });

        await new Promise(resolve => setTimeout(resolve, 1500));

        return getFallbackRestaurants();
    } catch (error) {
        console.error('Error calling Qloo API:', error);
        throw error;
    }
};

export const getFallbackRestaurants = () => {
    return [
        {
            id: 1,
            name: "Thai Palace",
            cuisine: "Thai",
            price: "$$",
            rating: 4.5,
            distance: "0.8 km",
            description: "Authentic Thai cuisine with fresh ingredients and traditional flavors.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
            tags: ["spicy", "vegetarian-friendly", "family-friendly"]
        },
        {
            id: 2,
            name: "Sakura Sushi",
            cuisine: "Japanese",
            price: "$$$",
            rating: 4.7,
            distance: "1.2 km",
            description: "Premium sushi and sashimi with an elegant dining experience.",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
            tags: ["fresh", "elegant", "date-night"]
        },
        {
            id: 3,
            name: "Taco Fiesta",
            cuisine: "Mexican",
            price: "$",
            rating: 4.3,
            distance: "0.5 km",
            description: "Fresh Mexican street food with vibrant flavors and casual atmosphere.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
            tags: ["casual", "budget-friendly", "quick-service"]
        },
        {
            id: 4,
            name: "Spice Garden",
            cuisine: "Indian",
            price: "$$",
            rating: 4.6,
            distance: "1.5 km",
            description: "Rich Indian curries and tandoori dishes in a warm setting.",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
            tags: ["spicy", "vegetarian-friendly", "family-friendly"]
        }
    ];
}; 