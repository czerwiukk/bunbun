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
      class="flex flex-col relative h-24 mb-4 border border-stone-300 bg-stone-100 active:bg-stone-50 rounded-md text-stone-700 px-4 py-2 draggable cursor-grab active:cursor-grabbing active:z-30 active:shadow-lg overflow-hidden text-ellipsis"
    >
      <p class="font-bold mb-1 truncate">{props.task.name}</p>

      <p class="text-xs truncate">{props.task.description}</p>

      <div class="absolute right-2 bottom-2 text-stone-400">
        <Fa icon={faGripVertical} />
      </div>
    </li>
  );
};
