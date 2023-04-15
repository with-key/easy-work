import React, { ComponentPropsWithoutRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface Props extends ComponentPropsWithoutRef<"input"> {
  asChild?: boolean;
}

export const Text = ({ asChild, ...rest }: Props) => {
  const Compo = asChild ? Slot : "input";
  return <Compo {...rest} type="text" />;
};

export const Password = ({ asChild, ...rest }: Props) => {
  const Compo = asChild ? Slot : "input";
  return <Compo {...rest} type="password" />;
};

export const Date = ({ asChild, ...rest }: Props) => {
  const Compo = asChild ? Slot : "input";
  return <Compo {...rest} type="date" />;
};

export const Price = ({ asChild, ...rest }: Props) => {
  const Compo = asChild ? Slot : "input";
  return <Compo {...rest} type="text" />;
};
