import prisma from "../lib/db";
import { Note } from "@/app/types";

async function getNotes(userId: string): Promise<Note[]> {
  try {
    const note = await prisma.note.findMany({
      where: {
        userId: userId,
      },
    });
    return note;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks");
  }
}

export default getNotes;
