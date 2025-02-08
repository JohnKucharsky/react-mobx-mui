import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { IconButton, SxProps, Theme, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { addTestKey } from '@/utils/test-keys.ts'

export default function DeleteSelectedItems({
  onClick,
  sx,
}: {
  onClick: () => void
  sx?: SxProps<Theme>
}) {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('deleteSelected')}>
      <IconButton
        {...addTestKey('remove-button')}
        sx={sx}
        color={'error'}
        onClick={onClick}
      >
        <DeleteTwoToneIcon />
      </IconButton>
    </Tooltip>
  )
}
