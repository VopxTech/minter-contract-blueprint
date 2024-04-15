import { Address, toNano, fromNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const senderAddress = provider.sender()?.address;
    if (!senderAddress) {
        throw new Error('Sender address is undefined.');
    }

    const jettonMinter = provider.open(JettonMinter.createFromAddress(Address.parse('ENTER JETTON MINTER ADDRESS')));

    let curAdmin = await jettonMinter.getAdminAddress();
    let newAdmin = Address.parse('ADDRESS OF THE NEW ADMIN');

    if (curAdmin == newAdmin) {
        console.log('Admin is already set to the new one');
    }

    await jettonMinter.sendChangeAdmin(provider.sender(), newAdmin);

    console.log(`Changing admin to ${newAdmin} and waiting 20s...`);

    await new Promise((resolve) => setTimeout(resolve, 20000));

    const adminAfter = await jettonMinter.getAdminAddress();

    if (adminAfter.equals(newAdmin)) {
        console.log('Admin changed successfully');
    } else {
        console.log("Admin address hasn't changed!\nSomething went wrong!\n");
    }
}
