import { useState } from "react";
import { ReviewGenieBot } from "@/components/ReviewGenieBot";
import { IntegrationSetup } from "@/components/IntegrationSetup";

const Index = () => {
  const [currentView, setCurrentView] = useState<"setup" | "chat">("setup");

  if (currentView === "setup") {
    return <IntegrationSetup />;
  }

  return <ReviewGenieBot />;
};

export default Index;