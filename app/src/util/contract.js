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
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"nonce","type":"uint256"},{"indexed":true,"internalType":"address","name":"policy","type":"address"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"holder","type":"address"},{"internalType":"bytes32","name":"typeHash","type":"bytes32"},{"internalType":"uint256","name":"paymentFrequency","type":"uint256"},{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"address","name":"underlying","type":"address"},{"internalType":"string","name":"statement","type":"string"},{"internalType":"uint256[]","name":"category","type":"uint256[]"},{"internalType":"uint256[]","name":"premiums","type":"uint256[]"},{"components":[{"internalType":"string[]","name":"whatThreeWords","type":"string[]"},{"internalType":"uint256","name":"radius","type":"uint256"}],"internalType":"struct ICat.Loc[]","name":"location","type":"tuple[]"}],"indexed":true,"internalType":"struct ICat.Policy","name":"policyStruct","type":"tuple"}],"name":"NewPolicy","type":"event"},{"inputs":[],"name":"CAT_SINGLETON","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"holder","type":"address"},{"internalType":"bytes32","name":"typeHash","type":"bytes32"},{"internalType":"uint256","name":"paymentFrequency","type":"uint256"},{"internalType":"uint256","name":"size","type":"uint256"},{"internalType":"address","name":"underlying","type":"address"},{"internalType":"string","name":"statement","type":"string"},{"internalType":"uint256[]","name":"category","type":"uint256[]"},{"internalType":"uint256[]","name":"premiums","type":"uint256[]"},{"components":[{"internalType":"string[]","name":"whatThreeWords","type":"string[]"},{"internalType":"uint256","name":"radius","type":"uint256"}],"internalType":"struct ICat.Loc[]","name":"location","type":"tuple[]"}],"internalType":"struct ICat.Policy","name":"policyStruct","type":"tuple"}],"name":"createPolicy","outputs":[{"internalType":"address","name":"policy","type":"address"}],"stateMutability":"nonpayable","type":"function"}]


const contract = new ethers.Contract('0x64318f50569d490B4382d23cb2239F851Ba4d984', abi, provider);



export { abi, contractAddresses, rpc_url, polygon_rpc_url, contract};
