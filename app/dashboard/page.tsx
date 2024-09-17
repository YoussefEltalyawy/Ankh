import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardClient from "./DashboardClient";
async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <DashboardClient user={user}/>
}
export default DashboardPage;
