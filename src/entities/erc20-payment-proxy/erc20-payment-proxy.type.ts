import { RequestType } from '../request/request.type';

export enum ERC20PaymentProxyEventName {
  TransferWithReferenceExecuted = 'TransferWithReferenceExecuted',
}

export interface ERC20PaymentProxy {
  eventName: ERC20PaymentProxyEventName;
  tokenAddress: string;
  from: string;
  to: RequestType;
  value: number;
  referenceId: string;
}
