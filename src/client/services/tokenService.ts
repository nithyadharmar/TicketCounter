import axios, { AxiosResponse } from "axios"
import { Counter, Token } from '../models/token'
import 'regenerator-runtime/runtime'

const baseUrl: string = "https://nithya-hello-world.herokuapp.com/api/tokens"

//*** Token ***//
export const unassignedTokens = async (): Promise<AxiosResponse<Token[]>> => {
    try {
        const tokens: AxiosResponse<Token[]> = await axios.get(`${baseUrl}/unassignedTokens`)
        return tokens
    } catch (error) {
        throw new Error("API not found")
    }
}

export const servingToken = async (): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.get(`${baseUrl}/servingToken`)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}

export const lastIssuedToken = async (): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.get(`${baseUrl}/lastIssuedToken`)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}

export const createToken = async (): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.post(baseUrl)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}

export const updateTokenStatus = async (tokenId: number): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.put(`${baseUrl}/updateTokenStatus/${tokenId}`)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}

export const assignToken = async (counterId: number): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.put(`${baseUrl}/assignToken/${counterId}`)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}

export const deleteToken = async (tokenId: number): Promise<AxiosResponse<Token>> => {
    try {
        const token: AxiosResponse<Token> = await axios.delete(`${baseUrl}/${tokenId}`)
        return token
    } catch (error) {
        throw new Error("API not found")
    }
}
//*** Token ***//

//*** Counter ***//
export const counterList = async (): Promise<AxiosResponse<Token[]>> => {
    try {
        const tokens: AxiosResponse<Token[]> = await axios.get(`${baseUrl}/counterList`)
        return tokens
    } catch (error) {
        throw new Error("API not found")
    }
}

export const counterInfo = async (counterId: number): Promise<AxiosResponse<Counter>> => {
    try {
        const counter: AxiosResponse<Counter> = await axios.get(`${baseUrl}/counterInfo/${counterId}`)
        return counter
    } catch (error) {
        throw new Error("API not found")
    }
}

export const updateCounterStatus = async (counterId: number): Promise<AxiosResponse<Counter>> => {
    try {
        const counter: AxiosResponse<Counter> = await axios.put(`${baseUrl}/updateCounterStatus/${counterId}`)
        return counter
    } catch (error) {
        throw new Error("API not found")
    }
}
//*** Counter ***//
