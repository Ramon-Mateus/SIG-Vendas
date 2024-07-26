import { create } from "zustand";
import { persist } from "zustand/middleware";
import { forma_pagamento, prazo_adicional, product } from "./types";

type CartState = {
    cart: product[];
    addProduct: (product: product) => void;
    removeProduct: (product: product) => void;
    cleanCart: () => void;
    isOpen: boolean;
    toggleCart: () => void;
    totalCart: (forma_pagamento: number, frete: number, desconto: number) => number;
    descontoMax: (forma_pagamento_item: number, prazo_adicional_item: number, frete: number) => string;
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
        totalCart: (forma_pagamento_item: number, frete: number, desconto: number) => {
            const { cart } = get();

            if(forma_pagamento.cartao_credito === forma_pagamento_item) {
                return cart.reduce((total: number, item: product) => total + item.preco_cheio * (item.quantity || 1), 0) + frete - desconto
            }

            return cart.reduce((total: number, item: product) => total + item.preco_descontado * (item.quantity || 1), 0) + frete - desconto
        },
        descontoMax: (forma_pagamento_item: number, prazo_adicional_item: number, frete: number) => {
            const { cart } = get();
            let totalItens: number = 0;

            if(forma_pagamento.cartao_credito === forma_pagamento_item) {
                totalItens = cart.reduce((total: number, item: product) => total + item.preco_cheio * (item.quantity || 1), 0)
            } else {
                totalItens = cart.reduce((total: number, item: product) => total + item.preco_descontado * (item.quantity || 1), 0)
            }

            if(prazo_adicional_item === prazo_adicional.padrao) {
                totalItens = totalItens * 0.05
                if(frete > totalItens) {
                    return `Frete: R$ ${frete.toFixed(2)}`
                }
                return `5%: R$ ${totalItens.toFixed(2)}`
            } else if(prazo_adicional_item === prazo_adicional.turbo) {
                totalItens = totalItens * 0.1
                if(frete > totalItens) {
                    return `Frete: R$ ${frete.toFixed(2)}`
                }
                return `10%: R$ ${totalItens.toFixed(2)}`
            }

            totalItens = totalItens * 0.2
            if(frete > totalItens) {
                return `Frete: R$ ${frete.toFixed(2)}`
            }
            return `20%: R$ ${totalItens.toFixed(2)}`
        }
    }), { name: 'cart-storage'})
)