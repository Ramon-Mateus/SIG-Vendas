import { product } from "../lib/types"

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
            <button className="mt-5 bg-green-700 text-gray-200 mx-2 mb-1 p-1 rounded-md">Adicionar ao carrinho</button>
        </div>
    )
}