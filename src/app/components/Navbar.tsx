'use client'

import Link from "next/link";
import { Cart } from "./Cart";
import Cookies from "js-cookie";
import  { useRouter } from 'next/navigation'

export function NavBar() {
    const router = useRouter();

    function hangleLogout() {
        Cookies.remove('auth_token', { sameSite: 'None', secure: true });
        Cookies.remove('user_role', { sameSite: 'None', secure: true });

        window.location.reload();

        router.push('/');
    }

    return (
            <nav className="fixed flex top-0 w-full justify-between items-center z-50 py-4 px-6 bg-slate-800 text-gray-300">
                <Link 
                    href="/" 
                    className="font-semibold text-md items-center"
                >SIG - Vendas</Link>
                <div>
                    <Link href='../' className="px-3">Produtos</Link>
                    <Link href='../vendas' className="pr-3">Vendas</Link>
                    <Link href='../admin' className="pr-3">Admin</Link>
                </div>
                <Cart/>
                <button onClick={hangleLogout} className="px-2 py-1 border border-gray-400 font-sans">
                    Logout
                </button>
            </nav>
    )
}