// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

interface ICat {
    struct Policy {
        // tried to pack a bit efficiently:
        address holder; // address of policy holder (deployer)
        uint8 premium; //premium in Basis PointS
        uint4 category; // category of catastrophe e.g (hurricane) category 3
        bool settled; // is the policy active?
        bytes32 typeHash; // hash of type of catastrophe e.g hurricane
        uint paymentFrequency; // payment frequency in seconds
        uint size; //number of collateral tokens required in policy
        address underlying; // address of collateral token
        string statement; // UMA text statement
    }

    function reserves(uint) external view returns (uint);

    function reservesPerShare(uint) external view returns (uint);

    function getPolicy() external view returns (Policy);

    function payPremium(uint) external; // allows policy holder to pay premium

    function getPremiumAccountBalance() external view returns (uint); // allows policy holder to see current credits

    // issue insurance will be ERC4626 'deposit' (or similar)

    function requestPayout() external returns (bytes32); // XREF UMA

    function assertionResolvedCallback(bytes32, bool) external; // XREF UMA
}
