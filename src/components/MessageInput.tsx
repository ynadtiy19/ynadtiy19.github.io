
import React, { useState } from 'react';
import { Mic, Send, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input-gradient p-3 border-t rounded-b-xl sticky bottom-0 w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入消息..."
          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          disabled={isProcessing}
        />
        
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          disabled={!message.trim() || isProcessing}
          className="rounded-full text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Send className="h-5 w-5" />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
