import React from "react";
import NoteItem from "../NoteItem";
import { Note } from "@/app/types";
import NewNote from "../NewNote";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        flex flex-col h-full max-h-full overflow-hidden
      `}
    >
      <div className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab">
        <h6 className="font-semibold font-manrope text-h6 text-white">Notes</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
              <MoreHorizontal className="h-4 w-4 text-white" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grow overflow-y-auto mb-[16px]">
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