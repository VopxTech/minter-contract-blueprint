import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { JettonWallet } from '../wrappers/JettonWallet';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('JettonWallet', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('JettonWallet');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonWallet: SandboxContract<JettonWallet>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonWallet = blockchain.openContract(JettonWallet.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonWallet.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonWallet.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonWallet are ready to use
    });
});
