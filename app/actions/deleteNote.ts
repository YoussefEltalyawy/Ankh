"use server";
import prisma from "../lib/db";

async function deleteNote(noteId: string) {
  try {
    console.log("came here");
    console.log(noteId);
    await prisma.note.delete({
      where: { id: noteId },
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw new Error("Failed to fetch notes");
  }
}

export default deleteNote;
