export interface TradeCardsProps {
  id: string;
  cardId: string;
  tradeId: string;
  type: "OFFERING" | "RECEIVING";
  name: string;
  description: string;
  imageUrl: string;
  card: CardsItemsProps;
}

export interface TradesListProps {
  id: string;
  userId: string;
  createdAt: Date;
  user: {
    name: string;
  };
  tradeCards: TradeCardsProps[];
}

export interface GetTradesProps {
  list: TradesListProps[];
  rpp: number;
  page: number;
  more: boolean;
}
