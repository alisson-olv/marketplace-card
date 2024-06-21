import GetUserCards from "@/actions/getUserCards";
import { CardsItemsProps } from "@/types/cards";
import React, { useEffect, useState } from "react";
import { ErrorMessageUi } from "./errorMessageUi";
import Button from "./ui/button";
import CreateTrade from "@/actions/createTrade";
import NotifyToast from "@/helper/notifyToast";

interface ModalTradeProps {
  onClose: () => void;
  availableCardId: string | null;
}

export default function ModalTrade({
  onClose,
  availableCardId,
}: ModalTradeProps) {
  const [data, setData] = useState<CardsItemsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await GetUserCards();
        if (data) {
          setData(data);
        } else if (error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardSelection = async (cardId: string) => {
    if (availableCardId && cardId) {
      const data = await CreateTrade({
        cardOfferId: cardId,
        cardReceiveId: availableCardId,
      });

      if (data) {
        NotifyToast({ message: "Trade created", type: "success" });
        onClose(); // Close the modal after creating the trade
      } else {
        NotifyToast({ message: "Trade creation failed", type: "error" });
      }
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        className="bg-zinc-900 p-4 rounded-lg max-w-md w-full z-10 border border-primary"
      >
        <div className="text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
        <h2 className="text-white text-2xl pb-5 mb-4 border-b-primary border-b">
          My available cards
        </h2>
        <div className="flex flex-col justify-between gap-3">
          <h3 className="text-white text-left pb-3 text-lg">
            Which card would you like to trade?
          </h3>
          {data.length > 0 ? (
            data.map(
              (card) =>
                card.name && (
                  <div className="flex gap-2 justify-between" key={card.id}>
                    <p className="text-white text-sm">{card.name}</p>
                    <Button onClick={() => handleCardSelection(card.id)}>
                      Choose
                    </Button>
                  </div>
                )
            )
          ) : (
            <>
              {isLoading ? (
                <p className="text-white text-sm">Loading...</p>
              ) : (
                <p className="text-white text-sm">No cards available</p>
              )}
            </>
          )}
        </div>
        {error && <ErrorMessageUi errorMessage={error} />}
      </div>
    </div>
  );
}
