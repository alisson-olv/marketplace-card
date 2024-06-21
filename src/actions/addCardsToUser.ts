"use server";

import ApiError from "@/helper/apiError";
import { cookies } from "next/headers";

interface AddCardsToUserProps {
  cardId: string;
}

export default async function AddCardsToUser({ cardId }: AddCardsToUserProps) {
  const urlApi = process.env.URL_API;
  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(`${urlApi}/me/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cardIds: [cardId],
      }),
    });

    if (!response.ok) return new Error("Error to add card to user");

    const responseData = await response.json();

    return responseData;
  } catch (error: unknown) {
    return ApiError(error);
  }
}
