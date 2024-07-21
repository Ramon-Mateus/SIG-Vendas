// import { NextResponse } from "next/server";
// import { SKUs } from "./../lib/produtosCaseSB";
 
// export async function GET() {
//     return NextResponse.json(SKUs);
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SKUs } from "./../lib/produtosCaseSB";

const prisma = new PrismaClient();

export async function POST() {
    try {
      for (const item of SKUs) {
        await prisma.produto.create({
          data: {
            SKU: item.SKU,
            produto: item.produto,
            preco_cheio: item.preco_cheio,
            preco_descontado: item.preco_descontado,
          },
        });
      }
  
      return NextResponse.json({ message: 'Produtos adicionados com sucesso' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ message: 'Erro ao adicionar produtos', error: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Erro desconhecido' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}