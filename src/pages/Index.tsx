import { useState } from "react";
import { ReviewGenieBot } from "@/components/ReviewGenieBot";
import { IntegrationSetup } from "@/components/IntegrationSetup";
import { ReviewDraft } from "@/components/ReviewDraft";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PeerFeedbackBot } from "@/components/PeerFeedbackBot";
import { WorkSignalIngestion } from "@/components/WorkSignalIngestion";
import { HRDashboard } from "@/components/HRDashboard";
import { ReviewCycle } from "@/types/ReviewCycle";

type ViewType = "admin" | "integration" | "peer_feedback" | "signal_ingestion" | "chat" | "review" | "hr_dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("admin");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [reviewCycle, setReviewCycle] = useState<ReviewCycle | null>(null);

  const handleCycleCreated = (cycle: ReviewCycle) => {
    setReviewCycle(cycle);
    setCurrentView("integration");
  };

  const handleIntegrationComplete = () => {
    setCurrentView("peer_feedback");
  };

  const handlePeerFeedbackComplete = () => {
    setCurrentView("signal_ingestion");
  };

  const handleSignalIngestionComplete = () => {
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
    case "admin":
      return <AdminDashboard onCycleCreated={handleCycleCreated} />;
    
    case "integration":
      return <IntegrationSetup onComplete={handleIntegrationComplete} />;
    
    case "peer_feedback":
      return <PeerFeedbackBot 
        employeeName="All Employees" 
        onFeedbackComplete={handlePeerFeedbackComplete} 
      />;
    
    case "signal_ingestion":
      return <WorkSignalIngestion 
        employeeName="All Employees"
        onIngestionComplete={handleSignalIngestionComplete}
      />;
    
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