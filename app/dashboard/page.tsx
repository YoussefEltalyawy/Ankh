import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import prisma from "../lib/db";
import getTasks from "../actions/getTask";
import { User } from "@/app/types";

async function createOrFindUser(userData: User): Promise<void> {
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
    email: user.email,
    id: user.id,
    name: user.given_name,
    pfp: user.picture,
  });

  return <DashboardClient user={user} initialTasks={tasks} />;
}

export default DashboardPage;
