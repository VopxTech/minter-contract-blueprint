import { Address, toNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonMinter = provider.open(
        JettonMinter.createFromConfig(
            {
                supply: toNano('1000000'),
                owner: senderAddress,
                name: 'My Jetton',
                symbol: 'JETT',
                image: 'https://bitcoin.org/img/icons/logotop.svg',
                description: 'My first jetton',
            },
            await compile('JettonMinter'),
        ),
    );

    await jettonMinter.sendDeploy(provider.sender(), toNano('0.25'));

    await provider.waitForDeploy(jettonMinter.address);
}
