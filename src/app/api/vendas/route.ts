import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { prazo_adicional, product, status_venda } from "@/app/lib/types";
import { forma_pagamento } from "../../lib/types"

export async function GET() {
    const vendas = await prisma.venda.findMany({
        include: {
            items: true
        },
        orderBy: {
            status: 'asc',
        },
    });
    return NextResponse.json(vendas);
}

function totalVenda(itens: any, frete: number, desconto: number, forma_pagamento_item: number, prazo_adicional: number) {
    let soma = somaProducts(itens, forma_pagamento_item)

    let total = soma + frete + (soma * prazo_adicional)/100 - desconto;

    return total;
}

function vendaStatus(desconto: number, frete: number, itens: any, forma_pagamento_item: number, prazo_adicional_item: number) {
    let soma = somaProducts(itens, forma_pagamento_item)

    if(prazo_adicional_item === prazo_adicional.padrao) {
        soma = soma * 0.05;
    } else if(prazo_adicional_item === prazo_adicional.turbo) {
        soma = soma * 0.10;
    } else {
        soma = soma * 0.20;
    }

    let maior: number;

    soma > frete ? maior = soma : maior = frete;

    if(desconto > maior) {
        return status_venda.analise
    }

    return status_venda.aceita
}

function somaProducts(itens: any, forma_pagamento_item: number) {
    let somaProducts: number;
    
    if(forma_pagamento_item === forma_pagamento.cartao_credito) {
        somaProducts = itens.reduce((sum: number, item: product) => (sum + item.preco_cheio * item.quantity!), 0);
    } else {
        somaProducts = itens.reduce((sum: number, item: product) => (sum + item.preco_descontado * item.quantity!), 0);
    }

    return somaProducts
}

export async function POST(request: Request) {
    const { itens, frete, desconto, forma_pagamento, endereco, prazo_adicional } = await request.json();

    if (!Array.isArray(itens) || itens.length === 0) {
        return NextResponse.json({ message: 'Nenhum item fornecido' }, { status: 400 });
    }

    const venda = await prisma.venda.create({
        data: {
            status: vendaStatus(desconto, frete, itens, forma_pagamento, prazo_adicional),
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