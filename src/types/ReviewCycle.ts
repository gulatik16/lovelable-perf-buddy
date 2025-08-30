export interface ReviewCycle {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  reviewDueDate: Date;
  status: "setup" | "active" | "draft_generation" | "manager_review" | "hr_review" | "completed";
  participants: Employee[];
  settings: ReviewCycleSettings;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  managerId: string;
  department: string;
  role: string;
  integrations: ToolIntegration[];
  reviewStatus: "pending" | "signals_collected" | "peer_feedback_done" | "draft_ready" | "manager_editing" | "submitted" | "hr_approved";
}

export interface ToolIntegration {
  platform: "slack" | "jira" | "github" | "notion" | "google_docs";
  connected: boolean;
  oauthToken?: string;
  lastSync: Date;
  permissions: string[];
}

export interface ReviewCycleSettings {
  peerFeedbackCount: number;
  signalAnalysisPeriodDays: number;
  draftGenerationTriggerDays: number;
  managerDeadlineDays: number;
  hrReviewRequiredThreshold: number;
}

export interface WorkSignal {
  id: string;
  employeeId: string;
  platform: string;
  type: "delivery" | "collaboration" | "ownership" | "initiative";
  timestamp: Date;
  content: string;
  metadata: Record<string, any>;
  normalized: boolean;
}

export interface PeerFeedback {
  id: string;
  employeeId: string;
  reviewerId: string;
  sentiment: "positive" | "neutral" | "constructive";
  themes: string[];
  content: string;
  anonymous: boolean;
  submittedAt: Date;
}

export interface ReviewDraftData {
  id: string;
  employeeId: string;
  cycleId: string;
  sections: ReviewSection[];
  overallRating: string;
  sources: DataSource[];
  aiConfidence: number;
  version: number;
  status: "draft" | "manager_editing" | "submitted" | "hr_review" | "approved";
  createdAt: Date;
  lastEditedAt: Date;
}

export interface ReviewSection {
  id: string;
  title: string;
  content: string;
  sources: string[];
  editable: boolean;
  lastEditedBy?: string;
}

export interface DataSource {
  platform: string;
  dataType: string;
  count: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface HRMetrics {
  submissionRate: number;
  averageCompletionTime: number;
  peerFeedbackCoverage: number;
  npsScore: number;
  apiUptime: number;
  aiAccuracy: number;
  generationLatency: number;
}