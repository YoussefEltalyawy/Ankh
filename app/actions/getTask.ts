import prisma from "../lib/db";
import { Task } from "@/app/types";

async function getTasks(userId: string): Promise<Task[]> {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: { position: 'asc' },
    });
    const mapped: Task[] = tasks.map(t => ({
      id: t.id,
      title: t.title,
      completed: t.completed,
      priority: (t.priority ?? undefined) as 'low' | 'medium' | 'high' | undefined,
      position: t.position,
      createdAt: t.createdAt,
    }));
    return mapped;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks");
  }
}

export default getTasks;
