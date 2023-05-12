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
const abi = []
const rpc_url = 'https://goerli.gateway.tenderly.co/3Ugz1n4IRjoidr766XDDxX';
const polygon_rpc_url = 'https://polygon.llamarpc.com';




//const contract = new ethers.Contract(contractAddress, contractABI, provider);



export { abi, contractAddresses, rpc_url, polygon_rpc_url};
