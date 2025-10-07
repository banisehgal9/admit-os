import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { SchoolSelection, SchoolInfo } from './SchoolSelection';
import { UserProfile } from './ProfilePage';
import { 
  User, 
  GraduationCap, 
  Target, 
  School, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Building,
  MapPin
} from 'lucide-react';

type OnboardingStep = 'welcome' | 'profile' | 'goals' | 'schools' | 'timeline' | 'complete';

interface OnboardingFlowProps {
  onComplete: (data: {
    profile: Partial<UserProfile>;
    goals: string;
    targetPrograms: string[];
    timeline: string;
    schools: SchoolInfo[];
  }) => void;
  onSkip: () => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  currentTitle: string;
  currentCompany: string;
  yearsOfExperience: string;
  industry: string;
  undergradSchool: string;
  undergradDegree: string;
  undergradGPA: string;
  gmatScore: string;
  greScore: string;
}

interface GoalsData {
  careerGoals: string;
  whyMBA: string;
  targetRole: string;
  targetIndustry: string;
  timeline: string;
}

const EXPERIENCE_OPTIONS = [
  '0-1 years',
  '2-3 years', 
  '4-5 years',
  '6-8 years',
  '9+ years'
];

const INDUSTRY_OPTIONS = [
  'Technology',
  'Consulting',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Non-profit',
  'Government',
  'Education',
  'Other'
];

