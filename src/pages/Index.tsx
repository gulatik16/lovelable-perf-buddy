import { useState } from "react";
import { ReviewGenieBot } from "@/components/ReviewGenieBot";
import { IntegrationSetup } from "@/components/IntegrationSetup";
import { ReviewDraft } from "@/components/ReviewDraft";
import { PerformanceReviewScheduling } from "@/components/PerformanceReviewScheduling";
import { PitchDeck } from "@/components/PitchDeck";
import { ReviewCycle } from "@/types/ReviewCycle";

type ViewType = "integration" | "chat" | "review" | "scheduling" | "pitch";

interface Integration {
  id: string;
  name: string;
  icon: string;
  status: "disconnected" | "connecting" | "connected";
}

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("pitch");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [reviewCycle, setReviewCycle] = useState<ReviewCycle | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<Integration[]>([]);

  const handleIntegrationComplete = (integrations: Integration[]) => {
    setConnectedIntegrations(integrations);
    setCurrentView("chat");
  };

  const handleShowReviewDraft = (employeeName: string) => {
    setSelectedEmployee(employeeName);
    setCurrentView("review");
  };

  const handleBackToChat = () => {
    setCurrentView("chat");
  };

  const handleSubmitReview = () => {
    setCurrentView("scheduling");
  };

  const handleSchedulingComplete = () => {
    setCurrentView("chat");
  };

  // Route to appropriate view
  switch (currentView) {
    case "pitch":
      return <PitchDeck />;
    
    case "integration":
      return <IntegrationSetup onComplete={handleIntegrationComplete} />;
    
    case "review":
      return (
        <ReviewDraft 
          employeeName={selectedEmployee}
          onSubmit={handleSubmitReview}
          onBack={handleBackToChat}
        />
      );
    
    case "scheduling":
      return (
        <PerformanceReviewScheduling 
          employeeName={selectedEmployee}
          onComplete={handleSchedulingComplete}
          onBack={handleBackToChat}
        />
      );
    
    case "chat":
    default:
      return <ReviewGenieBot onShowReviewDraft={handleShowReviewDraft} connectedIntegrations={connectedIntegrations} />;
  }
};

export default Index;