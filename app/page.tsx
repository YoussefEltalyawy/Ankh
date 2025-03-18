import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import HomePage from "./components/HomePage";  // We'll create this client component

export default async function Home(): Promise<JSX.Element> {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated: boolean = await isAuthenticated();

  // Pass the authentication status to our client component
  return <HomePage isUserAuthenticated={isUserAuthenticated} />;
}
