'use server'
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function addNewTask(title: string, priority?: 'low' | 'medium' | 'high'): Promise<Task> {
  const user = await getCurrentUser();

  if (!title) {
    throw new Error("Title is required");
  }

  if (!user || !user.id) {
    throw new Error("Unauthorized: user not found");
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: title,
        userId: user.id,
        completed: false,
        priority: priority || null,
      },
    });
    const mappedTask: Task = {
      id: task.id,
      title: task.title,
      completed: task.completed,
      priority: (task.priority ?? undefined) as 'low' | 'medium' | 'high' | undefined,
      createdAt: task.createdAt,
    };
    return mappedTask;
  } catch (err) {
    console.error("Error creating task:", err);
    console.error("Full error details:", JSON.stringify(err, null, 2));
    throw new Error("Failed to create task");
  }
}

export default addNewTask;
