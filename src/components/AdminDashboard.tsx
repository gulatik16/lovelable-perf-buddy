import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Settings, Clock, CheckCircle } from "lucide-react";
import { ReviewCycle, Employee } from "@/types/ReviewCycle";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onCycleCreated: (cycle: ReviewCycle) => void;
}

export const AdminDashboard = ({ onCycleCreated }: AdminDashboardProps) => {
  const { toast } = useToast();
  const [cycleName, setCycleName] = useState("Q4 2024 Performance Review");
  const [reviewPeriod, setReviewPeriod] = useState("90");
  const [draftTrigger, setDraftTrigger] = useState("14");
  const [peerFeedbackCount, setPeerFeedbackCount] = useState("3");

  const mockEmployees: Employee[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      managerId: "mgr1",
      department: "Engineering",
      role: "Senior Developer",
      integrations: [],
      reviewStatus: "pending"
    },
    {
      id: "2", 
      name: "Mike Chen",
      email: "mike@company.com",
      managerId: "mgr1",
      department: "Design",
      role: "Product Designer",
      integrations: [],
      reviewStatus: "pending"
    },
    {
      id: "3",
      name: "Alex Rivera", 
      email: "alex@company.com",
      managerId: "mgr2",
      department: "Product",
      role: "Product Manager",
      integrations: [],
      reviewStatus: "pending"
    }
  ];

  const handleCreateCycle = () => {
    const newCycle: ReviewCycle = {
      id: `cycle-${Date.now()}`,
      name: cycleName,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      reviewDueDate: new Date(Date.now() + 104 * 24 * 60 * 60 * 1000), // 104 days (90 + 14)
      status: "setup",
      participants: mockEmployees,
      settings: {
        peerFeedbackCount: parseInt(peerFeedbackCount),
        signalAnalysisPeriodDays: parseInt(reviewPeriod),
        draftGenerationTriggerDays: parseInt(draftTrigger),
        managerDeadlineDays: 7,
        hrReviewRequiredThreshold: 85
      }
    };

    toast({
      title: "Review Cycle Created! 🎉",
      description: `${cycleName} has been set up successfully. Integration setup will begin now.`,
    });

    onCycleCreated(newCycle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Set up performance review cycles, configure AI parameters, and manage organizational settings for ReviewGenie.
          </p>
        </div>

        {/* Review Cycle Setup */}
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle>Create Review Cycle</CardTitle>
            </div>
            <CardDescription>
              Configure the performance review cycle settings and timeline
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="cycleName">Review Cycle Name</Label>
                <Input
                  id="cycleName"
                  value={cycleName}
                  onChange={(e) => setCycleName(e.target.value)}
                  placeholder="Q4 2024 Performance Review"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reviewPeriod">Signal Analysis Period (Days)</Label>
                <Select value={reviewPeriod} onValueChange={setReviewPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="120">120 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="draftTrigger">Draft Generation Trigger (Days Before Due)</Label>
                <Select value={draftTrigger} onValueChange={setDraftTrigger}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="21">21 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="peerFeedback">Peer Feedback Count per Employee</Label>
                <Select value={peerFeedbackCount} onValueChange={setPeerFeedbackCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 peers</SelectItem>
                    <SelectItem value="3">3 peers</SelectItem>
                    <SelectItem value="4">4 peers</SelectItem>
                    <SelectItem value="5">5 peers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>Review Participants</CardTitle>
            </div>
            <CardDescription>
              Employees who will participate in this review cycle
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {mockEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <span className="font-medium text-sm">{employee.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.role} • {employee.department}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Ready for Setup
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Preview */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle>Review Timeline</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <div className="font-medium">Today: Cycle Setup & Tool Integration</div>
                  <div className="text-sm text-muted-foreground">Configure OAuth connections and begin signal collection</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-primary"></div>
                <div>
                  <div className="font-medium">Next 90 Days: Work Signal Collection</div>
                  <div className="text-sm text-muted-foreground">AI analyzes Slack, Jira, GitHub, and Notion activity</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                <div>
                  <div className="font-medium">14 Days Before Due: AI Draft Generation</div>
                  <div className="text-sm text-muted-foreground">ReviewGenie creates structured performance review drafts</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                <div>
                  <div className="font-medium">Manager Review Period: Edit & Submit</div>
                  <div className="text-sm text-muted-foreground">Managers review, edit, and finalize performance reviews</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Cycle Button */}
        <div className="text-center">
          <Button 
            onClick={handleCreateCycle}
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Settings className="w-5 h-5 mr-2" />
            Create Review Cycle & Begin Setup
          </Button>
        </div>
      </div>
    </div>
  );
};