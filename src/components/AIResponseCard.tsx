
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface AIResponseCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const AIResponseCard: React.FC<AIResponseCardProps> = ({ imageUrl, title, description }) => {
  return (
    <Card className="w-full overflow-hidden">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-32 object-cover"
        />
        <Button 
          variant="secondary"
          size="sm"
          className="absolute left-2 bottom-2 bg-white/80 hover:bg-white/90 text-gray-800 text-xs px-3 py-1 h-auto"
        >
          <Share2 className="h-3 w-3 mr-1" />
          Share
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AIResponseCard;
