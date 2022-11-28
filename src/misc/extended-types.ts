import { AddressExtendedKind, AmountExtendedKind } from '@/types'

export function getAmountTypeName(kind?: AmountExtendedKind): string {
    switch (kind) {
        case AmountExtendedKind.PERCENT:
            return 'Percent'
        case AmountExtendedKind.REMAINING:
            return 'Remaining'
        case AmountExtendedKind.VALUE:
            return 'Value'
        default:
            return ''
    }
}

export function getAddressTypeName(kind?: AddressExtendedKind): string {
    switch (kind) {
        case AddressExtendedKind.VALUE:
            return 'Value'
        case AddressExtendedKind.SENDER:
            return 'Sender'
        case AddressExtendedKind.OWNER:
            return 'Owner'
        case AddressExtendedKind.STRATEGY:
            return 'Strategy'
        default:
            return ''
    }
}
