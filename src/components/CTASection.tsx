import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-0 shadow-elegant bg-gradient-hero">
          <div className="absolute inset-0 bg-black/10"></div>
          
          <CardContent className="relative z-10 p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Performance Reviews?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who've revolutionized their feedback process with AI-powered insights
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-glow"
              >
                Start Free Trial
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-primary"
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                ✓ Free 14-day trial
              </div>
              <div className="flex items-center gap-2">
                ✓ No setup fees
              </div>
              <div className="flex items-center gap-2">
                ✓ Cancel anytime
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};