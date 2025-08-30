import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSendMessage, disabled, placeholder = "Type your message..." }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
            <Smile className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="pr-12 py-3 rounded-2xl border-2 focus:border-primary/50 transition-colors"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={!message.trim() || disabled}
          className="rounded-xl px-4 py-3 bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};