import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, AlertCircle, Info, Lightbulb, Sparkles, Download, Save, History, Calendar } from 'lucide-react';

interface CritiqueData {
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
  overallScore: number;
  wordCount: number;
  readingTime: string;
  version?: string;
  timestamp?: string;
  essayTitle?: string;
}

interface CritiqueVersion {
  id: string;
  version: string;
  timestamp: string;
  overallScore: number;
  wordCount: number;
  changes: string;
}

interface CritiqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  critique: CritiqueData | null;
}

export function CritiqueModal({ isOpen, onClose, critique }: CritiqueModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>('current');
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  console.log('CritiqueModal render:', { isOpen, critique: !!critique }); // Debug log

  if (!critique) return null;

  // Mock version history data
  const versionHistory: CritiqueVersion[] = [
    {
      id: 'v3',
      version: 'v3.0 (Current)',
      timestamp: 'Oct 1, 2025 - 2:30 PM',
      overallScore: critique.overallScore,
      wordCount: critique.wordCount,
      changes: 'Strengthened opening paragraph, added specific examples'
    },
    {
      id: 'v2',
      version: 'v2.1',
      timestamp: 'Sep 30, 2025 - 4:15 PM',
      overallScore: 72,
      wordCount: 648,
      changes: 'Improved fit section, refined career goals'
    },
    {
      id: 'v1',
      version: 'v1.0',
      timestamp: 'Sep 29, 2025 - 10:00 AM',
      overallScore: 68,
      wordCount: 592,
      changes: 'Initial draft'
    }
  ];

  const handleExportReport = (format: 'pdf' | 'docx' | 'txt') => {
    // Mock export functionality
    const filename = `essay-critique-${critique.essayTitle || 'untitled'}-${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Exporting critique report as ${filename}`);
    // In a real app, this would generate and download the file
    alert(`Critique report exported as ${format.toUpperCase()}`);
  };

  const handleSaveReport = () => {
    // Mock save functionality
    console.log('Saving critique report to user account');
    alert('Critique report saved successfully!');
  };

  const getVersionColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-[98vw] max-h-[98vh] h-[98vh] border-0 shadow-xl bg-card overflow-hidden">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Essay Critique
                <Badge variant="outline" className="ml-2">
                  {critique.version || 'v3.0'}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Detailed feedback on your essay with actionable suggestions for improvement
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVersionHistory(!showVersionHistory)}
              >
                <History className="h-4 w-4 mr-2" />
                Version History
              </Button>
              <Select onValueChange={(value) => handleExportReport(value as 'pdf' | 'docx' | 'txt')}>
                <SelectTrigger className="w-32">
                  <Download className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Export PDF</SelectItem>
                  <SelectItem value="docx">Export DOCX</SelectItem>
                  <SelectItem value="txt">Export TXT</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveReport}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto max-h-[calc(98vh-180px)] pr-6">
          {/* Version History Panel */}
          {showVersionHistory && (
            <Card className="border-0 shadow-sm bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <History className="h-5 w-5" />
                  Version History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {versionHistory.map((version) => (
                    <div key={version.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-background/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <div>
                          <h4 className="font-medium text-sm">{version.version}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {version.timestamp}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{version.changes}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${getVersionColor(version.overallScore)}`}>
                          {version.overallScore}/100
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {version.wordCount} words
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Overall Score */}
          <Card className="border-0 shadow-sm bg-background">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Assessment</span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {critique.timestamp || 'Oct 1, 2025 - 2:30 PM'}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(critique.overallScore)}`}>
                    {critique.overallScore}/100
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">{critique.wordCount}</div>
                  <p className="text-sm text-muted-foreground">Word Count</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">{critique.readingTime}</div>
                  <p className="text-sm text-muted-foreground">Reading Time</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-accent">+4</div>
                  <p className="text-sm text-muted-foreground">Score Improvement</p>
                </div>
              </div>
              
              {/* Progress Chart */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progress Over Time</span>
                  <span className="text-muted-foreground">3 versions</span>
                </div>
                <div className="flex items-end gap-2 h-16">
                  <div className="flex-1 bg-gray-200 rounded-t" style={{height: '60%'}}>
                    <div className="text-xs text-center mt-1">v1.0</div>
                    <div className="text-xs text-center text-muted-foreground">68</div>
                  </div>
                  <div className="flex-1 bg-blue-200 rounded-t" style={{height: '75%'}}>
                    <div className="text-xs text-center mt-1">v2.1</div>
                    <div className="text-xs text-center text-muted-foreground">72</div>
                  </div>
                  <div className="flex-1 bg-accent/20 rounded-t" style={{height: '95%'}}>
                    <div className="text-xs text-center mt-1">v3.0</div>
                    <div className="text-xs text-center text-muted-foreground">{critique.overallScore}</div>
                  </div>
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
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getScoreIcon(data.score)}
                        <span className={`font-bold ${getScoreColor(data.score)}`}>
                          {data.score}/100
                        </span>
                      </div>
                    </CardTitle>
                    <Progress value={data.score} className="h-2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-1">Feedback</h5>
                      <p className="text-sm text-muted-foreground">{data.feedback}</p>
                    </div>
                    
                    {data.suggestions.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4" />
                          Suggestions
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
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">High Priority</Badge>
                  <span className="text-sm">Strengthen your opening paragraph to better capture attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Medium Priority</Badge>
                  <span className="text-sm">Add more specific examples to support your claims</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Low Priority</Badge>
                  <span className="text-sm">Consider varying sentence structure for better flow</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}