import React, { ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  asChild?: boolean;
}

export const Container = ({ children, asChild, ...restProps }: SelectProps) => {
  const Select = asChild ? Slot : "select";
  return <Select {...restProps}>{children}</Select>;
};

interface OptionProps extends ComponentPropsWithoutRef<"option"> {
}

export const Item = ({ children,  ...restProps }: OptionProps) => {
  return <option {...restProps}>{children}</option>;
};
