import { Router } from 'express';
import { paymentStatusController } from './native-payment-proxy.controller';

export const nativePaymentProxyRouter = Router();

nativePaymentProxyRouter.get(
  '/payment-status/:contractAddress',
  paymentStatusController
);
