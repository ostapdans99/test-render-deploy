import styled from "styled-components";
import { Link } from "react-router-dom";

import { ILinkStyled } from "./types";

export const NavbarWrapper = styled("nav")({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

export const LinkStyled = styled(Link)<ILinkStyled>(({ $isActive }) => ({
  color: $isActive ? "var(--dark-blue)" : "var(--blue)",
  textDecoration: $isActive ? "underline" : "none",
  transition: "color 0.3s",
  ":hover": {
    color: "var(--dark-blue)",
  },
}));
