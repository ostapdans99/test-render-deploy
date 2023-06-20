import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";

import { IPostsProps } from "./types";
import { PostsWrapper } from "./styles";

const Favorites: FC<IPostsProps> = ({
  posts,
  dataLength,
  hasNextPage = false,
  fetchNextPage,
}) => (
  <PostsWrapper>
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Preloader />}
      dataLength={dataLength}
    >
      {posts?.map((page) =>
        page.map((post) => <Post key={post._id} {...post} />)
      )}
    </InfiniteScroll>
  </PostsWrapper>
);

export default Favorites;
