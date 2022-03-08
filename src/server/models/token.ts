export class Token {
    id: number = 0;
    status: TokenStatus = TokenStatus.New;
    counterId?: number;
    isCurrent: boolean = false;
}

export enum TokenStatus {
    New = 1,
    Inprogress = 2,
    Completed = 3
}

export class Counter {
    id: number = 0;
    isActive: boolean = true;
    isServing: boolean = false;
    tokenId?: number = 0;
}