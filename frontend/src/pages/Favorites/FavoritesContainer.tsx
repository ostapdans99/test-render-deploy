import { useGetFavoritesPosts } from "api/posts";
import { getDataLength } from "utils/getDataLength";

import Favorites from "./Favorites";


const FavoritesContainer = () => {
  const { data, hasNextPage, fetchNextPage } = useGetFavoritesPosts();

  const dataLength = getDataLength(data?.pages);

  return (
    <Favorites
      posts={data?.pages}
      dataLength={dataLength}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default FavoritesContainer;
