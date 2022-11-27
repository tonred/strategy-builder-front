import { Address, FullContractState } from 'everscale-inpage-provider'

// import { useRpc } from '@/hooks/useRpc'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import { StrategyAbi } from '@/misc/abi'

// const rpc = useRpc()
const staticRpc = useStaticRpc()


export default class Strategy {

    public static async getCommands(
        strategyAddress: Address,
        state?: FullContractState,
    ): Promise<(readonly [
        string, { kind: string; } & { params: string; } & { childID: string; } & { nextID: string; }
    ])[]> {
        const strategyContract = new staticRpc.Contract(StrategyAbi, strategyAddress)
        return (await strategyContract.methods._commands({}).call({
            cachedState: state,
        }))._commands
    }

}
