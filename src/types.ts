export enum CommandKind {
    EXIT,
    TRANSFER,
    SWAP,
    DEPOSIT,
    FARM,
    WRAP,
    UNWRAP,
}

export enum AddressExtendedKind {
    VALUE, SENDER, OWNER, STRATEGY
}
export enum AmountExtendedKind {
    VALUE, PERCENT, REMAINING
}

export type Command = {
    kind: CommandKind;
    params: string;
    childID: number;
    nextID: number
}


export type Token = {
    balance?: string;
    decimals: number;
    logoURI?: string;
    name?: string;
    address: string;
    symbol?: string;
    wallet?: string;
}
