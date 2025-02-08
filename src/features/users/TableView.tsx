import {
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import RefreshButton from '@/components/RefreshButton.tsx'
import RemoveEl from '@/components/RemoveEl.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import TableCheckboxEl from '@/components/TableCheckboxEl.tsx'
import TableEmptyText from '@/components/TableEmptyText.tsx'
import TableSkeletons from '@/components/TableSkeletons.tsx'
import Create from '@/features/users/Create.tsx'
import { UsersStore } from '@/features/users/data/store.ts'
import SortCell from '@/features/users/SortCell.tsx'
import TableRowEl from '@/features/users/TableRowEl.tsx'
import { orderByFunc } from '@/utils/helpers.ts'

const TableView = observer(function TableView({
  usersStore,
}: {
  usersStore: UsersStore
}) {
  const { t } = useTranslation()

  return (
    <Card elevation={3}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        p={2}
        spacing={1}
        minHeight={'72px'}
      >
        <FlexWrap gap={1} width={'100%'}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {t('Users')}
          </Typography>
          <RefreshButton usersStore={usersStore} />
        </FlexWrap>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <RemoveEl usersStore={usersStore} />
          <Create />
        </Stack>
      </Stack>

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <TableCheckboxEl usersStore={usersStore} />
              </TableCell>
              <SortCell usersStore={usersStore} property={'name'}>
                {t('Name')}
              </SortCell>
              <SortCell usersStore={usersStore} property={'username'}>
                {t('userName')}
              </SortCell>
              <SortCell usersStore={usersStore} property={'email'}>
                {t('Email')}
              </SortCell>
              <SortCell usersStore={usersStore} property={'phone'}>
                {t('Phone')}
              </SortCell>
              <SortCell usersStore={usersStore} property={'website'}>
                {t('Website')}
              </SortCell>
              <TableCell>{t('Address')}</TableCell>
              <TableCell>{t('Company')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {!usersStore.usersLoading && usersStore.users?.length === 0 ? (
            <TableEmptyText
              colSpan={8}
              title={t('couldNotFindSearchedUsers')}
            />
          ) : null}

          {usersStore.usersLoading && (
            <TableBody>
              <TableSkeletons cellsCount={8} skeletonRowsCount={10} />
            </TableBody>
          )}

          {!usersStore.usersLoading && usersStore.users?.length !== 0 && (
            <TableBody>
              {usersStore.users &&
                orderByFunc(
                  usersStore.orderBy,
                  usersStore.order,
                  usersStore.users,
                )?.map((item) => (
                  <TableRowEl
                    key={item.id}
                    user={item}
                    usersStore={usersStore}
                  />
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Card>
  )
})

export default TableView
