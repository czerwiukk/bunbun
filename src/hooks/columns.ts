import { Accessor, createResource } from "solid-js";
import { addColumn, deleteColumn, fetchBoardColumns } from "~/api";

export const useColumns = (boardId: Accessor<number>) => {
  const [boardColumns, { refetch: refetchColumns }] = createResource(
    boardId,
    fetchBoardColumns
  );

  return {
    boardColumns,
    createColumn: async () => {
      await addColumn(boardId());
      await refetchColumns();
    },
    deleteColumn: async (columnId: number) => {
      await deleteColumn(columnId);
      await refetchColumns();
    },
  };
};
