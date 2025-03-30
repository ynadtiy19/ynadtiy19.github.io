
import React from 'react';

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-primary text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;
