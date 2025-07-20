import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    if (!this.apiKey) {
      console.error('Gemini API key not found. Please check your .env file.');
      return;
    }

    // Initialize the Gemini AI
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    
    // Get the generative model
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" // Using the latest Gemini model
    });

    // Chat history to maintain context
    this.chatHistory = [];
  }

  async generateResponse(userMessage) {
    try {
      // Check if API key is available
      if (!this.apiKey) {
        throw new Error('API key not configured');
      }

      // Add user message to chat history
      this.chatHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
      });

      // Start a chat session with history
      const chat = this.model.startChat({
        history: this.chatHistory.slice(0, -1), // All messages except the current one
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      // Send the message and get response
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const botReply = response.text();

      // Add bot response to chat history
      this.chatHistory.push({
        role: "model",
        parts: [{ text: botReply }]
      });

      // Keep history manageable (last 20 messages)
      if (this.chatHistory.length > 20) {
        this.chatHistory = this.chatHistory.slice(-20);
      }

      return botReply;

    } catch (error) {
      console.error('Error generating response:', error);
      
      // Return different error messages based on the error type
      if (error.message.includes('API key')) {
        return "I'm having trouble with my configuration. Please check that the API key is set up correctly.";
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        return "I'm currently experiencing high demand. Please try again in a moment.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        return "I'm having trouble connecting right now. Please check your internet connection and try again.";
      } else {
        return "I apologize, but I encountered an unexpected error. Please try rephrasing your question.";
      }
    }
  }

  // Method to clear chat history if needed
  clearHistory() {
    this.chatHistory = [];
  }

  // Method to check if service is properly configured
  isConfigured() {
    return !!this.apiKey;
  }
}

// Create and export a single instance
const geminiService = new GeminiService();
export default geminiService;