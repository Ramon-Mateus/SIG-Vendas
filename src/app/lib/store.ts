import { create } from "zustand";
import { persist } from "zustand/middleware";
import { forma_pagamento, product } from "./types";

type CartState = {
    cart: product[];
    addProduct: (product: product) => void;
    removeProduct: (product: product) => void;
    cleanCart: () => void;
    isOpen: boolean;
    toggleCart: () => void;
    totalCart: (forma_pagamento: number) => number;
}

export const useCartStore = create<CartState>()(
    persist((set, get) => ({
        cart: [],
        addProduct: (item) =>
            set((state) => {
                const product = state.cart.find((p) => p.SKU === item.SKU);
                if (product) {
                    const updatedCart = state.cart.map((p) => {
                        if (p.SKU === item.SKU) {
                            return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 };
                        }
                        return p;
                    });
                    return { cart: updatedCart };
                } else {
                    return { cart: [...state.cart, { ...item, quantity: 1 }] };
                }
            }),
        removeProduct: (item) =>
            set((state) => {
                const existingProduct = state.cart.find((p) => p.SKU === item.SKU);
            
                if (existingProduct && existingProduct.quantity! > 1) {
                    const updatedCart = state.cart.map((p) => {
                        if(p.SKU === item.SKU) {
                            return { ...p, quantity: p.quantity! - 1 };
                        }
                        return p;
                    });
                    return { cart: updatedCart };
                } else {
                    const filteredCart = state.cart.filter((p) => p.SKU !== item.SKU);
                    return { cart: filteredCart }
                }
            }),
        cleanCart: () =>
            set(() => {
                return { cart: [] }
            }),
        isOpen: false,
        toggleCart: () => set((state) => ({isOpen: !state.isOpen })),
        totalCart: (forma_pagamento_item: number) => {
            const { cart } = get();

            if(forma_pagamento.cartao_credito === forma_pagamento_item) {
                return cart.reduce((total: number, item: product) => total + item.preco_cheio * (item.quantity || 1), 0)
            }

            return cart.reduce((total: number, item: product) => total + item.preco_descontado * (item.quantity || 1), 0)
        }
    }), { name: 'cart-storage'})
)