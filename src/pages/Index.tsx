
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
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const apiUrl = "https://getpantry.cloud/apiv1/pantry/2fbe822d-f24a-4c50-9218-636436f98e40/basket/ynadtiyuser";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 清除轮询定时器
  const clearPollTimeout = () => {
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  };

  // 设置轮询
  const schedulePoll = (delay: number) => {
    clearPollTimeout();
    pollTimeoutRef.current = setTimeout(() => {
      fetchMessages();
    }, delay);
  };

  // 函数获取消息
  const fetchMessages = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      // 提取消息
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
      
      // 按时间戳排序
      parsedMessages.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
      setMessages(parsedMessages);
      
      // 设置30秒后再次轮询
      schedulePoll(30000);
    } catch (error) {
      console.error("获取消息错误:", error);
      // 如果获取失败，5秒后重试
      schedulePoll(5000);
    }
  };

  // 初始加载时获取消息
  useEffect(() => {
    fetchMessages();
    
    // 组件卸载时清除定时器
    return () => clearPollTimeout();
  }, []);

  const handleSendMessage = async (messageText: string) => {
    setIsProcessing(true);
    
    try {
      // 创建时间戳
      const timestamp = Date.now().toString();
      
      // 创建只包含新消息的对象
      const newMessageKey = `${timestamp}-${userRole}`;
      const messageData = {
        hui: {
          [newMessageKey]: messageText
        }
      };
      
      // 发送PUT请求
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });
      
      if (!response.ok) {
        throw new Error('发送消息失败');
      }
      
      // 更新本地消息
      const newMessage: Message = {
        timestamp,
        sender: userRole,
        message: messageText
      };
      
      setMessages(prev => [...prev, newMessage].sort((a, b) => 
        parseInt(a.timestamp) - parseInt(b.timestamp)
      ));
      
      // 3秒后获取一次最新消息
      clearPollTimeout();
      schedulePoll(3000);
      
    } catch (error) {
      console.error("发送消息错误:", error);
      toast({
        title: "错误",
        description: "发送消息失败，请重试。",
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
              <p className="text-lg">暂无消息</p>
              <p className="text-sm">以 {userRole === 'sender' ? '发送者' : '接收者'} 身份开始对话</p>
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
