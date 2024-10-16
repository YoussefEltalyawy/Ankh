'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Task } from "@/app/types";

async function updateTask(taskId: string, newTitle: string): Promise<Task> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!taskId || !newTitle) {
    throw new Error("Task ID and new title are required");
  }

  if (!user || !user.id) {
    throw new Error("User not authenticated");
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