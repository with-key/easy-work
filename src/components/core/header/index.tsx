import { styled } from "@styles/stitches.config";
import React, { PropsWithChildren } from "react";

export const Root = ({ children }: PropsWithChildren) => {
  return <StyledRoot>{children}</StyledRoot>;
};

const StyledRoot = styled("header", {
  height: 60,
  position: "relative",
});

export const Title = () => {
  return <div></div>;
};

interface SlotProps extends PropsWithChildren {
  onClick?: () => void;
}

export const LeftSlot = ({ children, onClick }: SlotProps) => {
  return <StyledLeftSlot onClick={onClick}>{children}</StyledLeftSlot>;
};

const StyledLeftSlot = styled("div", {
  position: "absolute",
  left: 30,
  top: "50%",
  transform: "translateY(-50%)",
});

export const RightSlot = ({ children, onClick }: SlotProps) => {
  return <StyledRightSlot onClick={onClick}>{children}</StyledRightSlot>;
};

const StyledRightSlot = styled("div", {
  position: "absolute",
  right: 30,
  top: "50%",
  transform: "translateY(-50%)",
});
