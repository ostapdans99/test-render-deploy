export interface IToggleFavoriteContainerProps {
  postId: string;
  favoritedBy: string[];
}

export interface IToggleFavoriteProps {
  checkFavoritedBy: boolean;
  isLoading: boolean;
  likesCount: number;
  handleClickToggleFavorite: () => void;
}

export interface ICustomToggleFavoritesStyledProps {
  $checkFavoritedBy: boolean;
}
