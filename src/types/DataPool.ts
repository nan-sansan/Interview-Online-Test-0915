export type DataPool<T> = {
  getAll: () => T[];
  add: (data: T) => void;
  update: (data: T) => void;
  delete: (data: T) => void;
};
