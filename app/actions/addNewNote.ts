"use server";
import { getCurrentUser } from "../lib/auth-utils";
import prisma from "../lib/db";
import { Note } from "@/app/types";

async function addNewNote(content: string): Promise<Note> {
  const user = await getCurrentUser();

  if (!content) {
    throw new Error("Content is required");
  }

  try {
    const note = await prisma.note.create({
      data: {
        content: content,
        userId: user.id,
      },
    });
    return note;
  } catch (err) {
    console.error("Error creating note:", err);
    throw new Error("Failed to create note");
  }
}

export default addNewNote;
