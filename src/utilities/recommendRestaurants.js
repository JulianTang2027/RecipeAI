const mockRestaurants = [
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
    },
    {
        id: 5,
        name: "Bella Italia",
        cuisine: "Italian",
        price: "$$",
        rating: 4.4,
        distance: "1.0 km",
        description: "Classic Italian dishes with homemade pasta and wood-fired pizzas.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        tags: ["romantic", "family-friendly", "date-night"]
    },
    {
        id: 6,
        name: "Le Petit Bistro",
        cuisine: "French",
        price: "$$$",
        rating: 4.8,
        distance: "2.0 km",
        description: "Elegant French cuisine with sophisticated flavors and intimate atmosphere.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
        tags: ["elegant", "romantic", "special-occasion"]
    },
    {
        id: 7,
        name: "Golden Dragon",
        cuisine: "Chinese",
        price: "$$",
        rating: 4.2,
        distance: "0.7 km",
        description: "Traditional Chinese dishes with dim sum and Peking duck.",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        tags: ["family-friendly", "large-groups", "traditional"]
    },
    {
        id: 8,
        name: "Burger Joint",
        cuisine: "American",
        price: "$",
        rating: 4.1,
        distance: "0.3 km",
        description: "Gourmet burgers and craft beers in a casual setting.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        tags: ["casual", "budget-friendly", "quick-service"]
    }
];

export const getRecommendations = (dinerForms) => {
    if (!dinerForms || dinerForms.length === 0) {
        return mockRestaurants.slice(0, 4);
    }

    const allCuisines = dinerForms.flatMap(diner => diner.cusines || []);
    const allBudgets = dinerForms.map(diner => diner.budget).filter(Boolean);
    const allDistances = dinerForms.map(diner => diner.distance).filter(Boolean);

    const restaurantScores = mockRestaurants.map(restaurant => {
        let score = 0;
        
        if (allCuisines.length > 0) {
            if (allCuisines.includes(restaurant.cuisine)) {
                score += 10;
            }
        }
        
        if (allBudgets.length > 0) {
            const avgBudgetLength = allBudgets.reduce((sum, budget) => sum + budget.length, 0) / allBudgets.length;
            const restaurantBudgetLength = restaurant.price.length;
            
            if (Math.abs(restaurantBudgetLength - avgBudgetLength) <= 1) {
                score += 8;
            } else if (Math.abs(restaurantBudgetLength - avgBudgetLength) <= 2) {
                score += 4;
            }
        }
        
        if (allDistances.length > 0) {
            const hasNearby = allDistances.includes('nearby');
            const hasModerate = allDistances.includes('moderate');
            const hasFar = allDistances.includes('far');
            
            const distance = parseFloat(restaurant.distance);
            if (distance <= 1 && hasNearby) score += 5;
            else if (distance <= 2 && hasModerate) score += 5;
            else if (distance > 2 && hasFar) score += 5;
        }
        
        score += restaurant.rating * 2;
        
        return { ...restaurant, score };
    });

    return restaurantScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ score, ...restaurant }) => restaurant);
};

export const generateGroupSummary = (dinerForms) => {
    if (!dinerForms || dinerForms.length === 0) {
        return "No diners have joined the group yet.";
    }

    const allCuisines = dinerForms.flatMap(diner => diner.cusines || []);
    const allBudgets = dinerForms.map(diner => diner.budget).filter(Boolean);
    const allDistances = dinerForms.map(diner => diner.distance).filter(Boolean);

    const uniqueCuisines = [...new Set(allCuisines)];
    const uniqueBudgets = [...new Set(allBudgets)];
    const uniqueDistances = [...new Set(allDistances)];

    let summary = `Your group of ${dinerForms.length} diners has diverse preferences! `;

    if (uniqueCuisines.length > 0) {
        summary += `The group is interested in ${uniqueCuisines.length > 1 ? uniqueCuisines.slice(0, -1).join(', ') + ' and ' + uniqueCuisines.slice(-1) : uniqueCuisines[0]} cuisine. `;
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

    summary += "We'll find restaurants that balance everyone's preferences!";

    return summary;
};