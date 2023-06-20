import { FC } from "react";

import { useUserProfileCache } from "hooks";
import { useToggleFavorite } from "api/posts";

import { IToggleFavoriteContainerProps } from "./types";
import ToggleFavorite from "./ToggleFavorite";

const ToggleFavoriteContainer: FC<IToggleFavoriteContainerProps> = ({
  postId,
  favoritedBy,
}) => {
  const userProfile = useUserProfileCache();

  const userId = userProfile?._id;

  const { isLoading, mutate: toggleFavorite } = useToggleFavorite();

  const handleClickToggleFavorite = () => {
    userId && toggleFavorite({ postId });
  };

  const checkFavoritedBy = userId && favoritedBy.includes(userId);

  return (
    <ToggleFavorite
      checkFavoritedBy={!!checkFavoritedBy}
      isLoading={isLoading}
      likesCount={favoritedBy.length}
      handleClickToggleFavorite={handleClickToggleFavorite}
    />
  );
};

export default ToggleFavoriteContainer;
