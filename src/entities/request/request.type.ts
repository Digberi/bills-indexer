export enum RequestEventName {
  RequestCreated = 'RequestCreated',
  RequestCancelled = 'RequestCancelled',
  RequestAccepted = 'RequestAccepted',
  RequestAmountEdited = 'RequestAmountEdited',
  RequestInitialized = 'RequestInitialized',
}

export enum RequestState {
  Paid = 'paid',
  Unpaid = 'unpaid',
}

export enum RequestType {
  Bill = 'bill',
  Invoice = 'invoice',
  Receipt = 'receipt',
  Refund = 'refund',
}

export interface Request {
  eventName: RequestEventName;
  address: string;
  state?: RequestState;
}

export interface RequestCreatedEvent extends Request {
  eventName: RequestEventName.RequestCreated;
  storageManager: string;
}

export interface RequestCancelledEvent extends Request {
  eventName: RequestEventName.RequestCancelled;
}

export interface RequestAcceptedEvent extends Request {
  eventName: RequestEventName.RequestAccepted;
}

export interface RequestAmountEditedEvent extends Request {
  eventName: RequestEventName.RequestAmountEdited;
  amount: number;
}

export interface RequestInitializedEvent extends Request {
  eventName: RequestEventName.RequestInitialized;
  requestType: RequestType;
  ipfsHash: string;
  payer: string;
  payee: string;
  asset: string;
  amount: number;
}

export type AllRequestEvents =
  | RequestCreatedEvent
  | RequestCancelledEvent
  | RequestAcceptedEvent
  | RequestAmountEditedEvent
  | RequestInitializedEvent;
