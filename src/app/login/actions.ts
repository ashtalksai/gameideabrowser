"use server"

import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  
  if (!email) {
    return { error: "Email is required" }
  }

  try {
    await signIn("credentials", {
      email,
      redirect: false,
    })
  } catch (error) {
    // signIn throws NEXT_REDIRECT which we want to let through
    throw error
  }
  
  redirect("/ideas")
}
