import { makeAutoObservable } from 'mobx'
import { Address, FullContractState } from 'everscale-inpage-provider'

import { error } from '@/utils'
import { useStaticRpc } from '@/hooks/useStaticRpc'
import Strategy from '@/misc/strategy'
import { Command } from '@/types'

const staticRpc = useStaticRpc()

export type StrategyStoreData = {
    // contract?: Contract;
    commands: Record<number, Command>;
    state?: FullContractState;
}
//
export type StrategyStoreState = {
    loading?: boolean;
}

//
export class StrategyStore {

    protected data: StrategyStoreData = { commands: [] }

    protected _state: StrategyStoreState = {}

    constructor() {
        makeAutoObservable(this)
    }

    public async fetch(address: Address): Promise<void> {
        if (this._state.loading) {
            return
        }

        this.setLoading(true)

        try {
            const state = await staticRpc.getFullContractState({ address })
            // todo verify root
            const rawCommands = await Strategy.getCommands(address, state?.state)
            const commands: Record<number, Command> = {}
            for (const rawCommand of rawCommands) {
                commands[parseInt(rawCommand[0], 10)] = {
                    childID: parseInt(rawCommand[1].childID, 10),
                    kind: parseInt(rawCommand[1].kind, 10),
                    nextID: parseInt(rawCommand[1].nextID, 10),
                    params: rawCommand[1].params,
                }

            }
            this.setData({ commands, state: state?.state })
        }
        catch (e) {
            error(e)
        }

        this.setLoading(false)
    }

    protected setData(data: StrategyStoreData): void {
        this.data = data
    }

    protected setLoading(loading: boolean): void {
        this._state.loading = loading
    }

    public get loading(): boolean | undefined {
        return this._state.loading
    }


    public get commands(): Record<number, Command> {
        return this.data.commands
    }

    //     public get id(): number | undefined {
    //         return this.data.data?.id;
    //     }
    //
    //     public get title(): string | undefined {
    //         return this.data.data?.title;
    //     }
    //
    //     public get description(): string | undefined {
    //         return this.data.data?.description;
    //     }
    //
    //     public get target(): number | undefined {
    //         return this.data.data?.target;
    //     }
    //
    //     public get balance(): number | undefined {
    //         return this.data.data?.balance;
    //     }
    //
    //     public get state(): PoolState | undefined {
    //         return this.data.data?.state;
    //     }
    //
    //     public get spender(): string | undefined {
    //         return this.data.data?.spender;
    //     }
    //
    //     public get startTime(): number | undefined {
    //         return this.data.data?.startTime;
    //     }
    //
    //     public get finishTime(): number | undefined {
    //         return this.data.data?.finishTime;
    //     }
    //
    //     public get nfts(): NFT[] | undefined {
    //         return this.data.data?.nfts;
    //     }
    //
    //     public get collection(): string | undefined {
    //         return this.data.data?.collection;
    //     }

}
