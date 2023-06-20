import { useLogout } from "api/auth";

import { ROUTES } from "common/constants";
import { Navbar } from "components/Navbar";
import { Logo, Logout } from "assets/vectors";

import { HeaderWrapper, LogoTitle, LogoWrapper, LogoutWrapper, MenuWrapper } from "./styles";

export const Header = () => {
  const { mutate: logout } = useLogout();

  return (
    <HeaderWrapper>
      <LogoWrapper to={ROUTES.HOME}>
        <Logo />
        <LogoTitle>Sweater</LogoTitle>
      </LogoWrapper>
      <MenuWrapper>
        <Navbar />
        <LogoutWrapper>
          <Logout onClick={logout} />
        </LogoutWrapper>
      </MenuWrapper>
    </HeaderWrapper>
  );
};

export default Header;
