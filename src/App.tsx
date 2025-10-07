import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ApplicationDetail } from './components/ApplicationDetail';
import { EssayEditor } from './components/EssayEditor';
import { EssaySelection } from './components/EssaySelection';
import { ReferenceRequest } from './components/ReferenceRequest';
import { ReferenceSelection } from './components/ReferenceSelection';
import { ReferenceEditor } from './components/ReferenceEditor';
import { DeadlineCheck } from './components/DeadlineCheck';
import { CritiquePage } from './components/CritiquePage';
import { ProfilePage, UserProfile } from './components/ProfilePage';
import { SchoolSelection, SchoolInfo } from './components/SchoolSelection';
import { OnboardingFlow } from './components/OnboardingFlow';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

import { Program } from './components/ProgramCard';
import { Task } from './components/TaskList';

type ViewType = 'login' | 'onboarding' | 'school-selection' | 'dashboard' | 'application-detail' | 'essay-editor' | 'essay-selection' | 'reference-request' | 'reference-selection' | 'reference-editor' | 'deadline-check' | 'critique' | 'profile';

// Mock data
const mockPrograms: Program[] = [
  {
    id: '1',
    school: 'Harvard Business School',
    program: 'MBA Program',
    deadline: 'Jan 3, 2025',
    status: 'in-progress',
    progress: 65,
    completedTasks: 8,
    totalTasks: 12,
    priority: 'high'
  },
  {
    id: '2',
    school: 'Wharton School',
    program: 'MBA Program',
    deadline: 'Jan 5, 2025',
    status: 'in-progress',
    progress: 45,
    completedTasks: 5,
    totalTasks: 11,
    priority: 'high'
  },
  {
    id: '3',
    school: 'Stanford GSB',
    program: 'MBA Program',
    deadline: 'Jan 7, 2025',
    status: 'not-started',
    progress: 15,
    completedTasks: 2,
    totalTasks: 13,
    priority: 'medium'
  },
  {
    id: '4',
    school: 'MIT Sloan',
    program: 'MBA Program',
    deadline: 'Jan 15, 2025',
    status: 'submitted',
    progress: 100,
    completedTasks: 10,
    totalTasks: 10,
    priority: 'low'
  },
  {
    id: '5',
    school: 'Columbia Business School',
    program: 'MBA Program',
    deadline: 'Jan 20, 2025',
    status: 'decision-pending',
    progress: 100,
    completedTasks: 11,
    totalTasks: 11,
    priority: 'medium'
  },
  {
    id: '6',
    school: 'Kellogg School',
    program: 'MBA Program',
    deadline: 'Feb 1, 2025',
    status: 'not-started',
    progress: 0,
    completedTasks: 0,
    totalTasks: 12,
    priority: 'low'
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Upload Resume',
    description: 'Upload your most recent resume in PDF format',
    status: 'completed',
    priority: 'high',
    dueDate: 'Dec 15, 2024',
    category: 'documents'
  },
  {
    id: '2',
    title: 'Personal Statement Essay',
    description: 'Write your personal statement (650 words max)',
    status: 'in-progress',
    priority: 'high',
    dueDate: 'Dec 20, 2024',
    category: 'essay'
  },
  {
    id: '3',
    title: 'Leadership Essay',
    description: 'Describe a leadership experience (500 words max)',
    status: 'pending',
    priority: 'high',
    dueDate: 'Dec 22, 2024',
    category: 'essay'
  },
  {
    id: '4',
    title: 'Request Letter of Recommendation #1',
    description: 'Contact your former manager for a recommendation letter',
    status: 'completed',
    priority: 'medium',
    dueDate: 'Dec 10, 2024',
    category: 'recommendation'
  },
  {
    id: '5',
    title: 'Request Letter of Recommendation #2',
    description: 'Contact a professor for an academic recommendation',
    status: 'in-progress',
    priority: 'medium',
    dueDate: 'Dec 18, 2024',
    category: 'recommendation'
  },
  {
    id: '6',
    title: 'Submit GMAT Scores',
    description: 'Send official GMAT scores to the admissions office',
    status: 'pending',
    priority: 'high',
    dueDate: 'Dec 25, 2024',
    category: 'test-scores'
  },
  {
    id: '7',
    title: 'Complete Online Application',
    description: 'Fill out all sections of the online application form',
    status: 'pending',
    priority: 'medium',
    dueDate: 'Dec 30, 2024',
    category: 'application'
  },
  {
    id: '8',
    title: 'Pay Application Fee',
    description: 'Submit the $150 application fee',
    status: 'pending',
    priority: 'low',
    dueDate: 'Jan 2, 2025',
    category: 'application'
  }
];

