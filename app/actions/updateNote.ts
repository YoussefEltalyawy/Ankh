"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Note } from "@/app/types";

async function updateNote(noteId: string, newContent: string): Promise<Note> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!noteId || !newContent) {
    throw new Error("Note ID and new content are required");
  }

  if (!user || !user.id) {
    throw new Error("User not authenticated");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
        userId: user.id, // Ensure the note belongs to the user
      },
      data: {
        content: newContent,
      },
    });
    return updatedNote;
  } catch (err) {
    console.error("Error updating note:", err);
    throw new Error("Failed to update note");
  }
}

export default updateNote;
