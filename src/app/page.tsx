import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Admit OS</h1>
      <p className="mt-2 text-neutral-300 max-w-xl">
        Your grad application command center.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link href="/signup">Sign up</Link></Button>
        <Button asChild variant="outline"><Link href="/login">Log in</Link></Button>
      </div>
    </main>
  )
}
