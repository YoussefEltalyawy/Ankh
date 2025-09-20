"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@nextui-org/button"

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button isLoading color="primary" variant="ghost">
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
          color="danger"
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
      color="primary"
      variant="solid"
    >
      Sign In
    </Button>
  )
}
