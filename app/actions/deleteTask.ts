'use server'
import prisma from "../lib/db";

async function deleteTask(taskId: string) {
  try {
    console.log("came here");
    console.log(taskId)
    await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks");
  }
}

export default deleteTask;
