"use client";

import React, { forwardRef } from "react";
import { cn } from "../../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, fullWidth = false, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={cn("mb-4", fullWidth ? "w-full" : "")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "px-3 py-2 bg-white dark:bg-gray-800 border rounded-md text-sm shadow-sm placeholder-gray-400",
            "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            "disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none",
            error
              ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600",
            fullWidth ? "w-full" : "",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; 