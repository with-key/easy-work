import { styled } from "@styles/stitches.config";

export const BaseInput = styled("input", {
  width: "100%",
  borderRadius: 7,
  height: 46,
  rpl: 14,
  border: "$gary04 1px solid",
  bc: "white",
  rpx: 12,

  "-webkit-appearance": "none",
  "&::-webkit-date-and-time-value": {
    textAlign: "left",
  },
});
