import type { IBoard, IBoardColumn } from "~/types";
import { supabase } from "~/utils";

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
    .eq("id", boardId);

  if (error && status !== 406) {
    throw error;
  }
  return data ?? [];
};
