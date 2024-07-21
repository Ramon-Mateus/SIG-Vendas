export type product = {
    SKU: string,
    produto: string,
    preco_cheio: number,
    preco_descontado: number,
    quantity?: number
}

export enum prazo_adicional {
    padrao = 1,
    turbo = 2,
    super_turbo = 3
}

export enum status_venda {
    aceita = 1,
    recusada = 2,
    analise = 3
}