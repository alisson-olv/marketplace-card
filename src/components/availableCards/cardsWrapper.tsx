"use client";
import { useEffect, useState } from "react";
import { Cards } from "./cards";
import { GetCards } from "@/actions/getCards";
import { CardsItemsProps } from "@/types/cards";
import { ScrollToTop } from "@/utils/scrollToTop";
import Pagination from "../pagination";
import { ErrorMessageUi } from "../errorMessageUi";
import { ToastContainer } from "react-toastify";

export function CardsWrapper() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [more, setMore] = useState<boolean>(true);
  const [data, setData] = useState<CardsItemsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: errorResponse } = await GetCards({
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
      <ToastContainer />
      <Cards
        descriptionPage="Available Cards"
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
