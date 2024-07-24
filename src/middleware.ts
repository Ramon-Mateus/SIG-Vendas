import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    const homeURL = new URL('/', request.url)
    const signInURL = new URL('/login', request.url)
    
    if(!token) {
        if (request.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json({ error: "Permission not alowed" }, { status: 401 });
        }
        return NextResponse.redirect(signInURL);
    }

    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname === '/user') {
        if (role === 'gerente') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(homeURL);
        }
    }
}

export const config = {
    matcher: ['/', '/vendas', '/admin', '/api/auth/user', '/api/products/:path*', '/api/vendas/:path*', '/user'],
};