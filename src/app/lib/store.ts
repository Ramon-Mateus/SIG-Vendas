import { create } from "zustand";
import { persist } from "zustand/middleware";
import { product } from "./types";

type CartState = {
    cart: product[];
    addProduct: (product: product) => void;
    removeProduct: (product: product) => void;
    isOpen: boolean;
    toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist((set) => ({
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
        isOpen: false,
        toggleCart: () => set((state) => ({isOpen: !state.isOpen }))
    }), { name: 'cart-storage'})
)