export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[];
};

export type ColumnGroupType = {
  [key: string]: ColumnType;
};

export type TaskType = {
  id: string;
  content: string;
};

export type TaskGroupType = {
  [key: string]: TaskType;
};

export type BoardCardType = {
  index: number;
  column: ColumnType | undefined;
  tasks: TaskType[];
  // eslint-disable-next-line no-unused-vars
  setShowAddCard: (args: ColumnType | undefined) => any;
  showAddCard: boolean;
};

export interface BoardType {
  tasks: TaskGroupType;
  columns: ColumnGroupType;
  columnOrder: string[];
}
