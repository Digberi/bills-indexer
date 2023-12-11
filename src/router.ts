import { Router } from 'express';
import { requestRouter } from './entities/request/request.routes';
import { nativePaymentProxyRouter } from './entities/native-payment-proxy/native-payment-proxy.routes';
import { erc20PaymentProxyRouter } from './entities/erc20-payment-proxy/erc20-payment-proxy.routes';

export const router = Router();

router.use('/request', requestRouter);
router.use('/native-payment-proxy', nativePaymentProxyRouter);
router.use('/erc20-payment-proxy', erc20PaymentProxyRouter);
