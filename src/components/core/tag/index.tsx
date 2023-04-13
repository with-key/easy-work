import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Status } from "@prisma/client";
import { styled } from "@styles/stitches.config";

type Props = {
  status: Status;
} & PropsWithChildren;

const Tag = ({ status, children }: Props) => {
  return <StyledTag theme={themeBuilder(status)}>{children}</StyledTag>;
};

function themeBuilder(status: Status) {
  return status === "Approved"
    ? "positive"
    : status === "Pending"
    ? "idle"
    : "negative";
}

export const StyledTag = styled("div", {
  display: "inline-flex",
  ai: "center",
  jc: "center",
  padding: "3px 7px",
  fontWeight: 700,
  fontSize: 12,
  lineHeight: "14px",
  borderRadius: 3,

  variants: {
    theme: {
      idle: {
        bc: "#FFE7D6",
        color: "#FF7714",
      },
      negative: {
        bc: "#FFE2E2",
        color: "#EB4C4C",
      },
      positive: {
        bc: "#D3EDFF",
        color: "#0069E3",
      },
    },
  },
});

export default Tag;
