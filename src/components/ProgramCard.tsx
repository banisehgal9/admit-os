"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export type Program = {
  id: string
  school: string
  program: string
  deadline: string
  priority: "high" | "medium" | "low"
  status: "planned" | "in-progress" | "submitted"
  progress: number
}

export function ProgramCard({
  program,
  onClick,
  onStatusChange,
  onDelete,
}: {
  program: Program
  onClick: () => void
  onStatusChange: (id: string, newStatus: Program["status"]) => void
  onDelete: (id: string) => void
}) {
  const priorityColor =
    program.priority === "high" ? "destructive" : program.priority === "medium" ? "default" : "secondary"

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">
          {program.school} — {program.program}
        </CardTitle>
        <Badge variant={priorityColor as any} className="capitalize">{program.priority}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-neutral-500">Deadline: {program.deadline}</div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500 capitalize">{program.status.replace("-", " ")}</span>
            <span className="font-medium">{program.progress}%</span>
          </div>
          <Progress value={program.progress} />
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={onClick}>Open</Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              onStatusChange(
                program.id,
                program.status === "submitted" ? "in-progress" : "submitted"
              )
            }
          >
            {program.status === "submitted" ? "Mark In Progress" : "Mark Submitted"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(program.id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
