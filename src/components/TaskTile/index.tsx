import { Component } from "solid-js";
import { IBoardTask } from "~/types";

interface TaskTileProps {
  task: IBoardTask;
}

export const TaskTile: Component<TaskTileProps> = (props) => {
  return (
    <section class="flex flex-col h-32 w-full bg-zinc-100 rounded-md text-stone-700 px-4 py-2">
      <p class="font-bold text-lg">{props.task.name}</p>

      <p>{props.task.description}</p>
    </section>
  );
};
