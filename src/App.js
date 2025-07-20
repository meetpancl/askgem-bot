import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import geminiService from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ConversationManager from './components/ConversationManager';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm **AskGem**, your AI assistant powered by Google Gemini. I can help you with:\n\n• **Questions & Answers** - Ask me anything!\n• **Code Examples** - I can write and explain code\n• **Creative Writing** - Stories, poems, ideas\n• **Problem Solving** - Let's work through challenges together\n\nHow can I help you today? 🚀",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyMessage = (text) => {
    // Optional: Show a toast notification
    console.log('Message copied to clipboard');
  };

  const handleRegenerateResponse = async (messageId) => {
    // Find the message to regenerate and get the previous user message
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.sender === 'user') {
        setIsLoading(true);

        try {
          const botResponse = await geminiService.generateResponse(previousUserMessage.text);

          const newMessage = {
            id: Date.now(),
            text: botResponse,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };

          // Replace the old bot message with new one
          setMessages(prev => [
            ...prev.slice(0, messageIndex),
            newMessage,
            ...prev.slice(messageIndex + 1)
          ]);
        } catch (error) {
          console.error('Error regenerating response:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm **AskGem**, your AI assistant powered by Google Gemini. I can help you with:\n\n• **Questions & Answers** - Ask me anything!\n• **Code Examples** - I can write and explain code\n• **Creative Writing** - Stories, poems, ideas\n• **Problem Solving** - Let's work through challenges together\n\nHow can I help you today? 🚀",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    geminiService.clearHistory();
  };

  const handleExportChat = () => {
    const chatContent = messages.map(msg =>
      `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : 'AskGem'}: ${msg.text}`
    ).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `askgem-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      // Get response from Gemini
      const botResponse = await geminiService.generateResponse(currentInput);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">🤖</div>
            <div className="bot-info">
              <h2>AskGem</h2>
              <p>Powered by Google Gemini</p>
            </div>
            <ConversationManager
              onNewChat={handleNewChat}
              onExportChat={handleExportChat}
              messageCount={messages.length}
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCopy={handleCopyMessage}
              onRegenerate={handleRegenerateResponse}
            />
          ))}
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="bot-avatar-small">🤖</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="send-button"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;