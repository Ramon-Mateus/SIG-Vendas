'use client'

import { useState } from "react";
import { status_venda, venda, vendaData } from "../lib/types"

type vendaProps = {
    venda: venda
}

export function VendaAdmin({ venda }: vendaProps) {
    const handleUpdateStatus = async (newStatus: number) => {
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
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="w-96 bg-slate-300 h-auto border flex justify-between border-slate-600 py-4 px-2 items-center rounded-md">
            <span className="font-semibold text-slate-800">Identificador: {venda.id}</span>
            <div>
                <button onClick={() => handleUpdateStatus(status_venda.aceita)} className="border border-green-600 p-2 rounded-md bg-green-600 hover:bg-green-700 mr-4">
                    Aceitar
                </button>
                <button onClick={() => handleUpdateStatus(status_venda.recusada)} className="border border-red-600 p-2 rounded-md bg-red-600 hover:bg-red-700">
                    Recusar
                </button>
            </div>
      </div>
    )
}