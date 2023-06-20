import { FC } from "react";

import { NoAvatar } from "assets/vectors";

import { IAvatarProps } from "./types";

import {
  AvatarWrapper,
  ChooseFile,
  NoAvatarWrapper,
  Overline,
  UserAvatar,
} from "./styles";

const Avatar: FC<IAvatarProps> = ({
  avatar,
  isLoading,

  uploadAvatar,

  handleClickUploadAvatar,
  handleChangeUploadAvatar,
}) => {
  return (
    <AvatarWrapper>
      {avatar ? (
        <UserAvatar src={avatar} alt="avatar" />
      ) : (
        <NoAvatarWrapper>
          <NoAvatar />
        </NoAvatarWrapper>
      )}
      <Overline $isLoading={isLoading} onClick={handleClickUploadAvatar}>
        <p>change avatar</p>
      </Overline>
      <ChooseFile
        type="file"
        onChange={handleChangeUploadAvatar}
        ref={uploadAvatar}
        accept="image/*, .png, .jpg, .gif, .web"
      />
    </AvatarWrapper>
  );
};
export default Avatar;
