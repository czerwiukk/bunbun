import Fa from "solid-fa";
import { Component, For } from "solid-js";
import { TaskTile } from "../TaskTile";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { type IBoardColumn } from "~/types";

interface BoardColumnProps {
  column: IBoardColumn;
}

export const BoardColumn: Component<BoardColumnProps> = (props) => {
  return (
    <div class="mb-4">
      <label class="text-lg text-stone-700">{props.column.name}</label>

      <section class="w-72 h-full bg-zinc-200 rounded-md p-4 flex flex-col justify-between">
        <div>
          <For each={props.column.tasks ?? []}>
            {(task) => <TaskTile task={task} />}
          </For>
        </div>

        <div class="flex justify-end">
          <button class="w-8 h-8 rounded-full bg-stone-300 p-2 cursor-pointer grid place-content-center transition-colors hover:bg-stone-400">
            <Fa icon={faPlus} />
          </button>
        </div>
      </section>
    </div>
  );
};
