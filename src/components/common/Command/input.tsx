import {
    Avatar, Box, Button, Stack,
} from 'grommet'
import * as React from 'react'
import { InstallOption } from 'grommet-icons'
import { useEffect, useState } from 'react'
import { Address } from 'everscale-inpage-provider'
import { useParams } from 'react-router-dom'
import { Observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import { Command, Token } from '@/types'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { formattedTokenAmount, sliceAddress } from '@/utils'
import { tokenByAddress } from '@/misc/tokens'
import { TokenWallet } from '@/misc/token-wallet'
import { useWallet } from '@/stores/WalletService'
import { AmountInput } from '@/components/common/AmountInput'
import { truncateDecimals } from '@/hooks/useField'

type Props = {
    id: number;
    command: Command;
}
const staticRpc = useStaticRpc()

export function CommandInputElement({ id, command }: Props): JSX.Element {
    const wallet = useWallet()
    const params = useParams()
    const strategyAddress = params.strategyAddress!

    const [token, setToken] = useState<Token | undefined>()
    const [minAmount, setMinAmount] = useState<number>(0)
    const [amount, setAmount] = React.useState('0')
    const [minGas, setMinGas] = useState<number>(0)
    useEffect(() => {
        staticRpc.unpackFromCell({
            allowPartial: false,
            boc: command.params,
            structure: [{
                name: 'token',
                type: 'address',
            }, {
                name: 'minAmount',
                type: 'uint128',
            }, {
                name: 'minGas',
                type: 'uint128',
            }],
        }).then(r => {
            // @ts-ignore
            const address: Address = r.data.token
            const _token = tokenByAddress(address.toString())
            setToken(_token || { address: address.toString(), decimals: 0 })
            // @ts-ignore
            setMinAmount(parseInt(r.data.minAmount, 10))
            // @ts-ignore
            setMinGas(parseInt(r.data.minGas, 10))
            // @ts-ignore
            setAmount(truncateDecimals(formattedTokenAmount(r.data.minAmount, _token?.decimals), 9))
        })
    }, [command])
    return (
        <Box
            width="300px"
            height="140px"
            pad="xsmall"
            key={id}
            id={`command_${id}`}
            border={{ size: 'small' }}
            responsive={false}
            overflow="scroll"
        >
            <Box
                gap="small"
                pad="xsmall"
                direction="row"
                justify="between"
                align="center"
                flex="grow"
            >
                <Box direction="row" gap="xxsmall">
                    <InstallOption />
                    Input
                </Box>
                <Box>
                    <small>
                        id:
                        {id}
                    </small>
                </Box>
            </Box>
            {token && (
                <Box
                    pad="xsmall"
                    gap="xsmall"
                    direction="row"
                    justify="between"
                    align="center"
                    flex="grow"
                >
                    <Box basis="3/4">
                        <Stack interactiveChild="first" anchor="right">
                            <AmountInput
                                decimals={token.decimals}
                                value={amount}
                                onChange={setAmount}
                            />
                            <Box direction="row" align="center" margin={{ right: 'xsmall' }}>
                                <small>{token.symbol !== undefined ? token.symbol : sliceAddress(token.address)}</small>
                                {token.logoURI && (
                                    <Avatar size="small" src={token.logoURI} />
                                )}
                            </Box>
                        </Stack>
                    </Box>
                    <Box basis="auto">
                        <Observer>
                            {() => (
                                <Button
                                    disabled={
                                        !wallet.isConnected
                                        || (new BigNumber(amount)).shiftedBy(token.decimals).lt(minAmount)
                                    }
                                    label="Run"
                                    onClick={async () => {
                                        await TokenWallet.transfer({
                                            address: new Address(token.address),
                                            deployWalletValue: '0', // todo
                                            grams: (minGas + 200000000).toString(),
                                            owner: wallet.account!.address,
                                            recipient: new Address(strategyAddress),
                                            tokens: (new BigNumber(amount)).shiftedBy(token.decimals).toString(10),
                                            withDerive: true,
                                        })
                                    }}
                                />
                            )}
                        </Observer>
                    </Box>
                </Box>
            )}

        </Box>
    )
}
