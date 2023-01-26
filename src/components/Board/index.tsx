import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";
import { Component, createResource, createSignal, For } from "solid-js";
import { fetchBoardColumns } from "~/api";
import { BoardColumn } from "../BoardColumn";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
interface BoardProps {
  id: number;
}

export const Board: Component<BoardProps> = (props) => {
  const [boardColumns] = createResource(() => props.id, fetchBoardColumns);
  const [where, setWhere] = createSignal("outside");

  const onDragEnd = ({ droppable }: any) => {
    if (droppable) {
      setWhere("inside");
    } else {
      setWhere("outside");
    }
  };

  return (
    <div class="flex gap-4 mt-8 flex-grow">
      <DragDropProvider onDragEnd={onDragEnd}>
        <DragDropSensors />
        <For each={boardColumns()}>
          {(column) => <BoardColumn column={column} />}
        </For>
      </DragDropProvider>

      <button class="btn btn-sm bg-transparent bg-amber-50 hover:bg-amber-100  text-stone-900 border-0 flex items-center gap-2">
        Add column
        <Fa icon={faPlus} />
      </button>
    </div>
  );
};
