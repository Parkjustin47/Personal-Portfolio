'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'

export default function ChatBot({ onExpand, typingReady }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [placeholder, setPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [botIsTyping, setBotIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const chatMessagesRef = useRef(null)
  const fullText = "Ask anything about Justin!"
  const { isDarkMode } = useTheme()

  // Simple markdown parser for basic formatting
  const parseMessage = (text) => {
    if (!text) return text
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to bold
      .replace(/^---$/gm, '<div class="message-separator"></div>') // Replace --- with separator
  }

  useEffect(() => {
    if (!typingReady) {
      setPlaceholder('')
      setIsTyping(true)
      return
    }
    
    let currentIndex = 0
    setPlaceholder('')
    setIsTyping(true)
    
    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setPlaceholder(fullText.slice(0, currentIndex))
        currentIndex++
        setTimeout(typeText, 30)
      } else {
        setIsTyping(false)
      }
    }
    
    typeText()
  }, [typingReady])

  useEffect(() => {
    scrollToBottom()
    if (onExpand) onExpand(messages.length > 0)
  }, [messages, onExpand])
  
  useEffect(() => {
    if (botIsTyping) {
      scrollToBottom()
    }
  }, [botIsTyping])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatMessages = messagesEndRef.current.closest('.chat-messages')
      if (chatMessages) {
        setTimeout(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }, 50)
      }
    }
  }

  const scrollToTop = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = 0
    }
  }

  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current
      setShowScrollTop(scrollTop < scrollHeight - clientHeight - 50 && messages.length > 2)
    }
  }

  // Helper function to create message objects
  const createMessage = (text, isUser = false, id = null) => ({
    id: id || Date.now(),
    text,
    isUser,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const userMessage = createMessage(message, true)
      setMessages(prev => [...prev, userMessage])
      const userInput = message
      setMessage('')
      setBotIsTyping(true)
      
      setTimeout(async () => {
        try {
          const botResponseText = await getBotResponse(userInput)
          setBotIsTyping(false)
          const botMessage = createMessage(botResponseText, false, Date.now() + 1)
          setMessages(prev => [...prev, botMessage])
        } catch (error) {
          console.error('Error getting bot response:', error)
          setBotIsTyping(false)
          const errorMessage = createMessage("Sorry, I'm having trouble responding right now. Please try again!", false, Date.now() + 1)
          setMessages(prev => [...prev, errorMessage])
        }
      }, 800)
    }
  }

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.reply || "Sorry, I couldn't process your request right now.";
    } catch (error) {
      console.error('Chat API error:', error);
      // Fallback response when API fails
      return "I'm having trouble connecting right now, but I'd love to tell you about my projects, skills, and experience as Computer Science with Business Applications student at UC Riverside!";
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  // Style variables for consistency
  const colors = {
    primary: '#05d9e8',
    secondary: '#53c9c9',
    white: '#ffffff',
    whiteAlpha: (alpha) => `rgba(255, 255, 255, ${alpha})`,
    primaryAlpha: (alpha) => `rgba(5, 217, 232, ${alpha})`
  }

  return (
    <div className="chatbot-container">
      <style jsx>{`
        .chatbot-container {
          width: 100%;
          max-width: 750px;
          margin: 2rem auto 0 auto;
          padding: 0 1.5rem;
          position: relative;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          max-height: 50vh;
          overflow-y: auto;
        }
        
        
        .chatbot-wrapper {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)'};
          box-shadow: ${isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'};
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          width: 100%;
          min-height: 420px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }
        .chatbot-wrapper.empty {
          min-height: 180px;
        }
        @media (max-width: 900px) {
          .chatbot-wrapper.empty {
            min-height: 140px;
          }
        }
        @media (max-width: 600px) {
          .chatbot-wrapper.empty {
            min-height: 100px;
          }
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'};
          flex-shrink: 0;
        }
        .chat-title {
          color: #05d9e8;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .header-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .clear-button, .close-button {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
          padding: 0.5rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          font-family: 'Inter', Arial, sans-serif;
        }
        .clear-button:hover, .close-button:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'};
          color: ${isDarkMode ? '#ffffff' : '#000000'};
        }
        .close-button {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
          color: rgba(239, 68, 68, 0.9);
        }
        .close-button:hover {
          background: rgba(239, 68, 68, 0.3);
          color: #ffffff;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 0;
          max-height: 100%;
        }
        .chat-messages.empty {
          justify-content: center;
          align-items: center;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 3px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(83, 201, 201, 0.5);
          border-radius: 3px;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(83, 201, 201, 0.7);
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          max-width: 80%;
        }
        .message.user {
          flex-direction: row-reverse;
          align-self: flex-end;
        }
        .message.bot {
          align-self: flex-start;
        }
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .message.user .message-avatar {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          color: #ffffff;
        }
        .message.bot .message-avatar {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
          color: #05d9e8;
        }
        .message-content {
          flex: 1;
        }
        .message-bubble {
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
          white-space: pre-line;
        }
        .message-bubble strong {
          font-weight: 700;
          color: inherit;
        }
        .message.bot .message-bubble strong {
          color: #05d9e8;
        }
        .message.user .message-bubble {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          color: #ffffff;
          border-bottom-right-radius: 6px;
        }
        .message.bot .message-bubble {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          border-bottom-left-radius: 6px;
        }
        .message-time {
          font-size: 0.75rem;
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          margin-top: 0.25rem;
          text-align: right;
        }
        .message.bot .message-time {
          text-align: left;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
          text-align: center;
        }
        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #05d9e8;
        }
        .empty-state-text {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .empty-state-subtext {
          font-size: 0.9rem;
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.5)'};
          text-align: center;
        }
        .chatbot-form {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)'};
          position: relative;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 999px;
          padding: 0.75rem 3rem 0.75rem 1rem;
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          font-size: 1rem;
          font-family: 'Inter', Arial, sans-serif;
          outline: none;
          transition: all 0.3s ease;
          margin-right: 0.75rem;
        }
        .chatbot-input:focus {
          border-color: #05d9e8;
          box-shadow: 0 0 0 2px rgba(5, 217, 232, 0.1);
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.9)'};
        }
        .chatbot-input::placeholder {
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
          font-style: italic;
        }
        .submit-button {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
          flex-shrink: 0;
        }
        .submit-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(5, 217, 232, 0.5);
        }
        .submit-button:active {
          transform: scale(0.95);
        }
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .submit-button svg {
          width: 18px;
          height: 18px;
          color: #ffffff;
          transition: transform 0.3s ease;
        }
        .submit-button:hover svg {
          transform: translateX(2px);
        }
        .scroll-top-button {
          position: absolute;
          bottom: 6rem;
          right: 1rem;
          background: rgba(5, 217, 232, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
          box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
        }
        .scroll-top-button:hover {
          background: rgba(5, 217, 232, 1);
          transform: scale(1.1);
        }
        .scroll-top-button svg {
          width: 16px;
          height: 16px;
          color: #ffffff;
        }
        .message-separator {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          margin: 0.75rem 0;
          border: none;
        }
        .typing-cursor {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          border-radius: 16px;
          border-bottom-left-radius: 6px;
        }
        .typing-dots {
          display: flex;
          gap: 0.2rem;
        }
        .typing-dots span {
          width: 6px;
          height: 6px;
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
          border-radius: 50%;
          animation: typingDots 1.4s infinite ease-in-out;
        }
        .typing-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typingDots {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        /* Mobile Responsive */
        @media (max-width: 900px) {
          .chatbot-container {
            max-width: 98vw;
            padding: 0 0.5rem;
            min-height: 340px;
          }
          .chatbot-wrapper {
            min-height: 340px;
            max-height: 600px;
          }
          .message {
            max-width: 90%;
          }
          .chatbot-input {
            font-size: 0.95rem;
            padding: 0.65rem 2.5rem 0.65rem 0.9rem;
          }
          .submit-button {
            width: 36px;
            height: 36px;
          }
          .submit-button svg {
            width: 16px;
            height: 16px;
          }
        }
        @media (max-width: 600px) {
          .chatbot-container {
            max-width: 100vw;
            width: 98vw;
            padding: 0 0.25rem;
            min-height: 240px;
          }
          .chatbot-wrapper {
            min-height: 240px;
            max-height: 420px;
          }
          .chat-header {
            padding: 0.75rem 1rem;
          }
          .chatbot-form {
            padding: 0.75rem 1rem;
          }
          .message-bubble {
            padding: 0.65rem 0.85rem;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          .submit-button {
            width: 34px;
            height: 34px;
          }
          .submit-button svg {
            width: 14px;
            height: 14px;
          }
          .header-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }
          .clear-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div className={`chatbot-wrapper${messages.length === 0 ? ' empty' : ''}`}>
        <div className="chat-header">
          <h3 className="chat-title">Chat with Justin</h3>
          <div className="header-buttons">
            {messages.length > 0 && (
              <button onClick={clearChat} className="clear-button">
                Clear Chat
              </button>
            )}
          </div>
        </div>
        <div 
          ref={chatMessagesRef}
          className={`chat-messages ${messages.length === 0 ? 'empty' : ''}`}
          onScroll={handleScroll}
        >
          {messages.length === 0 ? (
            <div className="empty-state">
               <img src="/park1.svg" alt="Park Portfolio" className="empty-state-image" />
              <div className="empty-state-subtext">Ask me anything about my projects, experience, or interests!</div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                  <div className="message-avatar">
                    {msg.isUser ? 'U' : 'B'}
                  </div>
                  <div className="message-content">
                    <div 
                      className="message-bubble" 
                      dangerouslySetInnerHTML={{ __html: parseMessage(msg.text) }}
                    />
                    <div className="message-time">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
              {botIsTyping && (
                <div className="message bot">
                  <div className="message-avatar">B</div>
                  <div className="message-content">
                    <div className="message-bubble typing-indicator">
                      <span>Typing</span>
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {showScrollTop && (
          <button onClick={scrollToTop} className="scroll-top-button" title="Scroll to top">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        <form onSubmit={handleSubmit} className="chatbot-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder + (isTyping ? '|' : '')}
            className="chatbot-input"
          />
          <button type="submit" className="submit-button" disabled={!message.trim()}>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}