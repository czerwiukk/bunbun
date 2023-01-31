import { Component } from "solid-js";
import Fa from "solid-fa";
import { createDraggable } from "@thisbeyond/solid-dnd";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { IBoardTask } from "~/types";

interface TaskTileProps {
  task: IBoardTask;
}

export const TaskTile: Component<TaskTileProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const draggable = createDraggable(props.task.id);

  return (
    <li
      // @ts-ignore
      use:draggable
      class="draggable relative mb-4 flex h-24 cursor-grab flex-col overflow-hidden text-ellipsis  rounded-md border border-stone-300 bg-stone-100 px-4 py-2 text-stone-700 active:z-30 active:cursor-grabbing active:bg-stone-50 active:shadow-lg dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:active:bg-stone-700"
    >
      <p class="mb-1 truncate font-bold">{props.task.name}</p>

      <p class="truncate text-xs">{props.task.description}</p>

      <div class="absolute right-2 bottom-2 text-stone-400">
        <Fa icon={faGripVertical} />
      </div>
    </li>
  );
};
