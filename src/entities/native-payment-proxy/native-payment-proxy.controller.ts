import { Request, Response } from 'express';
import { findContractsByReferenceId } from './native-payment-proxy.service';

export const paymentStatusController = async (req: Request, res: Response) => {
  try {
    const contractAddress = req.params.contractAddress;

    if (!contractAddress) {
      return res.status(400).json({ error: 'missing required fields' });
    }

    const desiredContracts = await findContractsByReferenceId(contractAddress);

    if (!desiredContracts || desiredContracts.length === 0) {
      return res.status(200).json({ isPayed: false, data: desiredContracts });
    } else {
      return res.status(200).json({ isPayed: true, data: desiredContracts });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
