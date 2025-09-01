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
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full mx-auto flex items-center justify-center">
          <Zap className="w-12 h-12 text-primary-foreground" />
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Transforming performance reviews from manual burden to intelligent automation
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Performance reviews are broken",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Delayed & Disconnected</h4>
              <p className="text-muted-foreground">Reviews happen months after work is done, losing context and accuracy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Biased & Incomplete</h4>
              <p className="text-muted-foreground">Manager recall bias leads to unfair, generic evaluations</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Administrative Burden</h4>
              <p className="text-muted-foreground">2-4 hours per review, causing delays and manager frustration</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "Continuous work signal intelligence",
    content: (
      <div className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">For Employees</h4>
              <p className="text-muted-foreground">Automatic timeline of accomplishments from daily work tools</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">For Managers</h4>
              <p className="text-muted-foreground">AI-drafted reviews based on real work signals and peer feedback</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">For HR</h4>
              <p className="text-muted-foreground">Oversight dashboard for review quality and bias detection</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Business Impact",
    subtitle: "Measurable ROI across the organization",
    content: (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">30-50%</div>
            <div className="text-sm text-muted-foreground">Faster review cycles</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">2-4hrs</div>
            <div className="text-sm text-muted-foreground">Time saved per review</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">NPS 50+</div>
            <div className="text-sm text-muted-foreground">Employee satisfaction</div>
          </div>
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Review accuracy</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Next Steps",
    subtitle: "Ready to transform performance reviews",
    content: (
      <div className="text-center space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">PRD Complete</h4>
            <p className="text-sm text-muted-foreground">Detailed technical specifications and user stories</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Prototype Ready</h4>
            <p className="text-sm text-muted-foreground">Interactive demo with core workflows</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-primary">
          <span className="font-medium">Ready for stakeholder review</span>
          <ArrowRight className="w-4 h-4" />
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