import * as React from 'react'

import { StrategyStore } from '@/modules/Strategy/stores/StrategyStore'

export function useStrategy(): StrategyStore {
    const ref = React.useRef<StrategyStore>()
    ref.current = ref.current || new StrategyStore()
    return ref.current
}
