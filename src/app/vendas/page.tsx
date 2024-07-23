'use client'

import { useEffect, useState } from "react"
import type { venda } from "../lib/types"
import { Venda } from "../components/Venda";

export default function Vendas() {
    const [vendas, setVendas] = useState<venda[]>([]);

    const fetchVenda = async () => {
        const response = await fetch('http://localhost:3000/api/vendas');
        const data = await response.json();
        setVendas(data);
    }

    useEffect(() => {
        fetchVenda();
    }, []);

    return (
        <div className="flex gap-4 flex-wrap mx-auto max-w-7xl mb-5">
            {
                vendas.map((venda: venda, index: number) => (
                    <Venda key={index} venda={venda} />
                ))
            }
        </div>
    )
}