import { ethers } from 'ethers';
import {
  ALCHEMY_API_KEY,
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  RIPPLE_RPC_URL,
} from './env';

const RPC =
  CURRENT_CHAIN.trim() === 'goerli'
    ? `${ALCHEMY_RPC_URL}/${ALCHEMY_API_KEY}`
    : RIPPLE_RPC_URL;

export const provider = new ethers.providers.JsonRpcProvider(RPC);
