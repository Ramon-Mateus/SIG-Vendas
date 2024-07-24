'use client'
import { CartDrawer } from "./CartDrawer";
import { useCartStore } from "../lib/store"
import 'primeicons/primeicons.css';

export function Cart() {
    const useStore = useCartStore();
    return (
        <div>
            <div onClick={() => useStore.toggleCart()} className="flex items-center cursor-pointer relative">
                <i className="pi pi-shopping-cart"></i>
                <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
                    {useStore.cart.length}
                </span>
            </div>
            {
                !useStore.isOpen && (
                    <CartDrawer />
                )
            }
        </div>
    )
}