import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { styled, PresetColorType } from "@styles/stitches.config";
import { colors } from "@styles/colors";
import { typoes } from "@styles/typos";

interface Props extends ComponentPropsWithoutRef<typeof TextImpl> {
  color?: PresetColorType;
  as?: ElementType;
  mt?: number;
  mb?: number;
  align?: "leff" | "center" | "right";
}

const Text = ({ children, color, mb, mt, align, ...restProps }: Props) => {
  return (
    <TextImpl
      css={{
        textAlign: align,
        color: color ? colors[color] : "inherit",
        rmb: mb,
        rmt: mt,
        ...restProps.css,
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
