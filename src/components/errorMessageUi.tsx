import React from "react";

interface ErrorMessageProps {
  errorMessage: string;
}

export function ErrorMessageUi({ errorMessage }: ErrorMessageProps) {
  return <p className="text-2xl text-white text-center p-5">{errorMessage}</p>;
}
