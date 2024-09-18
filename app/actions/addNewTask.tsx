import prisma from "../lib/db";

async function addNewTask(formData: FormData) {
  const title = formData.get("title");
  console.log(title )
  try {
    const task = await prisma.task.create({
      data: {
        title: title,
      },
    });
    return task;
  } catch (err) {
    console.error(err);
  }
}
export default addNewTask;
