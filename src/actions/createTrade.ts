"use server";
import ApiError from "@/helper/apiError";
import { cookies } from "next/headers";

interface CreateTradeProps {
  cardOfferId: string;
  cardReceiveId: string;
}

interface CreateTradeResponseProps {
  tradeId: string;
}

export default async function CreateTrade({
  cardOfferId,
  cardReceiveId,
}: CreateTradeProps) {
  const token = cookies().get("token")?.value;
  const urlApi = process.env.URL_API;

  try {
    const response = await fetch(`${urlApi}/trades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cards: [
          {
            cardId: cardOfferId,
            type: "OFFERING",
          },
          {
            cardId: cardReceiveId,
            type: "RECEIVING",
          },
        ],
      }),
    });

    if (!response.ok) throw new Error("Error to create trade.");

    const data = (await response.json()) as CreateTradeResponseProps;

    return data;

    console.log(data);
  } catch (error: unknown) {
    return ApiError(error);
  }
}
