import { useState } from "react";
import ProductList from "../components/productList/productList";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  return (
    <>
      <Search />
      <ProductList page={page} setHasMore={setHasMore} />
      <Pagination page={page} setPage={setPage} hasMore={hasMore} />
    </>
  );
}
