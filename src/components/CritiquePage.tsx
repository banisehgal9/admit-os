import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Sparkles, CheckCircle, Info, AlertCircle, Save, Clock, TrendingUp } from 'lucide-react';

interface CritiquePageProps {
  onBack: () => void;
  title: string;
  content: string;
  contentType?: 'essay' | 'reference';
}

interface CritiqueData {
  overallScore: number;
  wordCount: number;
  readabilityScore: number;
  version: string;
  clarity: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  story: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  fit: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  impact: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  style: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
}

export function CritiquePage({ onBack, title, content, contentType = 'essay' }: CritiquePageProps) {
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  // Mock critique data - in real app this would come from AI analysis
  const generateCritique = (): CritiqueData => {
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    if (contentType === 'reference') {
      return {
        overallScore: 84,
        wordCount,
        readabilityScore: 88,
        version: 'v2.1',
        clarity: {
          score: 87,
          feedback: 'The letter demonstrates professional clarity and structure. The relationship to the applicant is clearly established and maintained throughout.',
          suggestions: [
            'Consider adding specific dates or timeframes for better context',
            'Include the recommender\'s credentials earlier in the letter',
            'Clarify the scope of the recommender\'s role and authority'
          ]
        },
        story: {
          score: 82,
          feedback: 'Strong narrative about the applicant\'s growth and achievements. The progression from technical contributor to leader is well-documented.',
          suggestions: [
            'Add more specific examples of leadership situations',
            'Include details about team size and project complexity',
            'Mention specific skills that predict MBA success'
          ]
        },
        fit: {
          score: 78,
          feedback: 'Good endorsement for business school, but could be more specific about why this applicant fits this particular program.',
          suggestions: [
            'Connect applicant\'s strengths to specific MBA competencies',
            'Mention relevance to the target school or program type',
            'Include prediction of future business leadership potential'
          ]
        },
        impact: {
          score: 89,
          feedback: 'Excellent quantification of achievements. The $2M cost savings and 25% efficiency improvements provide strong evidence of business impact.',
          suggestions: [
            'Add context about industry or company benchmarks',
            'Mention the applicant\'s role in achieving these results',
            'Include examples of strategic thinking or innovation'
          ]
        },
        style: {
          score: 85,
          feedback: 'Professional letter format with appropriate business tone. The language is authoritative and supportive throughout.',
          suggestions: [
            'Consider stronger superlatives in the endorsement',
            'Add a brief comparison to other candidates if appropriate',
            'Ensure contact information is prominently displayed'
          ]
        }
      };
    } else {
      return {
        overallScore: 78,
        wordCount,
        readabilityScore: 85,
        version: 'v3.0',
        clarity: {
          score: 82,
          feedback: 'Your essay demonstrates strong clarity in most sections. The opening paragraph effectively sets the context, and your examples are well-explained.',
          suggestions: [
            'Consider breaking down the second paragraph for better flow',
            'Add transition sentences between major points',
            'Clarify the connection between your engineering background and business goals'
          ]
        },
        story: {
          score: 75,
          feedback: 'Your narrative arc is compelling, showing clear progression from engineering to consulting. However, the story could benefit from more personal moments.',
          suggestions: [
            'Include a specific moment of realization or challenge',
            'Add more detail about your leadership experience at TechCorp',
            'Connect your personal values to your professional journey'
          ]
        },
        fit: {
          score: 68,
          feedback: 'You demonstrate good understanding of how an MBA fits your goals, but could be more specific about this particular program.',
          suggestions: [
            'Research and mention specific courses or professors',
            'Connect your goals to unique program features',
            'Show knowledge of the school\'s culture and values'
          ]
        },
        impact: {
          score: 85,
          feedback: 'Excellent quantification of your achievements. The 25% efficiency improvement is compelling and demonstrates real business impact.',
          suggestions: [
            'Add context about the scale of the projects',
            'Mention the teams you led and their size',
            'Include long-term impact or follow-up results'
          ]
        },
        style: {
          score: 80,
          feedback: 'Professional tone and good sentence structure. Writing flows well and maintains reader engagement throughout.',
          suggestions: [
            'Vary sentence length for better rhythm',
            'Consider stronger action verbs in key moments',
            'Review for any redundant phrases'
          ]
        }
      };
    }
  };

  const critique: CritiqueData = generateCritique();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <Info className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  const categories = [
    { key: 'clarity', title: 'Clarity', icon: '🔍' },
    { key: 'story', title: 'Story', icon: '📖' },
    { key: 'fit', title: 'Fit', icon: '🎯' },
    { key: 'impact', title: 'Impact', icon: '⚡' },
    { key: 'style', title: 'Style', icon: '✨' }
  ];

  const handleSaveReport = () => {
    // In real app, this would save the critique report
    console.log('Saving critique report...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1>AI Essay Critique</h1>
              <Badge variant="outline" className="ml-2">
                {critique.version}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowVersionHistory(!showVersionHistory)}
          >
            <Clock className="h-4 w-4 mr-2" />
            {showVersionHistory ? 'Hide' : 'View'} History
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveReport}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
        </div>
      </div>

      {/* Version History Panel */}
      {showVersionHistory && (
        <Card className="border-0 shadow-sm bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Critique History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border">
                <div>
                  <div className="font-medium">Version 3.0 (Current)</div>
                  <div className="text-sm text-muted-foreground">Generated just now</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">78/100</div>
                  <div className="text-xs text-muted-foreground">+5 from v2.0</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
                <div>
                  <div className="font-medium">Version 2.0</div>
                  <div className="text-sm text-muted-foreground">3 days ago</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">73/100</div>
                  <div className="text-xs text-muted-foreground">+8 from v1.0</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Score */}
      <Card className="border-0 shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(critique.overallScore)}`}>
                {critique.overallScore}/100
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold">{critique.wordCount}</div>
              <p className="text-sm text-muted-foreground">Word Count</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-600">{critique.readabilityScore}%</div>
              <p className="text-sm text-muted-foreground">Readability</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-accent">{critique.version}</div>
              <p className="text-sm text-muted-foreground">Version</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const data = critique[category.key as keyof typeof critique] as any;
          return (
            <Card key={category.key} className="border-0 shadow-sm bg-background hover:shadow-md transition-shadow h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  {category.title}
                  {getScoreIcon(data.score)}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Progress value={data.score} className="flex-1 h-2" />
                  <span className={`font-semibold ${getScoreColor(data.score)}`}>
                    {data.score}/100
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.feedback}
                  </p>
                </div>
                {data.suggestions && data.suggestions.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2 text-foreground">
                      Suggestions for Improvement:
                    </h5>
                    <ul className="space-y-1">
                      {data.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Items */}
      <Card className="border-0 shadow-sm bg-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <Badge variant="destructive" className="mt-0.5">High Priority</Badge>
              <div className="flex-1">
                <p className="font-medium">Strengthen program fit section</p>
                <p className="text-sm text-muted-foreground mt-1">Research specific courses, professors, and unique program features to demonstrate deeper knowledge and fit.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <Badge variant="outline" className="mt-0.5 border-yellow-500 text-yellow-700 dark:text-yellow-400">Medium Priority</Badge>
              <div className="flex-1">
                <p className="font-medium">Add more personal narrative elements</p>
                <p className="text-sm text-muted-foreground mt-1">Include specific moments of challenge or realization that shaped your journey and goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Badge variant="outline" className="mt-0.5 border-green-500 text-green-700 dark:text-green-400">Low Priority</Badge>
              <div className="flex-1">
                <p className="font-medium">Refine writing style and flow</p>
                <p className="text-sm text-muted-foreground mt-1">Minor improvements to sentence variety and transitions between paragraphs.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}