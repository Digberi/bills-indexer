import { getAllRequests } from '../entities/request/request.service';
import { delay } from '../utils/delay';
import {
  initERC20PaymentProxyListener,
  initNativePaymentProxyListener,
  initRequestFactoryListener,
  initRequestListeners,
} from './listeners';

export const startIndexer = async () => {
  initRequestFactoryListener();
  initNativePaymentProxyListener();
  initERC20PaymentProxyListener();

  const requestContracts = await getAllRequests();
  for (const request of requestContracts) {
    await delay(1000);
    initRequestListeners(request.address);
  }
};
