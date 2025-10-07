import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, FileText, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Program } from './ProgramCard';
import { Task } from './TaskList';

interface EssaySelectionProps {
  programs: Program[];
  tasks: Task[];
  onBack: () => void;
  onEssayEdit: (programId: string, taskId: string) => void;
}

export function EssaySelection({ programs, tasks, onBack, onEssayEdit }: EssaySelectionProps) {
  // Get all essay tasks grouped by program
  const essayTasks = tasks.filter(task => task.category === 'essay');
  
  const getEssaysByProgram = () => {
    return programs.map(program => ({
      program,
      essays: essayTasks.filter(task => {
        // Mock logic to associate essays with programs
        return ['1', '2', '3'].includes(task.id) && program.id === '1' ||
               ['essay-4', 'essay-5'].includes(task.id) && program.id === '2' ||
               task.id === '2' && program.id === '1' ||
               task.id === '3' && program.id === '1';
      })
    })).filter(item => item.essays.length > 0);
  };

  const programEssays = getEssaysByProgram();

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div>
        <h1>Update Essays</h1>
        <p className="text-muted-foreground">
          Select an essay to edit and improve your application content
        </p>
      </div>

      {/* Essay Cards by Program */}
      <div className="space-y-8">
        {programEssays.map(({ program, essays }) => (
          <Card key={program.id} className="border-0 shadow-sm bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    {program.school}
                  </CardTitle>
                  <CardDescription>{program.program}</CardDescription>
                </div>
                <Badge variant="outline">
                  {essays.length} essay{essays.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {essays.map((essay) => (
                  <div key={essay.id} className="flex items-center justify-between p-4 border rounded-lg bg-background hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(essay.status)}
                      <div className="space-y-1">
                        <h4 className="font-medium">{essay.title}</h4>
                        <p className="text-sm text-muted-foreground">{essay.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Due {essay.dueDate}</span>
                          <Badge className={getStatusColor(essay.status)} variant="secondary">
                            {essay.status.replace('-', ' ')}
                          </Badge>
                          {essay.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              High Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => onEssayEdit(program.id, essay.id)}
                      className="bg-accent hover:bg-accent/90 hover:text-white transition-colors"
                    >
                      {essay.status === 'completed' ? 'Review Essay' : 
                       essay.status === 'in-progress' ? 'Continue Writing' : 
                       'Start Essay'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* All Programs Quick Overview */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader>
            <CardTitle>All Essays Overview</CardTitle>
            <CardDescription>Quick status overview across all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {essayTasks.filter(e => e.status === 'completed').length}
                </div>
                <p className="text-sm text-muted-foreground">Completed Essays</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {essayTasks.filter(e => e.status === 'in-progress').length}
                </div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-600">
                  {essayTasks.filter(e => e.status === 'pending').length}
                </div>
                <p className="text-sm text-muted-foreground">Not Started</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}