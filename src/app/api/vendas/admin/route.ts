import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { status_venda } from "@/app/lib/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const descontoOrder = searchParams.get('desconto');
    const dataOrder = searchParams.get('data');
    const totalOrder = searchParams.get('total');

    const descontoMin = parseFloat(searchParams.get('minDesconto') || '0');
    const descontoMax = parseFloat(searchParams.get('maxDesconto') || 'NaN');

    let orderBy: any[] = [];
    
    if (totalOrder) orderBy.push({ total: totalOrder });
    if (descontoOrder) orderBy.push({ desconto: descontoOrder });
    if (dataOrder) orderBy.push({ created_at: dataOrder });

    const vendas = await prisma.venda.findMany({
        include: {
            items: true,
            user: true
        },
        where: {
            AND: {
                desconto: !isNaN(descontoMax) ? { gte: descontoMin, lte: descontoMax} : { gte: descontoMin },
                status: status_venda.analise
            }
        },
        orderBy,
    });
    return NextResponse.json(vendas);
}

export async function PUT(request: Request) {
    const { id, status } = await request.json();

    const venda = await prisma.venda.update({
        where: {
            id: id,
          },
          data: {
            status: status,
          },
    })

    return NextResponse.json({ venda });
}