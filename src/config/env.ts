import dotenv from 'dotenv';
import { getEnv } from '../utils/get-env';
dotenv.config();

export const PORT = getEnv('PORT');
export const MONGO_URL = getEnv('MONGO_URL');
export const REQUEST_FACTORY_ADDRESS = getEnv('REQUEST_FACTORY_ADDRESS');
export const NATIVE_PAYMENT_PROXY_ADDRESS = getEnv(
  'NATIVE_PAYMENT_PROXY_ADDRESS'
);
export const ERC20_PAYMENT_PROXY_ADDRESS = getEnv(
  'ERC20_PAYMENT_PROXY_ADDRESS'
);
export const RIPPLE_RPC_URL = getEnv('RIPPLE_RPC_URL');
export const CURRENT_CHAIN = getEnv('CURRENT_CHAIN');
export const ALCHEMY_API_KEY = getEnv('ALCHEMY_API_KEY');
export const ALCHEMY_RPC_URL = getEnv('ALCHEMY_RPC_URL');
