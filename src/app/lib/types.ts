export type product = {
    SKU: string,
    produto: string,
    preco_cheio: number,
    preco_descontado: number,
    quantity?: number
}

export type vendaData = {
    frete: number;
    prazo_adicional: number;
    desconto: number;
    forma_pagamento: string;
    endereco: string;
}

export type venda = {
    id: number;
    status: number;
    total: number;
    endereco: string;
    frete: number;
    desconto: number;
    prazo_adicional: number;
    forma_pagamento: number;
}

export type loginType = {
    email: string;
    password: string
}

export type loginResponse = {
    user: {
        id: number,
        email: string,
        role: string
    };
    token: string;
}

export type loginErrorResponse = {
    error: string;
}

export type registerUser = {
    email: string;
    password: string;
    role: string
}

export enum prazo_adicional {
    padrao = 0,
    turbo = 10,
    super_turbo = 20
}

export enum status_venda {
    aceita = 1,
    analise = 2,
    recusada = 3
}

export enum forma_pagamento {
    cartao_credito = 1,
    pix = 2,
    boleto = 3
}