
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ChatHeaderProps {
  role: 'sender' | 'receiver';
  onRoleChange: (role: 'sender' | 'receiver') => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ role, onRoleChange }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            {role === 'sender' ? 'Sender' : 'Receiver'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onRoleChange('sender')}>
            Sender
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleChange('receiver')}>
            Receiver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatHeader;
