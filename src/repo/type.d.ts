export type Repo<E extends object> = {
  query: (condition: {
    equal?: Partial<E>;
    page: number;
    pageSize: number;
  }) => Promise<{ content: E[]; total: number }>;
  create: (entity: E) => Promise<E>;
  update: (entity: E) => Promise<E>;
  delete: (entity: E) => Promise<void>;
};
