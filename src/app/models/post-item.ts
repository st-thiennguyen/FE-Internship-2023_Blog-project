export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  status: string;
  userId: number;
  likes: number;
  comments: number;
  cover: number;
  recommend: boolean;
  user: User;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
