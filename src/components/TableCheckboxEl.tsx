import { Checkbox, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { UsersStore } from '@/features/users/data/store.ts'

const TableCheckboxEl = observer(function TableCheckboxEl({
  usersStore,
}: {
  usersStore: UsersStore
}) {
  const { t } = useTranslation()

  return (
    <Tooltip arrow placement="top" title={t('selectAll')}>
      <Checkbox
        size={'small'}
        checked={Boolean(usersStore.selectedAll)}
        indeterminate={Boolean(usersStore.selectedSome)}
        onChange={(e) => usersStore.selectAll(e.target.checked)}
      />
    </Tooltip>
  )
})

export default TableCheckboxEl
