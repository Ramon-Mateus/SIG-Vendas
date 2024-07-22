import { useCartStore } from "../lib/store"
import { SubmitHandler, useForm } from "react-hook-form";
import { vendaData } from "../lib/types"

export function AddVenda() {
    const useStore = useCartStore();
    const { register, handleSubmit, reset } = useForm<vendaData>({
        defaultValues: {
            frete: 0,
            desconto: 0,
        }
    });

    const onSubmit: SubmitHandler<vendaData> = (data) => {
        fetch('http://localhost:3000/api/vendas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                itens: useStore.cart,
                ...data
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao enviar os dados para API');
            }
            return response.json();
        })
        .then(() => {
            useStore.cleanCart();
            reset();
        })
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-4 bg-slate-500 shadow-md rounded-md mt-5">

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="forma_pagamento">Forma de Pagamento</label>
                <select {...register('forma_pagamento')} className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans">
                    <option value={1}>Cartão de Crédito</option>
                    <option value={2}>Pix</option>
                    <option value={3}>Boleto</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="desconto">Desconto (R$)</label>
                <input
                    type="number"
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
                    {...register('frete', {valueAsNumber: true, min: 0, setValueAs: (value) => value === "" ? 0 : value})}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                    min={0}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="prazo_adicional">Adicional de Prazo</label>
                <select {...register('prazo_adicional')} className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans">
                    <option value={1}>Padrão</option>
                    <option value={2}>Turbo</option>
                    <option value={3}>Super Turbo</option>
                </select>
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