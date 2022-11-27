import * as React from 'react'
import { Button, Heading, Main } from 'grommet'

export default function Page(): JSX.Element {
    return (
        <Main pad="large" align="center" gap="medium">
            <Heading>DeFi Strategy Builder</Heading>
            <Button href="/builder">Build your own strategy</Button>
            <Button href="/strategy/0:2ddef82f0bd07ea5013c35f3fde096e3580cba2d9c157d1d241e5725345e654b">
                Swap WEVER to USDT
            </Button>
            <Button href="/strategy/0:db1fcae42921c93006639101a1c83c7253ab47100757641b579d87e214b39029">
                Farm for strategy
            </Button>
            <Button href="/strategy/0:e7e80d1c4bb4bdc14ac75f7cc260698d13b8abad783bd6395c8ef2f4646a2cfa">
                Swap any token to WEVER
            </Button>
        </Main>
    )
}
