import { observer } from 'mobx-react-lite'
import DeleteSelectedItems from '@/components/DeleteSelectedItems'
import { ConfirmDeleteStore } from '@/stores/ConfirmDeleteStore.ts'
import { SelectionStore } from '@/stores/SelectionStore.ts'

const RemoveEl = observer(function RemoveEl({
  selectionStore,
  confirmDeleteStore,
}: {
  selectionStore: SelectionStore
  confirmDeleteStore: ConfirmDeleteStore
}) {
  return (
    <>
      {selectionStore.hasSelectedItems && (
        <DeleteSelectedItems
          onClick={() => confirmDeleteStore.openConfirmDelete(null)}
        />
      )}
    </>
  )
})

export default RemoveEl
