import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Edit3, Save, X, Send, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewSection {
  id: string;
  title: string;
  content: string;
  editable: boolean;
}

interface ReviewDraftProps {
  employeeName: string;
  onSubmit: () => void;
  onBack: () => void;
}

export const ReviewDraft = ({ employeeName, onSubmit, onBack }: ReviewDraftProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [reviewSections, setReviewSections] = useState<ReviewSection[]>([
    {
      id: "achievements",
      title: "Key Achievements",
      content: `${employeeName} has delivered exceptional results this quarter:\n\n• Successfully led the implementation of the new user dashboard, improving user engagement by 35%\n• Completed 23 Jira tickets with zero critical bugs, maintaining a 98% quality score\n• Mentored 2 junior developers, contributing to team knowledge sharing\n• Contributed to 47 GitHub commits with consistent code quality and thorough documentation\n• Proactively identified and resolved 3 critical performance bottlenecks`,
      editable: false
    },
    {
      id: "collaboration",
      title: "Collaboration & Communication",
      content: `${employeeName} demonstrates strong collaborative skills:\n\n• Actively participates in daily standups and sprint planning (156 Slack messages analyzed)\n• Provides constructive feedback in 12 code reviews, fostering team learning\n• Facilitates knowledge sharing through clear documentation and pair programming\n• Responds promptly to team requests and maintains positive communication tone\n• Successfully coordinated with design and product teams on 3 major features`,
      editable: false
    },
    {
      id: "growth",
      title: "Growth Areas & Development",
      content: `Areas for continued professional development:\n\n• Consider taking on technical leadership opportunities for larger initiatives\n• Expand involvement in architecture decisions and system design discussions\n• Explore opportunities to present technical topics at team meetings or external conferences\n• Develop expertise in emerging technologies relevant to our tech stack\n• Continue building cross-functional collaboration skills with product and design teams`,
      editable: false
    }
  ]);

  const [overallRating, setOverallRating] = useState("Exceeds Expectations");
  const [isEditingRating, setIsEditingRating] = useState(false);

  const handleEditSection = (sectionId: string) => {
    setIsEditing(sectionId);
    setReviewSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, editable: true } : section
      )
    );
  };

  const handleSaveSection = (sectionId: string, newContent: string) => {
    setReviewSections(prev =>
      prev.map(section =>
        section.id === sectionId 
          ? { ...section, content: newContent, editable: false }
          : section
      )
    );
    setIsEditing(null);
    toast({
      title: "Section Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancelEdit = (sectionId: string) => {
    setReviewSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, editable: false } : section
      )
    );
    setIsEditing(null);
  };

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted Successfully! 🎉",
      description: `Performance review for ${employeeName} has been submitted to HR and the employee.`,
    });
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Chat
          </Button>
        </div>

        {/* Bot Notification */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 bg-gradient-to-r from-primary to-accent">
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                  RG
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">ReviewGenie</h3>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  🎉 <strong>Your draft review is ready!</strong> I've analyzed 90 days of workplace data 
                  and generated a comprehensive performance review for {employeeName}. Review the content below 
                  and make any edits before submitting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{employeeName} - Performance Review</CardTitle>
                <CardDescription>Q4 2024 • Generated by ReviewGenie AI</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Overall Rating</div>
                  {isEditingRating ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={overallRating}
                        onChange={(e) => setOverallRating(e.target.value)}
                        className="w-40 h-8"
                      />
                      <Button size="sm" onClick={() => setIsEditingRating(false)}>
                        <Save className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-sm">
                        {overallRating}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setIsEditingRating(true)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Review Sections */}
        <div className="space-y-6">
          {reviewSections.map((section) => (
            <Card key={section.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  {!section.editable && isEditing !== section.id && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditSection(section.id)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                {section.editable && isEditing === section.id ? (
                  <EditableSection
                    content={section.content}
                    onSave={(newContent) => handleSaveSection(section.id, newContent)}
                    onCancel={() => handleCancelEdit(section.id)}
                  />
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                      {section.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              Save as Draft
            </Button>
            <Button 
              onClick={handleSubmitReview}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </div>

        {/* Data Sources */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              <strong>Data Sources:</strong> This review was generated using data from Slack (156 messages), 
              Jira (23 tickets), GitHub (47 commits), and Notion (12 documents) spanning the last 90 days.
              <Separator className="my-2" />
              <strong>AI Confidence:</strong> 94% • Generated on {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface EditableSectionProps {
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const EditableSection = ({ content, onSave, onCancel }: EditableSectionProps) => {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <div className="space-y-4">
      <Textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        rows={8}
        className="resize-none"
        placeholder="Enter review content..."
      />
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => onSave(editedContent)}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};