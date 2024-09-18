"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { useState } from "react";

function TaskItem({ title, key }: { title: string; key: string }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <li key={key}>
        <Checkbox color="default" radius="sm" size="md">
          <p className="text-white text-p ml-[6px]"> {title}</p>
        </Checkbox>
      </li>
    </div>
  );
}
export default TaskItem;
