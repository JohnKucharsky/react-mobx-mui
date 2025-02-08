import {
  ChangeEvent,
  ClipboardEventHandler,
  FocusEvent,
  forwardRef,
} from 'react'
import { TextField } from '@mui/material'
import { NumericFormatProps, PatternFormat } from 'react-number-format'
import { addTestKey, TestKeysType } from '@/utils/test-keys.ts'

export default function PhoneNumberInputEl({
  touched,
  error,
  label,
  name,
  handleChange,
  handleBlur,
  value,
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
  testKey?: TestKeysType
}) {
  return (
    <TextField
      {...addTestKey(testKey)}
      size={'small'}
      error={Boolean(touched && error)}
      fullWidth
      helperText={touched && error}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      type="text"
      value={value}
      variant="outlined"
      slotProps={{
        inputLabel: { shrink: true },
        input: { inputComponent: NumericFormatCustom as never },
      }}
    />
  )
}

const NumericFormatCustom = forwardRef<
  NumericFormatProps,
  {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
  }
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props
  const onPaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
  }

  return (
    <PatternFormat
      {...other}
      onPaste={onPaste}
      format="+7 (###) ### ## ##"
      allowEmptyFormatting
      mask="_"
      getInputRef={ref}
      onValueChange={(values: { value: string }) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      valueIsNumericString
    />
  )
})
