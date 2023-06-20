import { IPostResponse } from "types/post";

export const getDataLength = (data: IPostResponse[][] | undefined) =>
  data?.reduce((total, page) => total + page.length, 0) || 0;
