import { FC } from "react";

import { IToggleFavoriteProps } from "./types";
import { CustomToggleFavorites } from "./styles";

const ToggleFavorite: FC<IToggleFavoriteProps> = ({
  checkFavoritedBy,
  isLoading,
  likesCount,
  handleClickToggleFavorite,
}) => {
  return (
    <CustomToggleFavorites
      $checkFavoritedBy={checkFavoritedBy}
      onClick={handleClickToggleFavorite}
      disabled={isLoading}
    >
      {" "}
      <span>{likesCount}</span>
    </CustomToggleFavorites>
  );
};

export default ToggleFavorite;
