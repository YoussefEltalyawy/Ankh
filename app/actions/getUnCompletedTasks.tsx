import prisma from "../lib/db";
import { Task } from "@/app/types";

async function getUnCompletedTasks(userId: string): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        completed: false, // Filter out completed tasks
      },
    });
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks");
  }
}

export default getUnCompletedTasks;
