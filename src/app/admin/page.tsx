'use client'

import { useEffect, useState } from "react";
import { status_venda, venda } from "../lib/types";
import { Venda } from "../components/Venda";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function Admin() {
  const [vendas, setVendas] = useState<venda[]>([]);
  const [desconto, setDesconto] = useState(() => {
  const url = new URL(window.location.toString())

    if(url.searchParams.has('desconto')) {
        return url.searchParams.get('desconto') ?? ''
    }

    return ''
  })

  const [data, setData] = useState(() => {
      const url = new URL(window.location.toString())

      if(url.searchParams.has('data')) {
          return url.searchParams.get('data') ?? ''
      }

      return ''
  })

  const [total, setTotal] = useState(() => {
      const url = new URL(window.location.toString())

      if(url.searchParams.has('total')) {
          return url.searchParams.get('total') ?? ''
      }

      return ''
  })

  const [minDesconto, setMin] = useState(() => {
      const url = new URL(window.location.toString())

      if(url.searchParams.has('minDesconto')) {
          return url.searchParams.get('minDesconto') ?? ''
      }

      return ''
  })

  const [maxDesconto, setMax] = useState(() => {
      const url = new URL(window.location.toString())

      if(url.searchParams.has('maxDesconto')) {
          return url.searchParams.get('maxDesconto') ?? ''
      }

      return ''
  })

  const fetchVenda = async (url: URL) => {
      const response = await fetch(url);
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
    const url = new URL('http://localhost:3000/api/vendas/admin')

    if (desconto.length > 0) url.searchParams.set('desconto', desconto)
    if (data.length > 0) url.searchParams.set('data', data)
    if (total.length > 0) url.searchParams.set('total', total)
    if (minDesconto.length > 0) url.searchParams.set('minDesconto', minDesconto)
    if (maxDesconto.length > 0) url.searchParams.set('maxDesconto', maxDesconto)

    fetchVenda(url);
  }, [vendas, desconto, data, total, minDesconto, maxDesconto]);

  function onDescontoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const desconto = event.target.value;
    const url = new URL(window.location.toString())

    url.searchParams.set('desconto', desconto)

    window.history.pushState({}, "", url)
    setDesconto(desconto)
}

function onDataChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const data = event.target.value;
    const url = new URL(window.location.toString())

    url.searchParams.set('data', data)

    window.history.pushState({}, "", url)
    setData(data)
}

function onTotalChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const total = event.target.value;
    const url = new URL(window.location.toString())

    url.searchParams.set('total', total)

    window.history.pushState({}, "", url)
    setTotal(total)
}

function onDescontoMinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const minDesconto = event.target.value;
    const url = new URL(window.location.toString())

    url.searchParams.set('minDesconto', minDesconto)

    window.history.pushState({}, "", url)
    setMin(minDesconto)
}

function onDescontoMaxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const maxDesconto = event.target.value;
    const url = new URL(window.location.toString())

    url.searchParams.set('maxDesconto', maxDesconto)

    window.history.pushState({}, "", url)
    setMax(maxDesconto)
}

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-7 text-slate-800 text-sm font-bold p-3 flex gap-3">
                <div className="border border-slate-300 rounded-md p-5 flex gap-5 relative pt-10">
                    <h1 className="absolute left-5 top-3 text-slate-300">Ordenação:</h1>
                    <div className="mb-4">
                        <label className="block text-slate-400 text-sm font-bold mb-1">Total:</label>
                        <select
                            value={total}
                            onChange={onTotalChange}
                            className='flex-1 outline-none border-0 text-sm focus:ring-0 bg-slate-300 p-3'
                        >
                            <option value="">Ordenação total...</option>
                            <option value="asc">Menor</option>
                            <option value="desc">Maior</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-slate-400 text-sm font-bold mb-1">Desconto:</label>
                    <select
                        value={desconto}
                        onChange={onDescontoChange}
                        className='flex-1 outline-none border-0 text-sm focus:ring-0 bg-slate-300 p-3'
                    >
                        <option value="">Ordenação desconto...</option>
                        <option value="asc">Desconto crescente</option>
                        <option value="desc">Desconto decrescente</option>
                    </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-slate-400 text-sm font-bold mb-1">Data:</label>
                        <select
                            value={data}
                            onChange={onDataChange}
                            className='flex-1 outline-none border-0 text-sm focus:ring-0 bg-slate-300 p-3'
                        >
                            <option value="">Ordenação data...</option>
                            <option value="asc">Mais antigo</option>
                            <option value="desc">Mais recente</option>
                        </select>
                    </div>
                </div>

                <div className="border border-slate-300 rounded-md p-5 flex gap-5 relative pt-10">
                    <h1 className="absolute left-5 top-3 text-slate-300">Filtro de desconto:</h1>
                    <div className="mb-4">
                        <label className="block text-slate-400 text-sm font-bold mb-1">Desconto mínimo:</label>
                        <div className="bg-slate-300 p-3">
                            <input
                                type="number"
                                value={minDesconto}
                                onChange={onDescontoMinChange}
                                className='bg-transparent outline-none border-0 p-0 text-sm focus:ring-0'
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-slate-400 text-sm font-bold mb-1">Desconto máximo:</label>
                        <div className="bg-slate-300 p-3">
                            <input
                                type="number"
                                value={maxDesconto}
                                onChange={onDescontoMaxChange}
                                className='bg-transparent outline-none border-0 p-0 text-sm focus:ring-0'
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
      <div className="flex gap-4 flex-wrap mx-auto mb-5 max-w-7xl justify-center">
        {
          vendas.length === 0 ? (
            <p className="text-xl text-slate-300">Nenhum pedido pendente...</p>
          ) :
          vendas.map((venda: venda, index: number) => (
              <div className="bg-slate-300 pb-2">
                <Link key={index} href={`/vendas/${venda.id}`}>
                    <Venda key={index} venda={venda} />
                </Link>
                <div className="flex justify-between mt-3 mx-4">
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
    </div>
  );
}