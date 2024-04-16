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

-   Post deployment scripts
    -   [x] Mint
    -   [x] Info
    -   [x] Transfer Admin
    -   [x] Burn
    -   [x] Transfer Coins

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

### Deploy The Jetton

1. Modify `JettonMinter\scripts\deployJettonMinter.ts` with the desired parameters, like name, symbol, supply, etc.
2. Run `npx blueprint run` and choose `deployJettonMinter.ts` from the list.

### Get Info About A Deployed Jetton

1. Modify `JettonMinter\scripts\deployInfo.ts` with the address of deployed Jetton.
2. Run `npx blueprint run` and choose `deployInfo.ts` from the list.

### Mint More Coins

1. Modify `JettonMinter\scripts\deployMint.ts` with the address of deployed Jetton and the amount to mint.
2. Run `npx blueprint run` and choose `deployMint.ts` from the list.

### Transfer Admin Rights

1. Modify `JettonMinter\scripts\deployAdminChange.ts` with the address of deployed Jetton and the new admin address.
2. Run `npx blueprint run` and choose `deployAdminChange.ts` from the list.

### Transfer Coins

1. Modify `JettonMinter\scripts\deployTransferJettons.ts` with the address of deployed Jetton, the sender address, and the amount to transfer.
2. Run `npx blueprint run` and choose `deployTransferJettons.ts` from the list.

### Burn Coins

1. Modify `JettonMinter\scripts\deployBurnJettons.ts` with the address of deployed Jetton and the amount to burn.
2. Run `npx blueprint run` and choose `deployBurnJettons.ts` from the list.
