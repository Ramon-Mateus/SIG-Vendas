const SECRET_KEY = 'Chave secreta';

export function middleware() { // não funciona
    // const authorization = request.headers.get("Authorization");

    // if(!authorization) {
    // return NextResponse.redirect(new URL('/login', request.url))
    // }

    // const [, token] = authorization.split(" ")

    // try {
    //     const decoded = jwt.verify(token, SECRET_KEY);

    // } catch (error) {
    //     return NextResponse.json({ erro: "error" })
    // }
}

export const config = {
    // matcher: ['/vendas'],
};