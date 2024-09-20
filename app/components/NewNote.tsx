import { Check, Plus } from "lucide-react";
import { useState } from "react";

type NewNoteProps = {
  onAddNote: (title: string) => Promise<void>;
};

function NewNote({ onAddNote }: NewNoteProps) {
  const [typing, setTyping] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddNote(content.trim());
      setContent("");
      setTyping(false);
    }
  };

  return typing ? (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter Note"
        className="text-white bg-transparent outline-none"
        maxLength={36}
      />
      <button type="submit" className="text-white">
        <Check className="w-[20px] h-[20px]" />
      </button>
    </form>
  ) : (
    <span
      className="flex gap-[8px] hover:opacity-80 transition-opacity duration-75 cursor-pointer"
      onClick={() => setTyping(true)}
    >
      <Plus className="text-white" />
      <p className="text-white">Add Note</p>
    </span>
  );
}

export default NewNote;
