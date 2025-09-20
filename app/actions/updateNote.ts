"use server";
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Note } from "@/app/types";

async function updateNote(noteId: string, newContent: string): Promise<Note> {
  const user = await getCurrentUser();

  if (!noteId || !newContent) {
    throw new Error("Note ID and new content are required");
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
