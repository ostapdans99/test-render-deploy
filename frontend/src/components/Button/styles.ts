import styled from "styled-components";

export const CustomButton = styled("button")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "46px",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  outline: "none",
  color: "var(--white)",
  fontFamily: "inherit",
  fontSize: "var(--medium-font)",
  backgroundColor: "var(--blue)",
  transition: "background-color 0.3s",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "var(--dark-blue)",
  },
  ":disabled": {
    pointerEvents: "none",
  },
});
