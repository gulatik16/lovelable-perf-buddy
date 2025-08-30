import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Users, Clock, Send } from "lucide-react";
import { PeerFeedback } from "@/types/ReviewCycle";
import { useToast } from "@/hooks/use-toast";

interface PeerFeedbackBotProps {
  employeeName: string;
  onFeedbackComplete: () => void;
}

export const PeerFeedbackBot = ({ employeeName, onFeedbackComplete }: PeerFeedbackBotProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState("collecting");
  const [feedbackData, setFeedbackData] = useState<PeerFeedback[]>([]);

  const mockPeers = [
    { name: "Jessica Wu", role: "Senior Developer", department: "Engineering" },
    { name: "David Kim", role: "Product Manager", department: "Product" },
    { name: "Maria Santos", role: "UX Designer", department: "Design" }
  ];

  const mockFeedback: PeerFeedback[] = [
    {
      id: "1",
      employeeId: "emp1",
      reviewerId: "peer1",
      sentiment: "positive",
      themes: ["technical expertise", "collaboration", "mentoring"],
      content: "Great technical skills and always willing to help team members learn new technologies. Very collaborative in code reviews.",
      anonymous: true,
      submittedAt: new Date()
    },
    {
      id: "2", 
      employeeId: "emp1",
      reviewerId: "peer2",
      sentiment: "positive",
      themes: ["communication", "project delivery", "initiative"],
      content: "Excellent communication skills and consistently delivers high-quality work on time. Takes initiative on important projects.",
      anonymous: true,
      submittedAt: new Date()
    },
    {
      id: "3",
      employeeId: "emp1", 
      reviewerId: "peer3",
      sentiment: "constructive",
      themes: ["leadership", "cross-team collaboration"],
      content: "Strong technical contributor. Could benefit from more involvement in cross-team initiatives and taking on leadership opportunities.",
      anonymous: true,
      submittedAt: new Date()
    }
  ];

  useEffect(() => {
    // Simulate peer feedback collection process
    const timer = setTimeout(() => {
      setCurrentStep("processing");
      setFeedbackData(mockFeedback);
      
      setTimeout(() => {
        setCurrentStep("complete");
        toast({
          title: "Peer Feedback Collected! 📝",
          description: `Received feedback from ${mockPeers.length} peers for ${employeeName}. AI themes identified.`,
        });
      }, 3000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [employeeName, toast]);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge className="bg-success text-success-foreground">Positive</Badge>;
      case "constructive":
        return <Badge variant="secondary">Constructive</Badge>;
      default:
        return <Badge variant="outline">Neutral</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Avatar className="w-12 h-12 bg-gradient-to-r from-primary to-accent">
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                PF
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">Peer Feedback Collection</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ReviewGenie's Slack bot is collecting peer feedback for {employeeName} from team members.
          </p>
        </div>

        {/* Collection Status */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <MessageSquare className="w-12 h-12 text-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Slack Bot Status</h3>
                {currentStep === "collecting" && (
                  <p className="text-muted-foreground">
                    🤖 Sending 30-second micro-prompts to selected peers via Slack DM...
                  </p>
                )}
                {currentStep === "processing" && (
                  <p className="text-muted-foreground">
                    🧠 AI processing responses and identifying themes while preserving anonymity...
                  </p>
                )}
                {currentStep === "complete" && (
                  <p className="text-muted-foreground">
                    ✅ Peer feedback collection complete! Themes identified and ready for review generation.
                  </p>
                )}
              </div>
              <Badge 
                variant={currentStep === "complete" ? "default" : "secondary"}
                className="capitalize"
              >
                {currentStep === "collecting" ? "Collecting" : 
                 currentStep === "processing" ? "Processing" : "Complete"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Peer Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>Selected Peer Reviewers</CardTitle>
            </div>
            <CardDescription>
              AI automatically selected these team members based on collaboration frequency
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {mockPeers.map((peer, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-sm">{peer.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{peer.name}</div>
                    <div className="text-xs text-muted-foreground">{peer.role}</div>
                  </div>
                  {currentStep === "complete" ? (
                    <Badge className="bg-success text-success-foreground text-xs">
                      Submitted
                    </Badge>
                  ) : currentStep === "processing" ? (
                    <Badge variant="secondary" className="text-xs">
                      Responding
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Sent
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Results */}
        {currentStep === "complete" && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>AI-Processed Feedback Summary</CardTitle>
              <CardDescription>
                Anonymous feedback clustered into themes with PII redacted
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {feedbackData.map((feedback, index) => (
                <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Peer #{index + 1}</span>
                      {getSentimentBadge(feedback.sentiment)}
                    </div>
                    <div className="flex gap-1">
                      {feedback.themes.map((theme, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{feedback.content}"
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        {currentStep === "complete" && (
          <div className="text-center">
            <Button 
              onClick={onFeedbackComplete}
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Send className="w-5 h-5 mr-2" />
              Continue to Signal Analysis
            </Button>
          </div>
        )}

        {/* Collection Progress */}
        {currentStep !== "complete" && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground text-center">
                {currentStep === "collecting" && "⏳ Estimated completion: 2-3 minutes"}
                {currentStep === "processing" && "🧠 AI processing feedback themes and sentiment..."}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};