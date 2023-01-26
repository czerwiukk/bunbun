import { faPlus, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
} from "solid-js";
import { addColumn, deleteColumn, fetchBoardColumns } from "~/api";
import { BoardColumn } from "../BoardColumn";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
import classNames from "classnames";
interface BoardProps {
  id: number;
}

export const Board: Component<BoardProps> = (props) => {
  const [boardColumns, { refetch: refetchColumns }] = createResource(
    () => props.id,
    fetchBoardColumns
  );
  const [where, setWhere] = createSignal("outside");
  const [isAddBtnMoved, moveAddBtn] = createSignal(false);

  createEffect(() => {
    console.log("board;", props.id);
  });

  const onDragEnd = ({ droppable }: any) => {
    if (droppable) {
      setWhere("inside");
    } else {
      setWhere("outside");
    }
  };

  const createNewColumn = async () => {
    try {
      moveAddBtn(true);
      await addColumn(props.id);
      await refetchColumns();
    } finally {
      moveAddBtn(false);
    }
  };
  const deleteExistingColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    await refetchColumns();
  };

  return (
    <div class={classNames("flex gap-4 mt-8 flex-grow")}>
      <DragDropProvider onDragEnd={onDragEnd}>
        <DragDropSensors />
        <For each={boardColumns()}>
          {(column) => (
            <BoardColumn
              column={column}
              onDeleteColumn={deleteExistingColumn}
            />
          )}
        </For>
      </DragDropProvider>

      <div
        classList={{ "transition-transform translate-x-72": isAddBtnMoved() }}
      >
        <button
          class={classNames(
            "btn btn-sm bg-transparent bg-amber-50 hover:bg-amber-100  text-stone-900 border-0 flex items-center gap-2"
          )}
          onClick={createNewColumn}
        >
          <Fa icon={faTableColumns} />

          <Fa icon={faPlus} />
        </button>
      </div>
    </div>
  );
};
