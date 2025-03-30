
import React from 'react';
import { ThumbsUp, ThumbsDown, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIResponseCard from './AIResponseCard';

interface AIMessageProps {
  message?: string;
  isProcessing?: boolean;
  responseCard?: {
    imageUrl: string;
    title: string;
    description: string;
  };
}

const AIMessage: React.FC<AIMessageProps> = ({ 
  message, 
  isProcessing = false,
  responseCard
}) => {
  if (isProcessing) {
    return (
      <div className="flex mb-4">
        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
            </div>
            <span className="ml-2">Searching for answer...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mb-4">
      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
        {message && <p className="text-gray-800 mb-3">{message}</p>}
        
        {responseCard && (
          <div className="mb-3">
            <AIResponseCard 
              imageUrl={responseCard.imageUrl}
              title={responseCard.title}
              description={responseCard.description}
            />
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <ThumbsUp className="h-4 w-4 text-gray-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <ThumbsDown className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <Repeat className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
