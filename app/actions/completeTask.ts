'use server'
import prisma from "../lib/db";

async function completeTask(taskId: string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { completed: true },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export default completeTask;
