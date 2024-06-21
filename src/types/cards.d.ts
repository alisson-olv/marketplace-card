export interface CardsItemsProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface GetCardsProps {
  list: CardsItemsProps[];
  rpp: number;
  page: number;
  more: boolean;
}
