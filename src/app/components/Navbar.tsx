'use client'

import Link from "next/link";
import { Cart } from "./Cart";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function NavBar() {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        setUserName(Cookies.get("user_name") || null);
        setUserRole(Cookies.get("user_role") || null);
    }, []);
    
    function hangleLogout() {
        Cookies.remove('auth_token', { sameSite: 'None', secure: true });
        Cookies.remove('user_role', { sameSite: 'None', secure: true });
        Cookies.remove("user_name", { sameSite: "None", secure: true });

        window.location.reload();
    }

    return (
            <nav className="fixed flex top-0 w-full justify-between items-center z-50 py-4 px-6 bg-slate-800 text-gray-300">
                <Link 
                    href="/" 
                    className="font-semibold text-md items-center"
                >SIG - Vendas</Link>
                <div>
                    <Link href='../' className="px-4">Produtos</Link>
                    <Link href='../vendas' className="pr-4">Vendas</Link>
                    {
                        userRole === "gerente" && (
                            <>
                                <Link href='../admin' className="pr-4">Pedidos</Link>
                                <Link href='../user' className="pr-4">Criar usuário</Link>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-7">
                    <Cart/>
                    {userName ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Bem-vindo, {userName}!</span>
                        <button onClick={hangleLogout} className="px-2 py-1 border border-gray-400 font-sans">
                            Logout
                        </button>
                    </div>
                    ) : (
                        <Link href="/login" className="px-2 py-1 border border-gray-400 font-sans">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
    )
}