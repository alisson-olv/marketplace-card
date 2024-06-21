"use client";
import { TradeCard } from "./tradeCard";
import { TradesListProps } from "@/types/trades";
import SkeletonTrade from "../skeletonTrade";
import { useUser } from "@/context/userContext";
import DeleteTrade from "@/actions/deleteTrade";
import Button from "../ui/button";
import NotifyToast from "@/helper/notifyToast";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

interface DataProps {
  data: TradesListProps[];
  isLoading: boolean;
  descriptionPage: string;
}

export function TradeCards({ data, isLoading, descriptionPage }: DataProps) {
  const { userLogged } = useUser();
  const [filteredData, setFilteredData] = useState<TradesListProps[]>(data);

  useEffect(() => {
    const filtered = data.map((item) => {
      return { ...item };
    });

    setFilteredData(filtered);
  }, [data]);

  const deleteTrade = async (id: string) => {
    try {
      const { error } = await DeleteTrade({ tradeId: id });

      if (!error) {
        NotifyToast({ message: "Trade deleted", type: "success" });
        setFilteredData(filteredData.filter((trade) => trade.id !== id));
      } else {
        NotifyToast({ message: error, type: "error" });
      }
    } catch (error) {
      NotifyToast({ message: "Error deleting trade", type: "error" });
    }
  };

  return (
    <div className="bg-gray-900 pt-10 pb-2 sm:py-5">
      <ToastContainer />
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl py-10">
            {descriptionPage}
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {isLoading ? (
            <SkeletonTrade cards={8} />
          ) : (
            filteredData?.map((trade) =>
              trade.tradeCards.length > 0 ? (
                <div className="flex flex-col" key={trade.id}>
                  <h3
                    className={`text-base font-semibold leading-7 text-black capitalize flex justify-around items-center p-2 ${
                      userLogged?.id === trade.userId
                        ? "bg-primary text-white"
                        : "bg-slate-50"
                    }`}
                  >
                    User: {trade.user.name}
                  </h3>
                  <div className="bg-gray-800 p-6 flex-grow flex flex-col">
                    <div className="flex-grow items-center">
                      {trade.tradeCards.map((tradeCard, index) =>
                        tradeCard.card.name ? (
                          <div
                            className="flex justify-center items-center gap-2"
                            key={index}
                          >
                            <span className="text-sm text-white">
                              {tradeCard.type}:
                            </span>
                            <TradeCard
                              key={`${tradeCard.card.id}-${index}`}
                              card={tradeCard.card}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                    {userLogged?.id === trade.userId ? (
                      <div className="pt-3">
                        <Button active onClick={() => deleteTrade(trade.id)}>
                          Delete trade
                        </Button>
                      </div>
                    ) : null}
                    <h4 className="text-xs mt-5 font-semibold leading-7 text-black bg-slate-50 py-1 px-2">
                      Trade Id: {trade.id}
                    </h4>
                  </div>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
}
