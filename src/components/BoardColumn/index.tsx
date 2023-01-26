import Fa from "solid-fa";
import { Component, createSignal, For, Show } from "solid-js";
import { TaskTile } from "../TaskTile";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { type IBoardColumn } from "~/types";
import { createDroppable } from "@thisbeyond/solid-dnd";
import { changeColumnName } from "~/api";

interface BoardColumnProps {
  column: IBoardColumn;
  onDeleteColumn: (id: number) => void;
}

export const BoardColumn: Component<BoardColumnProps> = (props) => {
  const droppable = createDroppable(props.column.id);
  let input: HTMLInputElement;

  const handleColumnNameEdit = async (e: KeyboardEvent) => {
    if (e.key !== "Enter" || !input.value) return;
    await changeColumnName(props.column.id, input.value);
  };

  return (
    <div
      use:droppable
      class="droppable mb-4"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      <input
        ref={input}
        class="text-lg text-stone-700 cursor-text outline-none focus:bg-stone-50 rounded-md"
        value={props.column.name}
        onKeyDown={handleColumnNameEdit}
      />

      <section class="w-72 h-full bg-stone-200 rounded-md p-4 flex flex-col justify-between">
        <div>
          <For each={props.column.tasks ?? []}>
            {(task) => <TaskTile task={task} />}
          </For>
        </div>

        <div class="flex justify-between">
          <button
            class="text-stone-400 p-2 hover:text-red-600 transition-colors cursor-pointer"
            onClick={() => props.onDeleteColumn(props.column.id)}
          >
            <Fa icon={faTrash} />
          </button>

          <button class="w-8 h-8 rounded-full p-2 bg-stone-300 cursor-pointer grid place-content-center transition-colors hover:bg-stone-400">
            <Fa icon={faPlus} />
          </button>
        </div>
      </section>
    </div>
  );
};
