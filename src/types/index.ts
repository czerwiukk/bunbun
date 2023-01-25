export interface IBoard {
  id: number;
  name: string;
  created_at: string;
}

export interface IBoardTask {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IBoardColumn {
  id: number;
  name: string;
  created_at: string;
  tasks: IBoardTask[];
}
