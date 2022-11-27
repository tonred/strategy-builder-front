import { TextInput } from 'grommet'
import * as React from 'react'

import { useField } from '@/hooks/useField'


type Props = {
    decimals: number
    value?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
}

export function AmountInput({ decimals, value, onBlur, onChange }: Props): JSX.Element {
    const field = useField({
        decimals,
        onBlur,
        onChange,
        value,
    })
    return (
        <TextInput
            inputMode="decimal"
            size="small"
            placeholder="Tokens Amount"
            value={value}
            onBlur={field.onBlur}
            onChange={field.onChange}
        />
    )
}
