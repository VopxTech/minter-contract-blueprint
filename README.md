# Jetton Minter

[READ THIS BEFORE PROCEEDING](https://github.com/ton-blockchain/minter-contract?tab=readme-ov-file#protect-yourself-and-your-users)

This project is based on [minter-contract](https://github.com/ton-blockchain/minter-contract) + [token-contract](https://github.com/ton-blockchain/token-contract) and acts as a re-implementation of said contracts using Blueprint and latest versions of TON SDK.

-   JettonMinter:

    -   [x] Contracts migrated
    -   [x] Wrapper re-implemented
        -   [x] Deployer
        -   [x] Minter
        -   [x] Burner
    -   [x] Functional deploy script
    -   [x] Test cases

-   JettonWallet:

    -   [x] Contracts migrated
    -   [x] Wrapper re-implemented
    -   [x] Scripts
    -   [ ] Test cases
        -   [ ] Few TODOs

-   WIP: Post deployment script

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
