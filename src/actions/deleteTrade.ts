"use server";

import ApiError from "@/helper/apiError";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface DeleteTradeProps {
  tradeId: string;
}

export default async function DeleteTrade({ tradeId }: DeleteTradeProps) {
  const token = cookies().get("token")?.value;
  const urlApi = process.env.URL_API;

  console.log(tradeId);

  try {
    const response = await fetch(`${urlApi}/trades/${tradeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error deleting trade.");
    revalidateTag("trades");
    return { data: null, error: null };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
