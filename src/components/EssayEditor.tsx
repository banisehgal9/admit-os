import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { AIChat } from './AIChat';

import { ArrowLeft, Save, FileText, Clock, Target, Sparkles, MessageCircle } from 'lucide-react';

interface EssayEditorProps {
  onBack: () => void;
  essayTitle: string;
  initialContent?: string;
  onGetCritique: () => void;
}

export function EssayEditor({ onBack, essayTitle, initialContent = '', onGetCritique }: EssayEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMinimized, setAiChatMinimized] = useState(false);

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const targetWords = 650;
  const readingTime = Math.ceil(wordCount / 200);

  const handleGetCritique = async () => {
    console.log('Get Critique button clicked');
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsLoading(false);
      onGetCritique();
    }, 2000);
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{essayTitle}</h1>
            <p className="text-muted-foreground">Personal Statement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAIChat(!showAIChat)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          <Button 
            onClick={handleGetCritique}
            disabled={isLoading || wordCount < 50}
            className="bg-accent hover:bg-accent/90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Get Critique'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Essay Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your personal statement here. Share your story, motivations, and goals..."
                className="min-h-[500px] resize-none text-base leading-relaxed"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Word Count */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Writing Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Word Count</span>
                <Badge variant={wordCount > targetWords ? 'destructive' : 'secondary'}>
                  {wordCount}/{targetWords}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Reading Time
                </span>
                <span className="text-sm">{readingTime} min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((wordCount / targetWords) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Be specific about your goals and motivations</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Show, don't tell - use concrete examples</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Connect your past to your future plans</span>
              </div>
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>Research the program thoroughly</span>
              </div>
            </CardContent>
          </Card>

          {/* Essay Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Essay Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                "Please discuss your post-MBA short and long term career goals. How will Harvard Business School help you achieve these goals?"
              </p>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* AI Chat Panel - Fixed Right Side */}
      {showAIChat && (
        <AIChat
          contentType="essay"
          contentTitle={essayTitle}
          currentContent={content}
          isMinimized={aiChatMinimized}
          onMinimize={() => setAiChatMinimized(true)}
          onMaximize={() => setAiChatMinimized(false)}
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
}