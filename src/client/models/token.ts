export class Token {
    id: number
    status: TokenStatus = TokenStatus.New
    counterId?: number
    isCurrent: boolean
}

export enum TokenStatus {
    New = 1,
    Inprogress = 2,
    Completed = 3
}

export class Counter {
    isActive: boolean
    isServing: boolean
    tokenId: number
    id: number
}