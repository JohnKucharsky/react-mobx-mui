import { ChangeEvent, FocusEvent, memo } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Tooltip,
} from '@mui/material'
import { addTestKey, TestKeysType } from '@/utils/test-keys.ts'

const OutlinedInputEl = memo(function OutlinedInputEl({
  touched,
  error,
  label,
  name,
  handleChange,
  handleBlur,
  value,
  required,
  disabled,
  size = 'medium',
  focus,
  inputProps,
  testKey,
}: {
  touched: boolean | undefined
  error: string | undefined
  label: string
  name: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >,
  ) => void
  value: string
  required?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
  focus?: boolean
  inputProps?: OutlinedInputProps
  testKey?: TestKeysType
}) {
  return (
    <Tooltip title={touched && error}>
      <FormControl
        disabled={disabled}
        error={Boolean(touched && error)}
        fullWidth
        variant="outlined"
        size={size}
      >
        <InputLabel
          shrink={value ? true : undefined}
          required={Boolean(required)}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          {...addTestKey(testKey)}
          autoFocus={focus}
          type={'text'}
          onChange={handleChange}
          name={name}
          onBlur={handleBlur}
          value={value}
          label={label}
          {...inputProps}
        />
      </FormControl>
    </Tooltip>
  )
})

export default OutlinedInputEl
