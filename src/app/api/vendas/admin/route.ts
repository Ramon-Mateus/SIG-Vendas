import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { status_venda } from "@/app/lib/types";

export async function GET() {
    const vendas = await prisma.venda.findMany({
        where: {
            status: status_venda.analise
        }
    });
    return NextResponse.json(vendas);
}

export async function POST(request: Request) {
    // const { itens, frete, desconto, forma_pagamento, endereco, prazo_adicional } = await request.json();

    // });

    // return NextResponse.json(venda);
}