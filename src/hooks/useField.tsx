import * as React from 'react'
import BigNumber from 'bignumber.js'

export function isGoodBignumber(value: BigNumber | number | string, nonZeroCheck = true): boolean {
    const valueBN = value instanceof BigNumber ? value : new BigNumber(value)

    return (
        valueBN.isFinite()
        && !valueBN.isNaN()
        && valueBN.isPositive()
        && (nonZeroCheck ? !valueBN.isZero() : true)
    )
}

export function truncateDecimals(value: string, decimals?: number): string | undefined {
    const result = new BigNumber(value || 0)

    if (!isGoodBignumber(result)) {
        return value
    }

    if (decimals !== undefined && (result.decimalPlaces() ?? 0) > decimals) {
        return result.dp(decimals, BigNumber.ROUND_DOWN).toFixed()
    }

    return result.toFixed()
}

type FieldShape = {
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

type Props = {
    decimals?: number;
    value?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
}


export function useField({ decimals, ...props }: Props): FieldShape {
    const onBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        props.onBlur?.(event)
        const { value } = event.target
        if (value.length === 0) {
            return
        }
        const validatedAmount = truncateDecimals(value, decimals)
        if (props.value !== validatedAmount && validatedAmount != null) {
            props.onChange?.(validatedAmount)
        }
        else if (validatedAmount == null) {
            props.onChange?.('')
        }
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        if ((event.nativeEvent as InputEvent).inputType === 'deleteByCut') {
            props.onChange?.('')
            return
        }
        let { value } = event.target
        value = value.replace(/[,]/g, '.')
        if (
            (props.value
            && (props.value.includes('.')
            && value.length > props.value.length
            && value.charAt(value.length - 1) === '.'))
        ) {
            return
        }
        value = value.replace(/[.]+/g, '.')
        value = value.replace(/(?!- )[^0-9.]/g, '')
        props.onChange?.(value)
    }

    return { onBlur, onChange }
}
