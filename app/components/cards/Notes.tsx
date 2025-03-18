import React from "react";
import NoteItem from "../NoteItem";
import { Note } from "@/app/types";
import NewNote from "../NewNote";
import { MoreHorizontal } from "lucide-react";

type NotesProps = {
  visible: boolean;
  opacity: number;
  notes: Note[];
  onAddNote: (content: string) => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
};

function NotesCard({
  visible,
  opacity,
  notes,
  onAddNote,
  onDeleteNote,
}: NotesProps) {
  if (!visible) return null;

  return (
    <div
      className={`
        card bg-[rgba(255,255,255,0.09)] px-[32px] py-[24px] rounded-3xl
        border border-[rgba(255,255,255,.1)] backdrop-blur-[5.7px] transition-opacity duration-300 ease-in-out
        ${opacity === 100 ? "opacity-100" : "opacity-0"}
        flex flex-col h-full overflow-hidden
      `}
    >
      <span className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab">
        <h6 className="font-semibold font-manrope text-h6 text-white">Notes</h6>
        <MoreHorizontal className="text-white cursor-pointer" />
      </span>
      <div className="flex-grow overflow-y-auto mb-[16px]">
        <ul>
          {notes.map((note) => (
            <NoteItem
              id={note.id}
              title={note.content}
              key={note.id}
              onDeleteNote={onDeleteNote}
            />
          ))}
        </ul>
      </div>
      <NewNote onAddNote={onAddNote} />
    </div>
  );
}

export default NotesCard;