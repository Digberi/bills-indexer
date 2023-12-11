import {
  ERC20_PAYMENT_PROXY_ADDRESS,
  NATIVE_PAYMENT_PROXY_ADDRESS,
  REQUEST_FACTORY_ADDRESS,
} from '../config/env';
import { provider } from '../config/const';
import RequestAbi from '../abi/Request.json';
import RequestFactoryAbi from '../abi/RequestFactory.json';
import ERC20PaymentProxyAbi from '../abi/ERC20PaymentProxy.json';
import NativePaymentProxyAbi from '../abi/NativePaymentProxy.json';
import { logger } from '../config/logger';
import { saveERC20PaymentProxyEvent } from '../entities/erc20-payment-proxy/erc20-payment-proxy.service';
import { ERC20PaymentProxyEventName } from '../entities/erc20-payment-proxy/erc20-payment-proxy.type';
import { NativePaymentProxyEventName } from '../entities/native-payment-proxy/native-payment-proxy.type';
import { saveNativePaymentProxyEvent } from '../entities/native-payment-proxy/native-payment-proxy.service';
import { saveRequestFactoryEvent } from '../entities/request-factory/request-factory.service';
import { RequestFactoryEventName } from '../entities/request-factory/request-factory.type';
import {
  saveRequestEvent,
  updateRequest,
} from '../entities/request/request.service';
import {
  RequestEventName,
  RequestState,
  RequestType,
} from '../entities/request/request.type';
import AsyncRetry from 'async-retry';
import { ethers } from 'ethers';

const retryOptions = { retries: 20, minTimeout: 1000, maxTimeout: 5000 };

export const initERC20PaymentProxyListener = () => {
  logger.info('Initialize ERC20PaymentProxy listener');
  const ERC20PaymentProxyContract = new ethers.Contract(
    ERC20_PAYMENT_PROXY_ADDRESS,
    ERC20PaymentProxyAbi,
    provider
  );

  ERC20PaymentProxyContract.on(
    'TransferWithReferenceExecuted',
    async (tokenAddress, from, to, value, referenceId) => {
      logger.info('Got ERC20PaymentProxy event: TransferWithReferenceExecuted');
      await AsyncRetry(async () => {
        await updateRequest(referenceId, {
          state: RequestState.Paid,
        });
        logger.info(`Updated Request state to paid for ${referenceId}`);

        await saveERC20PaymentProxyEvent({
          eventName: ERC20PaymentProxyEventName.TransferWithReferenceExecuted,
          from,
          referenceId,
          to,
          value: Number(value),
          tokenAddress,
        });
      }, retryOptions);
    }
  );
};

export const initNativePaymentProxyListener = () => {
  logger.info('Initialize NativePaymentProxy listener');

  const NativePaymentProxyContract = new ethers.Contract(
    NATIVE_PAYMENT_PROXY_ADDRESS,
    NativePaymentProxyAbi,
    provider
  );

  NativePaymentProxyContract.on(
    'TransferWithReferenceExecuted',
    async (from, to, value, referenceId) => {
      logger.info(
        'Got NativePaymentProxy event: TransferWithReferenceExecuted'
      );
      await AsyncRetry(async () => {
        await updateRequest(referenceId, {
          state: RequestState.Paid,
        });
        logger.info(`Updated Request state to paid for ${referenceId}`);

        await saveNativePaymentProxyEvent({
          eventName: NativePaymentProxyEventName.TransferWithReferenceExecuted,
          from,
          referenceId,
          to,
          value: Number(value),
        });
      }, retryOptions);
    }
  );
};

export const initRequestFactoryListener = () => {
  logger.info('Initialize RequestFactory listener');

  const RequestFactoryContract = new ethers.Contract(
    REQUEST_FACTORY_ADDRESS,
    RequestFactoryAbi,
    provider
  );

  RequestFactoryContract.on(
    'RequestDeployed',
    async (newRequest, requestType, ipfsHash, payer, payee, amount, event) => {
      logger.info('Got RequestFactory event: RequestDeployed');
      await AsyncRetry(async () => {
        const blockNumber = event.blockNumber;
        const logs = await provider.getLogs({
          address: newRequest,
          fromBlock: blockNumber,
          toBlock: blockNumber,
          topics: [
            ethers.utils.id(
              'RequestInitialized(string,string,address,address,address,uint256)'
            ),
          ],
        });

        if (logs) {
          logger.info('Got Request event: RequestInitialized');
          const iface = new ethers.utils.Interface(RequestAbi);
          for (const log of logs) {
            const decodedLog = iface.parseLog({
              data: log.data,
              topics: log.topics as string[],
            });

            if (!decodedLog) return;

            await saveRequestEvent({
              eventName: RequestEventName.RequestInitialized,
              address: newRequest,
              requestType: decodedLog.args[0] as RequestType,
              ipfsHash: decodedLog.args[1] as string,
              payer: decodedLog.args[2] as string,
              payee: decodedLog.args[3] as string,
              asset: decodedLog.args[4] as string,
              amount: Number(decodedLog.args[5]),
              state: RequestState.Unpaid,
            });
          }
        }

        await saveRequestFactoryEvent({
          eventName: RequestFactoryEventName.RequestDeployed,
          amount: Number(amount),
          ipfsHash,
          newRequest,
          payee,
          payer,
          requestType,
        });
        initRequestListeners(newRequest);
      }, retryOptions);
    }
  );
};

export const initRequestListeners = (address: string) => {
  logger.info(`Initialize Request listeners for ${address}`);

  const RequestContract = new ethers.Contract(address, RequestAbi, provider);
  RequestContract.on('RequestCreated', async (storageManager) => {
    logger.info('Got Request event: RequestCreated');
    await AsyncRetry(async () => {
      await saveRequestEvent({
        eventName: RequestEventName.RequestCreated,
        address,
        storageManager,
      });
    }, retryOptions);
  });
  RequestContract.on('RequestCancelled', async () => {
    logger.info('Got Request event: RequestCancelled');
    await AsyncRetry(async () => {
      await saveRequestEvent({
        eventName: RequestEventName.RequestCancelled,
        address,
      });
    }, retryOptions);
  });
  RequestContract.on('RequestAccepted', async () => {
    logger.info('Got Request event: RequestAccepted');
    await AsyncRetry(async () => {
      await saveRequestEvent({
        eventName: RequestEventName.RequestAccepted,
        address,
      });
    }, retryOptions);
  });
  RequestContract.on('RequestAmountEdited', async (amount) => {
    logger.info('Got Request event: RequestAmountEdited');
    await AsyncRetry(async () => {
      await saveRequestEvent({
        eventName: RequestEventName.RequestAmountEdited,
        address,
        amount: Number(amount),
      });
    }, retryOptions);
  });
};
