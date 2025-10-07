import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Admit OS</h1>
        <Link href="/dashboard" className="underline">Go to Dashboard</Link>
      </div>
    </main>
  );
}
