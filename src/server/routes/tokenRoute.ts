import express from "express";
import * as tokenService from "../services/tokenService";

export const tokensRouter = express.Router();

// *** Token ***//
tokensRouter.get("/findAll", tokenService.findAll);
tokensRouter.get("/unassignedTokens", tokenService.unassignedTokens);
tokensRouter.get("/servingToken", tokenService.servingToken);
tokensRouter.get("/lastIssuedToken", tokenService.lastIssuedToken);
tokensRouter.post("/", tokenService.createToken);
tokensRouter.put("/updateTokenStatus/:tokenId", tokenService.updateTokenStatus);
tokensRouter.put("/assignToken/:counterId", tokenService.assignToken);
tokensRouter.delete("/:tokenId", tokenService.deleteToken);

// *** Counter ***//
tokensRouter.get("/counterList", tokenService.counterList);
tokensRouter.get("/counterInfo/:counterId", tokenService.counterInfo);
tokensRouter.put('/updateCounterStatus/:counterId', tokenService.updateCounterStatus);