import { styled } from "@styles/stitches.config";
import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof StyledDivider> {}

const Divider = (props: Props) => {
  return <StyledDivider {...props} />;
};

export default Divider;

const StyledDivider = styled("div", {
  height: 5,
  bc: "$gary02",
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
});