const mockUserProfile: UserProfile = {
  // Personal Information
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1995-03-15',
  nationality: 'United States',
  
  // Contact Information
  address: '123 University Ave, Apt 4B',
  city: 'Boston',
  state: 'Massachusetts',
  zipCode: '02115',
  country: 'US',
  
  // Professional Information
  currentTitle: 'Senior Software Engineer',
  currentCompany: 'TechCorp Inc.',
  yearsOfExperience: '4-5',
  industry: 'technology',
  linkedInUrl: 'https://linkedin.com/in/johndoe',
  
  // Academic Information
  undergradSchool: 'MIT',
  undergradDegree: 'Bachelor of Science in Computer Science',
  undergradGPA: '3.85',
  undergradGradYear: '2018',
  
  // Test Scores
  gmatScore: '720',
  greScore: '',
  toeflScore: '',
  
  // Profile
  bio: 'Experienced software engineer with a passion for innovative technology solutions and leadership. Led multiple cross-functional teams in developing scalable applications used by millions of users worldwide.',
  careerGoals: 'To transition into technology consulting and eventually start a technology company focused on sustainable solutions. I believe an MBA will provide the business foundation and network necessary to achieve these goals.',
  
  // System
  avatarUrl: '',
  createdAt: '2024-01-15T09:00:00Z',
  lastUpdated: '2024-12-01T14:30:00Z'
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleLogin = (isNewUser: boolean = false) => {
    setIsLoggedIn(true);
    setIsFirstTime(isNewUser);
    
    // New users go through onboarding, existing users with no programs go to school selection
    if (isNewUser) {
      setCurrentView('onboarding');
    } else if (programs.length === 0) {
      setCurrentView('school-selection');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setSelectedProgramId('');
  };

  const handleProgramClick = (programId: string) => {
    setSelectedProgramId(programId);
    setCurrentView('application-detail');
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed'
            }
          : task
      )
    );
  };

  const handleEssayEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskId(taskId);
      setCurrentView('essay-editor');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProgramId('');
    setSelectedTaskId('');
  };

  const handleBackToApplication = () => {
    setCurrentView('application-detail');
  };

  const handleGetCritique = () => {
    setCurrentView('critique');
  };

  const handleBackToEditor = () => {
    if (selectedTask?.category === 'recommendation') {
      setCurrentView('reference-editor');
    } else {
      setCurrentView('essay-editor');
    }
  };

  const handleQuickAction = (action: 'essays' | 'references' | 'reference-request' | 'deadlines') => {
    switch (action) {
      case 'essays':
        setCurrentView('essay-selection');
        break;
      case 'references':
        setCurrentView('reference-selection');
        break;
      case 'reference-request':
        setCurrentView('reference-request');
        break;
      case 'deadlines':
        setCurrentView('deadline-check');
        break;
    }
  };

  const handleEssaySelection = (programId: string, taskId: string) => {
    setSelectedProgramId(programId);
    setSelectedTaskId(taskId);
    setCurrentView('essay-editor');
  };

  const handleReferenceSelection = (programId: string, taskId: string) => {
    setSelectedProgramId(programId);
    setSelectedTaskId(taskId);
    setCurrentView('reference-editor');
  };

  const handleReferenceEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskId(taskId);
      setCurrentView('reference-editor');
    }
  };

  const handleProfileView = () => {
    setCurrentView('profile');
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleSchoolsSelected = (schools: SchoolInfo[]) => {
    // Clear existing programs and tasks if this is onboarding
    setPrograms([]);
    setTasks([]);
    
    const newPrograms: Program[] = [];
    const newTasks: Task[] = [];
    
    schools.forEach((school, index) => {
      const programId = String(index + 1);
      
      // Create program
      const program: Program = {
        id: programId,
        school: school.name,
        program: school.program,
        deadline: school.deadline,
        status: 'not-started',
        progress: 0,
        completedTasks: 0,
        totalTasks: school.requirements.essays.length + school.requirements.recommendations + 6, // +6 for standard tasks
        priority: 'medium'
      };
      newPrograms.push(program);
      
      // Generate tasks for this program
      const programTasks = generateTasksFromSchool(programId, school);
      newTasks.push(...programTasks);
    });
    
    setPrograms(newPrograms);
    setTasks(newTasks);
    setCurrentView('dashboard');
    
    toast.success(`Created ${schools.length} application${schools.length > 1 ? 's' : ''}!`, {
      description: `${newTasks.length} tasks have been auto-generated based on each school's requirements.`,
    });
  };

  const handleSkipSchoolSelection = () => {
    setCurrentView('dashboard');
  };

  const handleOnboardingComplete = (data: {
    profile: Partial<UserProfile>;
    goals: string;
    targetPrograms: string[];
    timeline: string;
    schools: SchoolInfo[];
  }) => {
    // Update user profile with onboarding data
    setUserProfile(prevProfile => ({
      ...prevProfile,
      ...data.profile
    }));

    // If schools were selected during onboarding, create applications
    if (data.schools.length > 0) {
      handleSchoolsSelected(data.schools);
    } else {
      setCurrentView('dashboard');
    }

    toast.success('Welcome to Admit OS!', {
      description: `Your workspace is ready${data.schools.length > 0 ? ` with ${data.schools.length} application${data.schools.length > 1 ? 's' : ''}` : ''}.`,
    });
  };

  const handleSkipOnboarding = () => {
    setCurrentView('dashboard');
  };

  const generateTasksFromSchool = (programId: string, school: SchoolInfo): Task[] => {
    const deadlineDate = new Date(school.deadline);
    
    const getDateBefore = (days: number) => {
      const date = new Date(deadlineDate);
      date.setDate(date.getDate() - days);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    const tasks: Task[] = [];
    let taskCounter = 1;

    // Generate essay tasks based on school requirements
    school.requirements.essays.forEach((essay, index) => {
      tasks.push({
        id: `${programId}-essay-${index + 1}`,
        title: essay.title,
        description: `${essay.description} (${essay.wordLimit} words max)`,
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(45 - (index * 5)), // Stagger essay due dates
        category: 'essay'
      });
    });

    // Generate recommendation tasks
    for (let i = 0; i < school.requirements.recommendations; i++) {
      tasks.push({
        id: `${programId}-rec-${i + 1}`,
        title: `Request Letter of Recommendation #${i + 1}`,
        description: `Contact recommender for a recommendation letter`,
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(60),
        category: 'recommendation'
      });
    }

    // Standard tasks for all schools
    const standardTasks = [
      {
        title: 'Upload Resume',
        description: 'Upload your most recent resume in PDF format',
        category: 'documents',
        dueDate: getDateBefore(45),
        priority: 'high' as const
      },
      {
        title: `Submit ${school.requirements.testScore} Scores`,
        description: `Send official ${school.requirements.testScore} scores to admissions`,
        category: 'test-scores',
        dueDate: getDateBefore(30),
        priority: 'high' as const
      },
      {
        title: 'Submit Official Transcripts',
        description: 'Request and submit official transcripts from all universities',
        category: 'documents',
        dueDate: getDateBefore(30),
        priority: 'medium' as const
      },
      {
        title: 'Complete Online Application',
        description: 'Fill out all sections of the online application form',
        category: 'application',
        dueDate: getDateBefore(7),
        priority: 'medium' as const
      },
      {
        title: 'Pay Application Fee',
        description: `Submit the ${school.applicationFee} application fee`,
        category: 'application',
        dueDate: getDateBefore(3),
        priority: 'low' as const
      }
    ];

    standardTasks.forEach((task, index) => {
      tasks.push({
        id: `${programId}-standard-${index + 1}`,
        title: task.title,
        description: task.description,
        status: 'pending',
        priority: task.priority,
        dueDate: task.dueDate,
        category: task.category as Task['category']
      });
    });

    // Add interview task if required
    if (school.requirements.interviewRequired) {
      tasks.push({
        id: `${programId}-interview`,
        title: 'Schedule and Complete Interview',
        description: 'Complete the required admissions interview',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(14),
        category: 'application'
      });
    }

    return tasks;
  };

  const generateDefaultTasks = (programId: string, deadline: string): Task[] => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    // Calculate reasonable due dates working backwards from application deadline
    const getDateBefore = (days: number) => {
      const date = new Date(deadlineDate);
      date.setDate(date.getDate() - days);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    const defaultTasks: Omit<Task, 'id'>[] = [
      {
        title: 'Upload Resume',
        description: 'Upload your most recent resume in PDF format',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(45),
        category: 'documents'
      },
      {
        title: 'Personal Statement Essay',
        description: 'Write your personal statement (650 words max)',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(30),
        category: 'essay'
      },
      {
        title: 'Request Letter of Recommendation #1',
        description: 'Contact your former manager for a recommendation letter',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(60),
        category: 'recommendation'
      },
      {
        title: 'Request Letter of Recommendation #2',
        description: 'Contact a professor for an academic recommendation',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(60),
        category: 'recommendation'
      },
      {
        title: 'Submit Test Scores',
        description: 'Send official GMAT/GRE scores to the admissions office',
        status: 'pending',
        priority: 'high',
        dueDate: getDateBefore(21),
        category: 'test-scores'
      },
      {
        title: 'Complete Online Application',
        description: 'Fill out all sections of the online application form',
        status: 'pending',
        priority: 'medium',
        dueDate: getDateBefore(7),
        category: 'application'
      },
      {
        title: 'Submit Transcripts',
        description: 'Request official transcripts from all universities attended',
        status: 'pending',
        priority: 'medium',
        dueDate: getDateBefore(30),
        category: 'documents'
      },
      {
        title: 'Pay Application Fee',
        description: 'Submit the application fee (typically $100-250)',
        status: 'pending',
        priority: 'low',
        dueDate: getDateBefore(3),
        category: 'application'
      }
    ];

    return defaultTasks.map((task, index) => ({
      ...task,
      id: `${programId}-task-${index + 1}`
    }));
  };

  const handleCreateApplication = (applicationData: {
    school: string;
    program: string;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
  }) => {
    const newProgramId = String(programs.length + 1);
    const newProgram: Program = {
      id: newProgramId,
      school: applicationData.school,
      program: applicationData.program,
      deadline: applicationData.deadline,
      status: 'not-started',
      progress: 0,
      completedTasks: 0,
      totalTasks: 8,
      priority: applicationData.priority
    };
    
    // Generate default tasks for the new application
    const newTasks = generateDefaultTasks(newProgramId, applicationData.deadline);
    
    setPrograms(prevPrograms => [...prevPrograms, newProgram]);
    setTasks(prevTasks => [...prevTasks, ...newTasks]);
  };

  const handleCreateEssay = (essayData: {
    title: string;
    prompt: string;
    wordLimit: number;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
  }) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: essayData.title,
      description: `${essayData.prompt} (${essayData.wordLimit} words max)`,
      status: 'pending',
      priority: essayData.priority,
      dueDate: essayData.dueDate,
      category: 'essay'
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Update the program's total tasks count
    setPrograms(prevPrograms => 
      prevPrograms.map(program => 
        program.id === selectedProgramId 
          ? { ...program, totalTasks: program.totalTasks + 1 }
          : program
      )
    );
  };

  const handleStatusChange = (programId: string, newStatus: Program['status']) => {
    const program = programs.find(p => p.id === programId);
    const statusLabels = {
      'not-started': 'Not Started',
      'in-progress': 'In Progress', 
      'submitted': 'Submitted',
      'decision-pending': 'Decision Pending'
    };
    
    setPrograms(prevPrograms =>
      prevPrograms.map(program =>
        program.id === programId
          ? { ...program, status: newStatus }
          : program
      )
    );

    // Show success toast
    if (program) {
      toast.success(
        `${program.school} status updated to ${statusLabels[newStatus]}`,
        {
          description: `Application status has been changed successfully.`,
        }
      );
    }
  };

  const handleDeleteProgram = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    
    // Remove the program
    setPrograms(prevPrograms => 
      prevPrograms.filter(p => p.id !== programId)
    );
    
    // Remove all tasks associated with this program
    setTasks(prevTasks => 
      prevTasks.filter(task => !task.id.startsWith(programId))
    );

    // Reset selected program if it was the deleted one
    if (selectedProgramId === programId) {
      setSelectedProgramId('');
      setCurrentView('dashboard');
    }

    // Show success toast
    if (program) {
      toast.success(
        `${program.school} application deleted`,
        {
          description: 'The application and all associated tasks have been removed.',
        }
      );
    }
  };

  const selectedProgram = programs.find(p => p.id === selectedProgramId);
  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} onProfileClick={handleProfileView} />
      <Toaster />
      <main className="container mx-auto px-4 py-6">
        {currentView === 'onboarding' && (
          <OnboardingFlow
            onComplete={handleOnboardingComplete}
            onSkip={handleSkipOnboarding}
          />
        )}

        {currentView === 'school-selection' && (
          <SchoolSelection
            onSchoolsSelected={handleSchoolsSelected}
            onSkip={handleSkipSchoolSelection}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            programs={programs}
            onProgramClick={handleProgramClick}
            onQuickAction={handleQuickAction}
            onCreateApplication={handleCreateApplication}
            onStatusChange={handleStatusChange}
            onDeleteProgram={handleDeleteProgram}
          />
        )}

        {currentView === 'essay-selection' && (
          <EssaySelection
            programs={programs}
            tasks={tasks}
            onBack={handleBackToDashboard}
            onEssayEdit={handleEssaySelection}
          />
        )}

        {currentView === 'reference-request' && (
          <ReferenceRequest
            programs={programs}
            tasks={tasks}
            onBack={handleBackToDashboard}
          />
        )}

        {currentView === 'reference-selection' && (
          <ReferenceSelection
            programs={programs}
            tasks={tasks}
            onBack={handleBackToDashboard}
            onReferenceEdit={handleReferenceSelection}
          />
        )}

        {currentView === 'reference-editor' && selectedProgram && selectedTask && (
          <ReferenceEditor
            onBack={() => setCurrentView('reference-selection')}
            referenceTitle={`${selectedProgram.school} - ${selectedTask.title}`}
            initialContent="Dear Admissions Committee,

I am writing to provide my strongest recommendation for [Applicant Name] for admission to your MBA program. As Senior Director of Technology at TechCorp, I have had the pleasure of working closely with [Applicant Name] for over two years and can attest to their exceptional leadership abilities, analytical skills, and professional integrity.

During their tenure on my team, [Applicant Name] consistently demonstrated outstanding performance in managing complex technology initiatives. Most notably, they led our digital transformation project that resulted in a 25% increase in operational efficiency and $2M in annual cost savings. Their ability to collaborate across departments and communicate technical concepts to non-technical stakeholders was truly impressive.

What sets [Applicant Name] apart is their combination of technical expertise and business acumen. They regularly identified opportunities for process improvement and took initiative to implement solutions. Their leadership style fostered team collaboration and drove results consistently exceeding expectations.

I believe [Applicant Name] possesses the intellectual capacity, leadership potential, and drive necessary to excel in your MBA program. They have my strongest recommendation for admission.

Please feel free to contact me if you need any additional information.

Sincerely,
[Recommender Name]
[Title]
[Company]
[Contact Information]"
            onGetCritique={handleGetCritique}
          />
        )}

        {currentView === 'deadline-check' && (
          <DeadlineCheck
            programs={programs}
            tasks={tasks}
            onBack={handleBackToDashboard}
            onProgramClick={handleProgramClick}
          />
        )}
        
        {currentView === 'application-detail' && selectedProgram && (
          <ApplicationDetail
            program={selectedProgram}
            tasks={tasks}
            onBack={handleBackToDashboard}
            onTaskToggle={handleTaskToggle}
            onEssayEdit={handleEssayEdit}
            onReferenceEdit={handleReferenceEdit}
            onCreateEssay={handleCreateEssay}
          />
        )}
        
        {currentView === 'essay-editor' && selectedProgram && selectedTask && (
          <EssayEditor
            onBack={handleBackToApplication}
            essayTitle={`${selectedProgram.school} - ${selectedTask.title}`}
            initialContent="As I reflect on my journey from a small-town engineering student to a technology consultant at a Fortune 500 company, I am struck by how each experience has shaped my understanding of leadership, innovation, and the transformative power of business education. Through my work at TechCorp, I have led cross-functional teams in implementing digital transformation initiatives that resulted in a 25% increase in operational efficiency. These experiences have taught me the importance of combining technical expertise with strategic business acumen - a skill set I believe is essential for success in today's rapidly evolving business landscape. My goal is to leverage the comprehensive MBA curriculum to deepen my understanding of finance, marketing, and organizational behavior while building a network of like-minded professionals who share my passion for innovation and social impact."
            onGetCritique={handleGetCritique}
          />
        )}

        {currentView === 'critique' && selectedProgram && selectedTask && (
          <CritiquePage
            onBack={handleBackToEditor}
            title={`${selectedProgram.school} - ${selectedTask.title}`}
            content={selectedTask.category === 'essay' 
              ? "As I reflect on my journey from a small-town engineering student to a technology consultant at a Fortune 500 company, I am struck by how each experience has shaped my understanding of leadership, innovation, and the transformative power of business education. Through my work at TechCorp, I have led cross-functional teams in implementing digital transformation initiatives that resulted in a 25% increase in operational efficiency. These experiences have taught me the importance of combining technical expertise with strategic business acumen - a skill set I believe is essential for success in today's rapidly evolving business landscape. My goal is to leverage the comprehensive MBA curriculum to deepen my understanding of finance, marketing, and organizational behavior while building a network of like-minded professionals who share my passion for innovation and social impact."
              : "Dear Admissions Committee,\n\nI am writing to provide my strongest recommendation for [Applicant Name] for admission to your MBA program. As Senior Director of Technology at TechCorp, I have had the pleasure of working closely with [Applicant Name] for over two years and can attest to their exceptional leadership abilities, analytical skills, and professional integrity.\n\nDuring their tenure on my team, [Applicant Name] consistently demonstrated outstanding performance in managing complex technology initiatives. Most notably, they led our digital transformation project that resulted in a 25% increase in operational efficiency and $2M in annual cost savings. Their ability to collaborate across departments and communicate technical concepts to non-technical stakeholders was truly impressive.\n\nWhat sets [Applicant Name] apart is their combination of technical expertise and business acumen. They regularly identified opportunities for process improvement and took initiative to implement solutions. Their leadership style fostered team collaboration and drove results consistently exceeding expectations.\n\nI believe [Applicant Name] possesses the intellectual capacity, leadership potential, and drive necessary to excel in your MBA program. They have my strongest recommendation for admission.\n\nPlease feel free to contact me if you need any additional information.\n\nSincerely,\n[Recommender Name]\n[Title]\n[Company]\n[Contact Information]"
            }
            contentType={selectedTask.category === 'recommendation' ? 'reference' : 'essay'}
          />
        )}

        {currentView === 'profile' && (
          <ProfilePage
            onBack={handleBackToDashboard}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>
    </div>
  );
}