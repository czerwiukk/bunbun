import { Component, createResource, For } from "solid-js";
import { fetchBoardColumns } from "~/api";
import { BoardColumn } from "../BoardColumn";

interface BoardProps {
  id: number;
}

export const Board: Component<BoardProps> = (props) => {
  const [boardColumns] = createResource(() => props.id, fetchBoardColumns);

  return (
    <div class="flex gap-4 mt-8 flex-grow">
      <For each={boardColumns()}>
        {(column) => <BoardColumn column={column} />}
      </For>
    </div>
  );
};
