import { forma_pagamento, prazo_adicional, status_venda, venda } from "../lib/types";

type vendaProps = {
    venda: venda
}

export function Venda({ venda }: vendaProps) {
    if (!venda) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-auto w-96 bg-slate-300 p-3 font-sans">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-700">Detalhes da Venda</h2>
                {
                    venda.status === status_venda.aceita ? <div className="h-6 w-6 rounded-xl bg-green-600 mb-3"></div>
                    : venda.status === status_venda.recusada ? <div className="h-6 w-6 rounded-xl bg-red-700 mb-3"></div>
                    : <div className="h-6 w-6 rounded-xl bg-yellow-400 mb-3"></div>
                }
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Identificador:</span>
                <span className="text-gray-800">{venda.id}</span>
            </div>
            
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Forma de Pagamento:</span>
                <span className="text-gray-800">{forma_pagamento[venda.forma_pagamento]}</span>
            </div>
            
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Endereço:</span>
                <span className="text-gray-800">{venda.endereco}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Adicional de Prazo:</span>
                <span className="text-gray-800">{prazo_adicional[venda.prazo_adicional]}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Frete:</span>
                <span className="text-gray-800">R$ {venda.frete.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Desconto:</span>
                <span className="text-gray-800">R$ {venda.desconto.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Total:</span>
                <span className="text-gray-800">R$ {venda.total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-medium text-gray-900">Status:</span>
                <span className="text-gray-900">{status_venda[venda.status].toUpperCase()}</span>
            </div>
        </div>
    )
}