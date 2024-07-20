import { Product } from "./components/Product";
import { SKUs } from "./lib/produtosCaseSB";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap mx-auto max-w-7xl">
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[0]} /> 
    </div>
  );
}
