import { Avatar, Box } from 'grommet'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Transaction } from 'grommet-icons'

import { AmountExtendedKind, Command, Token } from '@/types'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { formattedAmount, sliceAddress } from '@/utils'
import { tokenByAddress } from '@/misc/tokens'


type Props = {
    id: number;
    command: Command;
}
const staticRpc = useStaticRpc()
const amountRepr = (kind: AmountExtendedKind | undefined, amount: string): string => {
    switch (kind) {
        case AmountExtendedKind.PERCENT:
            return `${parseInt(amount, 10) / 1000}%`
        case AmountExtendedKind.REMAINING:
            return 'All'
        case AmountExtendedKind.VALUE:
            return amount
        default:
            return ''
    }
}


export function CommandDepositElement({ id, command }: Props): JSX.Element {
    const [amountKind, setAmountKind] = useState<AmountExtendedKind | undefined>()
    const [amount, setAmount] = useState<string>('')
    const [token, setToken] = useState<Token | undefined>()
    useEffect(() => {
        staticRpc.unpackFromCell({
            allowPartial: false,
            boc: command.params,
            structure: [
                { name: 'second', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                { name: 'lp', type: 'address' },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
        }).then(r => {
            // eslint-disable-next-line prefer-destructuring
            const data: any = r.data
            const _token = tokenByAddress(data.second.toString())
            setToken(_token || { address: data.second.toString(), decimals: 0 })
            setAmount(data.amount.value)
            setAmountKind(parseInt(data.amount.kind, 10))
        })
    }, [command])
    return (
        <Box
            width="210px"
            height="100px"
            pad="xsmall"
            key={id}
            id={`command_${id}`}
            border={{ size: 'small' }}
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
                    <Transaction />
                    Deposit
                </Box>
                <Box>
                    <small>
                        id:
                        {id}
                    </small>
                </Box>
            </Box>
            <Box
                direction="row"
                justify="between"
                align="center"
                fill
                pad="xsmall"
                alignContent="center"
            >
                <b>
                    {amountRepr(amountKind, formattedAmount(amount, token?.decimals))}
                </b>
                <small>
                    to
                </small>
                <Box direction="row" align="center" gap="xxsmall">
                    <small>{token?.symbol !== undefined ? token.symbol : sliceAddress(token?.address)}</small>
                    {token?.logoURI && (
                        <Avatar size="small" src={token.logoURI} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}
