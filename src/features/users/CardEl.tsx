import { useState } from 'react'
import {
  Box,
  Card,
  Dialog,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import CardControls from '@/components/Card/CardControls'
import CardItem from '@/components/CardItem.tsx'
import { formatAddress } from '@/features/users/data/service.tsx'
import { usersStore } from '@/features/users/data/store.ts'
import { type User } from '@/features/users/data/types.ts'
import Edit from '@/features/users/Edit'

export default function CardEl({ user }: { user: User }) {
  const [open, setOpen] = useState(false)

  const [handleOpenConfirmDelete] = useUnit([
    usersStore.handleOpenConfirmDelete,
  ])

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Edit handleEditClose={() => setOpen(false)} initialValues={user} />
      </Dialog>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Card elevation={3}>
          <Stack
            px={1.5}
            pt={1.5}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'flex-start'}
          >
            <Box>
              <Typography variant="h5" fontWeight={'bold'}>
                {user.name}
              </Typography>
              <Link href={`/user/${user.id}`}>details</Link>
            </Box>

            <CardControls
              handleEditOpen={() => setOpen(true)}
              handleOpenConfirmDelete={() => handleOpenConfirmDelete(user.id)}
            />
          </Stack>

          <Box px={1.5} py={1.5}>
            <CardItem title={t('userName')} text={user.username} />
            <CardItem title={t('Email')} text={user.email} />
            <CardItem title={t('Phone')} text={user.phone} />
            <CardItem title={t('Website')} text={user.website} />
            <CardItem title={t('Address')} text={formatAddress(user.address)} />
            <CardItem title={t('Company')} text={user.company.name} />
          </Box>
        </Card>
      </Grid>
    </>
  )
}
