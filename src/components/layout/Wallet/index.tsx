import * as React from 'react'
import { Box, Button } from 'grommet'
import { Observer } from 'mobx-react-lite'

import { useWallet } from '@/stores/WalletService'
import { sliceAddress } from '@/utils'
import './index.css'

export function Wallet(): JSX.Element {
    const wallet = useWallet()

    return (
        <Observer>
            {() => {
                if (wallet.isConnected) {
                    return (
                        <Box direction="row" gap="small" align="center">
                            <small>{sliceAddress(wallet.address)}</small>
                            <Button label="Disconnect" onClick={wallet.disconnect} />
                        </Box>
                    )
                }
                return (
                    <Button
                        secondary
                        label="Connect Wallet"
                        onClick={wallet.connect}
                        disabled={wallet.isConnecting}
                    />
                )
            }}
        </Observer>

    )


}
