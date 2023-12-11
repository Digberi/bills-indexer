import { RequestType } from '../request/request.type';

export enum NativePaymentProxyEventName {
  TransferWithReferenceExecuted = 'TransferWithReferenceExecuted',
}

export interface NativePaymentProxy {
  eventName: NativePaymentProxyEventName;
  from: string;
  to: RequestType;
  value: number;
  referenceId: string;
}
