import { auth } from "./lib/auth";
import HomePage from "./components/HomePage";

import type { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const session = await auth();
  const isUserAuthenticated = !!session;

  // Pass the authentication status to our client component
  return <HomePage isUserAuthenticated={isUserAuthenticated} />;
}
