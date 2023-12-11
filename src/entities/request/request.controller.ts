import { Request, Response } from 'express';
import {
  findContractByAddress,
  findContractsByWalletAddress,
} from './request.service';
import { RequestInitializedEvent } from './request.type';

export const checkDeployementController = async (
  req: Request,
  res: Response
) => {
  try {
    const contractAddress = req.params.contractAddress;
    if (!contractAddress) {
      return res.status(400).json({ error: 'missing required fields' });
    }

    const deployedContract = await findContractByAddress(contractAddress);

    if (!deployedContract) {
      return res.status(200).json({ isDeployed: false });
    } else {
      return res.status(200).json({ isDeployed: true, data: deployedContract });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getContractsController = async (req: Request, res: Response) => {
  try {
    const walletAddress = req.params.walletAddress;

    if (!walletAddress) {
      return res.status(400).json({ error: 'missing required fields' });
    }

    const contracts = await findContractsByWalletAddress(walletAddress);

    return res.status(200).json({ contracts });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
