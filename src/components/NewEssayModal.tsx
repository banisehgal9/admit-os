import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PenTool, Plus } from 'lucide-react';

interface NewEssayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEssay: (essayData: {
    title: string;
    prompt: string;
    wordLimit: number;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
  }) => void;
  programName: string;
}

export function NewEssayModal({ isOpen, onClose, onCreateEssay, programName }: NewEssayModalProps) {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [wordLimit, setWordLimit] = useState(500);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && prompt && dueDate) {
      onCreateEssay({
        title,
        prompt,
        wordLimit,
        priority,
        dueDate
      });
      // Reset form
      setTitle('');
      setPrompt('');
      setWordLimit(500);
      setPriority('medium');
      setDueDate('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full border-0 shadow-xl bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-primary" />
            Start New Essay - {programName}
          </DialogTitle>
          <DialogDescription>
            Create a new essay task with a custom prompt for this application
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="essay-title">Essay Title</Label>
            <Input
              id="essay-title"
              placeholder="e.g., Leadership Experience Essay, Career Goals Essay"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="essay-prompt">Essay Prompt</Label>
            <Textarea
              id="essay-prompt"
              placeholder="Enter the essay prompt or question you need to answer..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="word-limit">Word Limit</Label>
              <Input
                id="word-limit"
                type="number"
                placeholder="500"
                value={wordLimit}
                onChange={(e) => setWordLimit(Number(e.target.value))}
                min={100}
                max={2000}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value: 'high' | 'medium' | 'low') => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Essay
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}