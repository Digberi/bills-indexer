import mongoose from 'mongoose';
import {
  ERC20PaymentProxy,
  ERC20PaymentProxyEventName,
} from './erc20-payment-proxy.type';

const ERC20PaymentProxySchema = new mongoose.Schema<ERC20PaymentProxy>({
  value: {
    type: Number,
    required: true,
  },
  tokenAddress: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    enum: ERC20PaymentProxyEventName,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  referenceId: {
    type: String,
    required: true,
  },
});

export const ERC20PaymentProxyModel = mongoose.model<ERC20PaymentProxy>(
  'ERC20PaymentProxy',
  ERC20PaymentProxySchema
);
