import { observer } from 'mobx-react-lite'
import ConfirmDeleteUI from '@/components/ConfirmDeleteUI'
import { useRootStore } from '@/stores/RootStore.tsx'

const ConfirmDelete = observer(function ConfirmDelete({
  title,
}: {
  title: string
}) {
  const { usersStore } = useRootStore()

  const handleDeleteCompleted = async () => {
    try {
      if (usersStore.confirmDeleteStore.idToDelete) {
        await usersStore.deleteUser(usersStore.confirmDeleteStore.idToDelete)
      } else {
        await usersStore.deleteManyUsers()
      }
    } catch (e) {
      console.error(e)
    } finally {
      usersStore.confirmDeleteStore.closeConfirmDelete()
    }
  }

  return (
    <ConfirmDeleteUI
      loading={usersStore.usersLoading}
      openConfirmDelete={usersStore.confirmDeleteStore.confirmDeleteOpened}
      closeConfirmDelete={() =>
        usersStore.confirmDeleteStore.closeConfirmDelete()
      }
      handleDeleteCompleted={handleDeleteCompleted}
      deleteWarningText={title}
    />
  )
})
export default ConfirmDelete
