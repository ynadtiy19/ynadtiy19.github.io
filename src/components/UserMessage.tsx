
import React from 'react';

interface UserMessageProps {
  message: string;
  isSelf: boolean;
  timestamp: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message, isSelf, timestamp }) => {
  const formattedTime = new Date(parseInt(timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className={`flex mb-4 ${isSelf ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isSelf ? 'bg-primary text-white rounded-2xl rounded-tr-none' : 'bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none'} px-4 py-2 max-w-[80%]`}>
        <p>{message}</p>
        <p className="text-xs mt-1 opacity-70">{formattedTime}</p>
      </div>
    </div>
  );
};

export default UserMessage;
