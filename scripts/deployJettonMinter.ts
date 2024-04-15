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
                supply: toNano('100000000'), // Enter the total supply of the Jetton
                owner: senderAddress, // Enter the address of the owner of the Jetton or leave it as senderAddress
                name: 'NewJetton', // Enter the name of the Jetton
                symbol: 'NJET', // Enter the symbol of the Jetton
                image: 'https://raw.githubusercontent.com/VopxTech/vopx/f43a7df686540cb88c93d009a588af39d97519bc/static/icons/Telegram.svg', // Enter the image of the Jetton
                description: 'For testing and testing and testing...', // Enter the description of the Jetton
            },
            await compile('JettonMinter'),
        ),
    );

    await jettonMinter.sendDeploy(provider.sender(), toNano('0.25'));

    await provider.waitForDeploy(jettonMinter.address);

    console.log(`Deployed JettonMinter at ${jettonMinter.address}`);
}
