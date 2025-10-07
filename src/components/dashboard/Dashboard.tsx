"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgramCard, Program } from "@/components/ProgramCard"
import { Plus, BookOpen, Target, TrendingUp, Users } from "lucide-react"
import { NewApplicationModal } from "@/components/NewApplicationModal"

interface DashboardProps {
  programs: Program[];
  onProgramClick: (programId: string) => void;
  onQuickAction: (action: "essays" | "references" | "reference-request" | "deadlines") => void;
  onCreateApplication: (applicationData: {
    school: string;
    program: string;
    deadline: string;
    priority: "high" | "medium" | "low";
  }) => void;
  onStatusChange: (programId: string, newStatus: Program["status"]) => void;
  onDeleteProgram: (programId: string) => void;
}

export function Dashboard({
  programs,
  onProgramClick,
  onQuickAction,
  onCreateApplication,
  onStatusChange,
  onDeleteProgram,
}: DashboardProps) {
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false)
  const stats = {
    totalPrograms: programs.length,
    inProgress: programs.filter(p => p.status === "in-progress").length,
    submitted: programs.filter(p => p.status === "submitted").length,
    avgProgress: programs.length ? Math.round(programs.reduce((acc, p) => acc + p.progress, 0) / programs.length) : 0,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Application Dashboard</h1>
          <p className="text-neutral-500">
            Track and manage your graduate school applications
          </p>
        </div>
        <Button onClick={() => setIsNewApplicationModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Start New Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.totalPrograms}</div></CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Target className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.inProgress}</div></CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Users className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.submitted}</div></CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.avgProgress}%</div></CardContent>
        </Card>
      </div>

      {/* Program Grid */}
      <div>
        <h2 className="mb-6 text-xl font-semibold">Your Programs</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onClick={() => onProgramClick(program.id)}
              onStatusChange={(_, status) => onStatusChange(program.id, status)}
              onDelete={onDeleteProgram}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you stay on track</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col items-center gap-2 p-4" onClick={() => onQuickAction("essays")}>
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Edit Essays</span>
              <span className="text-xs text-neutral-500">Work on personal statements</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center gap-2 p-4" onClick={() => onQuickAction("references")}>
              <Users className="h-5 w-5" />
              <span className="text-sm">Edit References</span>
              <span className="text-xs text-neutral-500">Review recommendation letters</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center gap-2 p-4" onClick={() => onQuickAction("reference-request")}>
              <Users className="h-5 w-5" />
              <span className="text-sm">Request References</span>
              <span className="text-xs text-neutral-500">Follow up with recommenders</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center gap-3 p-6" onClick={() => onQuickAction("deadlines")}>
              <Target className="h-6 w-6" />
              <span>Check Deadlines</span>
              <span className="text-xs text-neutral-500">Review upcoming due dates</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <NewApplicationModal
        isOpen={isNewApplicationModalOpen}
        onClose={() => setIsNewApplicationModalOpen(false)}
        onCreateApplication={onCreateApplication}
      />
    </div>
  )
}
