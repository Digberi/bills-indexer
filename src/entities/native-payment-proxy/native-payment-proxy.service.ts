import { NativePaymentProxyModel } from './native-payment-proxy.model';
import { NativePaymentProxy } from './native-payment-proxy.type';

export const saveNativePaymentProxyEvent = async (event: NativePaymentProxy) =>
  await NativePaymentProxyModel.create(event);

export const findContractsByReferenceId = async (referenceId: string) =>
  await NativePaymentProxyModel.find({
    referenceId,
  });
