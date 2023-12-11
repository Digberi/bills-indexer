# README

## EVM-Pay-that-bill backend

This repository hosts the backend code for an application designed to create and manage invoices on the Ripple EVM sidechain. The primary function of this backend is to index events from blockchain contracts related to invoice requests, store these events in a database, and make them accessible to the frontend through a REST API.

### Technology Stack

- **Programming Language**: TypeScript
- **Backend Framework**: Express.js
- **Blockchain Interaction**: Ethers.js, with a focus on event tracking methods
- **Database**: MongoDB

### Key Features

The backend is responsible for indexing blockchain events related to invoice requests, storing these events in MongoDB, and distributing the data to the frontend via a REST API.


### Brief API Reference

#### API Endpoints

1. **Check Contract Deployment**
   - Endpoint: `/api/request/check-deployment/:contractAddress`
   - Method: GET
   - Params: `contractAddress` (String)
   - Responses:
     - Success (200): 
       - Contract deployed: `{ isDeployed: true, data: deployedContract }`
       - Contract not deployed: `{ isDeployed: false }`
     - Error (400): `{ error: 'missing required fields' }`

2. **Get Contracts by Wallet Address**
   - Endpoint: `/api/request/get-contracts/:walletAddress`
   - Method: GET
   - Params: `walletAddress` (String)
   - Responses:
     - Success (200): `{ contracts: [contract1, contract2, ...] }`
     - Error (400): `{ error: 'missing required fields' }`

3. **Check Payment Status of a Contract**
   - Endpoint: `/api/request/payment-status/:contractAddress`
   - Method: GET
   - Params: `contractAddress` (String)
   - Responses:
     - Success (200):
       - Paid: `{ isPayed: true, amount: paymentAmount }`
       - Not Paid: `{ isPayed: false }`
     - Error (400): `{ error: 'missing required fields' }`

4. **Check Payment Status via Native or ERC20 Payment Proxy**
   - Endpoints:
     - `/api/native-payment-proxy/payment-status/:contractAddress`
     - `/api/erc20-payment-proxy/payment-status/:contractAddress`
   - Method: GET
   - Params: `contractAddress` (String)
   - Responses:
     - Success (200):
       - Paid: `{ isPayed: true, data: [paymentDetails] }`
       - Not Paid: `{ isPayed: false, data: [] }`
     - Error (400): `{ error: 'missing required fields' }`

### Future Plans

In future iterations, we plan to explore and potentially integrate Subquid or Ponder for more efficient blockchain event indexing.

### License

This project is licensed under the [MIT License](LICENSE).
