export default function ApiError(error: unknown): {
  data: null;
  error: string;
  ok: boolean;
} {
  if (error instanceof Error) {
    return { data: null, error: error.message, ok: false };
  } else {
    return { data: null, error: "Error genérico", ok: false };
  }
}
