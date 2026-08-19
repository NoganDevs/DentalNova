// import PageTemplate from '@/components/TransparentGlass'; // add this line in page.tsx or layout.tsx, then render <TransparentGlass />

'use client';
import React from 'react';
import Image from 'next/image';
import './style.css';
import AiConfig from './js/ai-config';
import Chat from './js/chat';
import Script from './js/script';

export default function TransparentGlass() {
  return (
    <>
      {/* Extension Launcher Component */}
      <div id="chat-launcher-wrapper">
        <button id="chat-launcher" aria-label="Open Chat">
          <Image src="/icons/chatbot.png" alt="Chat" width={28} height={28} className="launcher-icon" />
        </button>
      </div>

      {/* Main Chat Window */}
      <div id="chat-window" className="chat-window-hidden" aria-hidden="true">
        {/* Dynamic Glass Header */}
        <header className="chat-header">
          <div className="chat-brand">
            <div className="chat-avatar-frame">
              <Image src="/icons/chatbot.png" alt="Assistant" width={32} height={32} className="chat-header-icon" />
            </div>
            <div className="chat-brand-details">
              <span className="chat-header-text">Assistant</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-header-btn" id="chat-refresh-btn" title="Restart conversation">
              <Image src="/icons/refresh.png" alt="Reset" width={20} height={20} className="header-icon" />
            </button>
            <button className="chat-close-btn" id="chat-close-btn" aria-label="Close panel">
              <Image src="/icons/close.png" alt="Close" width={20} height={20} className="header-icon" />
            </button>
          </div>
        </header>

        {/* Scrollable Messages Area */}
        <main className="chat-messages-body" id="chat-messages">
          <div className="chat-date-divider">
            <span>Today</span>
          </div>

          {/* Assistant Welcome Message Card */}
          <div className="message-group message-bot">
            <div className="message-avatar-wrapper">
              <Image src="/icons/chatbot.png" alt="" width={28} height={28} className="message-avatar" />
            </div>
            <div className="message-flow">
              <div className="message-card">
                Hey there! 👋 How can I help you today?
              </div>
              {/* Quick Action Suggestion Chips */}
              <div className="quick-prompts">
                <button className="prompt-chip">✨ What can you do?</button>
                <button className="prompt-chip">⚡ Quick Tour</button>
              </div>
              <span className="message-time" id="chat-welcome-time"></span>
            </div>
          </div>

          {/* Typing Indicator Wave */}
          <div className="message-group message-bot" id="chat-typing-indicator" style={{ display: 'none' }}>
            <div className="message-avatar-wrapper">
              <Image src="/icons/chatbot.png" alt="" width={28} height={28} className="message-avatar" />
            </div>
            <div className="message-flow">
              <div className="message-card typing-card">
                <span className="wave-dot"></span>
                <span className="wave-dot"></span>
                <span className="wave-dot"></span>
              </div>
            </div>
          </div>
        </main>

        {/* Dynamic Floating Input Container */}
        <footer className="chat-input-wrapper">
          <div className="chat-input-card">
            <textarea
              id="chat-textarea"
              className="chat-textarea"
              placeholder="Type a message..."
              rows={1}
            ></textarea>
            <div className="chat-input-dock">
              <div className="dock-left">
                <button type="button" className="dock-btn" title="Add Attachment">
                  <Image src="/icons/attachment.png" alt="Attach" width={20} height={20} className="dock-icon" />
                </button>
              </div>
              <button type="button" className="chat-send-btn" id="chat-send-btn" title="Send">
                <span className="send-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </footer>
      </div>

      <AiConfig />
      <Chat />
      <Script />
    </>
  );
}