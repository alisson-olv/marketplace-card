import { CardsItemsProps } from "@/types/cards";
import Image from "next/image";

interface CardsProps {
  cards: CardsItemsProps;
}

export function UserCard({ cards }: CardsProps) {
  return (
    <li className="rounded-2xl bg-gray-800 px-4 py-5 flex flex-col">
      <Image
        className="mx-auto border-2 border-black rounded-md"
        src={cards.imageUrl}
        alt=""
        width={223}
        height={310}
      />
      <h3 className="mt-3 text-base font-semibold leading-7 text-white">
        {cards.name}
      </h3>
      <div className="flex flex-col flex-grow justify-between">
        <p className="text-sm leading-6 text-gray-400">{cards.description}</p>
      </div>
    </li>
  );
}
