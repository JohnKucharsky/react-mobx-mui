import { observer } from 'mobx-react-lite'
import DeleteSelectedItems from '@/components/DeleteSelectedItems'
import { UsersStore } from '@/features/users/data/store.ts'

const RemoveEl = observer(function RemoveEl({
  usersStore,
}: {
  usersStore: UsersStore
}) {
  return (
    <>
      {usersStore.hasSelectedItems && (
        <DeleteSelectedItems
          onClick={() => usersStore.openConfirmDelete(null)}
        />
      )}
    </>
  )
})

export default RemoveEl
