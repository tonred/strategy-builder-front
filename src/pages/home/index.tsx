import * as React from 'react'
import {
    Button, Heading, Main, Paragraph,
} from 'grommet'

export default function Page(): JSX.Element {
    return (
        <Main pad="large" align="center" gap="medium">
            <Heading>DeFi Strategy Builder</Heading>
            <Button href="/strategy/0:2ddef82f0bd07ea5013c35f3fde096e3580cba2d9c157d1d241e5725345e654b">
                Swap WEVER to USDT
            </Button>
            <Button href="/strategy/0:35b5f401b1923644c93f5fbad2ee902f090febe794cd8cf1067f2794f9bcf362">
                Swap WEVER to 3 stables
            </Button>
            <Button href="/strategy/0:11c828b1c4ff5dd05e352ec1596c8b4c04ebdcfeb9aefa25043f9a1bbf2a7022">
                Farm WEVER/USDT
            </Button>
            <Button href="/strategy/0:7e4d84423acf3121b42113d669fc87be010ff3926d0ba007874663e53a912197">
                Swap any token to WEVER
            </Button>
            <Button href="/strategy/0:25b53ba5ebc425afabff4c5d9dd0772c5a03b838d8d364ab1c25bf57a5fd8d25">
                Fill WEVER/BRIDGE pool
            </Button>
            <Paragraph><b>Or build your own strategy</b></Paragraph>
            <Button
                href="https://github.com/tonred/StrategyBuilder/tree/master/tools/strategy"
            >
                 Python
            </Button>
            <Button href="/builder">
                UI(Limited demo)
            </Button>
        </Main>
    )
}
