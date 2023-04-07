import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { styled, PresetColorType } from "@styles/stitches.config";
import { colors } from "@styles/colors";
import { typoes } from "@styles/typos";

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
        color: color ? colors[color] : "inherit",
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
    shape: typoes,
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
  },
});

export default Text;
