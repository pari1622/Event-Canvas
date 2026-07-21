type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const Pagination = ({ page, totalPages, setPage }: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-5 py-2 rounded-lg bg-[#181412] disabled:opacity-40"
      >
        Previous
      </button>

      <span className="px-5 py-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-5 py-2 rounded-lg bg-[#181412] disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
