import { Address, toNano } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sender = provider.sender();
    const userAddress = sender.address || Address.parse('');

    const jettonMinter = provider.open(
        JettonMinter.createFromAddress(Address.parse('ENTER JETTON MINTER ADDRESS HERE')),
    );

    const userWallet = provider.open(JettonWallet.createFromAddress(await jettonMinter.getWalletAddress(userAddress)));

    await userWallet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(userWallet.address);

    // run methods on `jettonWallet`
}
