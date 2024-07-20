import { NextResponse } from "next/server";
import { SKUs } from "../produtosCaseSB.js"
 
export async function GET() {
    return NextResponse.json(SKUs);
}