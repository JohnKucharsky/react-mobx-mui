import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import DeleteSelectedItems from '@/components/DeleteSelectedItems'

export default function RemoveEl<T>({
  $hasSelectedItems,
  handleOpenConfirmDeleteEv,
}: {
  $hasSelectedItems: Store<boolean>
  handleOpenConfirmDeleteEv: EventCallable<T | null>
}) {
  const [hasSelectedItems, handleOpenConfirmDelete] = useUnit([
    $hasSelectedItems,
    handleOpenConfirmDeleteEv,
  ])

  return (
    <>
      {hasSelectedItems && (
        <DeleteSelectedItems onClick={() => handleOpenConfirmDelete(null)} />
      )}
    </>
  )
}
