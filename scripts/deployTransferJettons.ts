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
        JettonWallet.createFromAddress(Address.parse('ENTER JETTON WALLET ADDRESS HERE')),
    );

    let sendAmount = toNano(10); // <-- Amount of Jettons to send
    let forwardAmount = toNano('0.05'); // Forward amount TODO: Calculate this dynamically

    const send = await jettonWallet.sendTransfer(
        sender,
        toNano(0.1), // Transaction fee TODO: Calculate this dynamically
        sendAmount,
        Address.parse('ENTER RECIPIENT ADDRESS HERE'),
        senderAddress,
        beginCell().endCell(),
        forwardAmount,
        beginCell().endCell(),
    );
}
