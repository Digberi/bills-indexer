import mongoose from 'mongoose';
import {
  RequestFactory,
  RequestFactoryEventName,
} from './request-factory.type';
import { RequestType } from '../request/request.type';

const RequestFactorySchema = new mongoose.Schema<RequestFactory>({
  amount: {
    type: Number,
    required: true,
  },
  eventName: {
    type: String,
    enum: RequestFactoryEventName,
    required: true,
  },
  requestType: {
    type: String,
    enum: RequestType,
    required: true,
  },
  ipfsHash: {
    type: String,
    required: true,
  },
  newRequest: {
    type: String,
    required: true,
  },
  payee: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
});

export const RequestFactoryModel = mongoose.model<RequestFactory>(
  'RequestFactory',
  RequestFactorySchema
);
