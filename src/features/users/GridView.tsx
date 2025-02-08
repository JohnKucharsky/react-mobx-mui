import { Card, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { GridSkeletons } from '@/components/GridSkeletons.tsx'
import NoItems from '@/components/NoItems.tsx'
import RefreshButton from '@/components/RefreshButton.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import CardEl from '@/features/users/CardEl.tsx'
import Create from '@/features/users/Create.tsx'
import { UsersStore } from '@/features/users/data/store.ts'

const GridView = observer(function GridView({
  usersStore,
}: {
  usersStore: UsersStore
}) {
  const { t } = useTranslation()

  return (
    <>
      <Card
        elevation={2}
        sx={{
          p: { xs: 1, s: 1.5 },
          mb: 2,
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          p={2}
          spacing={1}
        >
          <FlexWrap gap={1} width={'100%'}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {t('Users')}
            </Typography>
            <RefreshButton usersStore={usersStore} />
          </FlexWrap>

          <Create />
        </Stack>
      </Card>

      <NoItems
        length={usersStore.users?.length}
        title={t('couldNotFindSearchedUsers')}
        loading={usersStore.usersLoading}
      />

      {usersStore.usersLoading ? (
        <GridSkeletons skeletonNum={4} />
      ) : (
        <Grid container spacing={1}>
          {usersStore.users?.map((item) => (
            <CardEl key={item.id} user={item} />
          ))}
        </Grid>
      )}
    </>
  )
})

export default GridView
