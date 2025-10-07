import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { Program } from './ProgramCard';
import { Task } from './TaskList';

interface DeadlineCheckProps {
  programs: Program[];
  tasks: Task[];
  onBack: () => void;
  onProgramClick: (programId: string) => void;
}

export function DeadlineCheck({ programs, tasks, onBack, onProgramClick }: DeadlineCheckProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Categorize programs by urgency (exclude submitted and decision-pending)
  const categorizePrograms = () => {
    const activePrograms = programs.filter(p => 
      p.status !== 'submitted' && p.status !== 'decision-pending'
    );
    
    const urgent = activePrograms.filter(p => getDaysUntilDeadline(p.deadline) <= 14);
    const upcoming = activePrograms.filter(p => {
      const days = getDaysUntilDeadline(p.deadline);
      return days > 14 && days <= 30;
    });
    const later = activePrograms.filter(p => getDaysUntilDeadline(p.deadline) > 30);
    
    return { urgent, upcoming, later };
  };

  const { urgent, upcoming, later } = categorizePrograms();

  // Get upcoming tasks in next 7 days
  const getUpcomingTasks = () => {
    return tasks.filter(task => {
      const taskDays = getDaysUntilDeadline(task.dueDate);
      return taskDays <= 7 && taskDays >= 0 && task.status !== 'completed';
    }).sort((a, b) => getDaysUntilDeadline(a.dueDate) - getDaysUntilDeadline(b.dueDate));
  };

  const upcomingTasks = getUpcomingTasks();

  const getUrgencyIcon = (days: number) => {
    if (days <= 7) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (days <= 14) return <Clock className="h-5 w-5 text-orange-500" />;
    if (days <= 30) return <CalendarIcon className="h-5 w-5 text-blue-500" />;
    return <Target className="h-5 w-5 text-green-500" />;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return 'bg-red-100 text-red-700 border-red-200';
    if (days <= 14) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (days <= 30) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-green-100 text-green-700 border-green-200';
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
        <h1>Check Deadlines</h1>
        <p className="text-muted-foreground">
          Review upcoming due dates and stay on track with your applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>
        </div>

        {/* Deadlines Overview */}
        <div className="lg:col-span-3 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-red-600">{urgent.length}</div>
                  <p className="text-sm text-muted-foreground">Urgent (≤14 days)</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-orange-600">{upcoming.length}</div>
                  <p className="text-sm text-muted-foreground">Upcoming (15-30 days)</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-600">{upcomingTasks.length}</div>
                  <p className="text-sm text-muted-foreground">Tasks Due This Week</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">{later.length}</div>
                  <p className="text-sm text-muted-foreground">Future (30+ days)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Urgent Deadlines */}
          {urgent.length > 0 && (
            <Card className="border-0 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Urgent Deadlines (≤14 days)
                </CardTitle>
                <CardDescription>These applications need immediate attention!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {urgent.map((program) => {
                    const days = getDaysUntilDeadline(program.deadline);
                    return (
                      <div 
                        key={program.id} 
                        className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onProgramClick(program.id)}
                      >
                        <div className="flex items-center gap-4">
                          {getUrgencyIcon(days)}
                          <div>
                            <h4 className="font-medium">{program.school}</h4>
                            <p className="text-sm text-muted-foreground">{program.program}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getUrgencyColor(days)}>
                                {days <= 0 ? 'Overdue' : `${days} days left`}
                              </Badge>
                              <Badge variant="outline">
                                {program.progress}% complete
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{program.deadline}</p>
                          <p className="text-sm text-muted-foreground">
                            {program.completedTasks}/{program.totalTasks} tasks done
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Tasks This Week */}
          {upcomingTasks.length > 0 && (
            <Card className="border-0 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Tasks Due This Week
                </CardTitle>
                <CardDescription>Focus on these tasks to stay on schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => {
                    const days = getDaysUntilDeadline(task.dueDate);
                    return (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          {getUrgencyIcon(days)}
                          <div>
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <p className="text-xs text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getUrgencyColor(days)} variant="secondary">
                            {days === 0 ? 'Due today' : `${days} days`}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Programs Timeline */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle>Complete Timeline</CardTitle>
              <CardDescription>All your program deadlines at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...urgent, ...upcoming, ...later].map((program) => {
                  const days = getDaysUntilDeadline(program.deadline);
                  return (
                    <div 
                      key={program.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onProgramClick(program.id)}
                    >
                      <div className="flex items-center gap-4">
                        {getUrgencyIcon(days)}
                        <div>
                          <h4 className="font-medium">{program.school}</h4>
                          <p className="text-sm text-muted-foreground">{program.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">{program.deadline}</p>
                          <Badge className={getUrgencyColor(days)} variant="secondary">
                            {days <= 0 ? 'Overdue' : `${days} days`}
                          </Badge>
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}