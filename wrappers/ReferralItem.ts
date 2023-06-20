import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type ReferralItemConfig = {
    is_deployed: boolean;
    owner: Address;
    master: Address;
};

export function referralItemConfigToCell(config: ReferralItemConfig): Cell {
    return beginCell()
        .storeUint(config.is_deployed ? -1 : 0n, 1)
        .storeAddress(config.owner)
        .storeAddress(config.master)
        .endCell();
}

export class ReferralItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new ReferralItem(address);
    }

    static createFromConfig(config: ReferralItemConfig, code: Cell, workchain = 0) {
        const data = referralItemConfigToCell(config);
        const init = { code, data };
        return new ReferralItem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint, user: Address) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().storeUint(201, 32).storeAddress(user).endCell(),
        });
    }
}
