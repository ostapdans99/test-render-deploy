import styled from "styled-components";

export const AddPostForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  padding: "20px",
  background: "var(--background)",
  borderRadius: "5px",
});

export const AddPostField = styled("textarea")({
  height: "80px",
  padding: "5px",
  border: "2px solid var(--gray)",
  borderRadius: "5px",
  outline: "none",
  fontFamily: "var(--delaGothicOne)",
  fontSize: "var(--small-font)",
  resize: "none",
});

export const PostsWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "20px 0",
});
