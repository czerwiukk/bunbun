import Fa from "solid-fa";
import { Component, For } from "solid-js";
import { TaskTile } from "../TaskTile/TaskTile";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IBoardTask, type IBoardColumn } from "~/types";
import { createDroppable } from "@thisbeyond/solid-dnd";
import { changeColumnName } from "~/api";
import { usePendingChanges } from "~/hooks";
import { Modal } from "..";

interface BoardColumnProps {
  column: IBoardColumn;
  tasks: IBoardTask[];
  onDeleteColumn: (id: number) => void;
}

export const BoardColumn: Component<BoardColumnProps> = (props) => {
  const droppable = createDroppable(props.column.id);

  let input: HTMLInputElement;

  const handleColumnNameEdit = async (e: KeyboardEvent) => {
    if (e.key !== "Enter" || !input.value) return;
    await changeColumnName(props.column.id, input.value);
  };

  const { isColumnReloading } = usePendingChanges;

  return (
    <div
      // @ts-ignore
      use:droppable
      class="droppable mb-4"
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      <input
        id={`${props.column.id}-column-name`}
        // @ts-ignore
        ref={input}
        class="text-lg text-stone-700 dark:text-stone-100 cursor-text outline-none bg-transparent rounded-md"
        value={props.column.name}
        onKeyDown={handleColumnNameEdit}
      />

      <section
        class="w-72 h-full bg-stone-200 dark:bg-stone-800 rounded-md p-2 flex flex-col justify-between border border-stone-300 dark:border-stone-900"
        classList={{ "animate-pulse": isColumnReloading(props.column.id) }}
      >
        <ul>
          <For each={props.tasks ?? []}>
            {(task) => <TaskTile task={task} />}
          </For>
        </ul>

        <div class="flex justify-between">
          <button
            class="text-stone-400 p-2 hover:text-red-600 transition-colors cursor-pointer"
            onClick={() => props.onDeleteColumn(props.column.id)}
          >
            <Fa icon={faTrash} />
          </button>

          <Modal
            trigger={<Fa icon={faPlus} />}
            triggerClass="w-8 h-8 rounded-full p-2 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 hover:bg-stone-500 dark:text-stone-200 cursor-pointer grid place-content-center transition-colors"
          >
            Add task modal
          </Modal>
        </div>
      </section>
    </div>
  );
};
