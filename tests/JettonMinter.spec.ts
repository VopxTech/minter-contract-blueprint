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

        deployer = await blockchain.treasury('deployer');

        jettonMinter = blockchain.openContract(
            JettonMinter.createFromConfig(
                {
                    supply: toNano('1000000'),
                    owner: deployer.address,
                    name: 'My Jetton',
                    symbol: 'JETT',
                    image: 'https://bitcoin.org/img/icons/logotop.svg',
                    description: 'My first jetton',
                },
                code,
            ),
        );

        const deployResult = await jettonMinter.sendDeploy(deployer.getSender(), toNano('0.2'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jettonMinter.address,
            deploy: true,
            success: true,
        });
    });

    it('Should have the same supply as the config', async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        const metadata = {
            supply: 1000000000000000,
            owner: deployer.address,
            name: 'My Jetton',
            symbol: 'JETT',
            image: 'https://bitcoin.org/img/icons/logotop.svg',
            description: 'My first jetton',
        };

        // TODO: THIS
    });
});
