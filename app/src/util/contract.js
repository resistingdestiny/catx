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

const rpc_url = 'https://goerli.gateway.tenderly.co/6C0B5upNFXEumeI9cjBqXm';
const polygon_rpc_url = 'https://polygon.llamarpc.com';

const abi = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nonce","type":"uint256"},{"indexed":true,"internalType":"address","name":"policy","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"holder","type":"address"},{"internalType":"bytes32","name":"typeHash","type":"bytes32"},{"internalType":"uint256","name":"paymentFrequency","type":"uint256"},{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"address","name":"underlying","type":"address"},{"internalType":"string","name":"statement","type":"string"},{"internalType":"uint256[]","name":"category","type":"uint256[]"},{"internalType":"uint256[]","name":"premiums","type":"uint256[]"},{"components":[{"internalType":"string[]","name":"whatThreeWords","type":"string[]"},{"internalType":"uint256","name":"radius","type":"uint256"}],"internalType":"struct ICat.Loc[]","name":"location","type":"tuple[]"}],"indexed":true,"internalType":"struct ICat.Policy","name":"policyStruct","type":"tuple"}],"name":"NewPolicy","type":"event"},{"inputs":[],"name":"CAT_SINGLETON","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"holder","type":"address"},{"internalType":"bytes32","name":"typeHash","type":"bytes32"},{"internalType":"uint256","name":"paymentFrequency","type":"uint256"},{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"address","name":"underlying","type":"address"},{"internalType":"string","name":"statement","type":"string"},{"internalType":"uint256[]","name":"category","type":"uint256[]"},{"internalType":"uint256[]","name":"premiums","type":"uint256[]"},{"components":[{"internalType":"string[]","name":"whatThreeWords","type":"string[]"},{"internalType":"uint256","name":"radius","type":"uint256"}],"internalType":"struct ICat.Loc[]","name":"location","type":"tuple[]"}],"internalType":"struct ICat.Policy","name":"policyStruct","type":"tuple"}],"name":"createPolicy","outputs":[{"internalType":"address","name":"policy","type":"address"}],"stateMutability":"nonpayable","type":"function"}]

  const abiContract = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "name": "TransferBatch",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "TransferSingle",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "value",
              "type": "string"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "URI",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "POLICY",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "filecoinCID",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "expiry",
                  "type": "uint256"
                },
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
                  "components": [
                    {
                      "internalType": "string[]",
                      "name": "whatThreeWords",
                      "type": "string[]"
                    },
                    {
                      "internalType": "uint256",
                      "name": "radius",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct ICat.Location",
                  "name": "location",
                  "type": "tuple"
                },
                {
                  "internalType": "uint256[3]",
                  "name": "category",
                  "type": "uint256[3]"
                },
                {
                  "internalType": "uint256[3]",
                  "name": "premiums",
                  "type": "uint256[3]"
                }
              ],
              "internalType": "struct ICat.Policy",
              "name": "policy",
              "type": "tuple"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            },
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "name": "assertionResolvedCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "accounts",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            }
          ],
          "name": "balanceOfBatch",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "catInitialized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_category",
              "type": "uint256"
            }
          ],
          "name": "categoryReserves",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "_categoryReserves",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "exists",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "filled",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getPremiumAccountBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initializeCat",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initializePolicy",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initialized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lastPremiumPaymentTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "name": "onERC1155BatchReceived",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "name": "onERC1155Received",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "payPremium",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "premiumAccountBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "requestPayout",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "reserves",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "category",
              "type": "uint256"
            }
          ],
          "name": "reservesPerShare",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "rps",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeBatchTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "settled",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalReserves",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "uri",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
  ]

const contract = new ethers.Contract('0x64318f50569d490B4382d23cb2239F851Ba4d984', abi, provider);



export { abi, contractAddresses, rpc_url, polygon_rpc_url, contract, abiContract};
