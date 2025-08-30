import { useState } from "react";
import { ReviewGenieBot } from "@/components/ReviewGenieBot";
import { IntegrationSetup } from "@/components/IntegrationSetup";
import { ReviewDraft } from "@/components/ReviewDraft";
import { HRDashboard } from "@/components/HRDashboard";
import { ReviewCycle } from "@/types/ReviewCycle";

type ViewType = "integration" | "chat" | "review" | "hr_dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("integration");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [reviewCycle, setReviewCycle] = useState<ReviewCycle | null>(null);

  const handleIntegrationComplete = () => {
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
    setCurrentView("hr_dashboard");
  };

  const handleHRApprove = () => {
    setCurrentView("chat");
  };

  // Route to appropriate view
  switch (currentView) {
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
    
    case "hr_dashboard":
      return <HRDashboard onApproveReview={handleHRApprove} />;
    
    case "chat":
    default:
      return <ReviewGenieBot onShowReviewDraft={handleShowReviewDraft} />;
  }
};

export default Index;