import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = 'Chave secreta';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    const homeURL = new URL('/', request.url)
    const signInURL = new URL('/login', request.url)
    
    if(!token) {
        return NextResponse.redirect(signInURL);
    }

    if (request.nextUrl.pathname === '/admin') {
        if (role === 'gerente') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(homeURL);
        }
    }
}

export const config = {
    matcher: ['/', '/vendas', '/admin'],
};