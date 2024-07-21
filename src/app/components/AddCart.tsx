'use client'

import { useCartStore } from "../lib/store"
import { product } from "../lib/types"

export function AddCart({product}: { product: product }) {
    const { addProduct } = useCartStore();
    
    return (
        <button 
            onClick={() => addProduct(product)} 
            className="mt-5 bg-teal-600 text-gray-200 mx-1 mb-1 p-1 rounded-md"
        >
            Adicionar ao carrinho
        </button>
    )
}