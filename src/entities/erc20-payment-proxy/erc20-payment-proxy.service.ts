import { ERC20PaymentProxyModel } from './erc20-payment-proxy.model';
import { ERC20PaymentProxy } from './erc20-payment-proxy.type';

export const saveERC20PaymentProxyEvent = async (event: ERC20PaymentProxy) =>
  await ERC20PaymentProxyModel.create(event);

export const findContractsByReferenceId = async (referenceId: string) =>
  await ERC20PaymentProxyModel.find({
    referenceId,
  });
