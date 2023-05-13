// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

interface ICat {
    // Ideally should contain immutable data only (removed settled for this reason)
    struct Policy {
        string name;
        string filecoinCID;
        uint expiry; // unix timestamp of bond expiry
        address holder; // address of policy holder (deployer)
        bytes32 typeHash; // hash of type of catastrophe e.g hurricane
        uint paymentFrequency; // payment frequency in seconds
        uint size; //number of collateral tokens required in policy (to nearest integer, no decimals)
        address underlying; // address of collateral token
        string statement; // UMA text statement
        Location location;
        uint[3] category; // category of catastrophe e.g (hurricane) category 3
        uint[3] premiums; // set of three premiums (one for each tier)
    }

    struct Location {
        string[] whatThreeWords;
        uint radius;
    }

    function initializePolicy() external returns (bool);

    function settled() external view returns (bool);

    function totalReserves() external view returns (uint);

    function categoryReserves(uint) external view returns (uint);

    function reservesPerShare(uint) external view returns (uint);

    function POLICY() external view returns (Policy memory);

    function payPremium(uint) external; // allows policy holder to pay premium

    function getPremiumAccountBalance() external view returns (uint); // allows policy holder to see current credits

    // issue insurance will be ERC4626 'deposit' (or similar)

    function requestPayout() external returns (bytes32); // XREF UMA

    function assertionResolvedCallback(bytes32, bool) external; // XREF UMA
}
