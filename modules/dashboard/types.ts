export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  template: string;

  createdAt: Date | string;
  updatedAt: Date | string;

  userId: string;
  user: User;

  Starmark: {
    isMarked: boolean;
  }[];
}
