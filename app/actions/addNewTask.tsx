"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

async function addNewTask(formData: FormData) {
  const title = formData.get("title") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!title) {
    throw new Error("Title is required");
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: title,
        userId: user.id,
        completed: false,
      },
    });
    revalidatePath('/dashboard');
    return task;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export default addNewTask;
