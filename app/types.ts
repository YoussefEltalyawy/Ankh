export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  pfp?: string | null;
};
export type UserExtra = {
  id: string;
  email?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  pfp?: string | null;
}

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Note = {
  id: string;
  content: string;
};
