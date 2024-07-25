import { product } from "../lib/types"
import { AddCart } from "./AddCart"

type ProductProps = {
    product: product,
    quantity?: number;
}

export function Product({ product, quantity }: ProductProps) {
    return (
        <div className="flex flex-col w-72 h-30 bg-slate-300 p-2 rounded-md text-gray-900">
            <div className="flex justify-between">
                <div>
                    <p>{product.SKU}</p>
                    {
                        quantity ? (
                            <p className="text-xs text-gray-700">Qtdd: {quantity}</p>
                        ) : null
                    }
                </div>
                <div className="flex flex-col items-end">
                    <p>R$ {product.preco_cheio.toFixed(2)}</p>
                    <p className="text-xs text-gray-700">Pix: R$ {product.preco_descontado.toFixed(2)}</p>
                </div>
            </div>
            <AddCart product={product}/>
        </div>
    )
}
