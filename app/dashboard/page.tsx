import { getCurrentUser } from "../lib/auth-utils";
import type { User as AppUser } from "@/app/types";
import DashboardClient from "./DashboardClient";
import getTasks from "../actions/getTask";
import getNotes from "../actions/getNote";

async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user?.id) {
    // Optionally redirect to sign-in or throw an error
    throw new Error("Unauthorized: user not found");
  }
  const tasks = await getTasks(user.id);
  const notes = await getNotes(user.id);

  const appUser: AppUser = {
    id: user.id,
    email: user.email ?? null,
    name: user.name ?? null,
    image: 'image' in user ? ((user as { image?: string | null }).image ?? null) : null,
  };

  return <DashboardClient user={appUser} initialTasks={tasks} initialNotes={notes} />;
}

export default DashboardPage;
