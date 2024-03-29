import React, { ComponentPropsWithoutRef, ElementRef, Ref } from "react";
import { Primitive } from "@radix-ui/react-primitive";

interface ButtonImple
  extends ComponentPropsWithoutRef<typeof Primitive.button> {}

type ButtonRef = ElementRef<typeof Primitive.button>;

/**
 * @doc 버튼 기능
 *
 */
export const ButtonImpl = React.forwardRef<ButtonRef, ButtonImple>(
  ({ children, asChild = true, ...restProps }, ref) => {
    return (
      <Primitive.button ref={ref} asChild={asChild} {...restProps}>
        {children}
      </Primitive.button>
    );
  }
);

ButtonImpl.displayName = "BaseButtonImple";
