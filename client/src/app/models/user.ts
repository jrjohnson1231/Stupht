import { Post } from './post';

export class User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
}