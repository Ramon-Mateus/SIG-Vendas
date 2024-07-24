import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { status_venda } from "@/app/lib/types";

export async function GET() {
    const vendas = await prisma.venda.findMany({
        where: {
            status: status_venda.analise
        },
        orderBy: {
            created_at: 'desc'
        },
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