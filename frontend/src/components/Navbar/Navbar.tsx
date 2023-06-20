import { useLocation } from "react-router-dom";
import { LinkStyled, NavbarWrapper } from "./styles";
import { ROUTES } from "common/constants";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <NavbarWrapper>
      <LinkStyled to={ROUTES.PROFILE} $isActive={pathname === ROUTES.PROFILE}>
        profile
      </LinkStyled>

      <LinkStyled to={ROUTES.POSTS} $isActive={pathname === ROUTES.POSTS}>
        posts
      </LinkStyled>
      <LinkStyled
        to={ROUTES.FAVORITES}
        $isActive={pathname === ROUTES.FAVORITES}
      >
        favorites
      </LinkStyled>
    </NavbarWrapper>
  );
};

export default Navbar;
