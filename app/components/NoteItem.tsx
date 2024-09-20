import { X } from "lucide-react";

type NoteItemProps = {
  title: string;
  id: string;
  onDeleteNote: (title: string) => Promise<void>;
};

function NoteItem({ title, id, onDeleteNote }: NoteItemProps) {
  return (
    <li key={id} className="flex flex-row justify-between group mb-[10px]">
      <p className="text-white text-p">{title}</p>
      {/* The X button is initially hidden and appears with animation on hover */}
      <X
        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-75 ease-in-out cursor-pointer"
        onClick={() => onDeleteNote(id)}
      />
    </li>
  );
}

export default NoteItem;
