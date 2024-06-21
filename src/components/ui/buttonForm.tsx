import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface ButtonFormProps extends ComponentProps<"button"> {
  textEnabled: string;
  textDisabled: string;
}

export const ButtonForm = ({
  textEnabled,
  textDisabled,
  ...props
}: ButtonFormProps) => {
  const button = useFormStatus().pending ? (
    <button
      {...props}
      disabled
      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {textDisabled}
    </button>
  ) : (
    <button
      {...props}
      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {textEnabled}
    </button>
  );

  return button;
};
