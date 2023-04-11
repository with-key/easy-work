import { styled } from "@styles/stitches.config";
import React, { PropsWithChildren } from "react";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default DefaultLayout;

const StyledContainer = styled("section", {
  rpx: 30,
  rpt: 5,
  height: "calc(100vh - 60px)",
});
