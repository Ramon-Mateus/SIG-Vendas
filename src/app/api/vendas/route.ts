import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { status_venda } from "@/app/lib/types";
 
export async function GET() {
    const vendas = await prisma.venda.findMany();
    return NextResponse.json(vendas);
}

export async function POST(request: Request) {
    const { itens } = await request.json();

    if (!Array.isArray(itens) || itens.length === 0) {
        return NextResponse.json({ message: 'Nenhum item fornecido' }, { status: 400 });
    }

    const venda = await prisma.venda.create({
        data: {
            total: itens.reduce((sum, item) => sum + item.preco_cheio * item.quantity, 0),
            status: status_venda.aceita,
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