export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null; // Changed from pfp to image for Auth.js compatibility
};

// Auth.js session user type
export type SessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Note = {
  id: string;
  content: string;
};
