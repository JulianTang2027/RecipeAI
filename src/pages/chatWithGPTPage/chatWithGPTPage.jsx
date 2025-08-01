import { useState, useRef, useEffect } from 'react';
import styles from './chatWithGPTPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Send, ArrowLeft, RefreshCw } from "lucide-react";
import { chatWithGPT } from '../../utilities/api';

const ChatWithGPTPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Add welcome message
        setMessages([
            {
                id: 1,
                type: 'bot',
                content: "Hi! I'm your AI dining assistant. I can help you with follow-up questions about restaurants, suggest alternatives, or help you find specific types of food. What would you like to know?",
                timestamp: new Date()
            }
        ]);
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Call OpenAI API for chat response
            const conversationHistory = messages
                .filter(msg => msg.type === 'user' || msg.type === 'bot')
                .map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.content
                }));

            const botResponse = await chatWithGPT(inputMessage, conversationHistory);
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: botResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error getting GPT response:', error);
            // Fallback to mock response if API fails
            const botResponse = generateMockResponse(inputMessage);
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: botResponse,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateMockResponse = (userInput) => {
        const input = userInput.toLowerCase();
        
        if (input.includes('thai') || input.includes('spicy')) {
            return "I can recommend several great Thai restaurants! Thai Palace is popular for its authentic flavors, and Spice Garden offers a more upscale experience. Both have excellent vegetarian options. Would you like me to suggest more Thai places or help you find something similar?";
        } else if (input.includes('sushi') || input.includes('japanese')) {
            return "Sakura Sushi is our top Japanese recommendation with premium sushi and sashimi. They also have great vegetarian options and a beautiful dining atmosphere. Would you like me to suggest other Japanese restaurants or help you find something with similar vibes?";
        } else if (input.includes('mexican') || input.includes('taco')) {
            return "Taco Fiesta is perfect for casual Mexican dining with fresh street food. They have great vegetarian options and are very budget-friendly. Would you like me to suggest other Mexican places or help you find similar casual dining options?";
        } else if (input.includes('budget') || input.includes('cheap')) {
            return "For budget-friendly options, I'd recommend Taco Fiesta ($) or Burger Joint ($). Both offer great value for money. Would you like me to suggest more budget options or help you find something specific?";
        } else if (input.includes('fancy') || input.includes('upscale')) {
            return "For upscale dining, Sakura Sushi ($$$) offers an elegant experience with premium sushi. Le Petit Bistro ($$$) is also excellent for French cuisine. Would you like me to suggest more upscale options?";
        } else if (input.includes('vegetarian') || input.includes('vegan')) {
            return "Great vegetarian options include Thai Palace, Spice Garden, and Taco Fiesta - they all have excellent plant-based dishes. Would you like me to suggest more vegetarian-friendly restaurants?";
        } else if (input.includes('re-roll') || input.includes('different')) {
            return "I can help you find different restaurant suggestions! What type of cuisine are you in the mood for? I can suggest alternatives to the current options or help you explore new cuisines.";
        } else {
            return "I can help you with restaurant recommendations, dietary preferences, budget options, or finding specific types of cuisine. What would you like to know more about?";
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleBack = () => {
        navigate(`/room/${roomId}/suggestions`);
    };

    return (
        <div className={styles.chatWithGPTPage}>
            <div className={styles.header}>
                <button onClick={handleBack} className={styles.backBtn}>
                    <ArrowLeft className={styles.backIcon} />
                    Back to Suggestions
                </button>
                <div className={styles.roomInfo}>
                    <span className={styles.roomLabel}>Room Code:</span>
                    <span className={styles.roomCode}>{roomId}</span>
                </div>
            </div>
            
            <div className={styles.chatContainer}>
                <div className={styles.messagesContainer}>
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`${styles.message} ${styles[message.type]}`}
                        >
                            <div className={styles.messageContent}>
                                {message.content}
                            </div>
                            <div className={styles.messageTimestamp}>
                                {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className={`${styles.message} ${styles.bot}`}>
                            <div className={styles.typingIndicator}>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                <div className={styles.inputContainer}>
                    <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me about restaurants, dietary preferences, or request different suggestions..."
                        className={styles.messageInput}
                        disabled={isLoading}
                        rows={1}
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className={styles.sendBtn}
                    >
                        <Send className={styles.sendIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWithGPTPage; 