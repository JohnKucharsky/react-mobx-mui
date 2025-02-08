import { ReactElement } from 'react'
import { Box, TableCell, TableCellProps, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useUnit } from 'effector-react'
import { usersStore } from '@/features/users/data/store.ts'
import { SortKeys } from '@/features/users/data/types.ts'

export default function SortCell({
  property,
  children,
  ...props
}: {
  property: SortKeys
  children: ReactElement | string
} & TableCellProps) {
  const [orderBy, order, handleSort] = useUnit([
    usersStore.$orderBy,
    usersStore.$order,
    usersStore.handleRequestSortEv,
  ])

  return (
    <TableCell {...props} sortDirection={orderBy === property ? order : false}>
      <TableSortLabel
        active={orderBy === property}
        direction={orderBy === property ? order : 'asc'}
        onClick={() => handleSort({ property: property, orderBy })}
      >
        {children}
        {orderBy === property ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}
