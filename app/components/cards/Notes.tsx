import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoteItem from "../NoteItem";
import { Note } from "@/app/types";
import NewNote from "../NewNote";
import { MoreHorizontal, Search, FileText } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    return notes.filter(note =>
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

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
      <div
        className="flex flex-row justify-between items-center mb-[10px] card-handle cursor-grab select-none"
        onDragStart={(e) => e.preventDefault()}
      >
        <h6 className="font-semibold font-manrope text-h6 text-white pointer-events-none">Notes</h6>
        <div
          className="flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-white/10"
            onClick={() => setSearchQuery(searchQuery ? "" : " ")}
          >
            <Search className="h-4 w-4 text-white" />
            <span className="sr-only">Search notes</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                <MoreHorizontal className="h-4 w-4 text-white" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#1a1a1a] border-white/10 text-white">
              <DropdownMenuLabel className="text-white/60 text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white cursor-pointer">
                Refresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {searchQuery && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none rounded-lg text-sm"
            autoFocus
          />
        </div>
      )}
      <div className="grow overflow-y-auto mb-[16px]">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {notes.length === 0 ? "No notes yet" : "No notes match your search"}
            </h3>
            <p className="text-white/60 text-sm mb-4">
              {notes.length === 0
                ? "Create your first note to get started"
                : "Try adjusting your search criteria"
              }
            </p>
            {notes.length === 0 && (
              <Button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Enter Note"]') as HTMLInputElement;
                  if (input) input.focus();
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Create Note
              </Button>
            )}
          </div>
        ) : (
          <ul>
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <NoteItem
                    id={note.id}
                    title={note.content}
                    onDeleteNote={onDeleteNote}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
      <NewNote onAddNote={onAddNote} />
    </div>
  );
}

export default NotesCard;
