"use server";
import ApiError from "@/helper/apiError";
import { GetCardsProps } from "@/types/cards";

interface GetCardsQueryProps {
  rowsPerPage: number;
  page: number;
}

export async function GetCards({ rowsPerPage, page }: GetCardsQueryProps) {
  const urlApi = process.env.URL_API;

  try {
    const response = await fetch(
      `${urlApi}/cards?rpp=${rowsPerPage}&page=${page}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!response.ok) throw new Error("Error to get cards, reload the page.");

    const data = (await response.json()) as GetCardsProps;

    return { data, error: null };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
