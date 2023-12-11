import mongoose from 'mongoose';
import {
  NativePaymentProxy,
  NativePaymentProxyEventName,
} from './native-payment-proxy.type';

const NativePaymentProxySchema = new mongoose.Schema<NativePaymentProxy>({
  value: {
    type: Number,
    required: true,
  },
  eventName: {
    type: String,
    enum: NativePaymentProxyEventName,
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

export const NativePaymentProxyModel = mongoose.model<NativePaymentProxy>(
  'NativePaymentProxy',
  NativePaymentProxySchema
);
