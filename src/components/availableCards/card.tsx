import { CardsItemsProps } from "@/types/cards";
import Image from "next/image";
import Button from "../ui/button";
import AddCardsToUser from "@/actions/addCardsToUser";
import { useUser } from "@/context/userContext";
import NotifyToast from "@/helper/notifyToast";
import ModalTrade from "../modalTrade";
import { memo, useState } from "react";

interface CardsProps {
  cards: CardsItemsProps;
}

export function Card({ cards }: CardsProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [choosedCard, setChoosedCard] = useState<string | null>(null);
  const { userLogged } = useUser();
  const isUserLogged = !!userLogged;

  const addCardToUserCollection = async () => {
    await AddCardsToUser({ cardId: cards.id });
    NotifyToast({ message: "Card added to your collection", type: "success" });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setChoosedCard(cards.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setChoosedCard(null);
  };

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
        <div className="pt-2 flex gap-5 items-center justify-center">
          <Button
            title={isUserLogged ? "Trade" : "Sign in first"}
            disabled={!isUserLogged}
            onClick={addCardToUserCollection}
          >
            Add to my cards
          </Button>
          <Button
            title={isUserLogged ? "Trade" : "Sign in first"}
            disabled={!isUserLogged}
            onClick={openModal}
          >
            Trade
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <ModalTrade onClose={closeModal} availableCardId={choosedCard} />
      )}
    </li>
  );
}
