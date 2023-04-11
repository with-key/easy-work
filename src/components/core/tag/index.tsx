import React, { ComponentPropsWithoutRef } from "react";
import { Status } from "@prisma/client";
import { styled } from "@styles/stitches.config";

type Props = {
  status: Status;
};

const Tag = ({ status }: Props) => {
  return (
    <StyledTag theme={themeBuilder(status)}>{labelBuilder(status)}</StyledTag>
  );
};

function labelBuilder(value: Status) {
  switch (value) {
    case "Approved":
      return "승인";
    case "Pending":
      return "대기";
    case "Rejected":
      return "반려";
    default:
      break;
  }
}

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
