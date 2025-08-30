import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  typing?: boolean;
  buttons?: Array<{
    text: string;
    action: string;
    variant?: "default" | "outline" | "secondary";
  }>;
  integrations?: Array<{
    name: string;
    status: "connected" | "pending" | "error";
    icon: string;
  }>;
}

interface ChatMessageProps {
  message: Message;
  onButtonClick: (action: string) => void;
}

export const ChatMessage = ({ message, onButtonClick }: ChatMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (message.type === "bot") {
    return (
      <div className={`flex gap-3 mb-6 animate-slide-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Avatar className="w-8 h-8 bg-gradient-bot border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-bot text-white text-sm font-bold">
            RG
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">ReviewGenie</span>
            <Badge variant="secondary" className="text-xs">AI Assistant</Badge>
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          </div>
          
          <div className="bg-card border rounded-2xl rounded-tl-md p-4 shadow-sm max-w-2xl">
            {message.typing ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>ReviewGenie is typing</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-primary rounded-full typing-indicator"></div>
                  <div className="w-2 h-2 bg-primary rounded-full typing-indicator"></div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                
                {message.integrations && (
                  <div className="mt-4 space-y-2">
                    {message.integrations.map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{integration.icon}</span>
                          <span className="font-medium text-sm">{integration.name}</span>
                        </div>
                        <Badge 
                          variant={integration.status === "connected" ? "default" : 
                                   integration.status === "pending" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                
                {message.buttons && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant={button.variant || "outline"}
                        size="sm"
                        onClick={() => onButtonClick(button.action)}
                        className="text-sm"
                      >
                        {button.text}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-6 justify-end animate-slide-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex-1 space-y-2 max-w-2xl">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          <span className="font-semibold text-sm">You</span>
        </div>
        
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md p-4 ml-auto max-w-fit">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
      
      <Avatar className="w-8 h-8 bg-secondary">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
          You
        </AvatarFallback>
      </Avatar>
    </div>
  );
};