import { createDraggable } from "@thisbeyond/solid-dnd";
import { Component } from "solid-js";
import { IBoardTask } from "~/types";

interface TaskTileProps {
  task: IBoardTask;
}

export const TaskTile: Component<TaskTileProps> = (props) => {
  const draggable = createDraggable(props.task.id);

  return (
    <section
      use:draggable
      class="flex flex-col h-32 w-full bg-stone-100 rounded-md text-stone-700 px-4 py-2 draggable cursor-grab active:cursor-grabbing"
    >
      <p class="font-bold text-lg mb-1 cursor-text">{props.task.name}</p>

      <p class="text-sm cursor-text">{props.task.description}</p>
    </section>
  );
};
