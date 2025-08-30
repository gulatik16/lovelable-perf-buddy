import { useState, useEffect, useRef } from "react";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "👋 Hello! I'm ReviewGenie, your AI-powered performance review assistant.\n\nI'll help you create comprehensive performance reviews by gathering data from your connected tools and generating intelligent insights.\n\nLet's get started! First, I'll need to connect to your workplace tools.",
    timestamp: new Date(),
    buttons: [
      { text: "Connect Tools", action: "connect_tools", variant: "default" },
      { text: "Learn More", action: "learn_more", variant: "outline" }
    ]
  }
];

interface ReviewGenieBotProps {
  onShowReviewDraft: (employeeName: string) => void;
}

export const ReviewGenieBot = ({ onShowReviewDraft }: ReviewGenieBotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [integrations, setIntegrations] = useState<Array<{
    name: string;
    status: "connected" | "pending" | "error";
    icon: string;
  }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addTypingMessage = () => {
    const typingMessage: Message = {
      id: "typing",
      type: "bot",
      content: "",
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);
  };

  const removeTypingMessage = () => {
    setMessages(prev => prev.filter(msg => msg.id !== "typing"));
  };

  const simulateTyping = (callback: () => void, delay = 2000) => {
    setIsTyping(true);
    addTypingMessage();
    setTimeout(() => {
      removeTypingMessage();
      callback();
      setIsTyping(false);
    }, delay);
  };

  const handleConnectTools = () => {
    setCurrentStep("integrations");
    
    simulateTyping(() => {
      addMessage({
        type: "bot",
        content: "Great! Let's connect your workplace tools. I can integrate with the following platforms to gather comprehensive performance data:\n\nClick on each tool to connect:",
        integrations: [
          { name: "Slack", status: "pending", icon: "💬" },
          { name: "Jira", status: "pending", icon: "🎯" },
          { name: "GitHub", status: "pending", icon: "⚡" },
          { name: "Notion", status: "pending", icon: "📝" },
          { name: "Google Docs", status: "pending", icon: "📄" }
        ],
        buttons: [
          { text: "Connect Slack", action: "connect_slack", variant: "default" },
          { text: "Connect Jira", action: "connect_jira", variant: "outline" },
          { text: "Connect GitHub", action: "connect_github", variant: "outline" },
          { text: "Skip for Now", action: "skip_integrations", variant: "secondary" }
        ]
      });
    });
  };

  const handleConnectIntegration = (tool: string) => {
    const toolMap: Record<string, { name: string; icon: string }> = {
      slack: { name: "Slack", icon: "💬" },
      jira: { name: "Jira", icon: "🎯" },
      github: { name: "GitHub", icon: "⚡" },
      notion: { name: "Notion", icon: "📝" },
      google_docs: { name: "Google Docs", icon: "📄" }
    };

    const toolInfo = toolMap[tool];
    if (!toolInfo) return;

    // Update integration status
    setIntegrations(prev => {
      const existing = prev.find(i => i.name === toolInfo.name);
      if (existing) {
        return prev.map(i => 
          i.name === toolInfo.name 
            ? { ...i, status: "connected" as const }
            : i
        );
      } else {
        return [...prev, { ...toolInfo, status: "connected" as const }];
      }
    });

    toast({
      title: `${toolInfo.name} Connected!`,
      description: `Successfully connected to ${toolInfo.name}. I can now gather performance signals from this platform.`,
    });

    simulateTyping(() => {
      addMessage({
        type: "bot",
        content: `Excellent! ✅ ${toolInfo.name} is now connected.\n\nI can now access:\n• Recent activity and contributions\n• Communication patterns\n• Project involvement\n• Collaboration metrics\n\nWould you like to connect more tools or proceed to select an employee for review?`,
        buttons: [
          { text: "Connect More Tools", action: "connect_tools", variant: "outline" },
          { text: "Select Employee", action: "select_employee", variant: "default" }
        ]
      });
    }, 1500);
  };

  const handleSelectEmployee = () => {
    setCurrentStep("employee");
    
    simulateTyping(() => {
      addMessage({
        type: "bot",
        content: "Now let's select the employee you'd like to create a performance review for.\n\nI can analyze data from the past 90 days to provide comprehensive insights.\n\nWho would you like to review?",
        buttons: [
          { text: "Sarah Johnson (Dev)", action: "select_sarah", variant: "default" },
          { text: "Mike Chen (Designer)", action: "select_mike", variant: "outline" },
          { text: "Alex Rivera (PM)", action: "select_alex", variant: "outline" },
          { text: "Custom Employee", action: "custom_employee", variant: "secondary" }
        ]
      });
    });
  };

  const handleSelectSpecificEmployee = (employee: string) => {
    setSelectedEmployee(employee);
    setCurrentStep("signals");
    
    simulateTyping(() => {
      addMessage({
        type: "bot",
        content: `Perfect! I'll now gather performance signals for ${employee} from the past 90 days.\n\n🔍 Analyzing data from connected tools...\n📊 Processing communication patterns...\n🎯 Evaluating project contributions...\n👥 Assessing collaboration metrics...\n\nThis will take just a moment...`,
      });
    });

    // Simulate data gathering
    setTimeout(() => {
      simulateTyping(() => {
        addMessage({
          type: "bot",
          content: `🎉 Analysis complete! Here's what I found for ${employee}:\n\n📈 **Key Metrics (90 days):**\n• 47 commits to GitHub\n• 23 Jira tickets completed\n• 156 Slack messages\n• 12 code reviews participated\n• 8 meetings led\n\n🌟 **Strengths Identified:**\n• Consistent code quality\n• Strong collaboration\n• Proactive communication\n• Timely deliveries\n\nReady to generate the performance review draft?`,
          buttons: [
            { text: "Generate Review", action: "generate_review", variant: "default" },
            { text: "View Detailed Signals", action: "view_signals", variant: "outline" }
          ]
        });
      }, 3000);
    }, 4000);
  };

  const handleGenerateReview = () => {
    setCurrentStep("review");
    
    simulateTyping(() => {
      addMessage({
        type: "bot",
        content: `🎯 Generating comprehensive performance review...\n\n✨ Applying AI insights to create a balanced assessment...\n📝 Structuring feedback based on gathered signals...\n🎨 Formatting for readability...\n\nAlmost done...`,
      });
    });

    setTimeout(() => {
      simulateTyping(() => {
        addMessage({
          type: "bot",
          content: `📋 **Review Analysis Complete!**\n\n🎉 I've successfully generated a comprehensive performance review draft for ${selectedEmployee}.\n\nThe review includes:\n✅ **Key Achievements** - Major accomplishments and deliverables\n✅ **Collaboration & Communication** - Team interaction analysis\n✅ **Growth Areas & Development** - Recommendations for improvement\n\n📊 **Data Sources**: 90 days of activity from Slack, Jira, GitHub, and Notion\n🤖 **AI Confidence**: 94% accuracy\n\nYour draft is ready for review and editing!`,
          buttons: [
            { text: "View & Edit Draft", action: "view_draft", variant: "default" },
            { text: "Generate New Draft", action: "regenerate", variant: "outline" }
          ]
        });
      }, 3000);
    }, 4000);
  };

  const handleButtonClick = (action: string) => {
    switch (action) {
      case "connect_tools":
        handleConnectTools();
        break;
      case "learn_more":
        addMessage({
          type: "bot",
          content: "ReviewGenie uses AI to analyze workplace signals and create comprehensive performance reviews. I gather data from tools like Slack, Jira, GitHub, and more to provide objective insights into employee performance, collaboration, and contributions.\n\nReady to get started?",
          buttons: [
            { text: "Yes, Let's Start", action: "connect_tools", variant: "default" }
          ]
        });
        break;
      case "connect_slack":
        handleConnectIntegration("slack");
        break;
      case "connect_jira":
        handleConnectIntegration("jira");
        break;
      case "connect_github":
        handleConnectIntegration("github");
        break;
      case "select_employee":
        handleSelectEmployee();
        break;
      case "select_sarah":
        handleSelectSpecificEmployee("Sarah Johnson");
        break;
      case "select_mike":
        handleSelectSpecificEmployee("Mike Chen");
        break;
      case "select_alex":
        handleSelectSpecificEmployee("Alex Rivera");
        break;
      case "view_draft":
        onShowReviewDraft(selectedEmployee);
        break;
      case "generate_review":
        handleGenerateReview();
        break;
      case "export_review":
        toast({
          title: "Review Exported!",
          description: "Performance review has been exported to Google Docs and shared with HR.",
        });
        setCurrentStep("finalize");
        break;
      case "edit_review":
        onShowReviewDraft(selectedEmployee);
        break;
      case "new_review":
        setCurrentStep("employee");
        handleSelectEmployee();
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const handleSendMessage = (message: string) => {
    addMessage({
      type: "user",
      content: message
    });

    // Simple bot responses based on message content
    simulateTyping(() => {
      if (message.toLowerCase().includes("help")) {
        addMessage({
          type: "bot",
          content: "I'm here to help! I can assist you with:\n\n• Connecting workplace tools\n• Selecting employees for review\n• Gathering performance signals\n• Generating review drafts\n• Exporting final reviews\n\nWhat would you like to do?",
          buttons: [
            { text: "Connect Tools", action: "connect_tools", variant: "default" },
            { text: "Select Employee", action: "select_employee", variant: "outline" }
          ]
        });
      } else {
        addMessage({
          type: "bot",
          content: "I understand! Let me know if you need help with any part of the performance review process. You can use the buttons in our conversation to navigate through the steps, or ask me specific questions about the process."
        });
      }
    }, 1500);
  };

  return (
    <div className="h-screen flex bg-chat-bg">
      <Sidebar currentStep={currentStep} integrations={integrations} />
      
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-background border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-bot rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">RG</span>
            </div>
            <div>
              <h2 className="font-semibold">ReviewGenie Assistant</h2>
              <p className="text-xs text-muted-foreground">AI Performance Review Bot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onButtonClick={handleButtonClick}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          placeholder={isTyping ? "ReviewGenie is typing..." : "Ask me anything about performance reviews..."}
        />
      </div>
    </div>
  );
};