const TIMELINE_OPTIONS = [
  'Fall 2025',
  'Fall 2026',
  'Fall 2027',
  'Not sure yet'
];

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    currentTitle: '',
    currentCompany: '',
    yearsOfExperience: '',
    industry: '',
    undergradSchool: '',
    undergradDegree: '',
    undergradGPA: '',
    gmatScore: '',
    greScore: ''
  });
  
  const [goalsData, setGoalsData] = useState<GoalsData>({
    careerGoals: '',
    whyMBA: '',
    targetRole: '',
    targetIndustry: '',
    timeline: ''
  });

  const [selectedSchools, setSelectedSchools] = useState<SchoolInfo[]>([]);

  const steps: OnboardingStep[] = ['welcome', 'profile', 'goals', 'schools', 'timeline', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleSchoolsSelected = (schools: SchoolInfo[]) => {
    setSelectedSchools(schools);
    setCurrentStep('timeline');
  };

  const handleComplete = () => {
    const completeProfile: Partial<UserProfile> = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      currentTitle: profileData.currentTitle,
      currentCompany: profileData.currentCompany,
      yearsOfExperience: profileData.yearsOfExperience,
      industry: profileData.industry.toLowerCase(),
      undergradSchool: profileData.undergradSchool,
      undergradDegree: profileData.undergradDegree,
      undergradGPA: profileData.undergradGPA,
      gmatScore: profileData.gmatScore,
      greScore: profileData.greScore,
      careerGoals: goalsData.careerGoals,
      bio: `${profileData.currentTitle} at ${profileData.currentCompany} with ${profileData.yearsOfExperience} of experience in ${profileData.industry}. ${goalsData.whyMBA}`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    onComplete({
      profile: completeProfile,
      goals: goalsData.careerGoals,
      targetPrograms: [goalsData.targetRole, goalsData.targetIndustry],
      timeline: goalsData.timeline,
      schools: selectedSchools
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 'profile':
        return profileData.firstName && profileData.lastName && profileData.email && 
               profileData.currentTitle && profileData.yearsOfExperience;
      case 'goals':
        return goalsData.careerGoals && goalsData.whyMBA;
      case 'schools':
        return selectedSchools.length > 0;
      case 'timeline':
        return goalsData.timeline;
      default:
        return true;
    }
  };

  const renderWelcomeStep = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <GraduationCap className="h-10 w-10 text-accent" />
        </div>
        <div>
          <h1 className="mb-4">Welcome to Admit OS</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your personal MBA application command center. We'll help you organize, track, and 
            optimize your applications to top business schools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card className="text-center p-6">
          <School className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="mb-2">School Selection</h3>
          <p className="text-sm text-muted-foreground">
            Choose from top MBA programs with auto-generated requirements
          </p>
        </Card>
        <Card className="text-center p-6">
          <Target className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="mb-2">Goal Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Set and track your application milestones and deadlines
          </p>
        </Card>
        <Card className="text-center p-6">
          <TrendingUp className="h-8 w-8 text-accent mx-auto mb-3" />
          <h3 className="mb-2">AI Assistance</h3>
          <p className="text-sm text-muted-foreground">
            Get personalized feedback on essays and application materials
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Let's get started with a quick setup (takes about 5 minutes)
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onSkip}>
            Skip Setup
          </Button>
          <Button onClick={handleNext} className="bg-accent hover:bg-accent/90">
            Get Started
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <User className="h-8 w-8 text-accent mx-auto" />
        <h2>Tell us about yourself</h2>
        <p className="text-muted-foreground">
          This information helps us personalize your experience and application tracking
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john.doe@email.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentTitle">Current Job Title *</Label>
            <Input
              id="currentTitle"
              value={profileData.currentTitle}
              onChange={(e) => setProfileData(prev => ({ ...prev, currentTitle: e.target.value }))}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <Label htmlFor="currentCompany">Current Company</Label>
            <Input
              id="currentCompany"
              value={profileData.currentCompany}
              onChange={(e) => setProfileData(prev => ({ ...prev, currentCompany: e.target.value }))}
              placeholder="TechCorp Inc."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Years of Experience *</Label>
              <select
                id="experience"
                value={profileData.yearsOfExperience}
                onChange={(e) => setProfileData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select experience level</option>
                {EXPERIENCE_OPTIONS.map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <select
                id="industry"
                value={profileData.industry}
                onChange={(e) => setProfileData(prev => ({ ...prev, industry: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="">Select industry</option>
                {INDUSTRY_OPTIONS.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Background</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="undergradSchool">Undergraduate School</Label>
              <Input
                id="undergradSchool"
                value={profileData.undergradSchool}
                onChange={(e) => setProfileData(prev => ({ ...prev, undergradSchool: e.target.value }))}
                placeholder="University of California, Berkeley"
              />
            </div>
            <div>
              <Label htmlFor="undergradDegree">Degree</Label>
              <Input
                id="undergradDegree"
                value={profileData.undergradDegree}
                onChange={(e) => setProfileData(prev => ({ ...prev, undergradDegree: e.target.value }))}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="undergradGPA">GPA (optional)</Label>
              <Input
                id="undergradGPA"
                value={profileData.undergradGPA}
                onChange={(e) => setProfileData(prev => ({ ...prev, undergradGPA: e.target.value }))}
                placeholder="3.75"
              />
            </div>
            <div>
              <Label htmlFor="gmatScore">GMAT Score (optional)</Label>
              <Input
                id="gmatScore"
                value={profileData.gmatScore}
                onChange={(e) => setProfileData(prev => ({ ...prev, gmatScore: e.target.value }))}
                placeholder="720"
              />
            </div>
            <div>
              <Label htmlFor="greScore">GRE Score (optional)</Label>
              <Input
                id="greScore"
                value={profileData.greScore}
                onChange={(e) => setProfileData(prev => ({ ...prev, greScore: e.target.value }))}
                placeholder="320"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGoalsStep = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Target className="h-8 w-8 text-accent mx-auto" />
        <h2>What are your goals?</h2>
        <p className="text-muted-foreground">
          Understanding your aspirations helps us tailor your application strategy
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Career Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="careerGoals">What are your post-MBA career goals? *</Label>
            <Textarea
              id="careerGoals"
              value={goalsData.careerGoals}
              onChange={(e) => setGoalsData(prev => ({ ...prev, careerGoals: e.target.value }))}
              placeholder="Describe your short-term and long-term career objectives after completing your MBA..."
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Label htmlFor="whyMBA">Why do you want an MBA? *</Label>
            <Textarea
              id="whyMBA"
              value={goalsData.whyMBA}
              onChange={(e) => setGoalsData(prev => ({ ...prev, whyMBA: e.target.value }))}
              placeholder="What specific skills, network, or opportunities are you seeking from an MBA program..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Target Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetRole">Target Role Post-MBA</Label>
              <Input
                id="targetRole"
                value={goalsData.targetRole}
                onChange={(e) => setGoalsData(prev => ({ ...prev, targetRole: e.target.value }))}
                placeholder="e.g., Product Manager, Strategy Consultant"
              />
            </div>
            <div>
              <Label htmlFor="targetIndustry">Target Industry</Label>
              <Input
                id="targetIndustry"
                value={goalsData.targetIndustry}
                onChange={(e) => setGoalsData(prev => ({ ...prev, targetIndustry: e.target.value }))}
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTimelineStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Calendar className="h-8 w-8 text-accent mx-auto" />
        <h2>When do you want to start?</h2>
        <p className="text-muted-foreground">
          This helps us prioritize your deadlines and create an appropriate timeline
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Target Start Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {TIMELINE_OPTIONS.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  goalsData.timeline === option
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={option}
                  checked={goalsData.timeline === option}
                  onChange={(e) => setGoalsData(prev => ({ ...prev, timeline: e.target.value }))}
                  className="sr-only"
                />
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      goalsData.timeline === option
                        ? 'border-accent bg-accent'
                        : 'border-border'
                    }`}>
                      {goalsData.timeline === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                  {option === 'Fall 2025' && (
                    <Badge variant="secondary">Upcoming</Badge>
                  )}
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedSchools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Schools Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedSchools.map((school) => (
                <div key={school.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{school.name}</p>
                    <p className="text-sm text-muted-foreground">{school.program}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{school.deadline}</p>
                    <p className="text-xs text-muted-foreground">
                      {school.requirements.essays.length} essays, {school.requirements.recommendations} recs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCompleteStep = () => (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <div>
          <h2>Setup Complete!</h2>
          <p className="text-muted-foreground">
            Your Admit OS workspace is ready. We've created personalized application plans 
            for your selected schools.
          </p>
        </div>
      </div>

      <div className="bg-accent/10 rounded-lg p-6 space-y-4">
        <h3>What happens next?</h3>
        <div className="grid grid-cols-1 gap-4 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Applications Created</p>
              <p className="text-sm text-muted-foreground">
                {selectedSchools.length} application{selectedSchools.length !== 1 ? 's' : ''} with auto-generated tasks and deadlines
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Personalized Dashboard</p>
              <p className="text-sm text-muted-foreground">
                Track progress, manage deadlines, and stay organized
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">AI Writing Assistant</p>
              <p className="text-sm text-muted-foreground">
                Get feedback on essays and recommendation letters
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleComplete} size="lg" className="bg-accent hover:bg-accent/90">
        Go to Dashboard
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="font-medium">Admit OS Setup</span>
            </div>
            <Badge variant="secondary">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 'welcome' && renderWelcomeStep()}
          {currentStep === 'profile' && renderProfileStep()}
          {currentStep === 'goals' && renderGoalsStep()}
          {currentStep === 'schools' && (
            <SchoolSelection
              onSchoolsSelected={handleSchoolsSelected}
              onSkip={() => setCurrentStep('timeline')}
            />
          )}
          {currentStep === 'timeline' && renderTimelineStep()}
          {currentStep === 'complete' && renderCompleteStep()}
        </div>

        {/* Navigation */}
        {currentStep !== 'welcome' && currentStep !== 'schools' && currentStep !== 'complete' && (
          <div className="max-w-4xl mx-auto mt-8 flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!isStepValid()}
              className="bg-accent hover:bg-accent/90"
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}