import { Request, Response } from "express";
import * as controller from "../controllers/tokenController";
import { Token, Counter } from "../models/token";

// *** Token ***//
export const findAll = async (req: Request, res: Response) => {
    try {
        const tokens: Token[] | null = await controller.findAll()
        res.status(200).send(tokens)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const unassignedTokens = async (req: Request, res: Response) => {
    try {
        const tokens: Token[] | null = await controller.unassignedTokens()
        res.status(200).send(tokens)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const servingToken = async (req: Request, res: Response) => {
    try {
        const token: Token | null = await controller.servingToken()
        res.status(200).send(token)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const lastIssuedToken = async (req: Request, res: Response) => {
    try {
        const token: Token | null = await controller.lastIssuedToken()
        res.status(200).send(token)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const createToken = async (req: Request, res: Response) => {
    try {
        const newToken = await controller.createToken()
        res.status(201).json(newToken)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const updateTokenStatus = async (req: Request, res: Response) => {
    try {
        const tokenId: number = parseInt(req.params.tokenId, 0)
        const token = await controller.updateTokenStatus(tokenId)
        res.status(201).json(token)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const assignToken = async (req: Request, res: Response) => {
    try {
        const counterId: number = parseInt(req.params.counterId, 0)
        const counterInfo = await controller.counterInfo(counterId)
        if (!counterInfo || counterInfo.isServing) {
            res.status(500).send("Counter is serving");
        }
        const assignedToken = await controller.assignToken(counterId)
        return res.status(200).json(assignedToken)
    } catch (e) {
        res.status(500).send(e.message);
    }
}

export const deleteToken = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 0)
        const completedToken = await controller.deleteToken(id)
        return res.status(200).json(completedToken)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
// *** Token ***//

// *** Counter ***//
export const counterList = async (req: Request, res: Response) => {
    try {
        const counters: Counter[] = await controller.counterList()
        res.status(200).send(counters)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const counterInfo = async (req: Request, res: Response) => {
    try {
        const counterId: number = parseInt(req.params.counterId, 0)
        const counter = await controller.counterInfo(counterId)
        res.status(200).send(counter)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const updateCounterStatus = async (req: Request, res: Response) => {
    try {
        const counterId: number = parseInt(req.params.counterId, 0)
        const counterInfo = await controller.counterInfo(counterId)
        if (!counterInfo || (counterInfo.isServing && counterInfo.isActive)) {
            res.status(500).send("Counter is serving");
        }
        const offlineCounter = await controller.updateCounterStatus(counterId)
        return res.status(200).json(offlineCounter)
    } catch (e) {
        res.status(500).send(e.message);
    }
}
// *** Counter ***//