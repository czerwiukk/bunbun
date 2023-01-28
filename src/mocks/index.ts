import { IBoardColumn, IBoardTask } from "~/types";

export const tasks: IBoardTask[] = [
  {
    id: 1,
    name: "Test",
    description: "Testowy test",
    column_id: 1,
    created_at: "2021-08-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Test2",
    description: "Testowy test2",
    column_id: 1,
    created_at: "2021-08-01T12:00:00.000Z",
  },
  {
    id: 3,
    name: "Test3",
    description: "Testowy test3",
    column_id: 1,
    created_at: "2021-08-01T12:00:00.000Z",
  },
];

export const columns: IBoardColumn[] = [
  {
    id: 1,
    name: "Column1",
    created_at: "2021-08-01T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Column2",
    created_at: "2021-08-01T12:00:00.000Z",
  },
];
