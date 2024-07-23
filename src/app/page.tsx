import { Product } from "./components/Product";
import { product } from "./lib/types";

async function getData() {
  const res = await fetch('http://localhost:3000/api/products');
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Home() {
  const products = await getData();

  return (
    <div className="flex gap-4 flex-wrap mx-auto max-w-7xl mb-5">
      {
        products.map((product: product, index: string) => (
          <Product key={index} product={product} />
        ))
      }
    </div>
  );
}
