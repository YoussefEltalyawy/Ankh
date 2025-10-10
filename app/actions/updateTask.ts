"use server";
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function updateTask(taskId: string, newTitle: string): Promise<Task> {
  const user = await getCurrentUser();

  if (!taskId || !newTitle) {
    throw new Error("Task ID and new title are required");
  }

  if (!user || !user.id) {
    throw new Error("Unauthorized: user not found");
  }

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        userId: user.id, // Ensure the task belongs to the user
      },
      data: {
        title: newTitle,
      },
    });
    const mapped: Task = {
      id: updatedTask.id,
      title: updatedTask.title,
      completed: updatedTask.completed,
      priority: (updatedTask.priority ?? undefined) as 'low' | 'medium' | 'high' | undefined,
      createdAt: updatedTask.createdAt,
    };
    return mapped;
  } catch (err) {
    console.error("Error updating task:", err);
    throw new Error("Failed to update task");
  }
}

export default updateTask;
