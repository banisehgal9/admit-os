import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MessageCircle, Send, Bot, User, Lightbulb, FileText, CheckCircle, AlertTriangle, Minimize2, Maximize2, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatProps {
  contentType: 'essay' | 'reference';
  contentTitle?: string;
  currentContent?: string;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

const SAMPLE_SUGGESTIONS = {
  essay: [
    "How can I make my opening more compelling?",
    "Help me strengthen my leadership examples",
    "What's missing from my career narrative?",
    "How can I better connect my goals to this program?",
    "Review my essay structure and flow"
  ],
  reference: [
    "How can I request this recommendation effectively?",
    "What specific examples should I suggest?",
    "Help me draft key talking points",
    "Review the tone and professionalism",
    "Suggest improvements for impact"
  ]
};

const MOCK_RESPONSES = {
  essay: {
    opening: "Your opening paragraph sets the foundation for your entire essay. Consider starting with a specific moment or achievement that immediately demonstrates your leadership potential. For example, instead of 'I have always been interested in business,' try something like 'When our team faced a 40% budget cut three weeks before launch, I knew traditional solutions wouldn't work.' This creates immediate engagement and shows rather than tells.",
    structure: "Your essay structure looks solid overall. I'd suggest strengthening the connection between your experiences and your future goals. Consider adding a brief transition sentence between paragraphs 2 and 3 to show how your consulting experience directly led to your interest in sustainable technology. This will make your narrative flow more naturally.",
    examples: "Your leadership examples are strong, but you could make them more impactful by quantifying the results. Instead of 'led a successful project,' try 'led a cross-functional team of 8 that increased efficiency by 25% and saved $200K annually.' Specific metrics help admissions committees understand the scope of your impact.",
    goals: "Your career goals are clear, but try connecting them more explicitly to the specific school's offerings. Mention particular courses, professors, or programs that align with your interests. This shows you've done your research and are genuinely interested in what this specific program offers."
  },
  reference: {
    request: "When requesting a recommendation, provide your recommender with a brief but comprehensive packet including: your resume, the specific programs you're applying to, key achievements you'd like them to highlight, and the deadline calendar. Give them at least 6-8 weeks notice and offer to meet to discuss your goals.",
    examples: "Suggest 2-3 specific examples they could use: quantified achievements (metrics, awards, promotions), leadership situations where you made a difference, and instances where you overcame challenges. Make it easy for them by providing the context and outcomes.",
    talking_points: "Key talking points to share with your recommender: your unique strengths, specific examples of your impact, your growth trajectory, and why you're pursuing an MBA now. Help them understand how to position you compared to other candidates they've recommended.",
    tone: "The tone strikes a good balance between professional and personal. Your recommender should sound like they know you well while maintaining credibility. Avoid overly casual language while ensuring it doesn't sound too formal or generic."
  }
};

export function AIChat({ 
  contentType, 
  contentTitle, 
  currentContent,
  isMinimized = false,
  onMinimize,
  onMaximize,
  onClose 
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hi! I'm your AI writing assistant. I'm here to help you improve your ${contentType === 'essay' ? 'essay' : 'recommendation letter'}. I can provide feedback on structure, content, tone, and strategy. What would you like to work on?`,
      timestamp: new Date(),
      suggestions: SAMPLE_SUGGESTIONS[contentType]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = MOCK_RESPONSES[contentType];
    
    if (message.includes('opening') || message.includes('start') || message.includes('introduction')) {
      return responses.opening || responses.request || "Great question! Let me help you with that.";
    } else if (message.includes('structure') || message.includes('flow') || message.includes('organization')) {
      return responses.structure || responses.talking_points || "Structure is crucial for a compelling narrative.";
    } else if (message.includes('example') || message.includes('achievement') || message.includes('story')) {
      return responses.examples || "Specific examples make your content much more compelling.";
    } else if (message.includes('goal') || message.includes('future') || message.includes('career')) {
      return responses.goals || responses.tone || "Clear goals help create a focused narrative.";
    } else if (message.includes('tone') || message.includes('professional') || message.includes('sound')) {
      return responses.tone || responses.request || "Tone is important for making the right impression.";
    } else {
      // General helpful response
      const generalResponses = [
        "That's a great question! Based on your content, I'd suggest focusing on specific, quantifiable achievements that demonstrate your impact.",
        "I see what you're working on. Consider strengthening the connection between your experiences and your future goals.",
        "Good thinking! This is exactly the kind of strategic approach that admissions committees appreciate.",
        "This is an important area to focus on. Let me suggest a few specific ways to enhance this section."
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(userMessage.content),
        timestamp: new Date(),
        suggestions: Math.random() > 0.7 ? SAMPLE_SUGGESTIONS[contentType].slice(0, 3) : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
        <Card className="w-12 h-20 shadow-lg border-accent/20 cursor-pointer" onClick={onMaximize}>
          <CardContent className="p-2 flex flex-col items-center justify-center h-full">
            <Bot className="h-6 w-6 text-accent mb-1" />
            <Badge variant="secondary" className="text-xs px-1">
              {messages.length - 1}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 z-50 transform transition-transform duration-300 ease-in-out">
      <Card className="h-full flex flex-col border-accent/20 shadow-xl border-l-2 border-l-accent rounded-l-lg rounded-r-none">
        <CardHeader className="p-4 border-b bg-card/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-accent" />
              <div>
                <CardTitle className="text-base">AI Writing Assistant</CardTitle>
                {contentTitle && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Helping with: {contentTitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {onMinimize && (
                <Button variant="ghost" size="sm" onClick={onMinimize}>
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 bg-card/95 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'assistant' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Lightbulb className="h-3 w-3" />
                              Try asking:
                            </p>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-auto py-1 px-2 w-full justify-start"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator />
          
          <div className="p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask about your ${contentType}...`}
                disabled={isTyping}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isTyping}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}