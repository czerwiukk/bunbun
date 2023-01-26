import { createSignal } from "solid-js";
import { IBoardTask } from "~/types";

interface IPendingChange {
  [taskId: number]: number;
}

export const [pendingChanges, setPendingChanges] = createSignal<IPendingChange>(
  {}
);

const isColumnReloading = (columnId: number) =>
  Object.values(pendingChanges()).some(
    (changingColumnId) => changingColumnId === columnId
  );

const isTaskReloading = (taskId: number) => Boolean(pendingChanges()[taskId]);

const addPendingChange = (taskId: number, columnId: number) =>
  setPendingChanges((prev) => ({ ...prev, [taskId]: columnId }));

const removePendingChange = (taskId: number) =>
  setPendingChanges(
    (prev) => ({ ...prev, [taskId]: undefined } as Record<number, number>)
  );

const getColumnTasksPredicate = (columnId: number) => (task: IBoardTask) => {
  const destinationColumnId = pendingChanges()[task.id];
  if (!destinationColumnId) return task.column_id === columnId;
  return destinationColumnId === columnId;
};

export const usePendingChanges = {
  isColumnReloading,
  isTaskReloading,
  addPendingChange,
  removePendingChange,
  getColumnTasksPredicate,
};
