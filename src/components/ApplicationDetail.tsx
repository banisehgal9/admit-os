import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TaskList, Task } from './TaskList';
import { ArrowLeft, Calendar, ExternalLink, MapPin, DollarSign, PenTool } from 'lucide-react';
import { Program } from './ProgramCard';
import { NewEssayModal } from './NewEssayModal';

interface ApplicationDetailProps {
  program: Program;
  tasks: Task[];
  onBack: () => void;
  onTaskToggle: (taskId: string) => void;
  onEssayEdit: (taskId: string) => void;
  onReferenceEdit: (taskId: string) => void;
  onCreateEssay: (essayData: {
    title: string;
    prompt: string;
    wordLimit: number;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
  }) => void;
}

export function ApplicationDetail({ program, tasks, onBack, onTaskToggle, onEssayEdit, onReferenceEdit, onCreateEssay }: ApplicationDetailProps) {
  const [isNewEssayModalOpen, setIsNewEssayModalOpen] = useState(false);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Program Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{program.school}</CardTitle>
                  <CardDescription className="text-lg mt-1">{program.program}</CardDescription>
                </div>
                <Badge className="capitalize">
                  {program.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p className="text-muted-foreground">{program.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Boston, MA</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">App Fee</p>
                    <p className="text-muted-foreground">$150</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Portal</p>
                    <a href="#" className="text-primary hover:underline">View Online</a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Program Details</h4>
                <p className="text-sm text-muted-foreground">
                  The {program.program} at {program.school} is a highly competitive program that prepares students for leadership roles in business and management. The program emphasizes case-based learning, team collaboration, and real-world application of business concepts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{program.progress}%</div>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasks completed</span>
                  <span>{program.completedTasks}/{program.totalTasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Days remaining</span>
                  <span>45 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Priority</span>
                  <Badge className="capitalize" variant={program.priority === 'high' ? 'destructive' : 'secondary'}>
                    {program.priority}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>GMAT Score</span>
                <Badge variant="outline">Required</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Work Experience</span>
                <Badge variant="outline">2+ years</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Essays</span>
                <Badge variant="outline">3 required</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Recommendations</span>
                <Badge variant="outline">2 required</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task List */}
      <TaskList 
        tasks={tasks} 
        onTaskToggle={onTaskToggle}
        onEssayEdit={onEssayEdit}
        onReferenceEdit={onReferenceEdit}
      />

      {/* Add New Essay */}
      <Card className="border-0 shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Need to add another essay?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start a new essay with a custom prompt for this application
              </p>
            </div>
            <Button 
              onClick={() => setIsNewEssayModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <PenTool className="h-4 w-4 mr-2" />
              Start New Essay
            </Button>
          </div>
        </CardContent>
      </Card>

      <NewEssayModal
        isOpen={isNewEssayModalOpen}
        onClose={() => setIsNewEssayModalOpen(false)}
        onCreateEssay={onCreateEssay}
        programName={`${program.school} - ${program.program}`}
      />
    </div>
  );
}