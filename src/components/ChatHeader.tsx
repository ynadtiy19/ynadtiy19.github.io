
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
      <h1 className="text-xl font-semibold text-gray-800">AI 聊天助手</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            {role === 'sender' ? '发送者' : '接收者'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onRoleChange('sender')}>
            发送者
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRoleChange('receiver')}>
            接收者
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatHeader;
