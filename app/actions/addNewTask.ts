'use server'
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function addNewTask(title: string): Promise<Task> {
  const user = await getCurrentUser();

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
    return task;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export default addNewTask;
