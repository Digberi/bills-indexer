import { Router } from 'express';
import { paymentStatusController } from './erc20-payment-proxy.controller';

export const erc20PaymentProxyRouter = Router();

erc20PaymentProxyRouter.get(
  '/payment-status/:contractAddress',
  paymentStatusController
);
