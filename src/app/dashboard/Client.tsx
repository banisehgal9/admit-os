"use client"
import { logoutAction } from "@/app/logout/actions"
import { useState } from "react"
import { Dashboard } from "@/components/dashboard/Dashboard"
import type { Program } from "@/components/ProgramCard"

export default function DashboardClient() {
  const [programs, setPrograms] = useState<Program[]>([
    { id: "1", school: "Harvard", program: "MBA", deadline: "2026-09-01", priority: "high",   status: "in-progress", progress: 45 },
    { id: "2", school: "Wharton", program: "MBA", deadline: "2026-09-10", priority: "medium", status: "planned",     progress: 10 },
    { id: "3", school: "INSEAD",  program: "MBA", deadline: "2026-09-20", priority: "low",    status: "submitted",   progress: 100 },
  ])

  const handleProgramClick = (id: string) => {
    console.log("Open program", id)
  }

  const handleQuickAction = (action: "essays" | "references" | "reference-request" | "deadlines") => {
    console.log("Quick action:", action)
  }

  const handleCreateApplication = (data: {
    school: string; program: string; deadline: string; priority: "high" | "medium" | "low"
  }) => {
    setPrograms(prev => [
      ...prev,
      { id: String(prev.length + 1), ...data, status: "planned", progress: 0 }
    ])
  }

  const handleStatusChange = (id: string, newStatus: Program["status"]) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
  }

  const handleDeleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
  }

  return (
  <div className="mx-auto max-w-6xl px-6 py-8">
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500">Signed in</p>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="inline-flex h-9 items-center rounded-md border border-neutral-300 bg-white px-3 text-sm hover:bg-neutral-50"
        >
          Log out
        </button>
      </form>
    </header>

    <Dashboard
      programs={programs}
      onProgramClick={handleProgramClick}
      onQuickAction={handleQuickAction}
      onCreateApplication={handleCreateApplication}
      onStatusChange={handleStatusChange}
      onDeleteProgram={handleDeleteProgram}
    />
  </div>
)
}
