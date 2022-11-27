/* eslint-disable max-classes-per-file,sort-keys */

export const StrategyAbi = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],

    functions: [
        {
            name: 'extractTokens',
            inputs: [
                { name: 'additionalTokens', type: 'address[]' },
            ],
            outputs: [
                { name: 'tokens', type: 'address[]' },
            ],
        },
        {
            name: 'changeOwner',
            inputs: [
                { name: 'newOwner', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'withdraw',
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'amount', type: 'uint128' },
                { name: 'force', type: 'bool' },
            ],
            outputs: [],
        },
        {
            name: 'drain',
            inputs: [],
            outputs: [],
        },
        {
            name: 'claim',
            inputs: [
                { name: 'gauge', type: 'address' },
                { name: 'callID', type: 'uint32' },
                { name: 'nonce', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'onAcceptTokensTransfer',
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'amount', type: 'uint128' },
                { name: 'sender', type: 'address' },
                { name: 'value3', type: 'address' },
                { name: 'value4', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'onAcceptTokensMint',
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'amount', type: 'uint128' },
                { name: 'value2', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'trigger',
            inputs: [
                { name: 'amount', type: 'uint128' },
            ],
            outputs: [],
        },
        {
            name: 'hashTokenInput',
            inputs: [
                { name: 'kind', type: 'uint8' },
                { name: 'token', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                    name: 'sender',
                    type: 'tuple',
                },
            ],
            outputs: [
                { name: 'hash', type: 'uint256' },
            ],
        },
        {
            name: 'encodeTokenInputData',
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'minAmount', type: 'uint128' },
                { name: 'minGas', type: 'uint128' },
            ],
            outputs: [
                { name: 'encoded', type: 'cell' },
            ],
        },
        {
            name: 'decodeTokenInputData',
            inputs: [
                { name: 'params', type: 'cell' },
            ],
            outputs: [
                {
                    components: [{ name: 'token', type: 'address' }, {
                        name: 'minAmount',
                        type: 'uint128',
                    }, { name: 'minGas', type: 'uint128' }],
                    name: 'data',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'tokenInputToken',
            inputs: [
                { name: 'params', type: 'cell' },
            ],
            outputs: [
                { name: 'token', type: 'address' },
            ],
        },
        {
            name: 'encodeFarmActionData',
            inputs: [
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                { name: 'farm', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                    name: 'depositOwner',
                    type: 'tuple',
                },
                { name: 'lockTime', type: 'uint32' },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
            outputs: [
                { name: 'encoded', type: 'cell' },
            ],
        },
        {
            name: 'decodeFarmActionData',
            inputs: [
                { name: 'params', type: 'cell' },
                {
                    components: [{
                        components: [{ name: 'sender', type: 'address' }, {
                            name: 'parentID',
                            type: 'uint32',
                        }, { name: 'childID', type: 'uint32' }],
                        name: 'callData',
                        type: 'tuple',
                    }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }, {
                        name: 'spent',
                        type: 'uint128',
                    }],
                    name: 'data',
                    type: 'tuple',
                },
                { name: 'owner', type: 'address' },
            ],
            outputs: [
                {
                    components: [{ name: 'token', type: 'address' }, {
                        name: 'amount',
                        type: 'uint128',
                    }, { name: 'farm', type: 'address' }, {
                        name: 'remainingGasTo',
                        type: 'address',
                    }, { name: 'depositOwner', type: 'address' }, {
                        name: 'lockTime',
                        type: 'uint32',
                    }, { name: 'value', type: 'uint128' }, { name: 'flag', type: 'uint8' }],
                    name: 'decoded',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'encodeDepositActionData',
            inputs: [
                { name: 'second', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                { name: 'lp', type: 'address' },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
            outputs: [
                { name: 'encoded', type: 'cell' },
            ],
        },
        {
            name: 'decodeDepositActionData',
            inputs: [
                { name: 'params', type: 'cell' },
                {
                    components: [{
                        components: [{ name: 'sender', type: 'address' }, {
                            name: 'parentID',
                            type: 'uint32',
                        }, { name: 'childID', type: 'uint32' }],
                        name: 'callData',
                        type: 'tuple',
                    }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }, {
                        name: 'spent',
                        type: 'uint128',
                    }],
                    name: 'data',
                    type: 'tuple',
                },
            ],
            outputs: [
                {
                    components: [{ name: 'token', type: 'address' }, {
                        name: 'second',
                        type: 'address',
                    }, { name: 'amount', type: 'uint128' }, {
                        name: 'lp',
                        type: 'address',
                    }, { name: 'remainingGasTo', type: 'address' }, {
                        name: 'value',
                        type: 'uint128',
                    }, { name: 'flag', type: 'uint8' }],
                    name: 'decoded',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'depositChildToken',
            inputs: [
                { name: 'params', type: 'cell' },
            ],
            outputs: [
                { name: 'token', type: 'address' },
            ],
        },
        {
            name: 'encodeSwapActionData',
            inputs: [
                { name: 'to', type: 'address' },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
            outputs: [
                { name: 'encoded', type: 'cell' },
            ],
        },
        {
            name: 'decodeSwapActionData',
            inputs: [
                { name: 'params', type: 'cell' },
                {
                    components: [{
                        components: [{ name: 'sender', type: 'address' }, {
                            name: 'parentID',
                            type: 'uint32',
                        }, { name: 'childID', type: 'uint32' }],
                        name: 'callData',
                        type: 'tuple',
                    }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }, {
                        name: 'spent',
                        type: 'uint128',
                    }],
                    name: 'data',
                    type: 'tuple',
                },
            ],
            outputs: [
                {
                    components: [{ name: 'from', type: 'address' }, {
                        name: 'to',
                        type: 'address',
                    }, { name: 'amount', type: 'uint128' }, {
                        name: 'remainingGasTo',
                        type: 'address',
                    }, { name: 'value', type: 'uint128' }, { name: 'flag', type: 'uint8' }],
                    name: 'decoded',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'swapChildToken',
            inputs: [
                { name: 'params', type: 'cell' },
            ],
            outputs: [
                { name: 'token', type: 'address' },
            ],
        },
        {
            name: 'encodeTransferActionData',
            inputs: [
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'uint128' }],
                    name: 'amount',
                    type: 'tuple',
                },
                {
                    components: [{ name: 'kind', type: 'uint8' }, { name: 'value', type: 'address' }],
                    name: 'recipient',
                    type: 'tuple',
                },
                { name: 'isDeployWallet', type: 'bool' },
                { name: 'payload', type: 'cell' },
                { name: 'value', type: 'uint128' },
                { name: 'flag', type: 'uint8' },
            ],
            outputs: [
                { name: 'encoded', type: 'cell' },
            ],
        },
        {
            name: 'decodeTransferActionData',
            inputs: [
                { name: 'params', type: 'cell' },
                {
                    components: [{
                        components: [{ name: 'sender', type: 'address' }, {
                            name: 'parentID',
                            type: 'uint32',
                        }, { name: 'childID', type: 'uint32' }],
                        name: 'callData',
                        type: 'tuple',
                    }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }, {
                        name: 'spent',
                        type: 'uint128',
                    }],
                    name: 'data',
                    type: 'tuple',
                },
                { name: 'owner', type: 'address' },
            ],
            outputs: [
                {
                    components: [{ name: 'token', type: 'address' }, {
                        name: 'amount',
                        type: 'uint128',
                    }, { name: 'recipient', type: 'address' }, {
                        name: 'isDeployWallet',
                        type: 'bool',
                    }, { name: 'remainingGasTo', type: 'address' }, {
                        name: 'payload',
                        type: 'cell',
                    }, { name: 'value', type: 'uint128' }, { name: 'flag', type: 'uint8' }, {
                        name: 'force',
                        type: 'bool',
                    }],
                    name: 'decoded',
                    type: 'tuple',
                },
            ],
        },
        {
            name: 'onBounceTokensTransfer',
            inputs: [
                { name: 'token', type: 'address' },
                { name: 'amount', type: 'uint128' },
                { name: 'value2', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'onWalletDeployed',
            inputs: [
                { name: 'wallet', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'getWallet',
            inputs: [
                { name: 'token', type: 'address' },
            ],
            outputs: [
                { name: 'wallet', type: 'address' },
            ],
        },
        {
            name: 'constructor',
            inputs: [],
            outputs: [],
        },
        {
            name: '_pendingWallets',
            inputs: [],
            outputs: [
                { name: '_pendingWallets', type: 'map(address,bool)' },
            ],
        },
        {
            name: '_wallets',
            inputs: [],
            outputs: [
                { name: '_wallets', type: 'map(address,address)' },
            ],
        },
        {
            name: '_balances',
            inputs: [],
            outputs: [
                { name: '_balances', type: 'map(address,uint128)' },
            ],
        },
        {
            name: '_root',
            inputs: [],
            outputs: [
                { name: '_root', type: 'address' },
            ],
        },
        {
            name: '_owner',
            inputs: [],
            outputs: [
                { name: '_owner', type: 'address' },
            ],
        },
        {
            name: '_commands',
            inputs: [],
            outputs: [
                {
                    components: [{ name: 'kind', type: 'uint8' }, {
                        name: 'params',
                        type: 'cell',
                    }, { name: 'childID', type: 'uint32' }, { name: 'nextID', type: 'uint32' }],
                    name: '_commands',
                    type: 'map(uint32,tuple)',
                },
            ],
        },
        {
            name: '_inputs',
            inputs: [],
            outputs: [
                { name: '_inputs', type: 'map(uint256,uint32)' },
            ],
        },
    ],
    data: [],
    events: [
        {
            name: 'ChangedOwner',
            inputs: [
                { name: 'oldOwner', type: 'address' },
                { name: 'newOwner', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'ExecuteCommand',
            inputs: [
                { name: 'id', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'ExecuteInput',
            inputs: [
                { name: 'id', type: 'uint32' },
            ],
            outputs: [],
        },
        {
            name: 'ReturnTokens',
            inputs: [],
            outputs: [],
        },
    ],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_pendingWallets', type: 'map(address,bool)' },
        { name: '_wallets', type: 'map(address,address)' },
        { name: '_balances', type: 'map(address,uint128)' },
        { name: '_root', type: 'address' },
        { name: '_owner', type: 'address' },
        {
            components: [{ name: 'kind', type: 'uint8' }, { name: 'params', type: 'cell' }, {
                name: 'childID',
                type: 'uint32',
            }, { name: 'nextID', type: 'uint32' }],
            name: '_commands',
            type: 'map(uint32,tuple)',
        },
        { name: '_inputs', type: 'map(uint256,uint32)' },
        {
            components: [{
                components: [{ name: 'sender', type: 'address' }, {
                    name: 'parentID',
                    type: 'uint32',
                }, { name: 'childID', type: 'uint32' }],
                name: 'callData',
                type: 'tuple',
            }, { name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }, {
                name: 'spent',
                type: 'uint128',
            }],
            name: '_executionData',
            type: 'tuple',
        },
    ],
} as const

export const StrategyBuilder = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'owner', type: 'address' },
                { name: 'platformCode', type: 'cell' },
                { name: 'strategyCode', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'expectedStrategyValue',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'tokensCount', type: 'uint32' },
            ],
            outputs: [
                { name: 'value', type: 'uint128' },
            ],
        },
        {
            name: 'createStrategy',
            inputs: [
                {
                    components: [{ name: 'owner', type: 'address' }, {
                        components: [{
                            name: 'kind',
                            type: 'uint8',
                        }, { name: 'params', type: 'cell' }, { name: 'childID', type: 'uint32' }, {
                            name: 'nextID',
                            type: 'uint32',
                        }],
                        name: 'commands',
                        type: 'map(uint32,tuple)',
                    }, { name: 'inputs', type: 'map(uint256,uint32)' }],
                    name: 'data',
                    type: 'tuple',
                },
                { name: 'nonce', type: 'uint64' },
                { name: 'additionalTokens', type: 'address[]' },
                { name: 'callbackTo', type: 'address' },
            ],
            outputs: [
                { name: 'strategy', type: 'address' },
            ],
        },
        {
            name: 'checkStrategy',
            inputs: [
                {
                    components: [{ name: 'owner', type: 'address' }, {
                        components: [{
                            name: 'kind',
                            type: 'uint8',
                        }, { name: 'params', type: 'cell' }, { name: 'childID', type: 'uint32' }, {
                            name: 'nextID',
                            type: 'uint32',
                        }],
                        name: 'commands',
                        type: 'map(uint32,tuple)',
                    }, { name: 'inputs', type: 'map(uint256,uint32)' }],
                    name: 'data',
                    type: 'tuple',
                },
            ],
            outputs: [],
        },
        {
            name: 'drain',
            inputs: [],
            outputs: [],
        },
        {
            name: 'calcAddress',
            inputs: [
                { name: 'stateInit', type: 'cell' },
            ],
            outputs: [
                { name: 'value0', type: 'address' },
            ],
        },
        {
            name: 'hashCommand',
            inputs: [
                {
                    components: [{ name: 'kind', type: 'uint8' }, {
                        name: 'params',
                        type: 'cell',
                    }, { name: 'childID', type: 'uint32' }, { name: 'nextID', type: 'uint32' }],
                    name: 'command',
                    type: 'tuple',
                },
            ],
            outputs: [
                { name: 'value0', type: 'uint32' },
            ],
        },
        {
            name: 'upgrade',
            inputs: [
                { name: 'code', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: '_randomNonce',
            inputs: [],
            outputs: [
                { name: '_randomNonce', type: 'uint256' },
            ],
        },
        {
            name: '_owner',
            inputs: [],
            outputs: [
                { name: '_owner', type: 'address' },
            ],
        },
        {
            name: '_platformCode',
            inputs: [],
            outputs: [
                { name: '_platformCode', type: 'cell' },
            ],
        },
        {
            name: '_strategyCode',
            inputs: [],
            outputs: [
                { name: '_strategyCode', type: 'cell' },
            ],
        },
    ],
    data: [
        { key: 1, name: '_randomNonce', type: 'uint256' },
    ],
    events: [
        {
            name: 'CreatedStrategy',
            inputs: [
                { name: 'strategy', type: 'address' },
                { name: 'owner', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'CodeUpgraded',
            inputs: [],
            outputs: [],
        },
    ],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_randomNonce', type: 'uint256' },
        { name: '_owner', type: 'address' },
        { name: '_platformCode', type: 'cell' },
        { name: '_strategyCode', type: 'cell' },
    ],
} as const

export const RootAbi = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [
                { name: 'initialSupplyTo', type: 'address' },
                { name: 'initialSupply', type: 'uint128' },
                { name: 'deployWalletValue', type: 'uint128' },
                { name: 'mintDisabled', type: 'bool' },
                { name: 'burnByRootDisabled', type: 'bool' },
                { name: 'burnPaused', type: 'bool' },
                { name: 'remainingGasTo', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'supportsInterface',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'interfaceID', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'disableMint',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'mintDisabled',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'burnTokens',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'walletOwner', type: 'address' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'callbackTo', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'disableBurnByRoot',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'burnByRootDisabled',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'burnPaused',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'setBurnPaused',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'paused', type: 'bool' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'transferOwnership',
            inputs: [
                { name: 'newOwner', type: 'address' },
                { name: 'remainingGasTo', type: 'address' },
                {
                    components: [{ name: 'value', type: 'uint128' }, { name: 'payload', type: 'cell' }],
                    name: 'callbacks',
                    type: 'map(address,tuple)',
                },
            ],
            outputs: [],
        },
        {
            name: 'name',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'string' },
            ],
        },
        {
            name: 'symbol',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'string' },
            ],
        },
        {
            name: 'decimals',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'uint8' },
            ],
        },
        {
            name: 'totalSupply',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'uint128' },
            ],
        },
        {
            name: 'walletCode',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'cell' },
            ],
        },
        {
            name: 'rootOwner',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'address' },
            ],
        },
        {
            name: 'walletOf',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'walletOwner', type: 'address' },
            ],
            outputs: [
                { name: 'value0', type: 'address' },
            ],
        },
        {
            name: 'deployWallet',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'walletOwner', type: 'address' },
                { name: 'deployWalletValue', type: 'uint128' },
            ],
            outputs: [
                { name: 'tokenWallet', type: 'address' },
            ],
        },
        {
            name: 'mint',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipient', type: 'address' },
                { name: 'deployWalletValue', type: 'uint128' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'notify', type: 'bool' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'acceptBurn',
            id: '0x192B51B1',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'walletOwner', type: 'address' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'callbackTo', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'sendSurplusGas',
            inputs: [
                { name: 'to', type: 'address' },
            ],
            outputs: [],
        },
    ],
    data: [
        { key: 1, name: 'name_', type: 'string' },
        { key: 2, name: 'symbol_', type: 'string' },
        { key: 3, name: 'decimals_', type: 'uint8' },
        { key: 4, name: 'rootOwner_', type: 'address' },
        { key: 5, name: 'walletCode_', type: 'cell' },
        { key: 6, name: 'randomNonce_', type: 'uint256' },
        { key: 7, name: 'deployer_', type: 'address' },
    ],
    events: [],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: 'name_', type: 'string' },
        { name: 'symbol_', type: 'string' },
        { name: 'decimals_', type: 'uint8' },
        { name: 'rootOwner_', type: 'address' },
        { name: 'walletCode_', type: 'cell' },
        { name: 'totalSupply_', type: 'uint128' },
        { name: 'burnPaused_', type: 'bool' },
        { name: 'burnByRootDisabled_', type: 'bool' },
        { name: 'mintDisabled_', type: 'bool' },
        { name: 'randomNonce_', type: 'uint256' },
        { name: 'deployer_', type: 'address' },
    ],
} as const


