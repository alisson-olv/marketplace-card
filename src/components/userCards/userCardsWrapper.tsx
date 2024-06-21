"use client";
import { useEffect, useState } from "react";
import { CardsItemsProps } from "@/types/cards";
import { ErrorMessageUi } from "../errorMessageUi";
import { UserCards } from "./userCards";
import GetUserCards from "@/actions/getUserCards";

export function UserCardsWrapper() {
  const [data, setData] = useState<CardsItemsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  return (
    <div>
      <UserCards descriptionPage="My Cards" data={data} isLoading={isLoading} />
      {error && <ErrorMessageUi errorMessage={error} />}
    </div>
  );
}
