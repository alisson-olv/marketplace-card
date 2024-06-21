interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (error === "") return null;
  return <p className="text-primary">{error}</p>;
}
