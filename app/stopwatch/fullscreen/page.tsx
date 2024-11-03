import getTasks from "@/app/actions/getTask";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import StopwatchClient from "./StopwatchClient";

async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const tasks = await getTasks(user?.id);
  return (
    <StopwatchClient tasks={tasks}/>
  )
}

export default Page;
