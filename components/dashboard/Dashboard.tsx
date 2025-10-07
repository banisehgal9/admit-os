"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp, BookOpen, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-dvh grid grid-rows-[1fr_auto]">
      {/* ---------- MAIN CONTENT ---------- */}
      <div className="p-6 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your applications
            </p>
          </div>
          <Button className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Program
          </Button>
        </header>

        {/* ---------- SUMMARY CARDS ---------- */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-semibold">3</div>
              <Badge>Active</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-semibold">12</div>
              <Progress value={48} />
              <p className="text-xs text-muted-foreground">48% complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Essays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">2 drafts</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Recommenders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">2 invited</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* ---------- QUICK ACTIONS ---------- */}
      <div className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 p-4">
        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="justify-center">
            <TrendingUp className="h-4 w-4 mr-2" /> Readiness
          </Button>
          <Button variant="outline" className="justify-center">
            <BookOpen className="h-4 w-4 mr-2" /> New Essay
          </Button>
          <Button variant="outline" className="justify-center">
            <Users className="h-4 w-4 mr-2" /> Invite Recommender
          </Button>
          <Button className="justify-center">
            <Plus className="h-4 w-4 mr-2" /> Add Program
          </Button>
        </div>
      </div>
    </div>
  );
}
