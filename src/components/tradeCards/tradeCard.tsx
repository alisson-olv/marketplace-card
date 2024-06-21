import { CardsItemsProps } from "@/types/cards";

interface CardsProps {
  card: CardsItemsProps;
}

export function TradeCard({ card }: CardsProps) {
  return <h3 className="text-xs leading-7 text-white">{card.name}</h3>;
}
