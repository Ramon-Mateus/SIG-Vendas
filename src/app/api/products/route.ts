import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    let [products, total] = await Promise.all([
        prisma.produto.findMany({
          take: 20,
          skip: Number(page)
          }),
          prisma.produto.count(),
    ])

    // const products = await prisma.produto.findMany({
    //     take: 20,
    //     skip: Number(page) * 20
    // });

    return NextResponse.json({ products, total });
}