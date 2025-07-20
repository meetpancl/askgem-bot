import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message, onCopy, onRegenerate }) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      if (onCopy) onCopy(message.text);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) onRegenerate(message.id);
  };

  return (
    <div 
      className={`message ${message.sender}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="message-content">
        {message.sender === 'bot' ? (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.text}
          </ReactMarkdown>
        ) : (
          <p>{message.text}</p>
        )}
        
        <div className="message-meta">
          <span className="timestamp">{message.timestamp}</span>
          {showActions && (
            <div className="message-actions">
              <button 
                className={`action-btn copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                title="Copy message"
              >
                {copied ? '✓' : '📋'}
              </button>
              {message.sender === 'bot' && (
                <button 
                  className="action-btn regenerate-btn"
                  onClick={handleRegenerate}
                  title="Regenerate response"
                >
                  🔄
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {message.sender === 'bot' && (
        <div className="bot-avatar-small">🤖</div>
      )}
    </div>
  );
};

export default ChatMessage;