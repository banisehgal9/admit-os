import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Search, GraduationCap, Calendar, MapPin, Users, TrendingUp, ChevronRight, CheckCircle2, Clock, FileText, UserCheck, Trophy } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface SchoolInfo {
  id: string;
  name: string;
  program: string;
  ranking: number;
  location: string;
  deadline: string;
  applicationFee: number;
  requirements: {
    essays: Array<{
      title: string;
      wordLimit: number;
      description: string;
    }>;
    recommendations: number;
    testScore: 'GMAT' | 'GRE' | 'Both';
    minTestScore?: string;
    interviewRequired: boolean;
    transcriptsRequired: boolean;
  };
  averageGMAT?: number;
  averageGPA?: number;
  acceptanceRate?: number;
  logoUrl?: string;
}

interface SchoolSelectionProps {
  onSchoolsSelected: (schools: SchoolInfo[]) => void;
  onSkip: () => void;
}

const MOCK_SCHOOLS: SchoolInfo[] = [
  {
    id: 'harvard-hbs',
    name: 'Harvard Business School',
    program: 'MBA Program',
    ranking: 1,
    location: 'Boston, MA',
    deadline: 'January 3, 2025',
    applicationFee: 250,
    averageGMAT: 730,
    averageGPA: 3.7,
    acceptanceRate: 11,
    requirements: {
      essays: [
        {
          title: 'Post-MBA Career Interest',
          wordLimit: 300,
          description: 'What is your post-MBA career interest and why is it meaningful to you?'
        },
        {
          title: 'Leadership Experience',
          wordLimit: 300,
          description: 'Help us understand how you have grown from a challenging experience in the past two years.'
        },
        {
          title: 'Personal Background',
          wordLimit: 300,
          description: 'Tell us about a meaningful collaboration you have been part of.'
        }
      ],
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 620+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  },
  {
    id: 'wharton',
    name: 'Wharton School',
    program: 'MBA Program',
    ranking: 2,
    location: 'Philadelphia, PA',
    deadline: 'January 5, 2025',
    applicationFee: 250,
    averageGMAT: 728,
    averageGPA: 3.6,
    acceptanceRate: 20,
    requirements: {
      essays: [
        {
          title: 'Goals and Impact',
          wordLimit: 500,
          description: 'How do you plan to use the Wharton MBA to achieve your future professional goals?'
        },
        {
          title: 'Personal Contribution',
          wordLimit: 400,
          description: 'Taking into consideration your background, how will you contribute to the Wharton community?'
        }
      ],
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 640+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  },
  {
    id: 'stanford-gsb',
    name: 'Stanford Graduate School of Business',
    program: 'MBA Program',
    ranking: 3,
    location: 'Stanford, CA',
    deadline: 'January 7, 2025',
    applicationFee: 275,
    averageGMAT: 734,
    averageGPA: 3.8,
    acceptanceRate: 6,
    requirements: {
      essays: [
        {
          title: 'What Matters to You and Why',
          wordLimit: 650,
          description: 'What matters most to you, and why?'
        },
        {
          title: 'Why Stanford',
          wordLimit: 400,
          description: 'Why do you want an MBA? Why now? Why Stanford?'
        }
      ],
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 680+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  },
  {
    id: 'mit-sloan',
    name: 'MIT Sloan School of Management',
    program: 'MBA Program',
    ranking: 4,
    location: 'Cambridge, MA',  
    deadline: 'January 15, 2025',
    applicationFee: 250,
    averageGMAT: 724,
    averageGPA: 3.6,
    acceptanceRate: 13,
    requirements: {
      essays: [
        {
          title: 'Purpose and Impact',
          wordLimit: 300,
          description: 'Tell us about a time when you questioned an existing process, protocol, or authority.'
        },
        {
          title: 'Personal Growth',
          wordLimit: 300,
          description: 'Describe a time when you pushed through adversity or chose to persevere.'
        },
        {
          title: 'Community Impact',
          wordLimit: 300,
          description: 'Describe a time when you contributed to making something better for your community.'
        }
      ],
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 650+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  },
  {
    id: 'columbia-cbs',
    name: 'Columbia Business School',
    program: 'MBA Program',
    ranking: 5,
    location: 'New York, NY',
    deadline: 'January 20, 2025',
    applicationFee: 250,
    averageGMAT: 720,
    averageGPA: 3.5,
    acceptanceRate: 16,
    requirements: {
      essays: [
        {
          title: 'Short Answer Questions',
          wordLimit: 100,
          description: 'Multiple short answer questions about your interests and goals (100 words each)'
        },
        {
          title: 'Personal Essay',
          wordLimit: 500,
          description: 'Tell us about yourself and your path to pursuing an MBA at CBS.'
        }
      ],
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 640+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  },
  {
    id: 'kellogg',
    name: 'Kellogg School of Management',
    program: 'MBA Program',
    ranking: 6,
    location: 'Evanston, IL',
    deadline: 'February 1, 2025',
    applicationFee: 250,
    averageGMAT: 727,
    averageGPA: 3.6,
    acceptanceRate: 20,
    requirements: {
      essays: [
        {
          title: 'Leadership and Impact',
          wordLimit: 450,
          description: 'Describe a significant professional accomplishment and how you added value.'
        },
        {
          title: 'Personal Values',
          wordLimit: 450,
          description: 'Describe a time when your values were challenged. How did you respond?'
        }
      ],  
      recommendations: 2,
      testScore: 'Both',
      minTestScore: 'GMAT 640+ or GRE equivalent',
      interviewRequired: true,
      transcriptsRequired: true
    }
  }
];

export function SchoolSelection({ onSchoolsSelected, onSkip }: SchoolSelectionProps) {
  const [selectedSchools, setSelectedSchools] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [showSelected, setShowSelected] = useState(false);

  const filteredSchools = MOCK_SCHOOLS.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedSchools = showSelected 
    ? MOCK_SCHOOLS.filter(school => selectedSchools.has(school.id))
    : filteredSchools;

  const handleSchoolToggle = (schoolId: string) => {
    const newSelected = new Set(selectedSchools);
    if (newSelected.has(schoolId)) {
      newSelected.delete(schoolId);
    } else {
      newSelected.add(schoolId);
    }
    setSelectedSchools(newSelected);
  };

  const handleContinue = () => {
    if (selectedSchools.size === 0) {
      toast.error('Please select at least one school to continue');
      return;
    }

    const selected = MOCK_SCHOOLS.filter(school => selectedSchools.has(school.id));
    onSchoolsSelected(selected);
    
    toast.success(`Selected ${selected.length} school${selected.length > 1 ? 's' : ''}`, {
      description: 'Your applications have been created with customized requirements.',
    });
  };

  const getTotalRequirements = (school: SchoolInfo) => {
    return {
      essays: school.requirements.essays.length,
      recommendations: school.requirements.recommendations,
      hasInterview: school.requirements.interviewRequired,
      hasTranscripts: school.requirements.transcriptsRequired
    };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="bg-accent/10 p-3 rounded-full">
            <GraduationCap className="h-8 w-8 text-accent" />
          </div>
        </div>
        <div>
          <h1>Welcome to Admit OS</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's get you started by selecting the MBA programs you're interested in. 
            We'll automatically create customized application plans with all the requirements for each school.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schools or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-selected"
              checked={showSelected}
              onCheckedChange={setShowSelected}
            />
            <Label htmlFor="show-selected" className="text-sm">
              Show selected only ({selectedSchools.size})
            </Label>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onSkip}>
              Skip for now
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={selectedSchools.size === 0}
            >
              Continue with {selectedSchools.size} school{selectedSchools.size !== 1 ? 's' : ''}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* School Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedSchools.map((school) => {
          const isSelected = selectedSchools.has(school.id);
          const requirements = getTotalRequirements(school);
          
          return (
            <Card 
              key={school.id} 
              className={`relative transition-all duration-200 cursor-pointer hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-accent border-accent/20 bg-accent/5' 
                  : 'hover:border-accent/30'
              }`}
              onClick={() => handleSchoolToggle(school.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        #{school.ranking}
                      </Badge>
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <CardTitle className="text-base leading-5">{school.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{school.program}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {school.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(school.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Trophy className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-sm font-medium">{school.averageGMAT}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg GMAT</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-sm font-medium">{school.acceptanceRate}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Accept Rate</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center">
                      <Users className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-sm font-medium">{school.averageGPA}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg GPA</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Requirements Preview */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Application Requirements</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span>{requirements.essays} essay{requirements.essays !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserCheck className="h-3 w-3 text-muted-foreground" />
                      <span>{requirements.recommendations} recommendation{requirements.recommendations !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-muted-foreground" />
                      <span>{school.requirements.testScore} scores</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{requirements.hasInterview ? 'Interview' : 'No interview'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Application Fee */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Application Fee:</span>
                  <span className="font-medium">${school.applicationFee}</span>
                </div>
                
                {isSelected && (
                  <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                    <p className="text-xs text-accent font-medium">
                      ✓ This school will be added to your dashboard with {requirements.essays + requirements.recommendations + 4} auto-generated tasks
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayedSchools.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-2">No schools found</h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search terms or clearing the filter
          </p>
        </div>
      )}

      {/* Selected Summary */}
      {selectedSchools.size > 0 && !showSelected && (
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">
                    {selectedSchools.size} school{selectedSchools.size !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ready to create your application plan
                  </p>
                </div>
              </div>
              <Button onClick={handleContinue}>
                Continue with Selection
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}