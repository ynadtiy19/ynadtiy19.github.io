
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import UserMessage from '@/components/UserMessage';
import AIMessage from '@/components/AIMessage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  responseCard?: {
    imageUrl: string;
    title: string;
    description: string;
  };
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "The Amazon River, spanning around 4,345 miles (7,062 kilometers), competes closely with the Nile for the title of the world's longest river, depending on measurement methods.",
        sender: 'ai',
        responseCard: {
          imageUrl: 'https://source.unsplash.com/random/800x600/?amazon,river',
          title: 'The Amazon River',
          description: 'The Amazon River, spanning around 4,345 miles (7,062 kilometers), competes closely with the Nile for the title of the world\'s longest river, depending on measurement methods.'
        }
      };
      
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen chat-gradient">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg">Ask me anything!</p>
              <p className="text-sm">Type a message to start a conversation</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            message.sender === 'user' ? (
              <UserMessage key={message.id} message={message.text} />
            ) : (
              <AIMessage 
                key={message.id} 
                message={message.text} 
                responseCard={message.responseCard}
              />
            )
          ))
        )}
        
        {isProcessing && <AIMessage isProcessing={true} />}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default Index;
