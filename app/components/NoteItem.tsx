import { useState } from "react";
import { X, Check, Pencil } from "lucide-react";
import updateNote from "../actions/updateNote";

type NoteItemProps = {
  title: string;
  id: string;
  onDeleteNote: (title: string) => Promise<void>;
};

function NoteItem({ title, id, onDeleteNote }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateNote = async () => {
    if (editedTitle.trim() === "") return;
    if (editedTitle === title) {
      setIsEditing(false);
      return;
    }

    try {
      await updateNote(id, editedTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
      setEditedTitle(title);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdateNote();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex flex-row justify-between group mb-[10px]">
      {!isEditing ? (
        <>
          <p className="text-white text-p">{editedTitle}</p>
          <span className="flex gap-4">
            <Pencil
              className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out cursor-pointer hover:text-white"
              onClick={handleEdit}
            />
            <X
              className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out cursor-pointer hover:text-white"
              onClick={() => onDeleteNote(id)}
            />
          </span>
        </>
      ) : (
        <div className="flex w-full justify-between items-center">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-transparent text-white border-b border-white focus:outline-none px-2 py-1 w-full mr-4"
            autoFocus
          />
          <span className="flex gap-4">
            <Check
              className="text-white cursor-pointer"
              onClick={handleUpdateNote}
            />
            <X
              className="text-white cursor-pointer"
              onClick={() => {
                setEditedTitle(title);
                setIsEditing(false);
              }}
            />
          </span>
        </div>
      )}
    </li>
  );
}

export default NoteItem;
