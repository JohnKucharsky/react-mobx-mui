import { useEffect } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDelete'
import GridView from '@/features/users/GridView.tsx'
import TableView from '@/features/users/TableView.tsx'
import { useRootStore } from '@/stores/RootStore.tsx'

const Users = observer(function Users() {
  const { usersStore } = useRootStore()

  const { t } = useTranslation()
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    usersStore.fetchUsers().catch(console.error)
  }, [usersStore])

  return (
    <>
      <Box px={{ xs: 1, sm: 2 }} pt={1} pb={2}>
        {isUpMd ? <TableView /> : <GridView />}
      </Box>
      <ConfirmDelete title={t('deleteWarningUsers')} />
    </>
  )
})

export default Users
