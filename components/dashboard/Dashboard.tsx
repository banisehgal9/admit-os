"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramCard, Program } from "./ProgramCard";
import { NewApplicationModal } from "./NewApplicationModal";

export default function Dashboard({ programs: propPrograms = [] as Program[] }) {
  // Safe demo programs so UI renders until we wire Supabase
  const demo: Program[] = [
    { id: "hbs", name: "Harvard MBA", school: "HBS", round: "R2", deadline: "Jan 6", progress: 40, status: "Active" },
    { id: "wharton", name: "Wharton MBA", school: "Wharton", round: "R2", deadline: "Jan 7", progress: 55, status: "Active" },
  ];
  const programs = propPrograms.length ? propPrograms : demo;

  const total = programs.length;
  const avg = total ? Math.round(programs.reduce((a,p)=>a+(p.progress??0),0)/total) : 0;
  const [_, setModal] = useState(false);

  return (
    <div className="min-h-dvh grid grid-rows-[1fr_auto]">
      <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Readiness</Button>
            <NewApplicationModal onCreate={(name)=>console.log("Create:",name)} />
          </div>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Programs</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-semibold">{total}</div>
              <Badge>Active</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Tasks</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>Avg progress</CardDescription>
              <Progress value={avg} />
              <p className="text-xs text-muted-foreground">{avg}% complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Essays</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">2 drafts</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Recommenders</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">2 invited</CardContent>
          </Card>
        </section>

        {/* Program list */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(p => <ProgramCard key={p.id} program={p} />)}
        </section>
      </div>

      {/* Quick actions pinned */}
      <div className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 p-4">
        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="justify-center">Readiness</Button>
          <Button variant="outline" className="justify-center">New Essay</Button>
          <Button variant="outline" className="justify-center">Invite Recommender</Button>
          <Button className="justify-center">Add Program</Button>
        </div>
      </div>
    </div>
  );
}
