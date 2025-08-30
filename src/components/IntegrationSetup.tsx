import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "disconnected" | "connecting" | "connected";
  color: string;
}

const integrations: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    icon: "💬",
    description: "Connect to analyze communication patterns, collaboration frequency, and team interactions",
    status: "disconnected",
    color: "bg-purple-500"
  },
  {
    id: "jira",
    name: "Jira",
    icon: "🎯",
    description: "Track project contributions, ticket completion rates, and development velocity",
    status: "disconnected",
    color: "bg-blue-500"
  },
  {
    id: "notion",
    name: "Notion",
    icon: "📝",
    description: "Review documentation contributions, meeting notes, and knowledge sharing",
    status: "disconnected",
    color: "bg-gray-700"
  },
  {
    id: "google-docs",
    name: "Google Docs",
    icon: "📄",
    description: "Analyze document collaboration, editing contributions, and content creation",
    status: "disconnected",
    color: "bg-green-500"
  }
];

export const IntegrationSetup = () => {
  const [integrationStates, setIntegrationStates] = useState<Integration[]>(integrations);
  const [currentStep, setCurrentStep] = useState("intro");
  const { toast } = useToast();

  const handleConnect = async (integrationId: string) => {
    // Update status to connecting
    setIntegrationStates(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: "connecting" }
          : integration
      )
    );

    // Simulate OAuth connection process
    setTimeout(() => {
      setIntegrationStates(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, status: "connected" }
            : integration
        )
      );

      const integration = integrations.find(i => i.id === integrationId);
      toast({
        title: `${integration?.name} Connected!`,
        description: `Successfully connected to ${integration?.name}. ReviewGenie can now gather performance signals.`,
      });
    }, 2000);
  };

  const connectedCount = integrationStates.filter(i => i.status === "connected").length;
  const allConnected = connectedCount === integrations.length;

  if (currentStep === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          {/* Bot Introduction */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-20 h-20 bg-gradient-to-r from-primary to-accent border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-2xl font-bold">
                  RG
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome to ReviewGenie! 🎉
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                I'm your AI-powered performance review assistant. I'll help you create comprehensive, 
                data-driven performance reviews by analyzing workplace signals from your favorite tools.
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20 max-w-lg mx-auto">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">What I'll do for you:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Analyze 90 days of workplace activity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Identify collaboration patterns & contributions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Generate comprehensive review drafts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Provide objective, data-backed insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Let's start by connecting your workplace tools. This allows me to gather the signals 
                needed to create meaningful performance reviews.
              </p>
              
              <Button 
                onClick={() => setCurrentStep("integrations")}
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Connect Your Tools →
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Avatar className="w-12 h-12 bg-gradient-to-r from-primary to-accent">
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                RG
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">Connect Your Workplace Tools</h1>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect your tools to enable ReviewGenie to analyze workplace signals and generate comprehensive performance reviews.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              {connectedCount} of {integrations.length} connected
            </Badge>
            {allConnected && (
              <Badge className="px-4 py-2 bg-success text-success-foreground">
                <CheckCircle className="w-4 h-4 mr-1" />
                All tools connected!
              </Badge>
            )}
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {integrationStates.map((integration) => (
            <Card 
              key={integration.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                integration.status === "connected" 
                  ? "border-success bg-success/5" 
                  : "border-border hover:border-primary/30"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {integration.name}
                        {integration.status === "connected" && (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                      </CardTitle>
                      <Badge 
                        variant={
                          integration.status === "connected" ? "default" :
                          integration.status === "connecting" ? "secondary" : "outline"
                        }
                        className="mt-1"
                      >
                        {integration.status === "connected" ? "Connected" :
                         integration.status === "connecting" ? "Connecting..." : "Not connected"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {integration.description}
                </CardDescription>

                <Button
                  onClick={() => handleConnect(integration.id)}
                  disabled={integration.status !== "disconnected"}
                  className="w-full"
                  variant={integration.status === "connected" ? "secondary" : "default"}
                >
                  {integration.status === "connecting" && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {integration.status === "connected" && (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  {integration.status === "disconnected" && (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  {integration.status === "connected" ? "Connected" :
                   integration.status === "connecting" ? "Connecting..." : `Connect ${integration.name}`}
                </Button>
              </CardContent>

              {integration.status === "connected" && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-success"></div>
              )}
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {allConnected && (
          <div className="text-center space-y-4 animate-fade-in">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Perfect! All tools connected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ReviewGenie can now access your workplace data to generate comprehensive performance reviews.
                </p>
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Start Creating Reviews →
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>🔒 Your data is secure and encrypted. ReviewGenie only accesses necessary information for performance analysis.</p>
          <p>You can disconnect any tool at any time from your settings.</p>
        </div>
      </div>
    </div>
  );
};