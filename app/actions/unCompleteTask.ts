'use server'
import prisma from "../lib/db";

async function unCompleteTask(taskId : string) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { completed: false },
    });
    console.log(prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true },
    }))
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export default unCompleteTask;
