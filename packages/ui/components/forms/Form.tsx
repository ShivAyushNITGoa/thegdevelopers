"use client";

import React, { forwardRef } from "react";
import { cn } from "../../utils";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  fullWidth?: boolean;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, fullWidth = false, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(
          "space-y-4",
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = "Form"; 