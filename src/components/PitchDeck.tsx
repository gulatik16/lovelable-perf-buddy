import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Zap, Users, TrendingUp, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "AI Performance Mirror",
    subtitle: "Autonomous Performance Review Generator",
    content: (
      <div className="text-center space-y-8">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/60 rounded-2xl mx-auto flex items-center justify-center">
          <Zap className="w-16 h-16 text-primary-foreground" />
        </div>
        <div className="space-y-4">
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Transforming performance reviews from manual burden to intelligent automation
          </p>
          <div className="text-sm text-muted-foreground font-medium">
            Product Pitch · 2025
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Problem",
    subtitle: "Performance reviews are fundamentally broken",
    content: (
      <div className="space-y-8">
        <div className="text-center bg-destructive/5 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-destructive mb-2">$3.2B</h3>
          <p className="text-muted-foreground">Annual cost of ineffective performance reviews in US companies</p>
        </div>
        
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Delayed & Disconnected</h4>
              <p className="text-muted-foreground">Reviews happen quarterly or annually, months after work is completed, causing context loss and reduced accuracy</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Biased & Subjective</h4>
              <p className="text-muted-foreground">Manager recall bias and recency effects lead to unfair evaluations and employee dissatisfaction</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-lg">Administrative Overhead</h4>
              <p className="text-muted-foreground">2-4 hours per review × thousands of employees = massive productivity drain on management</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Solution",
    subtitle: "Continuous AI-powered performance intelligence",
    content: (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Real-time Work Signal Analysis</span>
          </div>
        </div>
        
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Automatic Achievement Tracking</h4>
              <p className="text-muted-foreground">Continuously captures accomplishments from Slack, Jira, GitHub, and Google Workspace with zero manual input</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">AI-Generated Review Drafts</h4>
              <p className="text-muted-foreground">Synthesizes work signals and peer feedback into structured, fair, and comprehensive performance reviews</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Bias Detection & Quality Assurance</h4>
              <p className="text-muted-foreground">HR dashboard identifies incomplete reviews, potential bias, and ensures consistent evaluation standards</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Market Opportunity",
    subtitle: "Massive addressable market in HR tech",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">$24B</div>
            <div className="text-sm text-muted-foreground">HR Software Market (2024)</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">23%</div>
            <div className="text-sm text-muted-foreground">Annual Growth Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">68%</div>
            <div className="text-sm text-muted-foreground">Companies Seeking AI Solutions</div>
          </div>
        </div>
        
        <div className="bg-primary/5 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-4">Target Segments</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium">Mid-Market (500-5K employees)</h5>
              <p className="text-sm text-muted-foreground">High growth companies struggling with manual processes</p>
            </div>
            <div>
              <h5 className="font-medium">Enterprise (5K+ employees)</h5>
              <p className="text-sm text-muted-foreground">Large organizations seeking efficiency and consistency</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-muted-foreground font-medium">Clear path to $100M+ ARR in performance management SaaS</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Business Impact",
    subtitle: "Quantifiable ROI across the organization",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Time Savings</h4>
            <div className="space-y-3">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Reduction in review time</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">3-4 hrs</div>
                <div className="text-sm text-muted-foreground">Saved per manager/review</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quality Improvement</h4>
            <div className="space-y-3">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">Increase in review quality</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">65%</div>
                <div className="text-sm text-muted-foreground">Employee satisfaction boost</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 p-6 rounded-lg text-center">
          <h4 className="font-semibold text-lg mb-2">ROI for 1,000 employee company</h4>
          <div className="text-3xl font-bold text-primary mb-1">$2.4M</div>
          <div className="text-sm text-muted-foreground">Annual productivity savings vs $120K software cost</div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Next Steps",
    subtitle: "Ready to revolutionize performance management",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="w-8 h-8 bg-green-500/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold mb-1">PRD Complete</h4>
            <p className="text-xs text-muted-foreground">Technical specs & user stories</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="w-8 h-8 bg-green-500/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <h4 className="font-semibold mb-1">Prototype Built</h4>
            <p className="text-xs text-muted-foreground">Interactive demo ready</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="w-8 h-8 bg-blue-500/10 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            </div>
            <h4 className="font-semibold mb-1">MVP Roadmap</h4>
            <p className="text-xs text-muted-foreground">6-month development plan</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg text-center">
          <h4 className="font-semibold text-lg mb-2">Investment Ask</h4>
          <div className="text-2xl font-bold text-primary mb-2">$2.5M Seed Round</div>
          <p className="text-muted-foreground mb-4">18 months runway · MVP + initial customers</p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <span className="font-medium">Ready for stakeholder meetings</span>
            <ArrowRight className="w-4 h-4" />
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