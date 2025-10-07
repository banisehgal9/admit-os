import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, Edit3, Building2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Program } from './ProgramCard';
import { Task } from './TaskList';

interface ReferenceSelectionProps {
  programs: Program[];
  tasks: Task[];
  onBack: () => void;
  onReferenceEdit: (programId: string, taskId: string) => void;
}

export function ReferenceSelection({ programs, tasks, onBack, onReferenceEdit }: ReferenceSelectionProps) {
  // Filter tasks to only show recommendation letters
  const referenceTasks = tasks.filter(task => task.category === 'recommendation');

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getProgramForTask = (taskId: string) => {
    // Extract program ID from task ID (assuming format: programId-task-X)
    const programId = taskId.split('-')[0];
    return programs.find(p => p.id === programId);
  };

  // Group tasks by program
  const tasksByProgram = programs.map(program => ({
    program,
    tasks: referenceTasks.filter(task => task.id.startsWith(program.id))
  })).filter(group => group.tasks.length > 0);

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
        <h1>Reference Letters</h1>
        <p className="text-muted-foreground">
          Edit and improve your reference letters with AI-powered feedback
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{referenceTasks.length}</p>
                <p className="text-sm text-muted-foreground">Total References</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {referenceTasks.filter(task => task.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {referenceTasks.filter(task => task.status === 'in-progress').length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">
                  {referenceTasks.filter(task => task.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* References by Program */}
      <div className="space-y-6">
        {tasksByProgram.map(({ program, tasks }) => (
          <Card key={program.id} className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building2 className="h-5 w-5" />
                {program.school} - {program.program}
                <Badge variant="outline" className="ml-auto">
                  Due {program.deadline}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow border border-border"
                    onClick={() => onReferenceEdit(program.id, task.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{task.title}</h4>
                          {getStatusIcon(task.status)}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant={getStatusBadgeVariant(task.status)}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-8 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReferenceEdit(program.id, task.id);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Due: {task.dueDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {referenceTasks.length === 0 && (
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Reference Letters Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You don't have any reference letter tasks yet. Create some applications first or add reference tasks.
            </p>
            <Button onClick={onBack}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}