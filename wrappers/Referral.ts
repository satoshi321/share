import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type ReferralConfig = {
    is_started: boolean;
    invites: bigint;
    total_supply: bigint;
    total_burn: bigint;
    treasure: bigint;
    minter_address: Address;
    referral_item_code: Cell;
    jetton_item_code: Cell;
};

export function referralConfigToCell(config: ReferralConfig): Cell {
    return beginCell()
        .storeInt(config.is_started ? -1n : 0n, 1)
        .storeUint(config.invites, 64)
        .storeCoins(config.total_supply)
        .storeCoins(config.total_burn)
        .storeCoins(config.treasure)
        .storeAddress(config.minter_address)
        .storeRef(config.referral_item_code)
        .storeRef(config.jetton_item_code)
        .endCell();
}

export class Referral implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Referral(address);
    }

    static createFromConfig(config: ReferralConfig, code: Cell, workchain = 0) {
        const data = referralConfigToCell(config);
        const init = { code, data };
        return new Referral(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }
}
