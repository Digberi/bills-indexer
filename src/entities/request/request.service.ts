import { RequestModel } from './request.model';
import { AllRequestEvents, RequestEventName } from './request.type';

export const saveRequestEvent = async (event: AllRequestEvents) =>
  await RequestModel.create(event);

export const updateRequest = async (
  address: string,
  propsToUpdate: Partial<AllRequestEvents>
) =>
  await RequestModel.findOneAndUpdate(
    { address },
    {
      $set: propsToUpdate,
    },
    {
      new: true,
    }
  );

export const findContractByAddress = async (address: string) =>
  await RequestModel.findOne({
    eventName: RequestEventName.RequestInitialized,
    address,
  });

export const findContractsByWalletAddress = async (userAddress: string) =>
  await RequestModel.find({
    eventName: RequestEventName.RequestInitialized,
    $or: [{ payee: userAddress }, { payer: userAddress }],
  });

export const getAllRequests = async () => await RequestModel.find();
