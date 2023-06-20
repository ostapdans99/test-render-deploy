import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "components/Button";
import { Post } from "components/Post";
import { Preloader } from "components/Loaders/Preloader";

import { IAddPostValues, IProfileProps } from "./types";
import { AddPostField, AddPostForm, PostsWrapper } from "./styles";

const Profile: FC<IProfileProps<IAddPostValues>> = ({
  formik,
  posts,
  dataLength,
  isLoading,
  hasNextPage = false,
  fetchNextPage,
}) => {
  const { values, handleSubmit, handleChange } = formik;

  return (
    <>
      <AddPostForm onSubmit={handleSubmit}>
        <AddPostField
          name="content"
          value={values.content}
          onChange={handleChange}
          placeholder="enter the content..."
          disabled={isLoading}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !values.content.trim()}
        >
          Add Post
        </Button>
      </AddPostForm>
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
    </>
  );
};

export default Profile;
