import "./pagination.scss";

export default function Pagination({ page, setPage,hasMore }) {
  return (
    <div className="pagination">
      <button  onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
