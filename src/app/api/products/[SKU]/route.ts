import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
 
export async function GET(request: Request, { params }: { params: { SKU: string } }) {
    const { SKU } = params;

    const product = await prisma.produto.findUnique({
        where: {
            SKU: SKU
        },
    });

    if (!product) {
        return NextResponse.json({ message: 'produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
}