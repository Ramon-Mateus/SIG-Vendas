'use client'

import { Product } from "./components/Product";
import { useEffect, useState } from "react";
import type { product } from "./lib/types"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function Home() {
  const [products, setProducts] = useState<product[]>([]);
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0);

  const fetchVenda = async (url: URL) => {
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
    setTotal(data.total);
  }

  useEffect(() => {
      const url = new URL('http://localhost:3000/api/products')

      url.searchParams.set('page', String(page))

      fetchVenda(url);
  }, [page]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
  };

  return (
    <div className="flex gap-4 flex-col mx-auto max-w-7xl mb-5 justify-center items-center">
      <div className="flex gap-4 flex-wrap mx-auto max-w-7xl mb-5 justify-center">
        {
          products.map((product: product) => (
            <Product key={product.SKU} product={product} />
          ))
        }
      </div>
      <div>
        <Paginator first={page} rows={20} totalRecords={total} onPageChange={onPageChange} template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
      </div>
    </div>
  );
}
