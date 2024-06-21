"use server";
import ApiError from "@/helper/apiError";
import {
  GetTradesProps,
  TradeCardsProps,
  TradesListProps,
} from "@/types/trades";

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

    const responseData = await response.json();

    // Validar e mapear os dados para as interfaces definidas
    const data: GetTradesProps = {
      list: responseData.list.map((item: TradesListProps) => ({
        id: item.id,
        userId: item.userId,
        createdAt: new Date(item.createdAt),
        user: {
          name: item.user.name,
        },
        tradeCards: item.tradeCards.map((tradeCard: TradeCardsProps) => ({
          id: tradeCard.id,
          cardId: tradeCard.cardId,
          tradeId: tradeCard.tradeId,
          type: tradeCard.type,
          name: tradeCard.card.name,
          description: tradeCard.card.description,
          imageUrl: tradeCard.card.imageUrl,
          card: {
            id: tradeCard.card.id,
            name: tradeCard.card.name,
            description: tradeCard.card.description,
            imageUrl: tradeCard.card.imageUrl,
          },
        })),
      })),
      rpp: responseData.rpp,
      page: responseData.page,
      more: responseData.more,
    };

    return { data, error: null };
  } catch (error: unknown) {
    return ApiError(error);
  }
}
