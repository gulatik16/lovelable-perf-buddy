import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PerformanceReviewSchedulingProps {
  employeeName: string;
  onComplete: () => void;
  onBack: () => void;
}

export const PerformanceReviewScheduling = ({ 
  employeeName, 
  onComplete, 
  onBack 
}: PerformanceReviewSchedulingProps) => {
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [message, setMessage] = useState(
    `Hi ${employeeName},\n\nYour performance review has been completed and approved. I'd like to schedule a meeting to discuss the review in detail and share some insights from my end.\n\nPlease confirm your availability for the proposed time, or suggest an alternative that works better for you.\n\nBest regards`
  );
  const [isNotificationSent, setIsNotificationSent] = useState(false);
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!meetingDate || !meetingTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for the meeting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending notification
    setTimeout(() => {
      setIsNotificationSent(true);
      toast({
        title: "Notification Sent",
        description: `Meeting invitation sent to ${employeeName} successfully.`,
      });
    }, 1000);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (isNotificationSent) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-success">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <CardTitle className="text-2xl">Notification Sent Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Meeting invitation has been sent to <strong>{employeeName}</strong> for the performance review discussion.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Scheduled:</strong> {new Date(meetingDate).toLocaleDateString()} at {meetingTime}
                </p>
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <Button variant="outline" onClick={onBack}>
                  Schedule Another
                </Button>
                <Button onClick={handleComplete}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">Schedule Performance Review Meeting</h1>
          <p className="text-muted-foreground mt-2">
            Send a meeting invitation to {employeeName} to discuss their performance review
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Performance Review Discussion - {employeeName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Meeting Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Meeting Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Meeting Invitation Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Meeting Agenda</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review performance insights and observations</li>
                <li>• Discuss your self-submitted feedback in detail</li>
                <li>• Set goals and development plans for the upcoming period</li>
                <li>• Address any questions or concerns</li>
              </ul>
            </div>

            <Button 
              onClick={handleSendNotification} 
              className="w-full"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Meeting Invitation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};