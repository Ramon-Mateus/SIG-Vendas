import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id)

    const venda = await prisma.venda.findUnique({
        where: {
            id: id
        },
        include: {
            items: {
                include: {
                    produto: true
                }
            },
            user: true
        }
    });

    if (!venda) {
        return NextResponse.json({ error: "Venda not found" }, { status: 404 });
    }

    return NextResponse.json(venda);
}