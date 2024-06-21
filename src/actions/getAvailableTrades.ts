"use server";
import ApiError from "@/helper/apiError";
import { GetTradesProps } from "@/types/trades";

interface GetTradesQueryProps {
  rowsPerPage: number;
  page: number;
}

export default async function GetAvailableTrades({
  rowsPerPage,
  page,
}: GetTradesQueryProps): Promise<{
  data: GetTradesProps | null;
  error: string | null;
}> {
  const urlApi = process.env.URL_API;

  try {
    const response = await fetch(
      `${urlApi}/trades?rpp=${rowsPerPage}&page=${page}`,
      {
        next: {
          tags: ["trades"],
        },
      }
    );

    if (!response.ok)
      throw new Error("Error to get available trades, reload the page.");

    const responseData = (await response.json()) as GetTradesProps;

    return { data: responseData, error: null };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
