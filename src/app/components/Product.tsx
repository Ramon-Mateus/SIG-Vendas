import { product } from "../lib/types"
import { AddCart } from "./AddCart"

type ProductProps = {
    product: product
}

export function Product({ product }: ProductProps) {
    return (
        <div className="flex flex-col w-52 h-30 bg-slate-300 p-2 rounded-md text-gray-900">
            <div className="flex justify-between">
                <p>{product.SKU}</p>
                <div className="flex flex-col items-end">
                    <p>R$ {product.preco_cheio}</p>
                    <p className="text-xs text-gray-700">Pix: R$ {product.preco_descontado}</p>
                </div>
            </div>
            <AddCart product={product}/>
        </div>
    )
}
