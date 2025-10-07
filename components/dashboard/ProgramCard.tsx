"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Program = {
  id: string;
  name: string;
  school?: string;
  round?: string;
  deadline?: string;  // "Jan 6"
  progress?: number;  // 0-100
  status?: "Active" | "Draft" | "Submitted" | "in-progress" | "submitted";
};

export function ProgramCard({ program }: { program: Program }) {
  const pct = Math.max(0, Math.min(100, program.progress ?? 0));
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{program.name}</CardTitle>
        {program.school && <div className="text-sm text-muted-foreground">{program.school}</div>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {program.round ?? "Round"} • {program.status ?? "Active"}
          </span>
          {program.deadline && <span className="text-muted-foreground">Due {program.deadline}</span>}
        </div>
        <div className="h-2 w-full overflow-hidden rounded bg-neutral-200">
          <div className="h-full bg-black transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-xs text-muted-foreground">{pct}% complete</div>
        <div className="flex justify-end">
          <Button className="h-9">Open</Button>
        </div>
      </CardContent>
    </Card>
  );
}
