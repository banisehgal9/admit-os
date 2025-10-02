export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="space-y-6 text-center">
        <div className="mx-auto h-16 w-16 rounded-md bg-primary" />
        <p className="text-sm text-muted-foreground">If this square is #1E3A8A, tokens are loaded ✅</p>
      </div>
    </main>
  );
}

