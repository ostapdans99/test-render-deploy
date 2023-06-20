import { useUserProfileCache } from "hooks";

import { UserAvatarWrapper, UserInfoWrapper, Username } from "./styles";
import { Avatar } from "./components/Avatar";
import { Status } from "./components/Status";


const UserInfo = () => {
  const userProfile = useUserProfileCache();

  const username = userProfile?.username;

  return (
    <UserInfoWrapper>
      <UserAvatarWrapper>
        <Avatar />
        {username && <Username>@{username}</Username>}
      </UserAvatarWrapper>
      <Status />
    </UserInfoWrapper>
  );
};

export default UserInfo;
