import { Card } from "./card";
import { CardsItemsProps } from "@/types/cards";
import SkeletonCard from "../skeletonCard";

interface DataProps {
  data: CardsItemsProps[];
  isLoading: boolean;
  descriptionPage: string;
}

export function Cards({ data, isLoading, descriptionPage }: DataProps) {
  return (
    <div className="bg-gray-900 pt-10 pb-2 sm:py-5">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl py-10">
            {descriptionPage}
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8"
        >
          {isLoading ? (
            <SkeletonCard cards={8} />
          ) : (
            data?.map((cards) =>
              cards.imageUrl && cards.description && cards.name ? (
                <Card key={cards.id} cards={cards} />
              ) : null
            )
          )}
        </ul>
      </div>
    </div>
  );
}
