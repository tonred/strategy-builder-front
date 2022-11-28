import {
    Avatar, Box, Button, Select, Stack,
} from 'grommet'
import * as React from 'react'
import { Close, InstallOption } from 'grommet-icons'
import { useEffect, useState } from 'react'
import { Address } from 'everscale-inpage-provider'
import { useParams } from 'react-router-dom'
import { Observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import { Command, Token } from '@/types'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { formattedTokenAmount, sliceAddress } from '@/utils'
import {defaultToken, tokenByAddress, tokens} from '@/misc/tokens'
import { TokenWallet } from '@/misc/token-wallet'
import { useWallet } from '@/stores/WalletService'
import { AmountInput } from '@/components/common/AmountInput'
import { truncateDecimals } from '@/hooks/useField'

type Props = {
    id: number;
    command: Command;
    edit?: (id: number, command?: Command)=>void;
}
const staticRpc = useStaticRpc()

export function CommandInputElement({ id, command, edit }: Props): JSX.Element {
    const wallet = useWallet()
    const params = useParams()
    const strategyAddress = params.strategyAddress!

    const [token, setToken] = useState<Token | undefined>(edit ? defaultToken() : undefined)
    const [minAmount, setMinAmount] = useState('0')
    const [amount, setAmount] = React.useState('0')
    const [minGas, setMinGas] = useState('0')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nextCommand, setNextCommand] = useState(command.nextID)

    useEffect(() => {
        if (!edit || !token) return
        staticRpc.packIntoCell({
        // @ts-ignore
            data: {
                minAmount: new BigNumber(minAmount).shiftedBy(token.decimals).toString(),
                minGas: new BigNumber(minGas).shiftedBy(9).toString(),
                token: new Address(token.address),
            },
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
            const newCommand = command
            newCommand.nextID = nextCommand
            newCommand.params = r.boc
            edit(id, command)
        })

    }, [nextCommand, token, minAmount, minGas])
    useEffect(() => {
        if (edit) {
        //     setToken(defaultToken())
            return
        }
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
            setMinGas(r.data.minGas)
            // @ts-ignore
            setAmount(truncateDecimals(formattedTokenAmount(r.data.minAmount, _token?.decimals), 9))
        })
    }, [command, edit])
    let selectValueLabel = <>Select Token</>
    if (token !== undefined) {
        selectValueLabel = (
            <Box
                direction="row"
                align="center"
                pad="small"
                gap="xsmall"
            >
                {token.symbol !== undefined ? token.symbol : sliceAddress(token.address)}
                {token.logoURI && (
                    <Avatar size="small" src={token.logoURI} />
                )}
            </Box>
        )
    }
    return (
        <Box
            width={{ min: '300px' }}
            height={{ min: '140px' }}
            pad="xsmall"
            key={id}
            id={`command_${id}`}
            border={{ size: 'small' }}
            flex={false}
        >
            <Box
                gap="small"
                pad="xsmall"
                direction="row"
                justify="between"
                align="center"
                flex={false}
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
                {edit && (
                    <Box>
                        <Button onClick={() => edit?.(id)}>
                            <Close />
                        </Button>
                    </Box>
                )}
            </Box>
            {edit && (
                <Box
                    pad="xsmall"
                    gap="xsmall"
                    direction="row"
                    justify="between"
                    align="center"
                    flex="grow"
                >
                    <Box
                        justify="between"
                        align="center"
                        gap="xsmall"
                        fill
                    >
                        <Box
                            direction="row"
                            justify="between"
                            align="center"
                            gap="small"
                            fill
                        >
                            <small>Token:</small>
                            <Select
                                placeholder="Select"
                                value={token}
                                valueKey={{ key: 'symbol', reduce: true }}
                                options={tokens}
                                onChange={({ option }) => {
                                    setToken(option)
                                }}
                                valueLabel={selectValueLabel}
                            />
                        </Box>
                        <Box
                            justify="between"
                            align="center"
                            direction="row"
                            gap="small"
                            fill
                        >
                            <small>Min.value:</small>
                            <AmountInput
                                decimals={token?.decimals ? token?.decimals : 0}
                                value={minAmount}
                                onChange={setMinAmount}
                                placeholder="Minimal tokens amount"
                            />
                        </Box>
                        <Box
                            justify="between"
                            align="center"
                            direction="row"
                            gap="small"
                            fill
                        >
                            <small>Min.Gas:</small>
                            <AmountInput
                                decimals={9}
                                value={minGas.toString()}
                                onChange={setMinGas}
                                placeholder="Minimal gas amount"
                            />
                        </Box>
                        <Box
                            justify="between"
                            align="center"
                            direction="row"
                            gap="small"
                            fill
                        >
                            <small>Next command</small>
                            <AmountInput
                                decimals={0}
                                value={nextCommand.toString()}
                                onChange={e => setNextCommand(e && e !== id.toString() ? parseInt(e, 10) : 0)}
                                placeholder="Next command"
                            />
                        </Box>

                    </Box>
                </Box>
            )}
            {(!edit && token) && (
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
                                            grams: (parseInt(minGas, 10) + 200000000).toString(),
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
