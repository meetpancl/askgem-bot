import React, { useState } from 'react';

const ConversationManager = ({ onNewChat, onExportChat, messageCount }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleNewChat = () => {
    if (window.confirm('Start a new conversation? Current chat will be cleared.')) {
      onNewChat();
    }
    setShowMenu(false);
  };

  const handleExport = () => {
    onExportChat();
    setShowMenu(false);
  };

  return (
    <div className="conversation-manager">
      <button 
        className="menu-toggle"
        onClick={() => setShowMenu(!showMenu)}
        title="Chat options"
      >
        ⋮
      </button>
      
      {showMenu && (
        <div className="chat-menu">
          <button className="menu-item" onClick={handleNewChat}>
            🆕 New Chat
          </button>
          <button className="menu-item" onClick={handleExport}>
            📥 Export Chat
          </button>
          <div className="menu-divider"></div>
          <div className="menu-info">
            {messageCount} messages
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationManager;