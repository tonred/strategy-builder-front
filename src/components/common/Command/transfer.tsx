import { Box, Button } from 'grommet'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Send } from 'grommet-icons'
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
const recipientRepr = (
    recipientIsStrategy: boolean,
    kind?: AddressExtendedKind,
    value?: string,
): string | JSX.Element => {
    switch (kind) {
        case AddressExtendedKind.OWNER:
            return 'Owner'
        case AddressExtendedKind.VALUE:
            if (recipientIsStrategy) {
                return (
                    <Button href={`/strategy/${value}`}>
                        <Box>
                            Strategy(
                            {sliceAddress(value)}
                            )
                        </Box>
                    </Button>
                )
            }
            return sliceAddress(value)
        case AddressExtendedKind.SENDER:
            return 'Sender'
        case AddressExtendedKind.STRATEGY:
            return 'Strategy'
        default:
            return sliceAddress(value)
    }
}


export function CommandTransferElement({ id, command }: Props): JSX.Element {
    const [amountKind, setAmountKind] = useState<AmountExtendedKind | undefined>()
    const [amount, setAmount] = useState<string>('')
    const [recipientKind, setRecipientKind] = useState<AddressExtendedKind | undefined>()
    const [recipient, setRecipient] = useState<Address | undefined>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isStrategy, setIsStrategy] = useState(false)
    useEffect(() => {
        staticRpc.unpackFromCell({
            allowPartial: false,
            boc: command.params,
            structure: [{
                components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                name: 'amount',
                type: 'tuple',
            },
            {
                components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                name: 'recipient',
                type: 'tuple',
            },
            { name: 'isDeployWallet', type: 'bool' },
            { name: 'payload', type: 'cell' },
            { name: 'value', type: 'uint128' },
            { name: 'flag', type: 'uint8' },
            ],
        }).then(r => {
            // eslint-disable-next-line prefer-destructuring
            const data: any = r.data
            setAmount(data.amount.value)
            setAmountKind(parseInt(data.amount.kind, 10))
            setRecipient(data.recipient.value)
            const _recipientKind = parseInt(data.recipient.kind, 10)
            setRecipientKind(_recipientKind)
            if (_recipientKind === AddressExtendedKind.VALUE) {
                staticRpc.getFullContractState({ address: data.recipient.value }).then(state => {
                    setIsStrategy(state.state?.codeHash === '3c457e42660f182200f81889f5cdd44b340cb1f8c3991c1a8526762078c45861')
                })
            }
        })
    }, [command])
    return (
        <Box
            width="210px"
            height="130px"
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
                    <Send />
                    Transfer
                </Box>
                <Box>
                    <small>
                        id:
                        {id}
                    </small>
                </Box>
            </Box>
            <Box
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
                    to
                </small>
                <small>
                    {recipientRepr(isStrategy, recipientKind, recipient ? recipient.toString() : undefined)}
                </small>
            </Box>
        </Box>
    )
}
