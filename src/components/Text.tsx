import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { styled, PresetColorType, COLORS } from "@styles/stitches.config";

interface Props extends ComponentPropsWithoutRef<typeof TextImpl> {
  color?: PresetColorType;
  as?: ElementType;
  mt?: number;
  mb?: number;
}

const Text = ({ children, color, mb, mt, ...restProps }: Props) => {
  return (
    <TextImpl
      css={{
        ...restProps.css,
        color: color ? COLORS[color] : "inherit",
      }}
      {...restProps}
    >
      {children}
    </TextImpl>
  );
};

const TextImpl = styled("div", {
  letterSpacing: "-0.2px",
  variants: {
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
  },
});

export default Text;
