import React, { ComponentPropsWithoutRef, ElementRef, Ref } from "react";
import { Primitive } from "@radix-ui/react-primitive";

interface ButtonImple
  extends ComponentPropsWithoutRef<typeof Primitive.button> {}

type ButtonRef = ElementRef<typeof Primitive.button>;

/**
 * @doc 버튼 기능
 *
 */
export const Button = React.forwardRef<ButtonRef, ButtonImple>(
  ({ children, ...restProps }, ref) => {
    return (
      <Primitive.button ref={ref} {...restProps}>
        {children}
      </Primitive.button>
    );
  }
);

Button.displayName = "BaseButtonImple";
