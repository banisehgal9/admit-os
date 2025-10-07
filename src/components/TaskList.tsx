import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CalendarDays, Clock, AlertCircle, FileText, Users, GraduationCap, CheckCircle2, File } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  category: 'application' | 'essay' | 'recommendation' | 'documents' | 'test-scores';
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onEssayEdit: (taskId: string) => void;
  onReferenceEdit: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskToggle, onEssayEdit, onReferenceEdit }: TaskListProps) {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'application': return 'bg-blue-100 text-blue-700';
      case 'essay': return 'bg-purple-100 text-purple-700';
      case 'recommendation': return 'bg-green-100 text-green-700';
      case 'documents': return 'bg-orange-100 text-orange-700';
      case 'test-scores': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'application': return <File className="h-4 w-4 text-blue-600" />;
      case 'essay': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'recommendation': return <Users className="h-4 w-4 text-green-600" />;
      case 'documents': return <File className="h-4 w-4 text-orange-600" />;
      case 'test-scores': return <GraduationCap className="h-4 w-4 text-red-600" />;
      default: return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    if (priority === 'high') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <Card className="border-0 shadow-sm bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Application Tasks</CardTitle>
          <div className="text-sm text-muted-foreground">
            {completedTasks}/{tasks.length} completed
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-3 p-4 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Checkbox
                    checked={task.status === 'completed'}
                    onCheckedChange={() => onTaskToggle(task.id)}
                  />
                )}
                {getCategoryIcon(task.category)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      {getPriorityIcon(task.priority)}
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(task.category)}>
                      {task.category.replace('-', ' ')}
                    </Badge>
                    {task.category === 'essay' && (
                      <button
                        onClick={() => onEssayEdit(task.id)}
                        className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Edit Essay
                      </button>
                    )}
                    {task.category === 'recommendation' && (
                      <button
                        onClick={() => onReferenceEdit(task.id)}
                        className="text-xs bg-accent text-accent-foreground px-3 py-1.5 rounded-md hover:bg-accent/90 transition-colors"
                      >
                        Edit Reference
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    <span className={isOverdue(task.dueDate) ? 'text-red-500 font-medium' : ''}>
                      Due {task.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="capitalize">{task.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}