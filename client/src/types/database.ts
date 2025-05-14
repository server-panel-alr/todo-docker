type Todo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  title: string;
  description: string;
  userId: number;
};

type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  password: string;
  email?: string;
  role: 'USER' | 'ADMIN';
};

export type { Todo, User };
