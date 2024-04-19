import { Address, toNano, fromNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sender = provider.sender();

    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonMinter = provider.open(
        JettonMinter.createFromAddress(Address.parse('ENTER JETTON MINTER ADDRESS HERE')),
    );

    let mintAddress = senderAddress; // Modify this to another address if you want to mint to someone else
    let mintAmount = 1000000; // <-- ENTER THE AMOUNT OF JETTONS TO MINT

    const supplyBefore = await jettonMinter.getTotalSupply();
    const nanoMint = toNano(mintAmount);

    const res = await jettonMinter.sendMint(sender, mintAddress, nanoMint, toNano('0.05'), toNano('0.1'));

    console.log(`Minting ${mintAmount} to ${mintAddress} and waiting 20s...`);

    await new Promise((resolve) => setTimeout(resolve, 20000));
    const supplyAfter = await jettonMinter.getTotalSupply();

    if (supplyAfter == supplyBefore + nanoMint) {
        console.log('Mint successfull!\nCurrent supply:' + fromNano(supplyAfter));
    } else {
        console.log('Mint failed!');
    }
}
