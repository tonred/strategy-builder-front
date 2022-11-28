import * as React from 'react'
import { useEffect, useState } from 'react'
import {
    Box, Button, Diagram, DiagramConnectionAnchor, DiagramConnectionType, Select, Stack,
} from 'grommet'
import { Address } from 'everscale-inpage-provider'
import { useNavigate } from 'react-router-dom'

import { AddressExtendedKind, Command, CommandKind } from '@/types'
import { CommandElement } from '@/components/common/Command'
import { StrategyBuilderAbi } from '@/misc/abi'
import { useWallet } from '@/stores/WalletService'
import { useRpc } from '@/hooks/useRpc'
import { zeroAddress } from '@/utils'

export default function StrategyBuilder(): JSX.Element {
    const wallet = useWallet()
    const rpc = useRpc()
    const navigate = useNavigate()

    const [deploying, setDeploying] = useState(false)
    const [commandIndex, setCommandIndex] = useState<number>(1)
    const [columns, setColumns] = useState<JSX.Element[]>([])
    const [connections, setConnections] = useState<any[]>([])
    const [commands, setCommands] = useState<Record<number, Command>>({
        1: { childID: 0, kind: CommandKind.EXIT, nextID: 0, params: '' },
    })
    const onEdit = (id: number, command?: Command) => {
        if (!command) {
            const newCommands: Record<number, Command> = { ...commands }
            delete newCommands[id]
            setCommands(newCommands)
        }
        else {
            const newCommand: Record<number, Command> = {}
            newCommand[id] = command
            setCommands({ ...commands, ...newCommand })
        }
    }
    useEffect(() => {
        const roots = new Set<number>()
        const col = []
        const _connections = []
        // eslint-disable-next-line guard-for-in
        for (const commandId in commands) {
            const command = commands[commandId]
            if (command.kind === 0) {
                roots.add(parseInt(commandId, 10))
            }
            else {
                let used = false
                // eslint-disable-next-line guard-for-in
                for (const commandId2 in commands) {
                    const command2 = commands[commandId2]
                    if (command2
                        && (command2.childID.toString() === commandId || command2.nextID.toString() === commandId)) {
                        used = true
                    }
                }
                if (!used) {
                    roots.add(parseInt(commandId, 10))
                }
            }

        }
        col.push(roots)
        let hasNext = true,
            depth = 0
        const connection = (
            from: number,
            to: number,
            anchor: DiagramConnectionAnchor = 'horizontal',
            type: DiagramConnectionType = 'curved',
        ):
            any => ({
            anchor,
            color: 'accent-1',
            fromTarget: `command_${from}`,
            id: `command_connection_${from}_${to}`,
            round: false,
            thickness: 'xsmall',
            toTarget: `command_${to}`,
            type,
        })
        const checkHasNeededTarget = (column: Set<number>, target: number, target2?: number): boolean => {
            for (const id of column) {
                const a: Command = commands[id]
                if (a.nextID === target
                    || a.childID === target
                    || a.nextID === target2
                    || a.childID === target2) return true
            }
            return false
        }
        while (hasNext) {
            const colNext = new Set<number>()
            for (const prevCommand of col[depth]) {
                const a: Command = commands[prevCommand]
                if (a) {
                    if (a.nextID === 0 || a.childID === 0) {
                        if (a.nextID + a.childID > 0) {
                            colNext.add(a.nextID + a.childID)
                            _connections.push(connection(prevCommand, a.nextID + a.childID))
                        }
                    }
                    else if (checkHasNeededTarget(colNext, a.nextID, a.childID)) {
                        colNext.add(a.nextID)
                        _connections.push(connection(prevCommand, a.nextID, 'vertical'))
                        _connections.push(connection(prevCommand, a.childID))
                    }
                    else {
                        let used = false
                        for (const column of col.slice(1)) {
                            if (checkHasNeededTarget(column, a.nextID, a.childID)) {
                                column.add(a.nextID)
                                used = true
                                break
                            }
                        }
                        if (!used) {
                            colNext.add(a.nextID)
                        }
                        _connections.push(connection(prevCommand, a.nextID, 'vertical'))
                        _connections.push(connection(prevCommand, a.childID))
                    }
                }

            }
            if (colNext.size > 0) {
                col.push(colNext)
                depth += 1
            }
            else {
                hasNext = false
            }
        }
        const colEl = col.map((c, i) => {
            const rows = Array.from(c).map(r => {
                const command = commands[r]
                if (!command) return <CommandElement id={r} command={{ childID: 0, kind: 999, nextID: 0, params: '' }} />
                return <CommandElement id={r} command={command} edit={onEdit} />
            })
            return (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={i} pad="medium" gap="medium">
                    {rows}
                </Box>
            )
        })
        setConnections(_connections)
        setColumns(colEl)
    }, [commands])

    const deployStrategy = async () => {
        const inputs = []
        const inputsHashes: Record<string, number> = {}
        // eslint-disable-next-line guard-for-in
        for (const commandId in commands) {
            const command = commands[commandId]
            if (command.kind === 0) {
                inputs.push(parseInt(commandId, 10))
            }
        }
        if (inputs.length === 0 || !wallet.address) return
        const me = new Address(wallet.address)
        const builder = new rpc.Contract(
            StrategyBuilderAbi,
            new Address('0:bfa6edc24504f7e40904c8e8d9a942bd385b256a78f0f45000ca7b61016014bf'),
        )
        for (const commandId of inputs) {
            const { data } = await rpc.unpackFromCell({
                allowPartial: false,
                boc: commands[commandId].params,
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
            })
            const { boc } = await rpc.packIntoCell({
                // @ts-ignore
                data: {
                    kind: 0,
                    sender: { kind: AddressExtendedKind.SENDER, value: zeroAddress },
                    // @ts-ignore
                    token: data.token,
                },
                structure: [
                    { name: 'kind', type: 'uint8' },
                    { name: 'token', type: 'address' },
                    {
                        components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                        name: 'sender',
                        type: 'tuple',
                    },
                ],
            })
            const hash = BigInt(`0x${await rpc.getBocHash(boc)}`).toString()
            inputsHashes[hash] = commandId
        }

        const nonce = Math.floor(Date.now() * 1000)
        const subscription = (await rpc.subscribe('transactionsFound', {
            address: me,
        })).on('data', txs => {
            txs.transactions.forEach(async tx => {
                const decodedTx = await wallet.walletContractCallbacks?.decodeTransaction({
                    methods: ['onStrategyCreated'],
                    transaction: tx,
                })
                if (decodedTx?.method === 'onStrategyCreated' && decodedTx.input.nonce === nonce.toString()) {
                    await subscription.unsubscribe()
                    navigate(`/strategy/${decodedTx.input.strategy.toString()}`)

                }
            })
        })
        setDeploying(true)
        try {
            await builder.methods.createStrategy({
                additionalTokens: [],
                callbackTo: me,
                data: {
                    commands: Object.entries(commands),
                    inputs: Object.entries(inputsHashes),
                    owner: me,
                },
                nonce,
            }).send({
                amount: '10000000000',
                bounce: true,
                from: me,
            })
        }
        catch (e) {
            setDeploying(false)
        }

    }

    return (
        <Stack interactiveChild="first">
            <Box
                responsive={false}
                align="center"
                direction="row"
                flex={false}
                gap="medium"
            >
                {columns}
                <Box flex={false} gap="medium">
                    {/* <Button label="Add command" onClick={() => setShow(true)}/> */}
                    <Button label="Deploy" onClick={deployStrategy} disabled={deploying} />
                    <Select
                        placeholder="Add command"
                        value=""
                        options={[
                            { kind: CommandKind.EXIT, name: 'Input' },
                            { kind: CommandKind.TRANSFER, name: 'Transfer' },
                            // { kind: CommandKind.SWAP, name: 'Swap' },
                            // { kind: CommandKind.DEPOSIT, name: 'Deposit' },
                            // { kind: CommandKind.FARM, name: 'Farm' },
                        ]}
                        valueKey={{ key: 'name', reduce: true }}
                        onChange={({ option }) => {
                            const newCommand: Record<number, Command> = {}
                            newCommand[commandIndex + 1] = {
                                childID: 0,
                                kind: option.kind,
                                nextID: 0,
                                params: '',
                            }
                            setCommands({ ...commands, ...newCommand })
                            setCommandIndex(commandIndex + 1)
                        }}
                    />
                </Box>
            </Box>
            <Diagram connections={connections} />

        </Stack>
    )
}
