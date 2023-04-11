import React, { ComponentPropsWithoutRef } from "react";
import { styled } from "@styles/stitches.config";

/*-----------------------------------------------------------------*
 * Common
 ------------------------------------------------------------------*/

interface Props extends ComponentPropsWithoutRef<typeof StyledStack> {
  rev?: boolean;
}

const StyledStack = styled("div", {
  display: "flex",
});

/*-----------------------------------------------------------------*
 * Vertical Stack
 ------------------------------------------------------------------*/

export const VStack = ({ children, rev = false, ...restProps }: Props) => {
  return (
    <StyledStack
      {...restProps}
      css={{
        ...restProps.css,
        flexDirection: rev ? "column-reverse" : "column",
      }}
    >
      {children}
    </StyledStack>
  );
};

/*-----------------------------------------------------------------*
 * Horiziontal Stack
 ------------------------------------------------------------------*/

export const HStack = ({ children, rev = false, ...restProps }: Props) => {
  return (
    <StyledStack
      {...restProps}
      css={{
        ...restProps.css,
        flexDirection: rev ? "row-reverse" : "row",
      }}
    >
      {children}
    </StyledStack>
  );
};
