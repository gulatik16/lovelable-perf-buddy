import { useState } from "react";
import { ReviewGenieBot } from "@/components/ReviewGenieBot";
import { IntegrationSetup } from "@/components/IntegrationSetup";
import { ReviewDraft } from "@/components/ReviewDraft";

type ViewType = "setup" | "chat" | "review";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("setup");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const handleSetupComplete = () => {
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
    setCurrentView("chat");
  };

  if (currentView === "setup") {
    return <IntegrationSetup onComplete={handleSetupComplete} />;
  }

  if (currentView === "review") {
    return (
      <ReviewDraft 
        employeeName={selectedEmployee}
        onSubmit={handleSubmitReview}
        onBack={handleBackToChat}
      />
    );
  }

  return <ReviewGenieBot onShowReviewDraft={handleShowReviewDraft} />;
};

export default Index;