import * as React from 'react'
import { Button, Heading, Main } from 'grommet'


// const connection = {
//     id: 'shimi',
//     anchor,
//     color: 'accent-1',
//     thickness: 'xsmall',
//     type,
//     toTarget: 'yummy',
//     fromTarget: 'gremlin',
//     round: false,
// };
// const connection2 = {
//     id: 'shimi2',
//     anchor,
//     color: 'accent-1',
//     thickness: 'xsmall',
//     type,
//     toTarget: 'yummy2',
//     fromTarget: 'gremlin',
//     round: false,
// };
export default function Page(): JSX.Element {
    return (
        <Main pad="large" align="center" gap="medium">
            <Heading>DeFi Strategy Builder</Heading>
            <Button href="/builder">Build your own strategy</Button>
            <Button href="/strategy/0:2ddef82f0bd07ea5013c35f3fde096e3580cba2d9c157d1d241e5725345e654b">
                Swap WEVER to USDT
            </Button>
            <Button href="/strategy/0:dcdfdeaefca1c1d189a61317ce4b97f21fd6c7f73a6c9b25ddf68e16cfa2ecc4">
                Deposit and farm
            </Button>
            <Button href="/strategy/0:e7e80d1c4bb4bdc14ac75f7cc260698d13b8abad783bd6395c8ef2f4646a2cfa">
                Swap any token to WEVER
            </Button>
        </Main>
    )
}
