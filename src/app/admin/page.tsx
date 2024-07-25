'use client'

import { useEffect, useState } from "react";
import { status_venda, venda } from "../lib/types";
import { Venda } from "../components/Venda";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
  const [vendas, setVendas] = useState<venda[]>([]);

  const fetchVenda = async () => {
      const response = await fetch('http://localhost:3000/api/vendas/admin');
      const data = await response.json();
      setVendas(data);
  }

  const handleUpdateStatus = async (newStatus: number, venda: venda) => {
    try {
        const response = await fetch('http://localhost:3000/api/vendas/admin', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: venda.id,
                status: newStatus
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar a venda');
        }

        if(newStatus == status_venda.aceita) toast.success("Venda Autorizada com sucesso!");
        else toast.success("Venda recusada com sucesso!");

    } catch (error) {
        console.error('Erro:', error);
    }
};

  useEffect(() => {
      fetchVenda();
  }, [vendas]);

  return (
    <>
      <div className="flex gap-4 flex-wrap mx-auto mb-5 max-w-7xl justify-center">
        {
          vendas.length === 0 ? (
            <p className="text-xl text-slate-300">Nenhum pedido pendente...</p>
          ) :
          vendas.map((venda: venda, index: number) => (
              <div className="bg-slate-300 pb-2">
                <Venda key={index} venda={venda} />
                <div className="flex justify-between mx-1 mt-3">
                  <button onClick={() => handleUpdateStatus(status_venda.aceita, venda)} className="border border-green-600 p-2 rounded-md bg-green-600 hover:bg-green-700 mr-4">
                      Aceitar
                  </button>
                  <button onClick={() => handleUpdateStatus(status_venda.recusada, venda)} className="border border-red-600 p-2 rounded-md bg-red-600 hover:bg-red-700">
                      Recusar
                  </button>
                </div>
              </div>
          ))
        }
      </div>
      <ToastContainer />
    </>
  );
}