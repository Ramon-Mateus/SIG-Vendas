import { Product } from "./components/Product";
import { SKUs } from "./lib/produtosCaseSB";

export default function Home() {
  return (
    <div className="flex gap-4 flex-wrap mx-auto max-w-7xl">
      <Product product={SKUs[0]} /> 
      <Product product={SKUs[1]} /> 
      <Product product={SKUs[2]} /> 
      <Product product={SKUs[3]} /> 
      <Product product={SKUs[4]} /> 
      <Product product={SKUs[5]} /> 
      <Product product={SKUs[6]} /> 
      <Product product={SKUs[7]} /> 
      <Product product={SKUs[8]} /> 
      <Product product={SKUs[9]} /> 
      <Product product={SKUs[10]} /> 
    </div>
  );
}
