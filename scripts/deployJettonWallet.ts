import { Address, toNano } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonWallet = provider.open(
        JettonWallet.createFromAddress(Address.parse('/** address of the JettonWallet contract **/')),
    );

    await jettonWallet.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(jettonWallet.address);

    // run methods on `jettonWallet`
}
