import React, { PropsWithChildren } from "react";
import { styled } from "@styles/stitches.config";

const Loader = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

export default Loader;

const Container = styled("div", {
  minHeight: "100svh",
  display: "flex",
  ai: "center",
  jc: "center",
});
