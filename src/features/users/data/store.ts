import { combine, createEvent, createStore, sample } from 'effector'
import { $users, deleteUserFx } from '@/features/users/data/api.ts'
import { Order, SortKeys } from '@/features/users/data/types.ts'

// select
const $selectedItems = createStore<Set<number>>(new Set())
const handleSelectAllEv = createEvent<boolean>()
const handleSelectOneEv = createEvent<number>()

const $hasSelectedItems = combine(
  $selectedItems,
  (selectedItems) => selectedItems.size > 0,
)

const $selectedSome = combine(
  $selectedItems,
  $users,
  (selectedItems, items) => {
    if (!items?.length) return false
    return selectedItems.size > 0 && selectedItems.size < items.length
  },
)

const $selectedAll = combine($selectedItems, $users, (selectedItems, items) => {
  if (!items?.length) return false
  return selectedItems.size === items.length
})

sample({
  clock: handleSelectAllEv,
  source: [$users],
  fn: ([items], payload) => {
    if (!items) return new Set<number>()
    return payload
      ? new Set<number>([...items.map((item) => item.id)])
      : new Set<number>()
  },
  target: $selectedItems,
})

sample({
  clock: deleteUserFx.done,
  fn: (): Set<number> => new Set<number>(),
  target: $selectedItems,
})

sample({
  clock: handleSelectOneEv,
  source: { selectedItems: $selectedItems },
  fn: ({ selectedItems }, payload) => {
    const copyState = new Set<number>(selectedItems)
    if (!copyState.has(payload)) {
      copyState.add(payload)
    } else {
      copyState.delete(payload)
    }
    return copyState
  },
  target: $selectedItems,
})
// select

// delete
const $confirmDeleteOpened = createStore(false)
const $idToDelete = createStore<number | null>(null)

const handleCloseConfirmDelete = createEvent()
const handleOpenConfirmDelete = createEvent<number | null>()

$confirmDeleteOpened
  .on(handleCloseConfirmDelete, () => false)
  .on(handleOpenConfirmDelete, () => true)
$idToDelete.on(handleOpenConfirmDelete, (_, value) => value)
// delete

// order
export const $order = createStore<Order>('asc')
export const $orderBy = createStore<SortKeys>('name')

export const handleRequestSortEv = createEvent<{
  property: SortKeys
  orderBy: SortKeys
}>()
$order.on(handleRequestSortEv, (state, payload) => {
  const isAsc = payload.orderBy === payload.property && state === 'asc'
  return isAsc ? 'desc' : 'asc'
})
$orderBy.on(handleRequestSortEv, (_, payload) => payload.property)
// order

export const usersStore = {
  $selectedItems,
  handleSelectAllEv,
  handleSelectOneEv,
  $hasSelectedItems,
  $selectedSome,
  $selectedAll,
  handleCloseConfirmDelete,
  handleOpenConfirmDelete,
  $confirmDeleteOpened,
  $idToDelete,
  handleRequestSortEv,
  $order,
  $orderBy,
}
