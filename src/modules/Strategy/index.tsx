import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    Box, Diagram, DiagramConnectionAnchor, DiagramConnectionType, Spinner, Stack,
} from 'grommet'
import { Address } from 'everscale-inpage-provider'

import { useStrategy } from '@/hooks/useStrategy'
import { error } from '@/utils'
import { CommandElement } from '@/components/common/Command'
import { Command } from '@/types'
import { isAddressValid } from '@/utils/is-address-valid'

const anchor: DiagramConnectionAnchor = 'horizontal'
const type: DiagramConnectionType = 'curved'

export default function Strategy(): JSX.Element {
    const params = useParams()
    const navigate = useNavigate()
    const strategyStore = useStrategy()
    const strategyAddress = params.strategyAddress!
    const [loading, setLoading] = useState(true)
    const [connections, setConnections] = useState<any[]>([])
    const [columns, setColumns] = useState<any[]>([])
    const afterStrategyLoad = () => {
        const _connections: any[] = []
        // eslint-disable-next-line prefer-destructuring
        const commands = strategyStore.commands
        const roots = new Set<number>()
        const col = []
        // eslint-disable-next-line guard-for-in
        for (const commandId in commands) {
            const command = commands[commandId]
            const commandElId = `command_${commandId}`
            if (command.nextID !== 0) {
                _connections.push({
                    anchor,
                    color: 'accent-1',
                    fromTarget: commandElId,
                    id: `command_connection_${commandId}_${command.nextID}`,
                    round: false,
                    thickness: 'xsmall',
                    toTarget: `command_${command.nextID}`,
                    type,
                })
            }
            if (command.childID !== 0) {
                _connections.push({
                    anchor,
                    color: 'accent-1',
                    fromTarget: commandElId,
                    id: `command_connection_${commandId}_${command.childID}`,
                    round: false,
                    thickness: 'xsmall',
                    toTarget: `command_${command.childID}`,
                    type,
                })
            }
            if (command.kind === 0) {
                roots.add(parseInt(commandId, 10))
            }
        }
        setConnections(_connections)
        col.push(roots)
        let hasNext = true,
            depth = 0
        while (hasNext) {
            const colNext = new Set<number>()
            for (const prevCommand of col[depth]) {
                const a: Command = commands[prevCommand]
                if (a.nextID === 0 || a.childID === 0) {
                    if (a.nextID + a.childID > 0) colNext.add(a.nextID + a.childID)
                }
                else {
                    colNext.add(a.nextID)
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
                const command = strategyStore.commands[r]
                return <CommandElement id={r} command={command} />
            })
            return (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={i} pad="medium" gap="small">
                    {rows}
                </Box>
            )
        })
        setColumns(colEl)
    }
    useEffect(() => {
        if (strategyAddress && isAddressValid(strategyAddress)) {
            const address = new Address(strategyAddress)
            strategyStore.fetch(address).catch(e => error(e)).then(() => {
                afterStrategyLoad()
                setLoading(false)
            })

        }
        else {
            navigate('/builder', { replace: true })
        }

    }, [strategyAddress])

    return loading ? (
        <Spinner size="large" />
    ) : (
        <Stack interactiveChild="first">
            <Box
                width={{ min: '1200px' }}
                responsive={false}
                justify="center"
                align="center"
                direction="row"
                gap="medium"
            >
                {columns}
            </Box>
            <Diagram connections={connections} />
        </Stack>
    )
}
