'use server';

import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";

async function reorderTasks(taskIds: string[]): Promise<void> {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized: user not found");
  }

  try {
    // Update each task's position in a transaction
    await prisma.$transaction(
      taskIds.map((taskId, index) =>
        prisma.task.update({
          where: {
            id: taskId,
            userId: user.id,
          },
          data: {
            position: index,
          },
        })
      )
    );
  } catch (err) {
    console.error("Error reordering tasks:", err);
    throw new Error("Failed to reorder tasks");
  }
}

export default reorderTasks;
