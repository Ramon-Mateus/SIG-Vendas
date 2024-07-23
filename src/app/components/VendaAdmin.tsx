import { venda } from "../lib/types"

type vendaProps = {
    venda: venda
}

export function VendaAdmin({ venda }: vendaProps) {
    return (
        <div className="w-96 bg-slate-300 h-auto border flex justify-between border-slate-600 py-4 px-2 items-center rounded-md">
            <span className="font-semibold text-slate-800">Identificar: {venda.id}</span>
            <div>
            <button className="border border-green-600 p-2 rounded-md bg-green-600 hover:bg-green-700 mr-4">
                Aceitar
            </button>
            <button className="border border-red-600 p-2 rounded-md bg-red-600 hover:bg-red-700">
                Recusar
            </button>
            </div>
      </div>
    )
}