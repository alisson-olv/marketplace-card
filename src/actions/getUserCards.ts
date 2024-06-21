"use server";

import ApiError from "@/helper/apiError";
import { CardsItemsProps } from "@/types/cards";
import { cookies } from "next/headers";

export default async function GetUserCards() {
  const token = cookies().get("token")?.value;
  const urlApi = process.env.URL_API;

  try {
    const response = await fetch(`${urlApi}/me/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Error to get user cards.");

    const data = (await response.json()) as CardsItemsProps[];

    return { data, error: null };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
