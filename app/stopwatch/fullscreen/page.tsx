import { getCurrentUser } from "@/app/lib/auth-utils";
import StopwatchClient from "./StopwatchClient";
import getUnCompletedTasks from "@/app/actions/getUnCompletedTasks";

async function Page() {
  const user = await getCurrentUser();
  const tasks = await getUnCompletedTasks(user.id);
  return (
    <StopwatchClient tasks={tasks} />
  )
}

export default Page;
