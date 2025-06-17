"use client";

import React, { forwardRef } from "react";
import { cn } from "../../utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="mb-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
                "dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-800",
                error ? "border-red-500 focus:ring-red-500" : "",
                className
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-2 text-sm">
              <label
                htmlFor={checkboxId}
                className={cn(
                  "font-medium",
                  error ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {label}
              </label>
            </div>
          )}
        </div>
        {helperText && !error && (
          <p id={`${checkboxId}-helper`} className="mt-1 text-xs text-gray-500 dark:text-gray-400 ml-6">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400 ml-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox"; 