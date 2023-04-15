import { styled } from "@styles/stitches.config";
import React, { PropsWithChildren } from "react";

const Float = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

export default Float;
const Container = styled("div", {
  position: "sticky",
  rpt: 20,
  rpb: 40,
  bottom: 0,
  width: "100%",
  bc: "white",
});
