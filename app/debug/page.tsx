export default function Debug() {
  const swatches = [
    { name: "green-100", varName: "--green-100" },
    { name: "rose-100",  varName: "--rose-100" },
    { name: "yellow-100",varName: "--yellow-100" },
    { name: "success",   varName: "--success" },
    { name: "destructive", varName: "--destructive" },
    { name: "warning",   varName: "--warning" },
  ];

  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6">Debug — Status Colors</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {swatches.map(s => (
          <div key={s.name} className="space-y-2">
            <div
              className="h-16 w-full rounded-md border"
              style={{ background: `var(${s.varName})` }}
            />
            <div className="text-xs">
              <div className="font-medium">{s.name}</div>
              <div className="text-muted-foreground font-mono">{s.varName}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

