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
        class="cursor-text rounded-md bg-transparent text-lg text-stone-700 outline-none dark:text-stone-100"
        value={props.column.name}
        onKeyDown={handleColumnNameEdit}
      />

      <section
        class="flex h-full w-72 flex-col justify-between rounded-md border border-stone-300 bg-stone-200 p-2 dark:border-stone-900 dark:bg-stone-800"
        classList={{ "animate-pulse": isColumnReloading(props.column.id) }}
      >
        <ul>
          <For each={props.tasks ?? []}>
            {(task) => <TaskTile task={task} />}
          </For>
        </ul>

        <div class="flex justify-between">
          <button
            class="cursor-pointer p-2 text-stone-400 transition-colors hover:text-red-600"
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
