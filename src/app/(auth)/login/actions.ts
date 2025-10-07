"use server"

import { redirect } from "next/navigation"
import { createClient } from "../../lib/supabase/server"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect("/dashboard")
}
