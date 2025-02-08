import SyncIcon from '@mui/icons-material/Sync'
import { Box, IconButton, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { UsersStore } from '@/features/users/data/store.ts'

const RefreshButton = observer(function RefreshButton({
  usersStore,
}: {
  usersStore: UsersStore
}) {
  const { t } = useTranslation()

  const onRefresh = () => {
    usersStore.fetchUsers().catch(console.error)
  }

  return (
    <Tooltip title={t('Refresh')}>
      <Box>
        <IconButton
          color={'primary'}
          disabled={usersStore.usersLoading}
          onClick={onRefresh}
        >
          <SyncIcon fontSize="small" />
        </IconButton>
      </Box>
    </Tooltip>
  )
})

export default RefreshButton
