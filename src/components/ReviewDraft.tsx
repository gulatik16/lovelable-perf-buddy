import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, Edit2, Save, X, ArrowLeft, Eye, Download, FileText, Send, User, BarChart3, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataSource {
  platform: string;
  type: string;
  points: number;
  confidence: string;
}

interface ReviewSection {
  id: string;
  title: string;
  content: string;
  editable: boolean;
  score?: string;
  scoreNote?: string;
  dataSources?: DataSource[];
}

interface ReviewDraftProps {
  employeeName: string;
  onSubmit: () => void;
  onBack: () => void;
}

const initialSections: ReviewSection[] = [
  {
    id: "achievements",
    title: "Key Achievements",
    content: `• Led the Q4 product redesign initiative, resulting in 25% improved user satisfaction scores
• Successfully delivered 3 major features ahead of schedule, including the new dashboard analytics
• Mentored 2 junior developers, helping them achieve promotion milestones
• Contributed to 15% reduction in bug reports through improved code review practices`,
    editable: true,
    score: "4.6/5",
    scoreNote: "15% above team average",
    dataSources: [
      { platform: "Jira", type: "Story completion", points: 23, confidence: "94%" },
      { platform: "GitHub", type: "Code reviews", points: 47, confidence: "89%" },
      { platform: "Slack", type: "Mentoring messages", points: 156, confidence: "92%" }
    ]
  },
  {
    id: "collaboration", 
    title: "Collaboration & Teamwork",
    content: `• Consistently maintains high engagement in team discussions (top 20% in Slack participation)
• Provides constructive feedback in code reviews with 95% approval rating
• Actively participates in cross-functional meetings and design sessions
• Shows strong communication skills in both technical and non-technical contexts`,
    editable: true,
    score: "4.4/5",
    scoreNote: "Top 20% of team",
    dataSources: [
      { platform: "Slack", type: "Message engagement", points: 342, confidence: "96%" },
      { platform: "GitHub", type: "PR comments", points: 89, confidence: "91%" },
      { platform: "Notion", type: "Doc collaborations", points: 28, confidence: "88%" }
    ]
  },
  {
    id: "growth",
    title: "Growth Areas & Development", 
    content: `• Focus on expanding technical leadership skills for senior role preparation
• Opportunity to increase involvement in architectural decision-making
• Consider leading more complex projects to build strategic planning experience
• Recommended: Complete advanced React patterns course Q1 2025`,
    editable: true,
    score: "3.8/5",
    scoreNote: "Strong growth trajectory",
    dataSources: [
      { platform: "Peer Feedback", type: "Growth suggestions", points: 3, confidence: "87%" }
    ]
  }
];

export const ReviewDraft = ({ employeeName, onSubmit, onBack }: ReviewDraftProps) => {
  const [sections, setSections] = useState<ReviewSection[]>(initialSections);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [overallRating] = useState("4.2/5");
  const { toast } = useToast();

  const handleSaveEdit = (sectionId: string, newContent: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: newContent }
          : section
      )
    );
    setEditingSection(null);
    
    toast({
      title: "Section Updated",
      description: "Your changes have been saved to the review draft.",
    });
  };

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted!",
      description: "Your performance review has been submitted to your manager for evaluation.",
    });
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Performance Review Draft</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm">{employeeName}</Badge>
            <Badge variant="outline" className="text-sm">Software Engineer</Badge>
            <Badge variant="outline" className="text-sm">Q4 2024</Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200 ml-auto">
              AI Generated
            </Badge>
          </div>
        </div>

        {/* Review Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  {section.id === "achievements" && <Star className="h-5 w-5 text-yellow-500" />}
                  {section.id === "collaboration" && <Users className="h-5 w-5 text-blue-500" />}
                  {section.id === "growth" && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {section.title}
                </h2>
                {section.editable && !editingSection && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {editingSection === section.id ? (
                <EditableSection
                  content={section.content}
                  onSave={(newContent) => handleSaveEdit(section.id, newContent)}
                  onCancel={() => setEditingSection(null)}
                />
              ) : (
                <div className="bg-card border rounded-lg p-6 space-y-4">
                  <div className="prose prose-sm max-w-none">
                    {section.content.split('\n').map((line, index) => (
                      <p key={index} className="text-foreground mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                  
                  {section.score && (
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="font-medium">Score: {section.score}</span>
                      <span className="text-muted-foreground">• {section.scoreNote}</span>
                    </div>
                  )}

                  {section.dataSources && section.dataSources.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <span>Data Sources</span>
                      </div>
                      <div className="space-y-1">
                        {section.dataSources.map((source, index) => (
                          <div key={index} className="flex items-center justify-between text-sm bg-muted/30 rounded p-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{source.platform}</span>
                              <span className="text-muted-foreground">• {source.type}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span>{source.points} data points</span>
                              <span className="text-green-600">{source.confidence} confidence</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Overall Performance Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{overallRating}</div>
                <p className="text-sm text-muted-foreground">Based on comprehensive data analysis</p>
              </div>
              <div className="text-right">
                <Badge className="mb-1">Strong Performer</Badge>
                <p className="text-xs text-muted-foreground">Exceeds expectations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            
            <Button variant="secondary" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Save as Draft
            </Button>
            
            <Button onClick={handleSubmitReview} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 flex items-center gap-2">
              <Send className="h-4 w-4" />
              Submit My Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for editing sections
interface EditableSectionProps {
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const EditableSection = ({ content, onSave, onCancel }: EditableSectionProps) => {
  const [editContent, setEditContent] = useState(content);

  return (
    <div className="space-y-4">
      <Textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="min-h-[120px] resize-none"
        placeholder="Edit section content..."
      />
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => onSave(editContent)} className="flex items-center gap-1">
          <Save className="h-3 w-3" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className="flex items-center gap-1">
          <X className="h-3 w-3" />
          Cancel
        </Button>
      </div>
    </div>
  );
};