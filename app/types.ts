export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  pfp?: string | null;
};
