import React from 'react'
import { Grommet } from 'grommet'
import {
    Route,
    Routes,
} from 'react-router-dom'

import theme from '@/styles/theme'
import Strategy from '@/pages/strategy/item'
import StrategyBuilder from '@/modules/StrategyBuilder'
import { Header } from '@/components/layout/Header'
import Home from '@/pages/home'

function App() {
    return (
        <Grommet theme={theme}>
            {/* <Home/> */}
            <Header />
            {/* <Box pad="large" align="center"> */}
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="users" element={<Users/>}/> */}
                {/* <Route path="pools" element={<Pools/>}/> */}
                <Route path="strategy/:strategyAddress" element={<Strategy />} />
                {/* <Route path=":strategyAddress" element={<Strategy />} /> */}
                {/* </Route> */}
                <Route path="builder" element={<StrategyBuilder />} />
                {/* <Route path="pool" element={<Pool/>}> */}
                {/*    <Route path=":poolId" element={<Pool/>}/> */}
                {/* </Route> */}
            </Routes>
            {/* </Box> */}
            {/* <Footer/> */}
        </Grommet>
    )
}

export default App
