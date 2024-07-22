import Link from "next/link";
import { Cart } from "./Cart";

export function NavBar() {
    return (
            <nav className="fixed flex top-0 w-full justify-between items-center z-50 py-4 px-6 bg-slate-800 text-gray-300">
                <Link 
                    href="/" 
                    className="font-semibold text-md items-center"
                >SIG - Vendas</Link>
                <div>
                    <Link href='../' className="px-3">Produtos</Link>
                    <Link href='../vendas' className="pr-3">Vendas</Link>
                </div>
                <Cart/>
            </nav>
    )
}