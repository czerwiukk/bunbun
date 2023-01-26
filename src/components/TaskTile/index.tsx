import { faGripVertical, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createDraggable } from "@thisbeyond/solid-dnd";
import Fa from "solid-fa";
import { Component } from "solid-js";
import { IBoardTask } from "~/types";

interface TaskTileProps {
  task: IBoardTask;
}

export const TaskTile: Component<TaskTileProps> = (props) => {
  const draggable = createDraggable(props.task.id);

  return (
    <li
      // @ts-ignore
      use:draggable
      class="flex flex-col relative h-32 w-full bg-stone-100 rounded-md text-stone-700 px-4 py-2 draggable cursor-grab active:cursor-grabbing mb-4"
    >
      <p class="font-bold text-lg mb-1 cursor-text">{props.task.name}</p>

      <p class="text-sm cursor-text">{props.task.description}</p>

      <div class="absolute right-2 bottom-2 text-stone-400">
        <Fa icon={faGripVertical} />
      </div>
    </li>
  );
};
