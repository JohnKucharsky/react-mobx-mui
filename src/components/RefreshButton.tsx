import SyncIcon from '@mui/icons-material/Sync'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function RefreshButton({
  onRefresh,
  loading,
}: {
  onRefresh: () => void
  loading: boolean
}) {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('Refresh')}>
      <Box>
        <IconButton color={'primary'} disabled={loading} onClick={onRefresh}>
          <SyncIcon fontSize="small" />
        </IconButton>
      </Box>
    </Tooltip>
  )
}
