// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import {OptimisticOracleV3CallbackRecipientInterface as ooRecipient} from "./OptimisticOracleV3CallbackRecipientInterface.sol";

interface ICat is ooRecipient {
    function BPS() external returns (uint);

    function year() external returns (uint);

    function CLASS_A() external returns (uint);

    function CLASS_B() external returns (uint);

    function CLASS_C() external returns (uint);

    function factory() external returns (address);

    function settled() external returns (bool);

    function initialized() external returns (bool);

    function catInitialized() external returns (bool);

    function reserves(uint) external returns (uint);

    function premiumDecay() external returns (uint);

    function premiumAccountBalance() external returns (uint);

    function lastPremiumPaymentTime() external returns (uint);

    function rateSum() external returns (uint);

    // ========== Events ==========

    event Invest(address indexed sender, address indexed receiver, uint[3] indexed amounts);

    event Refund(address indexed sender, address indexed receiver, uint[3] indexed amounts);

    event CatInitialized();

    event Claim(string catType, uint payout);


    // Ideally should contain immutable data only (removed settled for this reason)
    struct Policy {
        string name;
        string filecoinCID;
        uint expiry; // unix timestamp of bond expiry
        address holder; // address of policy holder (deployer)
        string catType; // hash of type of catastrophe e.g hurricane
        uint paymentFrequency; // payment frequency in seconds
        uint size; //number of collateral tokens required in policy (to nearest integer, no decimals)
        address underlying; // address of collateral token
        string statement; // UMA text statement
        string whatThreeWords;
        string radius;
        string[3] category; // category of catastrophe e.g (hurricane) category 3
        uint[3] premiums; // set of three premiums (one for each tier)
    }

    function initializePolicy() external returns (bool);

    function invest(address, uint[3] calldata) external;

    function refund(address, uint[3] calldata) external;

    function initializeCat(uint) external;

    function totalReserves() external view returns (uint);

    function reservesPerShare(uint) external view returns (uint);

    function POLICY() external view returns (Policy memory);

    function payPremium(uint) external; // allows policy holder to pay premium

    function getPremiumAccountBalance() external view returns (uint); // allows policy holder to see current credits

    // issue insurance will be ERC4626 'deposit' (or similar)

    function requestPayout() external returns (bytes32); // XREF UMA

    function withdraw(address) external;
}
