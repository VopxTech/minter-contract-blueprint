import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    Dictionary,
} from '@ton/ton';

import { Sha256 } from '@aws-crypto/sha256-js';

import * as walletdata from '../build/JettonWallet.compiled.json';

export const JETTON_WALLET_CODE = Cell.fromBoc(Buffer.from(walletdata.hex, 'hex'))[0];

const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;

export type JettonMinterConfig = {
    owner: Address;
    name: string;
    symbol: string;
    image: string;
    description: string;
    supply: bigint;
};

export type JettonMetaDataKeys = 'name' | 'description' | 'image' | 'symbol';

const jettonOnChainMetadataSpec: {
    [key in JettonMetaDataKeys]: 'utf8' | 'ascii' | undefined;
} = {
    name: 'utf8',
    description: 'utf8',
    image: 'ascii',
    symbol: 'utf8',
};

const sha256 = (str: string) => {
    const sha = new Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};

export const buildTokenMetadataCell = (data: { [s: string]: string | undefined }): Cell => {
    const CELL_CAPACITY = 1023;
    const PREFIX_SIZE = 8;
    const CELL_MAX_SIZE_BYTES = Math.floor((CELL_CAPACITY - PREFIX_SIZE) / 8);
    const KEYLEN = 256;
    const dict = Dictionary.empty(Dictionary.Keys.Buffer(KEYLEN / 8), Dictionary.Values.Cell());

    Object.entries(data).forEach(([k, v]: [string, string | undefined]) => {
        if (!jettonOnChainMetadataSpec[k as JettonMetaDataKeys]) throw new Error(`Unsupported onchain key: ${k}`);
        if (v === undefined || v === '') return;

        let bufferToStore = Buffer.from(v, jettonOnChainMetadataSpec[k as JettonMetaDataKeys]);

        const rootCell = beginCell();
        rootCell.storeUint(SNAKE_PREFIX, PREFIX_SIZE);
        let currentCell = rootCell;

        while (bufferToStore.length > 0) {
            currentCell.storeBuffer(bufferToStore.subarray(0, CELL_MAX_SIZE_BYTES));
            bufferToStore = bufferToStore.subarray(CELL_MAX_SIZE_BYTES);
            if (bufferToStore.length > 0) {
                let newCell = beginCell();
                currentCell.storeRef(newCell);
                currentCell = newCell;
            }
        }

        dict.set(sha256(k), rootCell.endCell());
    });

    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, PREFIX_SIZE).storeDict(dict).endCell();
};

export function jettonMinterConfigToCell(config: JettonMinterConfig): Cell {
    return beginCell()
        .storeCoins(config.supply)
        .storeAddress(config.owner)
        .storeRef(
            buildTokenMetadataCell({
                name: config.name,
                symbol: config.symbol,
                image: config.image,
                description: config.description,
            }),
        )
        .storeRef(JETTON_WALLET_CODE)
        .endCell();
}

export class JettonMinter implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new JettonMinter(address);
    }

    static createFromConfig(config: JettonMinterConfig, code: Cell, workchain = 0) {
        const data = jettonMinterConfigToCell(config);
        const init = { code, data };
        return new JettonMinter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getJettonData(provider: ContractProvider) {
        const { stack } = await provider.get('get_jetton_data', []);
        return {
            supply: stack.readNumber(),
            flag: stack.readNumber(),
            owner: stack.readAddress(),
            metadata: stack.readCell(),
            wallet_code: stack.readCell(),
        };
    }

    async getWalletAddress(provider: ContractProvider, address: Address) {
        const { stack } = await provider.get('get_wallet_address', [
            { type: 'slice', cell: beginCell().storeAddress(address).endCell() },
        ]);
        return {
            address: stack.readAddress(),
        };
    }
}
