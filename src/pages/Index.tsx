
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import UserMessage from '@/components/UserMessage';
import { toast } from '@/hooks/use-toast';

interface Message {
  timestamp: string;
  sender: 'sender' | 'receiver';
  message: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userRole, setUserRole] = useState<'sender' | 'receiver'>('sender');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://getpantry.cloud/apiv1/pantry/2fbe822d-f24a-4c50-9218-636436f98e40/basket/ynadtiyuser";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      // Extract messages
      const messagesData = data.hui || {};
      const parsedMessages: Message[] = [];
      
      for (const key in messagesData) {
        const [timestamp, sender] = key.split('-');
        parsedMessages.push({
          timestamp,
          sender: sender as 'sender' | 'receiver',
          message: messagesData[key]
        });
      }
      
      // Sort by timestamp
      parsedMessages.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
      setMessages(parsedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Initial fetch and setup polling
  useEffect(() => {
    fetchMessages();
    
    // Poll for new messages every 3 seconds
    const intervalId = setInterval(fetchMessages, 3000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSendMessage = async (messageText: string) => {
    setIsProcessing(true);
    
    try {
      // Create timestamp
      const timestamp = Date.now().toString();
      
      // Create the message object with only the new message
      const newMessageKey = `${timestamp}-${userRole}`;
      const messageData = {
        hui: {
          [newMessageKey]: messageText
        }
      };
      
      // Send PUT request with only the new message
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Update local messages
      const newMessage: Message = {
        timestamp,
        sender: userRole,
        message: messageText
      };
      
      setMessages(prev => [...prev, newMessage].sort((a, b) => 
        parseInt(a.timestamp) - parseInt(b.timestamp)
      ));
      
      // Fetch messages to ensure we have the most up-to-date state
      fetchMessages();
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRoleChange = (role: 'sender' | 'receiver') => {
    setUserRole(role);
  };

  return (
    <div className="flex flex-col h-screen chat-gradient">
      <ChatHeader role={userRole} onRoleChange={handleRoleChange} />
      
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start a conversation as {userRole}</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <UserMessage 
              key={`${message.timestamp}-${index}`}
              message={message.message} 
              isSelf={message.sender === userRole}
              timestamp={message.timestamp}
            />
          ))
        )}
        
        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default Index;
