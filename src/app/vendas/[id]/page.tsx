'use client'

import { Product } from "@/app/components/Product";
import { Venda } from "@/app/components/Venda";
import { venda } from "@/app/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function VendaDetail(resquest: Request, context: any) {
    const { id } = useParams();

    const [venda, setVenda] = useState<venda | undefined>();
    const [error, setError] = useState<string | null>(null);

    const fetchVenda = async (url: URL) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Venda não encontrada!');
            }
            const data = await response.json();
            console.log(data)
            setVenda(data);
        }
        catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        const url = new URL(`http://localhost:3000/api/vendas/${id}`)
        fetchVenda(url);
    }, [id]);

    if (error) {
        return (
            <div className="flex justify-center text-3xl items-center h-1/2">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div>
            {
                venda ? (
                    <div className="flex gap-6">
                        <div>
                            <Venda key={venda.id} venda={venda} />
                        </div>
                        <div>
                            <h1 className="text-2xl mb-4">Produtos:</h1>
                            <div className="flex flex-wrap gap-4">
                                {venda.items.map((item) => (
                                    <Product key={item.id} product={item.produto} quantity={item.quantidade} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center text-1xl items-center">
                        <h1>Carregando...</h1>
                    </div>
                )
            }
        </div>
    )
}