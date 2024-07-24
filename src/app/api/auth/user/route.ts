import { NextResponse } from "next/server";
import { prisma } from "../../../../app/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
    const { email, password, role, name } = await request.json();

    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(userExists) {
        return NextResponse.json({ error: "User exists" });
    }

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hash_password,
            role: role
        }
    });
    return NextResponse.json(user);
}

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json(users)
}