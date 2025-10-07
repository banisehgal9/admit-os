import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Users, Mail, Phone, Building2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Program } from './ProgramCard';
import { Task } from './TaskList';

interface ReferenceRequestProps {
  programs: Program[];
  tasks: Task[];
  onBack: () => void;
}

export function ReferenceRequest({ programs, tasks, onBack }: ReferenceRequestProps) {
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [referenceType, setReferenceType] = useState<string>('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    relationship: ''
  });
  const [message, setMessage] = useState('');

  // Get recommendation tasks
  const recommendationTasks = tasks.filter(task => task.category === 'recommendation');

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

  const handleSubmit = () => {
    // Mock submission
    alert(`Reference request sent for ${programs.find(p => p.id === selectedProgram)?.school || 'selected program'}!`);
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
        <h1>Request References</h1>
        <p className="text-muted-foreground">
          Follow up with recommenders and track your reference requests
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current References Status */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Current References
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendationTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getStatusIcon(task.status)}
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="text-xs" variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                      {/* Show schools for submitted/pending references */}
                      {(task.status === 'completed' || task.status === 'in-progress') && (
                        <div className="flex gap-1 flex-wrap">
                          {programs.slice(0, 2).map((program) => (
                            <Badge key={program.id} variant="outline" className="text-xs">
                              {program.school.split(' ')[0]}
                            </Badge>
                          ))}
                          {programs.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{programs.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle>Reference Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {recommendationTasks.filter(t => t.status === 'completed').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Received</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {recommendationTasks.filter(t => t.status !== 'completed').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Reference Request Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <CardTitle>Request New Reference</CardTitle>
              <CardDescription>
                Send a personalized request to a potential recommender
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Program Selection */}
              <div className="space-y-2">
                <Label htmlFor="program">Select Program</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose the program for this reference" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {program.school} - {program.program}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reference Type */}
              <div className="space-y-2">
                <Label htmlFor="referenceType">Reference Type</Label>
                <Select value={referenceType} onValueChange={setReferenceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reference type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional/Manager</SelectItem>
                    <SelectItem value="academic">Academic/Professor</SelectItem>
                    <SelectItem value="colleague">Colleague/Peer</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Dr. Jane Smith"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Senior Manager, Director, Professor"
                    value={contactInfo.title}
                    onChange={(e) => setContactInfo({...contactInfo, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane.smith@company.com"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Institution</Label>
                  <Input
                    id="company"
                    placeholder="ABC Corp, Harvard University"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    placeholder="Former manager, Professor, Colleague"
                    value={contactInfo.relationship}
                    onChange={(e) => setContactInfo({...contactInfo, relationship: e.target.value})}
                  />
                </div>
              </div>

              {/* Personalized Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Personalized Message</Label>
                <Textarea
                  id="message"
                  placeholder="Dear Dr. Smith,&#10;&#10;I hope this message finds you well. I am writing to request a letter of recommendation for my MBA application to..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Mention specific projects you worked on together and why you're applying to business school.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 bg-accent hover:bg-accent/90 hover:text-white"
                  disabled={!selectedProgram || !contactInfo.name || !contactInfo.email}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reference Request
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}