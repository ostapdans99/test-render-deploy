interface author {
  _id: string;
  username: string;
  avatar: string;
}

export interface IPostResponse {
  _id: string;
  content: string;
  author: author;
  favoritedBy: string[];
  createdAt: Date;
  updatedAt: Date;
}
