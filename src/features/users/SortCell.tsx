import { ReactElement } from 'react'
import { Box, TableCell, TableCellProps, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { observer } from 'mobx-react-lite'
import { UsersStore } from './data/store'
import { SortKeys } from '@/features/users/data/types.ts'

const SortCell = observer(function SortCell({
  usersStore,
  property,
  children,
  ...props
}: {
  usersStore: UsersStore
  property: SortKeys
  children: ReactElement | string
} & TableCellProps) {
  return (
    <TableCell
      {...props}
      sortDirection={usersStore.orderBy === property ? usersStore.order : false}
    >
      <TableSortLabel
        active={usersStore.orderBy === property}
        direction={usersStore.orderBy === property ? usersStore.order : 'asc'}
        onClick={() => usersStore.requestSort(property)}
      >
        {children}
        {usersStore.orderBy === property ? (
          <Box component="span" sx={visuallyHidden}>
            {usersStore.order === 'desc'
              ? 'sorted descending'
              : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
})

export default SortCell
