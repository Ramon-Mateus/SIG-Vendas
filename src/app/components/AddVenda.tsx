import { useCartStore } from "../lib/store"

export function AddVenda() {
    const useStore = useCartStore();

    const addVenda = () => {
        fetch('http://localhost:3000/api/vendas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ itens: useStore.cart })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao enviar os dados para API');
            }
            return response.json();
        })

    }
    
    return (
        <div>
            {
                useStore.cart.length > 0 ? (
                    <button onClick={() => {
                        addVenda;
                        useStore.cleanCart();
                    }} 
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
        </div>
    )
}