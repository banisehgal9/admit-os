"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function NewApplicationModal({
  isOpen,
  onClose,
  onCreateApplication,
}: {
  isOpen: boolean
  onClose: () => void
  onCreateApplication: (data: {
    school: string
    program: string
    deadline: string
    priority: "high" | "medium" | "low"
  }) => void
}) {
  const [school, setSchool] = useState("")
  const [prog, setProg] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (!o ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start New Application</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>School</Label>
            <Input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Harvard" />
          </div>
          <div className="grid gap-2">
            <Label>Program</Label>
            <Input value={prog} onChange={(e) => setProg(e.target.value)} placeholder="MBA" />
          </div>
          <div className="grid gap-2">
            <Label>Deadline</Label>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Priority</Label>
            <select
              className="h-9 rounded-md border border-neutral-300 bg-background px-3 text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                onCreateApplication({ school, program: prog, deadline, priority })
                onClose()
              }}
              disabled={!school || !prog || !deadline}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
