import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { product, status_venda } from "@/app/lib/types";
import { forma_pagamento } from "../../lib/types"

export async function GET() {
    const vendas = await prisma.venda.findMany();
    return NextResponse.json(vendas);
}

function totalVenda(itens: any, frete: number, desconto: number, forma_pagamento_item: number, prazo_adicional: number) {
    let somaProducts: number;

    if(forma_pagamento_item === forma_pagamento.cartao_credito) {
        somaProducts = itens.reduce((sum: number, item: product) => (sum + item.preco_cheio * item.quantity!), 0);
    } else {
        somaProducts = itens.reduce((sum: number, item: product) => (sum + item.preco_descontado * item.quantity!), 0);
    }

    let total = somaProducts + frete + (somaProducts * prazo_adicional)/100 - desconto;

    return total;
}

export async function POST(request: Request) {
    const { itens, frete, desconto, forma_pagamento, endereco, prazo_adicional } = await request.json();

    if (!Array.isArray(itens) || itens.length === 0) {
        return NextResponse.json({ message: 'Nenhum item fornecido' }, { status: 400 });
    }

    const venda = await prisma.venda.create({
        data: {
            status: status_venda.aceita,
            total: totalVenda(itens, frete, desconto, forma_pagamento, prazo_adicional),
            endereco: endereco,
            frete: frete,
            desconto: desconto,
            prazo_adicional: prazo_adicional,
            forma_pagamento: forma_pagamento,
            items: {
                create: itens.map(item => ({
                    produto: { connect: { SKU: item.SKU } },
                    quantidade: item.quantity,
                    preco: item.preco_cheio
                }))
            }
        },
        include: {
            items: true,
        }
    });

    return NextResponse.json(venda);
}