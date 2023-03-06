import React, { ComponentPropsWithoutRef } from "react";
import { styled } from "@styles/stitches.config";

interface Props extends ComponentPropsWithoutRef<typeof StyledSpace> {}

export const Space = ({ children, ...restProps }: Props) => {
  return (
    <StyledSpace
      {...restProps}
      css={{
        ...restProps.css,
      }}
    >
      {children}
    </StyledSpace>
  );
};

const StyledSpace = styled("div", {});
