import { useGetPosts } from "api/posts";
import { getDataLength } from "utils/getDataLength";

import Posts from "./Posts";

const PostsContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useGetPosts();

  const dataLength = getDataLength(data?.pages);

  return (
    <Posts
      posts={data?.pages}
      dataLength={dataLength}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default PostsContainer;
