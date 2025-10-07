"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onCreate?: (name: string) => void;
  triggerClassName?: string;
};

export function NewApplicationModal({ onCreate, triggerClassName }: Props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate?.(trimmed);
    // placeholder action for now
    console.log("Create Application →", trimmed);
    setName("");
    setOpen(false);
  }

  return (
    <>
      {/* Trigger */}
      <Button className={triggerClassName} onClick={() => setOpen(true)}>
        + Add Program
      </Button>

      {/* Lightweight modal (no shadcn deps) */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">New Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="programName">Program name</Label>
                <Input
                  id="programName"
                  placeholder="e.g., Harvard MBA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
