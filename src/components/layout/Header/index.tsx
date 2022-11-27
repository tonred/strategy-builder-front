import * as React from 'react'
import { Button, Header as GHeader } from 'grommet'
import { useNavigate } from 'react-router-dom'

import { Wallet } from '@/components/layout/Wallet'

export function Header(): JSX.Element {
    const navigate = useNavigate()

    return (
        <GHeader
            sticky="scrollup" pad="small" alignContent="center"
        >
            <Button
                icon={(
                    <img
                        height="32"
                        alt="home"
                        src="/static/EVERIcon.svg"
                    />
                )}
                onClick={() => navigate('/')}
            />
            {/* <Menu label="account" items={[{label: 'logout'}]}/> */}
            <Wallet />
        </GHeader>
    )
}
