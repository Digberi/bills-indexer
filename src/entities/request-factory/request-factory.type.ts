import { RequestType } from '../request/request.type';

export enum RequestFactoryEventName {
  RequestDeployed = 'RequestDeployed',
}

export interface RequestFactory {
  eventName: RequestFactoryEventName;
  newRequest: string;
  requestType: RequestType;
  ipfsHash: string;
  payer: string;
  payee: string;
  amount: number;
}
