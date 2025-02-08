import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function CardControls({
  handleEditOpen,
  handleOpenConfirmDelete,
}: {
  handleEditOpen?: () => void
  handleOpenConfirmDelete?: () => void
}) {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction={'row'} alignItems={'center'}>
        {handleEditOpen ? (
          <Tooltip title={t('Edit')}>
            <IconButton color={'primary'} onClick={handleEditOpen}>
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {handleOpenConfirmDelete && (
          <Tooltip title={t('Delete')}>
            <IconButton color={'error'} onClick={handleOpenConfirmDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </>
  )
}
