import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Settings, Users, BarChart3, FileText, Zap } from "lucide-react";

interface SidebarProps {
  currentStep: string;
  integrations: Array<{
    name: string;
    status: "connected" | "pending" | "error";
    icon: string;
  }>;
}

const steps = [
  { id: "welcome", name: "Welcome", icon: "👋" },
  { id: "integrations", name: "Connect Tools", icon: "🔗" },
  { id: "employee", name: "Select Employee", icon: "👤" },
  { id: "signals", name: "Gather Signals", icon: "📊" },
  { id: "review", name: "Generate Review", icon: "📝" },
  { id: "finalize", name: "Finalize", icon: "✅" }
];

export const Sidebar = ({ currentStep, integrations }: SidebarProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-80 bg-sidebar-bg border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-bot rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">RG</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">ReviewGenie</h1>
            <p className="text-xs text-muted-foreground">AI Performance Assistant</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-3">Review Process</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  step.id === currentStep 
                    ? 'bg-primary/10 border border-primary/20' 
                    : index < currentStepIndex 
                    ? 'bg-success/10 text-success' 
                    : 'text-muted-foreground'
                }`}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="text-sm font-medium">{step.name}</span>
                {index < currentStepIndex && (
                  <div className="ml-auto w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                {step.id === currentStep && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Connected Tools */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Connected Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {integrations.length === 0 ? (
              <p className="text-xs text-muted-foreground">No tools connected yet</p>
            ) : (
              integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{integration.icon}</span>
                    <span className="text-xs font-medium">{integration.name}</span>
                  </div>
                  <Badge 
                    variant={integration.status === "connected" ? "default" : 
                             integration.status === "pending" ? "secondary" : "destructive"}
                    className="text-xs h-5"
                  >
                    {integration.status}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">Quick Actions</h3>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <Settings className="w-3 h-3 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <Users className="w-3 h-3 mr-2" />
              Team Overview
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <BarChart3 className="w-3 h-3 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <FileText className="w-3 h-3 mr-2" />
              Templates
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <Button variant="outline" size="sm" className="w-full text-xs">
          Need Help?
        </Button>
      </div>
    </div>
  );
};