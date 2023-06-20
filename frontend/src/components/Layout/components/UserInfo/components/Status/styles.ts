import styled from "styled-components";

import { ICustomStatusStyledProps } from "./types";

export const StatusWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
});

export const EditStatusArea = styled("textarea")({
  width: "250px",
  height: "120px",
  padding: "5px",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
  outline: "none",
  fontFamily: "var(--delaGothicOne)",
  fontSize: "var(--small-font)",
  resize: "none",
});

export const CustomStatus = styled("p")<ICustomStatusStyledProps>(
  ({ $isLoading }) => ({
    width: "100%",
    fontSize: "var(--small-font)",
    textAlign: "center",
    cursor: $isLoading ? "none" : "pointer",
    pointerEvents: $isLoading ? "none" : "all",
  })
);

export const NoStatus = styled("span")({
  color: "var(--dark-gray)",
});
