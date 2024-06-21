interface PaginationProps {
  page: number;
  setPage: any;
  more: boolean;
}

export default function Pagination({ page, setPage, more }: PaginationProps) {
  return (
    <nav
      className="flex items-center justify-between bg-gray-900 pt-3 pb-10 sm:px-6 mx-auto max-w-7xl px-6 text-center lg:px-8"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={!more}
          onClick={() => setPage(page + 1)}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
