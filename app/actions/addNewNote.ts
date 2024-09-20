"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Note } from "@/app/types";

async function addNewNote(content: string): Promise<Note> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!content) {
    throw new Error("Title is required");
  }

  if (!user || !user.id) {
    throw new Error("User not authenticated");
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
