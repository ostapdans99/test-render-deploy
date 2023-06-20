import styled from "styled-components";

import { IOverlineStyledProps } from "./types";

export const AvatarWrapper = styled("div")({
  position: "relative",
  borderRadius: "50%",
});

export const UserAvatar = styled("img")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
});

export const NoAvatarWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "var(--blue)",
});

export const Overline = styled("div")<IOverlineStyledProps>(
  ({  $isLoading }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    opacity:  0,
    borderRadius: "50%",
    backgroundColor: "var(--overline)",
    fontSize: "var(--medium-font)",
    color: "var(--white)",
    transition: "all 0.3s",
    pointerEvents: $isLoading ? "none" : "all",
    cursor: $isLoading ? "none" : "pointer",
    ":hover": {
      opacity: 1
    }
  })
);

export const ChooseFile = styled("input")({
  position: "absolute",
  height: 0,
  width: 0,
  lineHeight: 0,
  opacity: 0,
  overflow: "hidden",
});
