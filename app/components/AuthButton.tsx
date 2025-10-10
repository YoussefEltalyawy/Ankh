"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button disabled variant="ghost">
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, {session.user?.name}
        </span>
        <Button
          onClick={() => signOut()}
          variant="ghost"
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  )
}
