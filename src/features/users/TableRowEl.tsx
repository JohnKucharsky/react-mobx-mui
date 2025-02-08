import { useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Checkbox,
  Dialog,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useStoreMap, useUnit } from 'effector-react'
import { useNavigate } from 'react-router'
import { formatAddress } from '@/features/users/data/service.tsx'
import { usersStore } from '@/features/users/data/store'
import { type User } from '@/features/users/data/types'
import Edit from '@/features/users/Edit'
import { addTestKey } from '@/utils/test-keys.ts'

export default function TableRowEl({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const [handleSelectOne] = useUnit([usersStore.handleSelectOneEv])

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const isSelected = useStoreMap({
    store: usersStore.$selectedItems,
    keys: [user.id],
    fn: (selectedItems, [id]) => {
      return selectedItems.has(id)
    },
  })

  const handleEditOpen = () => setOpen(true)
  const handleEditClose = () => setOpen(false)

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleEditClose}
      >
        <Edit handleEditClose={handleEditClose} initialValues={user} />
      </Dialog>
      <TableRow hover selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            {...addTestKey('row-checkbox')}
            size={'small'}
            checked={isSelected}
            onChange={() => {
              handleSelectOne(user.id)
            }}
            value={isSelected}
          />
        </TableCell>

        <TableCell>
          <Typography {...addTestKey('name-cell')} variant="h6">
            {user.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{user.username}</Typography>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.website}</TableCell>
        <TableCell>{formatAddress(user.address)}</TableCell>
        <TableCell>{user.company.name}</TableCell>
        <TableCell>
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton
              {...addTestKey('link-button')}
              color={'primary'}
              onClick={() => {
                navigate(`/user/${user.id}`)?.catch(console.error)
              }}
            >
              <OpenInNewIcon />
            </IconButton>
            <IconButton
              {...addTestKey('edit-pencil')}
              color={'primary'}
              onClick={handleEditOpen}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}
