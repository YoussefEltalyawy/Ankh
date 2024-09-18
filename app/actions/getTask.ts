import prisma from "../lib/db";

async function getTasks(userId : string) {
  try {
    const tasks = await prisma.task.findMany(
      {
        where: {
          userId: userId
        }
      }
    );
    return tasks;
  } catch (err) {
    console.error(err);
  }
}
export default getTasks;
