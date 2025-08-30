import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, BarChart3, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { HRMetrics, ReviewDraftData } from "@/types/ReviewCycle";
import { useToast } from "@/hooks/use-toast";

interface HRDashboardProps {
  onApproveReview: () => void;
}

export const HRDashboard = ({ onApproveReview }: HRDashboardProps) => {
  const { toast } = useToast();
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const hrMetrics: HRMetrics = {
    submissionRate: 87,
    averageCompletionTime: 18,
    peerFeedbackCoverage: 94,
    npsScore: 8.2,
    apiUptime: 99.8,
    aiAccuracy: 91,
    generationLatency: 2.3
  };

  const mockReviews: ReviewDraftData[] = [
    {
      id: "1",
      employeeId: "emp1",
      cycleId: "cycle1", 
      sections: [],
      overallRating: "Exceeds Expectations",
      sources: [],
      aiConfidence: 94,
      version: 2,
      status: "submitted",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastEditedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      employeeId: "emp2", 
      cycleId: "cycle1",
      sections: [],
      overallRating: "Meets Expectations",
      sources: [],
      aiConfidence: 89,
      version: 1,
      status: "manager_editing",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastEditedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const handleApprove = (reviewId: string) => {
    toast({
      title: "Review Approved ✅",
      description: "Performance review has been approved and will be shared with the employee.",
    });
    onApproveReview();
  };

  const handleRequestEdit = (reviewId: string) => {
    toast({
      title: "Edit Requested 📝", 
      description: "Manager has been notified to make requested changes to the review.",
      variant: "default",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-500 text-white">Pending HR Review</Badge>;
      case "manager_editing":
        return <Badge variant="secondary">Manager Editing</Badge>;
      case "approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getQualityScore = (aiConfidence: number, version: number) => {
    const baseScore = aiConfidence;
    const versionPenalty = (version - 1) * 2;
    return Math.max(baseScore - versionPenalty, 70);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">HR Oversight Dashboard</h1>
              <p className="text-muted-foreground">Review quality, compliance, and system metrics</p>
            </div>
          </div>
          <Badge className="bg-success text-success-foreground">
            Q4 2024 Cycle Active
          </Badge>
        </div>

        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews">Review Queue</TabsTrigger>
            <TabsTrigger value="metrics">System Metrics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {/* Reviews Queue */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <CardTitle>Performance Reviews Queue</CardTitle>
                </div>
                <CardDescription>
                  Reviews requiring HR oversight and approval
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <span className="font-medium text-sm">
                              {review.employeeId === "emp1" ? "SJ" : "MC"}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {review.employeeId === "emp1" ? "Sarah Johnson" : "Mike Chen"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.employeeId === "emp1" ? "Senior Developer" : "Product Designer"}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(review.status)}
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{review.overallRating}</div>
                          <div className="text-xs text-muted-foreground">Overall Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{getQualityScore(review.aiConfidence, review.version)}%</div>
                          <div className="text-xs text-muted-foreground">Quality Score</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">v{review.version}</div>
                          <div className="text-xs text-muted-foreground">Version</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{review.aiConfidence}%</div>
                          <div className="text-xs text-muted-foreground">AI Confidence</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Last edited: {review.lastEditedAt.toLocaleDateString()}
                        </div>
                        
                        {review.status === "submitted" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestEdit(review.id)}
                            >
                              Request Edit
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApprove(review.id)}
                              className="bg-success hover:bg-success/90"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        )}
                        
                        {review.status === "manager_editing" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            Awaiting manager edits
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            {/* Product Health Metrics */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>Product Health Metrics</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Review Submission Rate</span>
                        <span className="text-sm text-muted-foreground">{hrMetrics.submissionRate}%</span>
                      </div>
                      <Progress value={hrMetrics.submissionRate} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Peer Feedback Coverage</span>
                        <span className="text-sm text-muted-foreground">{hrMetrics.peerFeedbackCoverage}%</span>
                      </div>
                      <Progress value={hrMetrics.peerFeedbackCoverage} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">{hrMetrics.averageCompletionTime}min</div>
                      <div className="text-sm text-muted-foreground">Avg. Review Time</div>
                    </div>
                    
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-success">{hrMetrics.npsScore}/10</div>
                      <div className="text-sm text-muted-foreground">Review NPS</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engineering Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engineering Health Metrics</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-success">{hrMetrics.apiUptime}%</div>
                    <div className="text-sm text-muted-foreground">API Uptime</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{hrMetrics.aiAccuracy}%</div>
                    <div className="text-sm text-muted-foreground">AI Accuracy</div>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-accent">{hrMetrics.generationLatency}s</div>
                    <div className="text-sm text-muted-foreground">Generation Latency</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {/* Compliance Checks */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <CardTitle>Compliance & Quality Checks</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium text-sm">Length Requirements</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      All reviews meet minimum 300 word requirement
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium text-sm">Theme Coverage</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      98% include all required competency areas
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="font-medium text-sm">Bias Detection</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      2 reviews flagged for potential bias language
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium text-sm">Data Privacy</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      All PII properly redacted and encrypted
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Archive Management */}
            <Card>
              <CardHeader>
                <CardTitle>Review Archive & Retention</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Q3 2024 Reviews</div>
                      <div className="text-sm text-muted-foreground">147 reviews archived</div>
                    </div>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Q2 2024 Reviews</div>
                      <div className="text-sm text-muted-foreground">152 reviews archived</div>
                    </div>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};