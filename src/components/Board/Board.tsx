import { faPlus, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, createResource, createSignal, For } from "solid-js";
import { changeTaskColumn } from "~/api";
import { BoardColumn } from "../BoardColumn/BoardColumn";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
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

  const onDragEnd = async ({ droppable, draggable }: any) => {
    addPendingChange(draggable.id, droppable.id);
    await changeTaskColumn(draggable.id, droppable.id);
    await refetchTasks();
    removePendingChange(draggable.id);
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
    <div class="flex gap-4 mt-8 flex-grow">
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
          class="btn btn-sm bg-transparent bg-amber-100 hover:bg-amber-200 text-stone-900 border-0 flex items-center gap-2"
          onClick={createNewColumn}
        >
          <Fa icon={faTableColumns} />

          <Fa icon={faPlus} />
        </button>
      </div>
    </div>
  );
};
