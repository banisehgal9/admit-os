"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ProgramCard, Program } from "./ProgramCard";
import { NewApplicationModal } from "./NewApplicationModal";
import { Plus, BookOpen, Target, TrendingUp, Users } from "lucide-react";

type DashboardProps = {
  programs?: Program[];
};

export default function Dashboard({ programs: programsProp = [] }: DashboardProps) {
  // TEMP: if nothing passed, show a harmless sample so UI renders
  const demo: Program[] = [
    { id: "hbs", name: "Harvard MBA", school: "HBS", round: "R2", deadline: "Jan 6", progress: 40, status: "Active" },
    { id: "wharton", name: "Wharton MBA", school: "Wharton", round: "R2", deadline: "Jan 7", progress: 55, status: "Active" },
  ];
  const programs = programsProp.length ? programsProp : demo;

  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);

  const total = programs.length;
  const inProgress = programs.filter(p => p.status === "in-progress" || p.status === "Active").length;
  const submitted = programs.filter(p => p.status === "submitted" || p.status === "Submitted").length;
  const avgProgress = total ? Math.round(programs.reduce((acc, p) => acc + (p.progress ?? 0), 0) / total) : 0;

  return (
    <div className="min-h-dvh grid grid-rows-[1fr_auto]">
      <div className="p-6 space-y-6 max-w-6xl mx-auto w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Overview of your applications</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><TrendingUp className="h-4 w-4 mr-2" /> Readiness</Button>
            <NewApplicationModal onCreate={(name) => console.log("Create:", name)} />
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Programs</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-semibold">{total}</div></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Tasks</CardTitle></CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Avg progress</div>
              <div className="h-2 w-full overflow-hidden rounded bg-neutral-200">
                <div className="h-full bg-black" style={{ width: `${avgProgress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{avgProgress}% complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Essays</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground"><BookOpen className="h-4 w-4 inline mr-2" />2 drafts</CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm text-muted-foreground">Recommenders</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground"><Users className="h-4 w-4 inline mr-2" />2 invited</CardContent>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(p => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </section>
      </div>

      <div className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 p-4">
        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="justify-center"><Target className="h-4 w-4 mr-2" /> Goals</Button>
          <Button variant="outline" className="justify-center"><BookOpen className="h-4 w-4 mr-2" /> New Essay</Button>
          <Button variant="outline" className="justify-center"><Users className="h-4 w-4 mr-2" /> Invite Recommender</Button>
          <Button className="justify-center"><Plus className="h-4 w-4 mr-2" /> Add Program</Button>
        </div>
      </div>
    </div>
  );
}
