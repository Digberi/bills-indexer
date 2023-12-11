import mongoose, { Schema } from 'mongoose';
import {
  RequestEventName,
  RequestCreatedEvent,
  RequestCancelledEvent,
  RequestAcceptedEvent,
  RequestAmountEditedEvent,
  RequestInitializedEvent,
  AllRequestEvents,
  RequestType,
  RequestState,
} from './request.type';

// Define a base schema with common properties
const BaseRequestSchema = new mongoose.Schema<AllRequestEvents>(
  {
    eventName: {
      type: String,
      enum: RequestEventName,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: RequestState,
      required: true,
    },
  },
  {
    discriminatorKey: 'eventName',
  }
);

const RequestCreatedSchema = new mongoose.Schema<RequestCreatedEvent>({
  storageManager: {
    type: String,
    required: true,
  },
});

const RequestCancelledSchema = new mongoose.Schema<RequestCancelledEvent>({});

const RequestAcceptedSchema = new mongoose.Schema<RequestAcceptedEvent>({});

const RequestAmountEditedSchema = new mongoose.Schema<RequestAmountEditedEvent>(
  {
    amount: {
      type: Number,
      required: true,
    },
  }
);

const RequestInitializedSchema = new mongoose.Schema<RequestInitializedEvent>({
  requestType: {
    type: String,
    enum: RequestType,
    required: true,
  },
  ipfsHash: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
  payee: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const RequestModel = mongoose.model<AllRequestEvents>(
  'Request',
  BaseRequestSchema
);

RequestModel.discriminator(
  RequestEventName.RequestCreated,
  RequestCreatedSchema
);
RequestModel.discriminator(
  RequestEventName.RequestCancelled,
  RequestCancelledSchema
);
RequestModel.discriminator(
  RequestEventName.RequestAccepted,
  RequestAcceptedSchema
);
RequestModel.discriminator(
  RequestEventName.RequestAmountEdited,
  RequestAmountEditedSchema
);
RequestModel.discriminator(
  RequestEventName.RequestInitialized,
  RequestInitializedSchema
);
