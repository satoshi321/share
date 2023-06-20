import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { ReferralItem } from '../wrappers/ReferralItem';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('ReferralItem', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('ReferralItem');
    });

    it('should deploy', async () => {
        const blockchain = await Blockchain.create();
        const user = await blockchain.treasury('user');
        const master = await blockchain.treasury('master');
        const ref = await blockchain.treasury('ref');
        const referralItem = blockchain.openContract(
            ReferralItem.createFromConfig(
                {
                    is_deployed: false,
                    owner: user.address,
                    master: master.address,
                },
                code
            )
        );

        const deployResult = await referralItem.sendDeploy(master.getSender(), toNano('1.5'), user.address);
        // console.log(deployResult.transactions[1]);

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: master.address,
        //     to: referralItem.address,
        //     deploy: true,
        // });

        const refTransaction = await ref.send({
            to: referralItem.address,
            value: toNano('1.3'),
        });
        // expect(refTransaction.transactions).toHaveTransaction({
        //     from: ref.address,
        //     to: referralItem.address,
        //     aborted: false,
        // });
    });
});
