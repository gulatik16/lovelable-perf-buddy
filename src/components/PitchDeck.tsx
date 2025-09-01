import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, Users, TrendingUp, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "AI-Driven Performance Review Automation",
    subtitle: "Product Problem Statement",
    content: (
      <div className="text-center space-y-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-2xl mx-auto flex items-center justify-center">
          <Users className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Identifying an impactful AI use case where workflow automation can meaningfully improve the HR team and employee experience
          </p>
          <div className="text-sm text-muted-foreground font-medium">
            Product Management Take-Home Assessment
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Problem Identification",
    subtitle: "Performance reviews create friction across the organization",
    content: (
      <div className="space-y-8">
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Current State Analysis</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-destructive">2-4 hours</div>
              <div className="text-sm text-muted-foreground">Per review per manager</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">6-8 weeks</div>
              <div className="text-sm text-muted-foreground">Average review cycle length</div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-5">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Memory & Context Loss</h4>
              <p className="text-muted-foreground text-sm">Managers struggle to recall specific contributions from months ago, leading to recency bias and incomplete evaluations</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Administrative Burden</h4>
              <p className="text-muted-foreground text-sm">HR spends weeks chasing incomplete reviews while managers view the process as low-value administrative work</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Inconsistent Quality</h4>
              <p className="text-muted-foreground text-sm">Review quality varies significantly across managers, creating equity concerns and unreliable promotion/compensation data</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "AI Solution Opportunity",
    subtitle: "Continuous work signal analysis and automated review generation",
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">AI Agent + Workflow Automation</span>
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Passive Achievement Tracking</h4>
              <p className="text-muted-foreground text-sm">AI continuously monitors work signals from Slack, Jira, GitHub, and Google Workspace to build comprehensive performance timelines</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Intelligent Review Drafting</h4>
              <p className="text-muted-foreground text-sm">LLM synthesizes work data and peer feedback into structured, evidence-based review drafts that managers can refine</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Quality Assurance Automation</h4>
              <p className="text-muted-foreground text-sm">HR dashboard flags incomplete reviews, potential bias indicators, and ensures consistent evaluation standards</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Value Proposition",
    subtitle: "Measurable impact on key stakeholders",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">For Managers</h4>
            <div className="text-2xl font-bold text-primary mb-1">75%</div>
            <div className="text-xs text-muted-foreground">Time reduction per review</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">For Employees</h4>
            <div className="text-2xl font-bold text-primary mb-1">40%</div>
            <div className="text-xs text-muted-foreground">Increase in review satisfaction</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">For HR Teams</h4>
            <div className="text-2xl font-bold text-primary mb-1">50%</div>
            <div className="text-xs text-muted-foreground">Faster cycle completion</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Efficiency Gains</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Reduces manager time from 4 hours to 1 hour per review</li>
              <li>• Eliminates employee anxiety about forgotten achievements</li>
              <li>• Streamlines HR oversight and quality control</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">Quality Improvements</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Evidence-based evaluations reduce bias</li>
              <li>• Consistent review structure across teams</li>
              <li>• Better data for promotion and compensation decisions</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Implementation Considerations",
    subtitle: "Technical feasibility and adoption strategy",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold">Technical Requirements</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Integration APIs for Slack, Jira, GitHub, Google Workspace</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">LLM for content synthesis and bias detection</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">HRIS integration for review workflow automation</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Adoption Strategy</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Pilot with high-volume engineering teams</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Manager training on AI-assisted review refinement</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">Gradual rollout with feedback loops</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Key Risks & Mitigations</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-destructive">Privacy Concerns:</span>
              <span className="text-muted-foreground ml-2">Employee consent, data anonymization, audit trails</span>
            </div>
            <div>
              <span className="font-medium text-destructive">AI Accuracy:</span>
              <span className="text-muted-foreground ml-2">Human oversight, confidence scoring, iterative improvement</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Success Metrics & Validation",
    subtitle: "How we measure product-market fit and impact",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold">Leading Indicators</h4>
            <div className="space-y-3">
              <div className="bg-primary/5 p-3 rounded">
                <div className="font-medium text-sm">Manager Adoption Rate</div>
                <div className="text-xs text-muted-foreground">% of eligible managers using AI drafts</div>
              </div>
              <div className="bg-primary/5 p-3 rounded">
                <div className="font-medium text-sm">Review Completion Time</div>
                <div className="text-xs text-muted-foreground">Average hours spent per review</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Lagging Indicators</h4>
            <div className="space-y-3">
              <div className="bg-primary/5 p-3 rounded">
                <div className="font-medium text-sm">Employee NPS</div>
                <div className="text-xs text-muted-foreground">Review process satisfaction scores</div>
              </div>
              <div className="bg-primary/5 p-3 rounded">
                <div className="font-medium text-sm">Review Quality Score</div>
                <div className="text-xs text-muted-foreground">HR assessment of completeness & bias</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Validation Plan</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium mb-1">Phase 1</div>
              <div className="text-muted-foreground">MVP with 1 pilot team (50 employees)</div>
            </div>
            <div className="text-center">
              <div className="font-medium mb-1">Phase 2</div>
              <div className="text-muted-foreground">Expanded pilot (500 employees)</div>
            </div>
            <div className="text-center">
              <div className="font-medium mb-1">Phase 3</div>
              <div className="text-muted-foreground">Full enterprise rollout</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="min-h-[600px] border-0 shadow-2xl">
          <CardContent className="p-12">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  {slide.content}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {/* Slide indicators */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide 
                          ? 'bg-primary' 
                          : 'bg-muted hover:bg-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Slide counter */}
              <div className="text-center mt-4 text-sm text-muted-foreground">
                {currentSlide + 1} of {slides.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};