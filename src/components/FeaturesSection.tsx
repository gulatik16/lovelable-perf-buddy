import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "🔬",
    title: "Data-Driven Reviews",
    description: "Analyze 90 days of work signals from Slack, Jira, GitHub, and more",
    details: [
      "Comprehensive data collection",
      "Automated signal processing",
      "Performance trend analysis",
      "Cross-platform integration"
    ]
  },
  {
    icon: "👥",
    title: "360° Feedback",
    description: "Automatically collect and analyze peer feedback with AI insights",
    details: [
      "Multi-source feedback aggregation",
      "Sentiment analysis",
      "Bias detection and correction",
      "Anonymous feedback options"
    ]
  },
  {
    icon: "✍️",
    title: "Smart Drafts",
    description: "Generate comprehensive review drafts with metrics and recommendations",
    details: [
      "AI-powered content generation",
      "Personalized recommendations",
      "Performance metrics integration",
      "Goal alignment suggestions"
    ]
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your performance review process with AI-powered insights and automation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-elegant transition-smooth border-0 shadow-card bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-2xl flex items-center justify-center text-2xl shadow-elegant">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 rounded-lg transition-smooth"></div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg font-medium mb-6">
            <span className="text-muted-foreground">Get started in 2 minutes:</span>{" "}
            <span className="text-foreground">Connect your tools → Generate your first review</span>
          </p>
        </div>
      </div>
    </section>
  );
};