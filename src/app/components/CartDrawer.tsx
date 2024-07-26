'use client'

import { useCartStore } from "../lib/store"
import { AddVenda } from "./AddVenda";

export function CartDrawer() {
    const useStore = useCartStore();
    return (
        <div onClick={() => useStore.toggleCart()} className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">
            <div onClick={(e) => e.stopPropagation()} className="absolute bg-slate-600 right-0 top-0 w-1/4 h-screen p-8 overflow-y-scroll">
                <button onClick={() => useStore.toggleCart()} className="font-bold text-sm text-teal-600">
                    Voltar para loja
                </button>
                <div className="border-t border-gray-400 my-5"></div>
                {
                    useStore.cart.map((item) => (
                        <div key={item.SKU} className="flex py-4 border border-slate-500 rounded-md mt-4 px-2">
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <h1>{item.SKU}</h1>
                                    <h2 className="text-gray-400">Quantidade: {item.quantity}</h2>
                                </div>
                                <div>
                                    <p className="text-md">R$ {item.preco_cheio.toFixed(2)}</p>
                                    <p className="text-sm">Pix: R$ {item.preco_descontado.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => useStore.addProduct(item)} className="border border-slate-400 rounded-md p-1">
                                        Adicionar
                                    </button>
                                    <button onClick={() => useStore.removeProduct(item)} className="border border-slate-400 rounded-md p-1">
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <AddVenda />
            </div>
        </div>
    )
}