import prisma from "../lib/db";
import { Task } from "@/app/types";

async function getTasks(userId: string): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks");
  }
}

export default getTasks;
