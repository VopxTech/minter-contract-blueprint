import { Address, toNano, fromNano, beginCell } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sender = provider.sender();

    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonWallet = provider.open(
        JettonWallet.createFromAddress(Address.parse('ENTER DEPLOYED JETTON WALLET ADDRESS HERE')),
    );

    let burnAmount = toNano(10000); // <-- Amount of Jettons to burn

    const send = await jettonWallet.sendBurn(
        sender,
        toNano(0.1), // Transaction fee TODO: Calculate this dynamically
        burnAmount,
        senderAddress,
        beginCell().endCell(),
    );
}
