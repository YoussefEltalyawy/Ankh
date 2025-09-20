import { getCurrentUser } from "../lib/auth-utils";
import DashboardClient from "./DashboardClient";
import getTasks from "../actions/getTask";
import getNotes from "../actions/getNote";

async function DashboardPage() {
  const user = await getCurrentUser();
  const tasks = await getTasks(user.id);
  const notes = await getNotes(user.id);

  return <DashboardClient user={user} initialTasks={tasks} initalNotes={notes} />;
}

export default DashboardPage;
