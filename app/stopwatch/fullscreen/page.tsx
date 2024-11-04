import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import StopwatchClient from "./StopwatchClient";
import getUnCompletedTasks from "@/app/actions/getUnCompletedTasks";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const tasks = await getUnCompletedTasks(user?.id);
  return (
    <StopwatchClient tasks={tasks}/>
  )
}

export default Page;
