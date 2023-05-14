# Welcome to the Cat Revolution

CatX brings catastrophe bonds on-chain for the first time, allowing anyone to earn an uncorrelated yield while helping to share the burden of natural catastrophes. Issuers can get protection from the costs of hurricanes, wildfires, cyber-attacks and more while paying premiums to the bonds. Bond investors can invest in, trade the bonds and earn yield. All invested capital will be able to earn a yield through GHO/Aave, and payments are triggered automatically through UMA's optimistic oracle service. TradFi catastrophe bonds are virtually illiquid, require 250k minimum investments and are not available to retail investors. CatX's mission is to reduce the friction and barrier to this new asset class that has the potential to also help make our world safer.

## How it's Made
The CatX contracts utilise the following primary technologies: ERC-3448 (Metaproxy), ERC-1155 (Multi Token Standard), and UMA’s Optimistic Oracle V3 (natural language statement oracle). The ERC-3448 metaproxy underpins the factory contract for the protocol and allows the abstract CatX insurance contract to be reused, with unique policies deployed as separate contracts with distinct metadata at significantly reduced gas cost. The ERC-1155 multi token standard was chosen since it best suited the requirements of multiple insurance bond types linked to a distinct insurance policy. This enables the creation of three distinct bond tokens linked to an insurance policy that can be freely traded without the gas overhead of deploying distinct ERC-20 contracts. It also allows for streamlined transfer of multiple bond purchases for investors and their secure transfer. UMA’s Optimistic Oracle V3 is the most important aspect of the protocol as it allows CatX to create a natural language statement of a claim on policies which can be verified, and if successful a claim paid out. The minimalist implementation of the metaproxy has other applications in implementing this EIP since current examples are scarce or overly complex and distract from its elegance. The underlying asset that people are able to stake is GHO through Aave. The front-end is built in Next.js. All bond contracts are stored for audit purposes on Filecoin.


## Key Integrations and Deployments

Cross-Chain support is key to our mission of bringing bonds to all. Our vision is to help catalyse the multi-chain oracle ecosystem by developing adapter contracts and deploying optimistic oracle contracts where we can. Making a liquid market will require us to support whatever network, currency or token our users want to protect themselves with, and we want to enable that choice. 

### Aave/GHO
GHO is the central underlying token used for premium payments and investing. By default, all bonds are issued with a GHO underlying, investors can then stake GHO to invest in bonds. 

### UMA
UMA’s Optimistic Oracle V3 is the most important aspect of the protocol as it allows CatX to create a natural language statement of a claim on policies that can be verified, and if successful a claim paid out. Deployment of UMA v3 oracles across non-supported chains. 

Deployed Uma oracle contract in addition to our two core smart contracts (cat factory and cat) to benefit from speed and performance of Mantle network 

### Scroll
All core contracts deployed on Scroll (CatFactory - 0xA109E6aea9515f609d1Eb366ED97BD3239aE3723, Cat - 0xaE3f54371E58768305f1145B4231B519C02603A1). Deployment of V3 UMA optimistic oracle contracts to Scroll to enable key functionality required by app. 

### Mantle
Deployed Uma oracle contract in addition to our two core smart contracts (cat factory and cat) to benefit from speed and performance of Mantle network.
Cat Factory: 0xA109E6aea9515f609d1Eb366ED97BD3239aE3723 and Cat: 0xaE3f54371E58768305f1145B4231B519C02603A1

### Gnosis
We have two core smart contracts deployed on Gnosis, CatFactory (linked below) and Cat (https://gnosisscan.io/address/0xae3f54371e58768305f1145b4231b519c02603a1) integrated with existing UMA v3 deployment on Gnosis. 

### Filecoin
All newly created bonds have core information deployed to Filecoin Virtual machine with the CID stored in the policy information in the contract for audit and accountability. 

### Linea
Linea deployed factory at: 0xA109E6aea9515f609d1Eb366ED97BD3239aE3723
Linea deployed cat at: 0xaE3f54371E58768305f1145B4231B519C02603A1

### Optimism 
We have deployed our core smart contracts to Optimism. In addition we have also deployed the necessary UMA v3 contracts to optimism for the first time for optimistic oracle verification. 
https://goerli-optimism.etherscan.io/address/0x86451f26ba422BB1c68aEa4D3BAE849362655479
### Polygon
We have deployed smart contracts to Polygon to benefit from speed and low fees of Polygon network when interacting and investing bonds.
https://polygonscan.com/address/0xae3f54371e58768305f1145b4231b519c02603a1

### Neon
We have deployed to Neon, with a proxy oracle contract initially but would look to integrate with oracles as they become available. 
https://neonscan.org/address/0xA109E6aea9515f609d1Eb366ED97BD3239aE3723


