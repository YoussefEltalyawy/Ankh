"use server";
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function updateTask(taskId: string, newTitle: string): Promise<Task> {
  const user = await getCurrentUser();

  if (!taskId || !newTitle) {
    throw new Error("Task ID and new title are required");
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
    return updatedTask;
  } catch (err) {
    console.error("Error updating task:", err);
    throw new Error("Failed to update task");
  }
}

export default updateTask;
