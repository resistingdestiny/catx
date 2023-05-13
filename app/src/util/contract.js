import { ethers } from "ethers";

const contractAddresses = {
	goerli: "",
	mantle: "",
	scroll: "",
	polygon: "",
  };
  
  



const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.gateway.tenderly.co/3Ugz1n4IRjoidr766XDDxX"
);

const rpc_url = 'https://goerli.gateway.tenderly.co/3Ugz1n4IRjoidr766XDDxX';
const polygon_rpc_url = 'https://polygon.llamarpc.com';

const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "holder",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "typeHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "paymentFrequency",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "size",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "underlying",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "statement",
              "type": "string"
            },
            {
              "internalType": "uint256[]",
              "name": "category",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "premiums",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct ICat.Policy",
          "name": "",
          "type": "tuple"
        }
      ],
      "name": "createPolicy",
      "outputs": [
        {
          "internalType": "address",
          "name": "policy",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


const contract = new ethers.Contract('0x5B1F146caAAD62C4EE1fC9F29d9414B6Ed530Ac6', abi, provider);



export { abi, contractAddresses, rpc_url, polygon_rpc_url, contract};
