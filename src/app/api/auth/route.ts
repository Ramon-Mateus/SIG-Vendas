import { NextResponse } from "next/server";
import { prisma } from "../../../app/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NextApiResponse } from "next";

const SECRET_KEY = "Chave secreta"

export async function POST(request: Request, res: NextApiResponse) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!user) {
        return NextResponse.json({ error: "User not found" });
    }

    const isValuePassword = await compare(password, user.password);

    if(!isValuePassword) {
        return NextResponse.json({ error: "password invalid!" });
    }

    const token = sign({id: user.id}, SECRET_KEY, { expiresIn: '1d' });

    const {id, role} = user;

    return NextResponse.json({ user: { id, email, role }, token });
}