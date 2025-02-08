import { observer } from 'mobx-react-lite'
import ConfirmDeleteUI from '@/components/ConfirmDeleteUI'
import { UsersStore } from '@/features/users/data/store.ts'

const ConfirmDelete = observer(function ConfirmDelete({
  usersStore,
  title,
}: {
  usersStore: UsersStore
  title: string
}) {
  const handleDeleteCompleted = async () => {
    try {
      if (usersStore.idToDelete) {
        await usersStore.deleteUser(usersStore.idToDelete)
      } else {
        await usersStore.deleteManyUsers()
      }
    } catch (e) {
      console.error(e)
    } finally {
      usersStore.closeConfirmDelete()
    }
  }

  return (
    <ConfirmDeleteUI
      loading={usersStore.usersLoading}
      openConfirmDelete={usersStore.confirmDeleteOpened}
      closeConfirmDelete={() => usersStore.closeConfirmDelete()}
      handleDeleteCompleted={handleDeleteCompleted}
      deleteWarningText={title}
    />
  )
})
export default ConfirmDelete
