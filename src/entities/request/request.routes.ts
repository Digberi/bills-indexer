import { Router } from 'express';
import {
  checkDeployementController,
  getContractsController,
} from './request.controller';

export const requestRouter = Router();

requestRouter.get(
  '/check-deployment/:contractAddress',
  checkDeployementController
);
requestRouter.get('/get-contracts/:walletAddress', getContractsController);
