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
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="strategy/:strategyAddress" element={<Strategy />} />
                <Route path="builder" element={<StrategyBuilder />} />
            </Routes>
            {/* <Footer /> */}
        </Grommet>
    )
}

export default App