export const TokenWalletAbi = {
    'ABI version': 2,
    version: '2.2',
    header: ['pubkey', 'time', 'expire'],
    functions: [
        {
            name: 'constructor',
            inputs: [],
            outputs: [],
        },
        {
            name: 'supportsInterface',
            inputs: [
                { name: 'answerId', type: 'uint32' },
                { name: 'interfaceID', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'bool' },
            ],
        },
        {
            name: 'destroy',
            inputs: [
                { name: 'remainingGasTo', type: 'address' },
            ],
            outputs: [],
        },
        {
            name: 'burnByRoot',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'callbackTo', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'burn',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'callbackTo', type: 'address' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'balance',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'uint128' },
            ],
        },
        {
            name: 'owner',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'address' },
            ],
        },
        {
            name: 'root',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'address' },
            ],
        },
        {
            name: 'walletCode',
            inputs: [
                { name: 'answerId', type: 'uint32' },
            ],
            outputs: [
                { name: 'value0', type: 'cell' },
            ],
        },
        {
            name: 'transfer',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipient', type: 'address' },
                { name: 'deployWalletValue', type: 'uint128' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'notify', type: 'bool' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'transferToWallet',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'recipientTokenWallet', type: 'address' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'notify', type: 'bool' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'acceptTransfer',
            id: '0x67A0B95F',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'sender', type: 'address' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'notify', type: 'bool' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'acceptMint',
            id: '0x4384F298',
            inputs: [
                { name: 'amount', type: 'uint128' },
                { name: 'remainingGasTo', type: 'address' },
                { name: 'notify', type: 'bool' },
                { name: 'payload', type: 'cell' },
            ],
            outputs: [],
        },
        {
            name: 'sendSurplusGas',
            inputs: [
                { name: 'to', type: 'address' },
            ],
            outputs: [],
        },
    ],
    data: [
        { key: 1, name: 'root_', type: 'address' },
        { key: 2, name: 'owner_', type: 'address' },
    ],
    events: [],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: 'root_', type: 'address' },
        { name: 'owner_', type: 'address' },
        { name: 'balance_', type: 'uint128' },
    ],
} as const

