import { Box } from 'grommet'
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
const amountRepr = (kind: AmountExtendedKind|undefined, amount: string): string => {
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
const recipientRepr = (kind?: AddressExtendedKind, value?: string): string => {
    switch (kind) {
        case AddressExtendedKind.OWNER:
            return 'Owner'
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


export function CommandTransferElement({ id, command }: Props): JSX.Element {
    const [amountKind, setAmountKind] = useState<AmountExtendedKind | undefined>()
    const [amount, setAmount] = useState<string>('')
    const [recipientKind, setRecipientKind] = useState<AddressExtendedKind | undefined>()
    const [recipient, setRecipient] = useState<Address | undefined>()
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
            setRecipientKind(parseInt(data.recipient.kind, 10))
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
                    to
                </small>
                <small>
                    {recipientRepr(recipientKind, recipient ? recipient.toString() : undefined)}
                </small>
            </Box>
        </Box>
    )
}
