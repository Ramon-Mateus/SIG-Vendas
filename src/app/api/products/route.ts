import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
 
export async function GET() {
    const products = await prisma.produto.findMany({
        take: 20,
    });
    return NextResponse.json(products);
}