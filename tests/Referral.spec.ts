import { Blockchain } from '@ton-community/sandbox';
import { Address, beginCell, Cell, toNano } from 'ton-core';
import { Referral } from '../wrappers/Referral';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Referral', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Referral');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();

        const referral = blockchain.openContract(
            Referral.createFromConfig(
                {
                    is_started: false,
                    invites: 0n,
                    total_supply: 0n,
                    total_burn: 0n,
                    treasure: 0n,
                    minter_address: Address.parseFriendly('EQAQc7k-bL2lo_tbwAd9RwU107wKJjAM5HhohqHGU68x9GUv').address,
                    jetton_item_code: Cell.fromBase64(
                        'te6cckECEQEAAyMAART/APSkE/S88sgLAQIBYgIDAgLMBAUAG6D2BdqJofQB9IH0gahhAgHUBgcCASAICQDDCDHAJJfBOAB0NMDAXGwlRNfA/AM4PpA+kAx+gAxcdch+gAx+gAwc6m0AALTH4IQD4p+pVIgupUxNFnwCeCCEBeNRRlSILqWMUREA/AK4DWCEFlfB7y6k1nwC+BfBIQP8vCAAET6RDBwuvLhTYAIBIAoLAIPUAQa5D2omh9AH0gfSBqGAJpj8EIC8aijKkQXUEIPe7L7wndCVj5cWLpn5j9ABgJ0CgR5CgCfQEsZ4sA54tmZPaqQB8VA9M/+gD6QCHwAe1E0PoA+kD6QNQwUTahUirHBfLiwSjC//LiwlQ0QnBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJIPkAcHTIywLKB8v/ydAE+kD0BDH6ACDXScIA8uLEd4AYyMsFUAjPFnD6AhfLaxPMgMAgEgDQ4AnoIQF41FGcjLHxnLP1AH+gIizxZQBs8WJfoCUAPPFslQBcwjkXKRceJQCKgToIIJycOAoBS88uLFBMmAQPsAECPIUAT6AljPFgHPFszJ7VQC9ztRND6APpA+kDUMAjTP/oAUVGgBfpA+kBTW8cFVHNtcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMn5AHB0yMsCygfL/8nQUA3HBRyx8uLDCvoAUaihggiYloBmtgihggiYloCgGKEnlxBJEDg3XwTjDSXXCwGAPEADXO1E0PoA+kD6QNQwB9M/+gD6QDBRUaFSSccF8uLBJ8L/8uLCBYIJMS0AoBa88uLDghB73ZfeyMsfFcs/UAP6AiLPFgHPFslxgBjIywUkzxZw+gLLaszJgED7AEATyFAE+gJYzxYBzxbMye1UgAHBSeaAYoYIQc2LQnMjLH1Iwyz9Y+gJQB88WUAfPFslxgBDIywUkzxZQBvoCFctqFMzJcfsAECQQIwB8wwAjwgCwjiGCENUydttwgBDIywVQCM8WUAT6AhbLahLLHxLLP8ly+wCTNWwh4gPIUAT6AljPFgHPFszJ7VSV6u3X'
                    ),
                    referral_item_code: await compile('ReferralItem'),
                },
                code
            )
        );

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await referral.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: referral.address,
            deploy: true,
        });
    });

    it('should init', async () => {
        const blockchain = await Blockchain.create();

        const referral = blockchain.openContract(
            Referral.createFromConfig(
                {
                    is_started: false,
                    invites: 0n,
                    total_supply: 0n,
                    total_burn: 0n,
                    treasure: 0n,
                    minter_address: Address.parseFriendly('EQAQc7k-bL2lo_tbwAd9RwU107wKJjAM5HhohqHGU68x9GUv').address,
                    jetton_item_code: Cell.fromBase64(
                        'te6cckECEQEAAyMAART/APSkE/S88sgLAQIBYgIDAgLMBAUAG6D2BdqJofQB9IH0gahhAgHUBgcCASAICQDDCDHAJJfBOAB0NMDAXGwlRNfA/AM4PpA+kAx+gAxcdch+gAx+gAwc6m0AALTH4IQD4p+pVIgupUxNFnwCeCCEBeNRRlSILqWMUREA/AK4DWCEFlfB7y6k1nwC+BfBIQP8vCAAET6RDBwuvLhTYAIBIAoLAIPUAQa5D2omh9AH0gfSBqGAJpj8EIC8aijKkQXUEIPe7L7wndCVj5cWLpn5j9ABgJ0CgR5CgCfQEsZ4sA54tmZPaqQB8VA9M/+gD6QCHwAe1E0PoA+kD6QNQwUTahUirHBfLiwSjC//LiwlQ0QnBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJIPkAcHTIywLKB8v/ydAE+kD0BDH6ACDXScIA8uLEd4AYyMsFUAjPFnD6AhfLaxPMgMAgEgDQ4AnoIQF41FGcjLHxnLP1AH+gIizxZQBs8WJfoCUAPPFslQBcwjkXKRceJQCKgToIIJycOAoBS88uLFBMmAQPsAECPIUAT6AljPFgHPFszJ7VQC9ztRND6APpA+kDUMAjTP/oAUVGgBfpA+kBTW8cFVHNtcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMn5AHB0yMsCygfL/8nQUA3HBRyx8uLDCvoAUaihggiYloBmtgihggiYloCgGKEnlxBJEDg3XwTjDSXXCwGAPEADXO1E0PoA+kD6QNQwB9M/+gD6QDBRUaFSSccF8uLBJ8L/8uLCBYIJMS0AoBa88uLDghB73ZfeyMsfFcs/UAP6AiLPFgHPFslxgBjIywUkzxZw+gLLaszJgED7AEATyFAE+gJYzxYBzxbMye1UgAHBSeaAYoYIQc2LQnMjLH1Iwyz9Y+gJQB88WUAfPFslxgBDIywUkzxZQBvoCFctqFMzJcfsAECQQIwB8wwAjwgCwjiGCENUydttwgBDIywVQCM8WUAT6AhbLahLLHxLLP8ly+wCTNWwh4gPIUAT6AljPFgHPFszJ7VSV6u3X'
                    ),
                    referral_item_code: await compile('ReferralItem'),
                },
                code
            )
        );

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await referral.sendDeploy(deployer.getSender(), toNano('0.05'));

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: referral.address,
        //     deploy: true,
        // });

        const init = await deployer.send({
            to: referral.address,
            value: toNano('1.3'),
        });
        // console.log(init.transactions[1]);

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: referral.address,
        //     aborted: false,
        // });
    });

    it('burn tokens', async () => {
        const blockchain = await Blockchain.create();

        const referral = blockchain.openContract(
            Referral.createFromConfig(
                {
                    is_started: false,
                    invites: 1n,
                    total_supply: 10000000000000n,
                    total_burn: 0n,
                    treasure: 10n,
                    minter_address: Address.parseFriendly('EQAQc7k-bL2lo_tbwAd9RwU107wKJjAM5HhohqHGU68x9GUv').address,
                    jetton_item_code: Cell.fromBase64(
                        'te6cckECEQEAAyMAART/APSkE/S88sgLAQIBYgIDAgLMBAUAG6D2BdqJofQB9IH0gahhAgHUBgcCASAICQDDCDHAJJfBOAB0NMDAXGwlRNfA/AM4PpA+kAx+gAxcdch+gAx+gAwc6m0AALTH4IQD4p+pVIgupUxNFnwCeCCEBeNRRlSILqWMUREA/AK4DWCEFlfB7y6k1nwC+BfBIQP8vCAAET6RDBwuvLhTYAIBIAoLAIPUAQa5D2omh9AH0gfSBqGAJpj8EIC8aijKkQXUEIPe7L7wndCVj5cWLpn5j9ABgJ0CgR5CgCfQEsZ4sA54tmZPaqQB8VA9M/+gD6QCHwAe1E0PoA+kD6QNQwUTahUirHBfLiwSjC//LiwlQ0QnBUIBNUFAPIUAT6AljPFgHPFszJIsjLARL0APQAywDJIPkAcHTIywLKB8v/ydAE+kD0BDH6ACDXScIA8uLEd4AYyMsFUAjPFnD6AhfLaxPMgMAgEgDQ4AnoIQF41FGcjLHxnLP1AH+gIizxZQBs8WJfoCUAPPFslQBcwjkXKRceJQCKgToIIJycOAoBS88uLFBMmAQPsAECPIUAT6AljPFgHPFszJ7VQC9ztRND6APpA+kDUMAjTP/oAUVGgBfpA+kBTW8cFVHNtcFQgE1QUA8hQBPoCWM8WAc8WzMkiyMsBEvQA9ADLAMn5AHB0yMsCygfL/8nQUA3HBRyx8uLDCvoAUaihggiYloBmtgihggiYloCgGKEnlxBJEDg3XwTjDSXXCwGAPEADXO1E0PoA+kD6QNQwB9M/+gD6QDBRUaFSSccF8uLBJ8L/8uLCBYIJMS0AoBa88uLDghB73ZfeyMsfFcs/UAP6AiLPFgHPFslxgBjIywUkzxZw+gLLaszJgED7AEATyFAE+gJYzxYBzxbMye1UgAHBSeaAYoYIQc2LQnMjLH1Iwyz9Y+gJQB88WUAfPFslxgBDIywUkzxZQBvoCFctqFMzJcfsAECQQIwB8wwAjwgCwjiGCENUydttwgBDIywVQCM8WUAT6AhbLahLLHxLLP8ly+wCTNWwh4gPIUAT6AljPFgHPFszJ7VSV6u3X'
                    ),
                    referral_item_code: await compile('ReferralItem'),
                },
                code
            )
        );

        const deployer = await blockchain.treasury('deployer');
        const jetton = await blockchain.treasury('jetton');

        const deployResult = await referral.sendDeploy(deployer.getSender(), toNano('1'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: referral.address,
            deploy: true,
        });

        const init = await jetton.send({
            to: referral.address,
            value: toNano('0.001'),
            body: beginCell()
                .storeUint(0x7362d09c, 32)
                .storeUint(0, 64)
                .storeCoins(123321)
                .storeAddress(deployer.address)
                .endCell(),
        });
        console.log(init.transactions[1]);

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: referral.address,
        //     aborted: false,
        // });
    });
});
