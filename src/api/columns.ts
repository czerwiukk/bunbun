import { IBoardColumn, IBoardTask } from "~/types";
import { supabase } from "~/utils";

export const changeColumnName = async (columnId: number, name: string) => {
  const { error } = await supabase
    .from("board_columns")
    .update({ name })
    .eq("id", columnId);

  if (error) throw error;
};

export const deleteColumn = async (columnId: number) => {
  const { error } = await supabase
    .from("board_columns")
    .delete()
    .eq("id", columnId);
  if (error) throw error;
};

export const addColumn = async (board_id: number) => {
  const { error } = await supabase
    .from("board_columns")
    .insert({ name: "New column", board_id });
  if (error) throw error;
};

export const fetchBoardColumns = async (boardId: number) => {
  const select = "id, name, created_at";

  const { data, error, status } = await supabase
    .from("board_columns")
    .select<typeof select, IBoardColumn>(select)
    .eq("board_id", boardId);

  if (error && status !== 406) {
    throw error;
  }
  return data ?? [];
};

export const fetchBoardTasks = async (boardId: number) => {
  const select =
    "id, name, description, created_at, column_id, board_columns!inner(board_id)";

  const { data, error, status } = await supabase
    .from("tasks")
    .select<typeof select, IBoardTask>(select)
    .eq("board_columns.board_id", boardId);

  if (error && status !== 406) {
    throw error;
  }
  return data ?? [];
};
