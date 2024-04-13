# Jetton Minter

This project is based on [minter-contract](https://github.com/ton-blockchain/minter-contract) and is a re-implementation of said contracts using Blueprint and latest versions of TON SDK.

-   JettonMinter:

    -   [x] Contracts migrated
    -   [x] Wrapper re-implemented
    -   [x] Functional deploy script
    -   [ ] Test cases

-   JettonWallet:
    -   [x] Contracts migrated
    -   [x] Wrapper re-implemented
    -   [ ] Scripts
    -   [ ] Test cases

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
