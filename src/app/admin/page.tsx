'use client'

import { useEffect, useState } from "react";
import { venda } from "../lib/types";
import { VendaAdmin } from "../components/VendaAdmin";


export default function Admin() {
  const [vendas, setVendas] = useState<venda[]>([]);

  const fetchVenda = async () => {
      const response = await fetch('http://localhost:3000/api/vendas/admin');
      const data = await response.json();
      setVendas(data);
  }

  useEffect(() => {
      fetchVenda();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap mx-auto max-w-7xl text-slate-300 mb-5">
      {
        vendas.length === 0 ? (
          <p className="text-xl text-slate-300">Nenhum pedido pendente...</p>
        ) :
        vendas.map((venda: venda, index: number) => (
            <VendaAdmin key={index} venda={venda} />
        ))
      }
    </div>
  );
}