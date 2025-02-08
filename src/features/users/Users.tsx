import { useEffect } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDelete'
import { deleteUserFx } from '@/features/users/data/api.ts'
import { usersStarted } from '@/features/users/data/initializers.ts'
import { usersStore } from '@/features/users/data/store.ts'
import GridView from '@/features/users/GridView.tsx'
import TableView from '@/features/users/TableView.tsx'

export default function Users() {
  const [pageStarted] = useUnit([usersStarted])

  const { t } = useTranslation()
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    pageStarted()
  }, [pageStarted])

  return (
    <>
      <Box px={{ xs: 1, sm: 2 }} pt={1} pb={2}>
        {isUpMd ? <TableView /> : <GridView />}
      </Box>
      <ConfirmDelete
        $confirmDeleteOpened={usersStore.$confirmDeleteOpened}
        $idToDelete={usersStore.$idToDelete}
        title={t('deleteWarningUsers')}
        $selectedItems={usersStore.$selectedItems}
        deleteItemFx={deleteUserFx}
        handleCloseConfirmDeleteEv={usersStore.handleCloseConfirmDelete}
      />
    </>
  )
}
