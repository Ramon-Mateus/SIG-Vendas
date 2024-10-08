'use client'

import { useCartStore } from "../lib/store"
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { vendaData, forma_pagamento, prazo_adicional } from "../lib/types"
import { useRouter } from 'next/navigation';
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function AddVenda() {
    const router = useRouter();
    const useStore = useCartStore();
    const { register, control, handleSubmit, reset } = useForm<vendaData>({
        defaultValues: {
            frete: 0,
            desconto: 0,
        }
    });
    const [total, setTotal] = useState(0);
    const [desconto_max, setDesconto_max] = useState('');

    const getUserId = (): number | null => {
        const token = Cookies.get('auth_token');
        if (token) {
            const decoded: JwtPayload = jwtDecode(token);
            return decoded.id;
        }
        return null;
    };

    const onSubmit: SubmitHandler<vendaData> = (data) => {
        const userId = getUserId();

        fetch('http://localhost:3000/api/vendas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                itens: useStore.cart,
                ...data,
                forma_pagamento: Number(data.forma_pagamento),
                prazo_adicional: Number(data.prazo_adicional),
                user_id: userId
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao enviar os dados para API');
            }
            return response.json();
        })
        .then((data) => {
            useStore.cleanCart();
            reset();
            router.replace('/vendas');
            useStore.toggleCart();
            alert(data.message);
        })
    };

    const formaPagamento = useWatch({
        control,
        name: "forma_pagamento",
        defaultValue: "1",
    });

    const freteVenda = useWatch({
        control,
        name: "frete",
        defaultValue: 0,
    });

    const descontoVenda = useWatch({
        control,
        name: "desconto",
        defaultValue: 0,
    });

    const prazoAdicional = useWatch({
        control,
        name: "prazo_adicional",
        defaultValue: 0,
    });

    useEffect(() => {
        if(!Number(freteVenda)) {
            if(!Number(descontoVenda)) {
                setTotal(useStore.totalCart(Number(formaPagamento), 0, 0));
            } else {
                setTotal(useStore.totalCart(Number(formaPagamento), 0, Number(descontoVenda)));
            }
        } else if(!Number(descontoVenda)) {
            setTotal(useStore.totalCart(Number(formaPagamento), Number(freteVenda), 0));
        } else {
            setTotal(useStore.totalCart(Number(formaPagamento), Number(freteVenda), Number(descontoVenda)));
        }
        setDesconto_max(useStore.descontoMax(Number(formaPagamento), Number(prazoAdicional), Number(freteVenda)))
    }, [total, useStore.cart, formaPagamento, freteVenda, descontoVenda, prazoAdicional])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-4 bg-slate-500 shadow-md rounded-md mt-5">

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="forma_pagamento">Forma de Pagamento</label>
                <select {...register('forma_pagamento')} className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans">
                    <option value={forma_pagamento.cartao_credito}>Cartão de Crédito</option>
                    <option value={forma_pagamento.pix}>Pix</option>
                    <option value={forma_pagamento.boleto}>Boleto</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="desconto">Desconto (R$)</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('desconto', { valueAsNumber: true, min: 0, setValueAs: (value) => value === "" ? 0 : value })}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                    min={0}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="endereco">Endereço</label>
                <input
                    type="text"
                    {...register('endereco')}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                    placeholder="..."
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="frete">Valor do Frete (R$)</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('frete', {valueAsNumber: true, min: 0, setValueAs: (value) => value === "" ? 0 : value})}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                    min={0}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="prazo_adicional">Adicional de Prazo</label>
                <select {...register('prazo_adicional')} className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans">
                    <option value={prazo_adicional.padrao}>Padrão</option>
                    <option value={prazo_adicional.turbo}>Turbo</option>
                    <option value={prazo_adicional.super_turbo}>Super Turbo</option>
                </select>
            </div>

            <div>
                <h2 className="text-lg">Total: R$ {total.toFixed(2)}</h2>
                <h2 className="text-lg">Desconto Max: {desconto_max}</h2>
            </div>

            {
                useStore.cart.length > 0 ? (
                    <button 
                        type="submit"
                        className="bg-teal-600 text-gray-300 w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Venda
                    </button>
                ) : (
                    <button 
                        disabled 
                        className="bg-teal-700 text-gray-300 w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Venda
                    </button>
                )
            }
        </form>
    )
}