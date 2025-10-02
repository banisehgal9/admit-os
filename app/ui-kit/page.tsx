import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function UIKitPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-semibold">Admit OS — UI Kit</h1>

        {/* Buttons */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Brand Primary (default)</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              Brand Primary (raw)
            </Button>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardContent>
        </Card>
{/* Brand Colors */}
<Card className="rounded-2xl">
  <CardHeader>
    <CardTitle>Brand Colors</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {[
        { name: "primary", var: "--primary" },
        { name: "primary-foreground", var: "--primary-foreground" },
        { name: "background", var: "--background" },
        { name: "foreground", var: "--foreground" },
        { name: "card", var: "--card" },
        { name: "card-foreground", var: "--card-foreground" },
        { name: "popover", var: "--popover" },
        { name: "popover-foreground", var: "--popover-foreground" },
        { name: "secondary", var: "--secondary" },
        { name: "secondary-foreground", var: "--secondary-foreground" },
        { name: "muted", var: "--muted" },
        { name: "muted-foreground", var: "--muted-foreground" },
        { name: "accent", var: "--accent" },
        { name: "accent-foreground", var: "--accent-foreground" },
        { name: "border", var: "--border" },
        { name: "input", var: "--input" },
        { name: "ring", var: "--ring" },
        { name: "destructive", var: "--destructive" },
        { name: "destructive-foreground", var: "--destructive-foreground" },
{ name: "blue-100", var: "--blue-100" },
{ name: "green-100", var: "--green-100" },
{ name: "rose-100", var: "--rose-100" },
{ name: "amber-100", var: "--amber-100" },
{ name: "yellow-100", var: "--yellow-100" },
      ].map((c) => (
        <div key={c.name} className="space-y-2">
          <div
            className="h-16 w-full rounded-md border"
            style={{ background: `var(${c.var})` }}
          />
          <div className="text-xs">
            <div className="font-medium">{c.name}</div>
            <div className="text-muted-foreground font-mono">
              {c.var}
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

        <Separator />
        <p className="text-sm text-muted-foreground">
          Colors come from CSS variables in <code>app/globals.css</code> and are
          mapped in <code>tailwind.config.js</code>.
        </p>
      </div>
    </main>
  );
}

