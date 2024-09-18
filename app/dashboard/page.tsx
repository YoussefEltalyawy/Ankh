import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import prisma from "../lib/db";
import getTasks from "../actions/getTask";

type UserData = {
  email: string | undefined | null;
  id: string;
  name: string | undefined | null;
  pfp: string | undefined | null;
};

async function createOrFindUser(userData: UserData): Promise<void> {
  const { id, email, name, pfp } = userData;

  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id,
        email: email || undefined,
        name,
        pfp,
      },
    });
  }
}

async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return redirect("/");
  }

  const tasks = await getTasks(user.id);

  await createOrFindUser({
    email: user.email as string,
    id: user.id as string,
    name: user.given_name as string,
    pfp: user.picture as string,
  });

  return <DashboardClient user={user} tasks={tasks} />;
}

export default DashboardPage;