import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Transition } from './StyledComponents/ConfirmDeleteStyles'
import CloseButton from '@/components/StyledComponents/CloseButton.tsx'
import { addTestKey } from '@/utils/test-keys.ts'

export default function ConfirmDeleteUI({
  openConfirmDelete,
  closeConfirmDelete,
  handleDeleteCompleted,
  deleteWarningText,
  loading,
}: {
  openConfirmDelete: boolean
  closeConfirmDelete: () => void
  handleDeleteCompleted: () => Promise<void>
  deleteWarningText: string
  loading: boolean
}) {
  const { t } = useTranslation()

  const deleteCompeted = () => {
    handleDeleteCompleted().catch(console.error)
  }

  return (
    <Dialog
      open={openConfirmDelete}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={closeConfirmDelete}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={3}
      >
        <CloseButton color={'primary'} onClick={closeConfirmDelete}>
          <CloseIcon />
        </CloseButton>
        <Typography
          sx={{
            mb: 3,
            pr: 4,
          }}
          variant="h5"
          fontWeight={'bold'}
        >
          {deleteWarningText}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={closeConfirmDelete}
        >
          {t('Cancel')}
        </Button>
        <LoadingButton
          {...addTestKey('confirm-remove-button')}
          loading={loading}
          color={'error'}
          onClick={deleteCompeted}
          fullWidth
          variant="contained"
        >
          {t('Delete')}
        </LoadingButton>
      </Box>
    </Dialog>
  )
}
