import SyncIcon from '@mui/icons-material/Sync'
import { Box, IconButton, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

const RefreshButton = observer(function RefreshButton({
  loading,
  onRefresh,
}: {
  loading: boolean
  onRefresh: () => void
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
})

export default RefreshButton
