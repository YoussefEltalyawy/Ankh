'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function addNewTask(title: string): Promise<Task> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!title) {
    throw new Error("Title is required");
  }

  if (!user || !user.id) {
    throw new Error("User not authenticated");
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: title,
        userId: user.id,
        completed: false,
      },
    });
    return task;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export default addNewTask;
