import React, { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

export default function Button({
  children,
  onClick,
  disabled,
  active,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${
        active ? "bg-primary text-white hover:bg-red-800" : "bg-white"
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
