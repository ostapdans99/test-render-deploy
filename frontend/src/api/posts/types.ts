export interface ICreatePostArgs {
  content: string;
}

export interface IToggleFavoriteArgs {
  postId: string;
}

export interface IDeletePostArgs extends IToggleFavoriteArgs {}

export interface IUpdatePostArgs {
  postId: string;
  content: string;
}