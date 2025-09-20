import { auth } from "./auth"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  return session.user
}
