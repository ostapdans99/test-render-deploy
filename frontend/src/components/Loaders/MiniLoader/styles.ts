import styled from "styled-components";

export const CustomMiniLoader = styled("div")({
  display: "block",
  width: "130px",
  height: "4px",
  borderRadius: "30px",
  backgroundColor: "rgba(0,0,0,0.2)",
  position: "relative",
  ":before": {
    content: "''",
    position: "absolute",
    background: "var(--white)",
    top: 0,
    left: 0,
    width: "0%",
    height: "100%",
    borderRadius: "30px",
    animation: "moving 1s ease-in-out infinite",
  },

  "@keyframes moving": {
    "50%": {
      width: "100%",
    },

    "100%": {
      width: 0,
      right: 0,
      left: "unset",
    },
  },
});
