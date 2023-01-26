import type { IBoard } from "~/types";
import { supabase } from "~/utils";
export * from "./columns";

export const changeTaskColumn = async (taskId: number, columnId: number) => {
  const { error } = await supabase
    .from("tasks")
    .update({ column_id: columnId })
    .eq("id", taskId);

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
