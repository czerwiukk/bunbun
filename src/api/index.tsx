import type { IBoard, IBoardColumn } from "~/types";
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

export const fetchBoards = async (): Promise<IBoard[]> => {
  const select = "id, name, created_at";
  const { data, error, status } = await supabase
    .from("boards")
    .select<typeof select, IBoard>(select);

  if (error && status !== 406) {
    throw error;
  }
  return data ?? [];
};

export const fetchBoardColumns = async (boardId: number) => {
  const select =
    "id, name, created_at, tasks(id, name, description, created_at)";

  const { data, error, status } = await supabase
    .from("board_columns")
    .select<typeof select, IBoardColumn>(select)
    .eq("board_id", boardId);

  if (error && status !== 406) {
    throw error;
  }
  return data ?? [];
};
