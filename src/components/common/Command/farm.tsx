import { Box } from 'grommet'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Currency } from 'grommet-icons'
import { Address } from 'everscale-inpage-provider'

import { AddressExtendedKind, AmountExtendedKind, Command } from '@/types'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { sliceAddress } from '@/utils'


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
            return 'Remaining'
        case AmountExtendedKind.VALUE:
            return amount
        default:
            return ''
    }
}
const depositOwnerRepr = (kind?: AddressExtendedKind, value?: string): string => {
    switch (kind) {
        case AddressExtendedKind.OWNER:
            return 'Strategy Owner'
        case AddressExtendedKind.VALUE:
            return sliceAddress(value)
        case AddressExtendedKind.SENDER:
            return 'Sender'
        case AddressExtendedKind.STRATEGY:
            return 'Strategy'
        default:
            return sliceAddress(value)
    }
}


export function CommandFarmElement({ id, command }: Props): JSX.Element {
    const [amountKind, setAmountKind] = useState<AmountExtendedKind | undefined>()
    const [amount, setAmount] = useState<string>('')
    const [farm, setFarm] = useState<string>('')
    const [depositOwnerKind, setDepositOwnerKind] = useState<AddressExtendedKind | undefined>()
    const [depositOwner, setDepositOwner] = useState<Address | undefined>()
    const [lockTime, setLockTime] = useState<string>('')
    useEffect(() => {
        staticRpc.unpackFromCell({
            allowPartial: false,
            boc: command.params,
            structure: [
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                { name: 'farm', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                    name: 'depositOwner',
                    type: 'tuple',
                },
                { name: 'lockTime', type: 'uint32' },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
        }).then(r => {
            // eslint-disable-next-line prefer-destructuring
            const data: any = r.data
            setAmount(data.amount.value)
            setAmountKind(parseInt(data.amount.kind, 10))
            setDepositOwner(data.depositOwner.value)
            setDepositOwnerKind(parseInt(data.depositOwner.kind, 10))
            setFarm(data.farm)
            setLockTime(data.lockTime)
        })
    }, [command])
    return (
        <Box
            width="240px"
            height="150px"
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
                    <Currency />
                    Farm
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
                    {amountRepr(amountKind, amount)}
                </b>
                <small>
                    at
                </small>
                <small>{sliceAddress(farm.toString())}</small>
            </Box>
            <Box
                direction="row"
                justify="between"
                align="center"
                fill
                pad="xsmall"
                alignContent="center"
            >
                <small>
                    Deposit for
                </small>
                <small>{depositOwnerRepr(depositOwnerKind, depositOwner?.toString())}</small>
            </Box>
            <Box
                direction="row"
                justify="between"
                align="center"
                fill
                pad="xsmall"
                alignContent="center"
            >
                <small>
                    Lock
                </small>
                <small>{lockTime}</small>
            </Box>
        </Box>
    )
}
