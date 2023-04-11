import React, { ComponentPropsWithoutRef } from "react";
import { Primitive } from "@radix-ui/react-primitive";

interface Props extends ComponentPropsWithoutRef<typeof Primitive.div> {}

const Tag = ({ children, ...restProps }: Props) => {
  return <Primitive.div {...restProps}>{children}</Primitive.div>;
};

export default Tag;
