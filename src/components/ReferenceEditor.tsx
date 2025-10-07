import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { AIChat } from './AIChat';
import { ArrowLeft, Save, Sparkles, Users, FileText, Clock, Target, MessageCircle } from 'lucide-react';

interface ReferenceEditorProps {
  onBack: () => void;
  referenceTitle: string;
  initialContent?: string;
  onGetCritique: () => void;
}

export function ReferenceEditor({ 
  onBack, 
  referenceTitle, 
  initialContent = '', 
  onGetCritique 
}: ReferenceEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaved, setIsSaved] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMinimized, setAiChatMinimized] = useState(false);

  const handleSave = () => {
    // Mock save functionality
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  // Mock reference letter guidelines
  const guidelines = [
    "Professional header with recommender's contact information",
    "Clear statement of relationship to applicant",
    "Specific examples of performance and achievements",
    "Comparison to peers or other candidates",
    "Strong endorsement for the specific program",
    "Professional closing with offer for follow-up"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to References
          </Button>
          <div>
            <h1>{referenceTitle}</h1>
            <p className="text-sm text-muted-foreground">
              Edit and improve your reference letter content
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            variant="outline"
            size="sm"
            className={isSaved ? "bg-green-50 border-green-200 text-green-700" : ""}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaved ? "Saved!" : "Save Draft"}
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
            onClick={onGetCritique}
            className="bg-accent hover:bg-accent/90 hover:text-white"
            disabled={content.trim().length < 50}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get AI Critique
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Main Editor */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reference Letter Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Dear Admissions Committee,

I am writing to provide my strongest recommendation for [Applicant Name] for admission to your MBA program. As [Title] at [Company], I have had the pleasure of working closely with [Applicant Name] for [Time Period] and can attest to their exceptional...

[Please provide specific examples and details about the applicant's performance, achievements, and potential.]

Sincerely,
[Recommender Name]
[Title]
[Company]
[Contact Information]"
                className="min-h-[600px] resize-none text-sm leading-relaxed"
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </CardContent>
          </Card>

          {/* Writing Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{wordCount}</div>
                <p className="text-xs text-muted-foreground">Words</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{charCount}</div>
                <p className="text-xs text-muted-foreground">Characters</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">~{Math.ceil(wordCount / 250)}</div>
                <p className="text-xs text-muted-foreground">Pages</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">~{Math.ceil(wordCount / 200)}</div>
                <p className="text-xs text-muted-foreground">Min Read</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Reference Guidelines */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Reference Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{guideline}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reference Tips */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  Professional Tone
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Maintain formal business language throughout
                </p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  Specific Examples
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Include concrete achievements and measurable results
                </p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  Strong Endorsement
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Clearly state recommendation for admission
                </p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">
                  Length: 1-2 Pages
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Aim for 400-800 words for optimal impact
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Progress
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={onGetCritique}
                disabled={content.trim().length < 50}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Review
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* AI Chat Panel - Fixed Right Side */}
      {showAIChat && (
        <AIChat
          contentType="reference"
          contentTitle={referenceTitle}
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