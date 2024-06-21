"use client";
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/utils/scrollToTop";
import Pagination from "../pagination";
import { ErrorMessageUi } from "../errorMessageUi";
import { TradeCards } from "./tradeCards";
import GetAvailableTrades from "@/actions/getAvailableTrades";
import { TradesListProps } from "@/types/trades";

export function TradesWrapper() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [more, setMore] = useState<boolean>(true);
  const [data, setData] = useState<TradesListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: errorResponse } = await GetAvailableTrades({
          rowsPerPage,
          page,
        });
        if (data) {
          setData(data.list);
          setMore(data.more);
        } else if (errorResponse) {
          setError(errorResponse);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [page, rowsPerPage]);

  useEffect(() => {
    ScrollToTop();
  }, [page]);

  return (
    <div>
      <TradeCards
        descriptionPage="Pending Trades"
        data={data}
        isLoading={isLoading}
      />
      {error && <ErrorMessageUi errorMessage={error} />}
      {error === null && (
        <Pagination page={page} setPage={setPage} more={more} />
      )}
    </div>
  );
}
