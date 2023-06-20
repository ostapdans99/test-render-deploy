import {  Ref } from "react";

export interface IAvatarProps {
  avatar: string | undefined;
  isLoading: boolean;

  uploadAvatar: Ref<HTMLInputElement>;

  handleClickUploadAvatar: () => void;
  handleChangeUploadAvatar: () => void;
}

export interface IOverlineStyledProps {
 
  $isLoading: boolean;
}
