import { Token, TokenStatus, Counter } from "../models/token";

let tokens: Token[] = []
const counters: Counter[] = [
    { id: 1, isActive: true, isServing: false, tokenId: 0 },
    { id: 2, isActive: true, isServing: false, tokenId: 0 },
    { id: 3, isActive: true, isServing: false, tokenId: 0 },
    { id: 4, isActive: true, isServing: false, tokenId: 0 }]

// *** Token ***//
export const findAll = async (): Promise<Token[]> => {
    return tokens.sort((a, b) => b.id - a.id)
}

export const unassignedTokens = async (): Promise<Token[]> => {
    return tokens.filter(x => x.status === TokenStatus.New)
}

export const servingToken = async (): Promise<Token | null> => {
    const token = await tokens.find(x => x.status === TokenStatus.Inprogress)
    if (!token) {
        return null
    }
    return token
}

export const lastIssuedToken = async (): Promise<Token | null> => {
    const token = await tokens.sort((a, b) => b.id - a.id).find(x => x.status === TokenStatus.New)
    if (!token) {
        return null
    }
    return token
}

export const createToken = async (): Promise<Token> => {
    const newToken = new Token()
    newToken.id = tokens ? tokens.length + 1 : 1
    tokens.push(newToken)
    return newToken
}

export const updateTokenStatus = async (id: number): Promise<Token | null> => {
    const token = await tokens.find(x => x.id === id)
    if (!token) {
        return null
    }
    const counter = await counters.find(x => x.id === token.counterId)
    if (!counter) {
        return null
    }
    counter.isServing = false
    counter.tokenId = 0
    token.status = TokenStatus.Completed
    return token
}

export const deleteToken = async (id: number): Promise<null | void> => {
    const token = await tokens.find(x => x.id === id)
    if (!token) {
        return null
    }
    const counter = await counters.find(x => x.id === token.counterId)
    if (!counter) {
        return null
    }
    counter.isServing = false
    counter.tokenId = 0
    tokens = tokens.filter(x => x.id !== id)
}

export const assignToken = async (counterId: number): Promise<Token | null> => {
    const token = await tokens.sort((a, b) => a.id - b.id).find(x => x.status === TokenStatus.New)
    const counter = await counters.find(x => x.id === counterId)
    if (!token || !counter || counter.isServing) {
        return null;
    }
    tokens.forEach(x => x.isCurrent = false)
    token.isCurrent = true
    token.status = TokenStatus.Inprogress
    token.counterId = counterId

    counter.isServing = true
    counter.isActive = true
    counter.tokenId = token.id
    return token
}
// *** Token ***//

// *** Counter ***//
export const counterList = async (): Promise<Counter[]> => {
    return counters
}

export const counterInfo = async (counterId: number): Promise<Counter | null> => {
    const counter = await counters.find(x => x.id === counterId)
    if (!counter) {
        return null
    }
    return counter
}

export const updateCounterStatus = async (counterId: number): Promise<Counter | null> => {
    const counter = await counters.find(x => x.id === counterId)
    if (!counter) {
        return null
    }
    counter.isActive = !counter.isActive
    counter.isServing = false
    counter.tokenId = 0
    return counter
}
// *** Counter ***//