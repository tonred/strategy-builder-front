import { Address } from 'everscale-inpage-provider'

export * from '@/utils/console'
export * from '@/utils/debounce'
export * from '@/utils/noop'
export * from '@/utils/storage'
export * from '@/utils/formatted-amount'
export * from '@/utils/slice-address'
export * from '@/utils/throw-exeption'

export const zeroAddress = new Address('0:0000000000000000000000000000000000000000000000000000000000000000')
