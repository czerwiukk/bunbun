import { faPlus, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, createResource, createSignal, For } from "solid-js";
import { changeTaskColumn } from "~/api";
import { BoardColumn } from "../BoardColumn/BoardColumn";
import {
  DragDropProvider,
  DragDropSensors,
  DragEvent,
} from "@thisbeyond/solid-dnd";
import { fetchBoardTasks } from "~/api/columns";
import { usePendingChanges, useColumns } from "~/hooks";
interface BoardProps {
  id: number;
}

export const Board: Component<BoardProps> = (props) => {
  const { boardColumns, createColumn, deleteColumn } = useColumns(
    () => props.id
  );

  const [boardTasks, { refetch: refetchTasks }] = createResource(
    () => props.id,
    fetchBoardTasks
  );

  const [isAddBtnMoved, moveAddBtn] = createSignal(false);

  const { getColumnTasksPredicate, addPendingChange, removePendingChange } =
    usePendingChanges;

  const onDragEnd = async ({ droppable, draggable }: DragEvent) => {
    if (!droppable || !draggable) return;
    const droppableId = +droppable.id;
    const draggableId = +draggable.id;
    addPendingChange(droppableId, draggableId);
    try {
      await changeTaskColumn(droppableId, draggableId);
    } finally {
      await refetchTasks();
      removePendingChange(droppableId);
    }
  };

  const createNewColumn = async () => {
    try {
      moveAddBtn(true);
      await createColumn();
    } finally {
      moveAddBtn(false);
    }
  };

  return (
    <div class="mt-8 flex flex-grow gap-4">
      <DragDropProvider onDragEnd={onDragEnd}>
        <DragDropSensors />
        <For each={boardColumns()}>
          {(column) => (
            <BoardColumn
              column={column}
              tasks={
                boardTasks()?.filter(getColumnTasksPredicate(column.id)) ?? []
              }
              onDeleteColumn={deleteColumn}
            />
          )}
        </For>
      </DragDropProvider>

      <div
        classList={{ "transition-transform translate-x-72": isAddBtnMoved() }}
      >
        <button
          class="btn-sm btn flex items-center gap-2 border-0 bg-transparent bg-amber-100 text-stone-900 hover:bg-amber-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
          onClick={createNewColumn}
        >
          <Fa icon={faTableColumns} />

          <Fa icon={faPlus} />
        </button>
      </div>
    </div>
  );
};
