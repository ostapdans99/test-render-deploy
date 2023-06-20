import { useRef } from "react";

import { useUserProfileCache } from "hooks";
import { useChangeAvatar } from "api/user";

import { generateNotification } from "utils/generateNotification";

import Avatar from "./Avatar";
import { MESSAGES } from "../constants";

const AvatarContainer = () => {
  const { isLoading, mutate: changeAvatar } = useChangeAvatar();

  const uploadAvatar = useRef<HTMLInputElement | null>(null);

  const userProfile = useUserProfileCache();

  const avatar = userProfile?.avatar;

  const handleClickUploadAvatar = () => {
    uploadAvatar.current?.click();
  };

  const handleChangeUploadAvatar = () => {
    const selectedFile = uploadAvatar.current?.files?.[0];

    const formData = new FormData();
    selectedFile && formData.append("file", selectedFile);

    changeAvatar(formData);
  };

  isLoading && generateNotification({ type: "info", content: MESSAGES.CHANGE });

  return (
    <Avatar
      avatar={avatar}
      isLoading={isLoading}
      uploadAvatar={uploadAvatar}
      handleClickUploadAvatar={handleClickUploadAvatar}
      handleChangeUploadAvatar={handleChangeUploadAvatar}
    />
  );
};

export default AvatarContainer;
