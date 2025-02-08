import { LoadingButton } from '@mui/lab'
import { DialogActions, FormHelperText } from '@mui/material'
import { addTestKey, TestKeysType } from '@/utils/test-keys.ts'

export default function DialogActionsEl({
  submit,
  isSubmitting,
  buttonTitle,
  testKey,
}: {
  submit: string | null | undefined
  isSubmitting: boolean
  buttonTitle: string
  testKey?: TestKeysType
}) {
  return (
    <DialogActions
      sx={{
        px: { xs: 1, md: 2 },
        pb: 2,
        justifyContent: 'flex-start',
      }}
    >
      {submit ? (
        <FormHelperText error>{JSON.stringify(submit)}</FormHelperText>
      ) : null}
      <LoadingButton
        {...addTestKey(testKey)}
        type="submit"
        loading={isSubmitting}
        disabled={Boolean(submit) || isSubmitting}
        variant="contained"
      >
        {buttonTitle}
      </LoadingButton>
    </DialogActions>
  )
}
