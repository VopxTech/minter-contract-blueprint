import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('JettonMinter', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('JettonMinter');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonMinter: SandboxContract<JettonMinter>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonMinter = blockchain.openContract(JettonMinter.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonMinter.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonMinter.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonMinter are ready to use
    });
});
