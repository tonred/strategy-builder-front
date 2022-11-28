import {
    Box, Button, Select, TextInput,
} from 'grommet'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Close, Send } from 'grommet-icons'
import { Address } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'

import { AddressExtendedKind, AmountExtendedKind, Command } from '@/types'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { sliceAddress, zeroAddress } from '@/utils'
import { getAddressTypeName, getAmountTypeName } from '@/misc/extended-types'
import { AmountInput } from '@/components/common/AmountInput'

type Props = {
    id: number;
    command: Command;
    edit?: (id: number, command?: Command) => void;
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


export function CommandTransferElement({ id, command, edit }: Props): JSX.Element {
    const [amountKind, setAmountKind] = useState<AmountExtendedKind | undefined>(
        edit ? AmountExtendedKind.REMAINING : undefined,
    )
    const [amount, setAmount] = useState<string>('')
    const [recipientKind, setRecipientKind] = useState<AddressExtendedKind | undefined>(
        edit ? AddressExtendedKind.SENDER : undefined,
    )
    const [recipient, setRecipient] = useState<Address | undefined>()
    const [isStrategy, setIsStrategy] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nextCommand, setNextCommand] = useState(command.nextID)

    useEffect(() => {
        if (!edit) return
        let formattedAmount
        if (amountKind === AmountExtendedKind.PERCENT && amount) {
            formattedAmount = new BigNumber(amount).shiftedBy(3).toString()
        }
        staticRpc.packIntoCell({
            // @ts-ignore
            data: {
                amount: { kind: amountKind || 0, value: formattedAmount || amount || 0 },
                flag: 128,
                isDeployWallet: true,
                payload: '',
                recipient: {
                    kind: recipientKind || 0,
                    value: recipient || zeroAddress,
                },
                value: 0,
            },
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
            const newCommand = command
            newCommand.nextID = nextCommand
            newCommand.params = r.boc
            edit(id, command)
        })

    }, [nextCommand, amountKind, amount, recipient, recipientKind, nextCommand])

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
            width={{ min: '210px' }}
            height={{ min: '130px' }}
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
                {edit && (
                    <Box>
                        <Button onClick={() => edit?.(id)}>
                            <Close />
                        </Button>
                    </Box>
                )}
            </Box>
            {edit ? (
                <Box
                    align="center"
                    fill
                    pad="xsmall"
                    alignContent="center"
                    gap="small"
                >
                    <Select
                        placeholder="Amount Type"
                        value={getAmountTypeName(amountKind)}
                        options={[
                            { kind: AmountExtendedKind.VALUE, name: 'Value' },
                            { kind: AmountExtendedKind.PERCENT, name: 'Percent' },
                            { kind: AmountExtendedKind.REMAINING, name: 'Remaining' },
                        ]}
                        valueKey={{ key: 'name', reduce: true }}
                        onChange={({ option }) => {
                            setAmountKind(option.kind)
                            setAmount('')
                        }}
                    />
                    {amountKind !== AmountExtendedKind.REMAINING
                        && (
                            <AmountInput
                                decimals={amountKind === AmountExtendedKind.PERCENT ? 2 : 0}
                                value={amount}
                                onChange={v => {
                                    if (!v) {
                                        setAmount(v)
                                    }
                                    else if (amountKind !== AmountExtendedKind.PERCENT) {
                                        setAmount(v)
                                    }
                                    else if (new BigNumber(v).lte(100)) {
                                        setAmount(v)
                                    }
                                }}
                                placeholder="Value"
                            />
                        )}

                    to
                    <Select
                        placeholder="Destination Type"
                        value={getAddressTypeName(recipientKind)}
                        options={[
                            { kind: AddressExtendedKind.VALUE, name: 'Value' },
                            { kind: AddressExtendedKind.SENDER, name: 'Sender' },
                            { kind: AddressExtendedKind.OWNER, name: 'Owner' },
                            { kind: AddressExtendedKind.STRATEGY, name: 'Strategy' },
                        ]}
                        valueKey={{ key: 'name', reduce: true }}
                        onChange={({ option }) => {
                            setRecipientKind(option.kind)
                            setRecipient(undefined)
                        }}
                    />
                    {recipientKind === AddressExtendedKind.VALUE && (
                        <TextInput
                            inputMode="decimal"
                            size="small"
                            placeholder="Recipient Address"
                            value={recipient ? recipient.toString() : ''}
                            onChange={e => {
                                if ((e.nativeEvent as InputEvent).inputType === 'deleteByCut') {
                                    setRecipient(undefined)
                                    return
                                }
                                setRecipient(new Address(e.target.value))
                            }}
                        />
                    )}
                    <small>Next command</small>
                    <AmountInput
                        decimals={0}
                        value={nextCommand.toString()}
                        onChange={e => setNextCommand(e && e !== id.toString() ? parseInt(e, 10) : 0)}
                        placeholder="Next command"
                    />
                </Box>
            ) : (
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
            )}

        </Box>
    )
}
