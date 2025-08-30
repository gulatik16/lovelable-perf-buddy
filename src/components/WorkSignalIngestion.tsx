import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Database, Activity, TrendingUp, CheckCircle } from "lucide-react";
import { WorkSignal } from "@/types/ReviewCycle";
import { useToast } from "@/hooks/use-toast";

interface WorkSignalIngestionProps {
  employeeName: string;
  onIngestionComplete: () => void;
}

export const WorkSignalIngestion = ({ employeeName, onIngestionComplete }: WorkSignalIngestionProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState("ingesting");
  const [progress, setProgress] = useState(0);
  const [signalData, setSignalData] = useState<WorkSignal[]>([]);

  const platforms = [
    { name: "Slack", icon: "💬", status: "processing", count: 156 },
    { name: "Jira", icon: "🎯", status: "processing", count: 23 },
    { name: "GitHub", icon: "⚡", status: "processing", count: 47 },
    { name: "Notion", icon: "📝", status: "processing", count: 12 }
  ];

  const mockSignals: WorkSignal[] = [
    {
      id: "1",
      employeeId: "emp1",
      platform: "github",
      type: "delivery",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      content: "Merged pull request #245: Implement user dashboard analytics",
      metadata: { linesChanged: 342, filesModified: 8 },
      normalized: true
    },
    {
      id: "2",
      employeeId: "emp1", 
      platform: "slack",
      type: "collaboration",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      content: "Helped team member debug authentication issue in #engineering",
      metadata: { responseTime: 15, sentiment: "helpful" },
      normalized: true
    },
    {
      id: "3",
      employeeId: "emp1",
      platform: "jira",
      type: "ownership",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      content: "Completed epic PROJ-123: User Experience Improvements",
      metadata: { storyPoints: 13, cycleTime: 8 },
      normalized: true
    }
  ];

  useEffect(() => {
    // Simulate signal ingestion process
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setCurrentStep("normalizing");
          
          setTimeout(() => {
            setCurrentStep("theming");
            setSignalData(mockSignals);
            
            setTimeout(() => {
              setCurrentStep("complete");
              toast({
                title: "Work Signals Processed! 📊",
                description: `Analyzed ${238} signals from 4 platforms over 90 days for ${employeeName}.`,
              });
            }, 2000);
          }, 3000);
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [employeeName, toast]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "delivery": return "bg-blue-500";
      case "collaboration": return "bg-green-500";
      case "ownership": return "bg-purple-500";
      case "initiative": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Work Signal Ingestion</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyzing 90 days of workplace activity for {employeeName} across connected platforms.
          </p>
        </div>

        {/* Process Status */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Signal Processing Pipeline</h3>
                <Badge 
                  variant={currentStep === "complete" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {currentStep === "ingesting" ? "Ingesting Data" :
                   currentStep === "normalizing" ? "Normalizing" :
                   currentStep === "theming" ? "Applying Themes" : "Complete"}
                </Badge>
              </div>
              
              <Progress value={progress} className="h-3" />
              
              <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                <div className={`text-center ${currentStep !== "ingesting" ? "text-success" : ""}`}>
                  Data Ingestion
                </div>
                <div className={`text-center ${currentStep === "normalizing" || currentStep === "theming" || currentStep === "complete" ? "text-success" : ""}`}>
                  Normalization
                </div>
                <div className={`text-center ${currentStep === "theming" || currentStep === "complete" ? "text-success" : ""}`}>
                  Theme Tagging
                </div>
                <div className={`text-center ${currentStep === "complete" ? "text-success" : ""}`}>
                  Complete
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-primary" />
              <CardTitle>Platform Data Collection</CardTitle>
            </div>
            <CardDescription>
              Real-time ingestion from connected workplace tools
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-muted-foreground">{platform.count} events found</div>
                    </div>
                  </div>
                  {currentStep === "complete" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Signal Examples */}
        {currentStep === "complete" && (
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle>Processed Signal Examples</CardTitle>
              </div>
              <CardDescription>
                Normalized and themed workplace activity signals
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {signalData.map((signal) => (
                <div key={signal.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(signal.type)}`}></div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {signal.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{signal.platform}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {signal.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{signal.content}</p>
                  {signal.metadata && (
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      {Object.entries(signal.metadata).map(([key, value]) => (
                        <span key={key} className="bg-muted px-2 py-1 rounded">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Analytics Summary */}
        {currentStep === "complete" && (
          <Card className="bg-gradient-to-r from-success/10 to-accent/10 border-success/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">238</div>
                  <div className="text-sm text-muted-foreground">Total Signals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">94%</div>
                  <div className="text-sm text-muted-foreground">Normalization Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">4</div>
                  <div className="text-sm text-muted-foreground">Theme Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">90</div>
                  <div className="text-sm text-muted-foreground">Days Analyzed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        {currentStep === "complete" && (
          <div className="text-center">
            <Button 
              onClick={onIngestionComplete}
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Continue to Draft Generation
            </Button>
          </div>
        )}

        {/* Processing Info */}
        {currentStep !== "complete" && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="font-medium">Current Process:</div>
                {currentStep === "ingesting" && "🔄 Pulling events from APIs and webhooks..."}
                {currentStep === "normalizing" && "⚙️ Deduplicating and converting to common schema..."}
                {currentStep === "theming" && "🏷️ Tagging signals with Delivery/Collaboration/Ownership themes..."}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};