import * as React from 'react'
import { Box } from 'grommet'

import { Command, CommandKind } from '@/types'
import { CommandInputElement } from '@/components/common/Command/input'
import { CommandTransferElement } from '@/components/common/Command/transfer'
import { CommandSwapElement } from '@/components/common/Command/swap'
import { CommandDepositElement } from '@/components/common/Command/deposit'
import { CommandFarmElement } from '@/components/common/Command/farm'


type Props = {
    id: number;
    command: Command;
    edit?: (id: number, command?: Command)=>void;
}

export function CommandElement({ id, command, edit }: Props): JSX.Element {
    switch (command.kind) {
        case CommandKind.EXIT:
            return <CommandInputElement id={id} command={command} edit={edit} />
        case CommandKind.TRANSFER:
            return <CommandTransferElement id={id} command={command} edit={edit} />
        case CommandKind.SWAP:
            return <CommandSwapElement id={id} command={command} />
        case CommandKind.DEPOSIT:
            return <CommandDepositElement id={id} command={command} />
        case CommandKind.FARM:
            return <CommandFarmElement id={id} command={command} />
        default: {
            return (
                <Box
                    pad="xsmall"
                    key={id}
                    id={`command_${id}`}
                    border={{ size: 'small' }}
                >
                    <p>
                        id:
                        {id}
                    </p>
                    <p>
                        kind:
                        {command.kind}
                    </p>
                </Box>
            )
        }
    }
}
