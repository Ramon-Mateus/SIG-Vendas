import { NextResponse } from "next/server";
import { SKUs } from "./../lib/produtosCaseSB";
 
export async function GET() {
    return NextResponse.json(SKUs);
}