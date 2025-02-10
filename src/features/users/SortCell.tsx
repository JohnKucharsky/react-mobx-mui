import { ReactElement } from 'react'
import { Box, TableCell, TableCellProps, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { observer } from 'mobx-react-lite'
import { SortKeys } from '@/features/users/data/types.ts'
import { OrderStore } from '@/stores/OrderStore.ts'

const SortCell = observer(function SortCell({
  orderStore,
  property,
  children,
  ...props
}: {
  orderStore: OrderStore
  property: SortKeys
  children: ReactElement | string
} & TableCellProps) {
  return (
    <TableCell
      {...props}
      sortDirection={orderStore.orderBy === property ? orderStore.order : false}
    >
      <TableSortLabel
        active={orderStore.orderBy === property}
        direction={orderStore.orderBy === property ? orderStore.order : 'asc'}
        onClick={() => orderStore.requestSort(property)}
      >
        {children}
        {orderStore.orderBy === property ? (
          <Box component="span" sx={visuallyHidden}>
            {orderStore.order === 'desc'
              ? 'sorted descending'
              : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
})

export default SortCell
