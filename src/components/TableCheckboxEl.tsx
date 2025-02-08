import { Checkbox, Tooltip } from '@mui/material'
import { EventCallable, Store } from 'effector'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'

export default function TableCheckboxEl({
  $selectedSome,
  $selectedAll,
  handleSelectAllEv,
}: {
  $selectedSome: Store<boolean>
  $selectedAll: Store<boolean>
  handleSelectAllEv: EventCallable<boolean>
}) {
  const [selectedSome, selectedAll, handleSelectAll] = useUnit([
    $selectedSome,
    $selectedAll,
    handleSelectAllEv,
  ])

  const { t } = useTranslation()

  return (
    <Tooltip arrow placement="top" title={t('selectAll')}>
      <Checkbox
        size={'small'}
        checked={selectedAll}
        indeterminate={selectedSome}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
    </Tooltip>
  )
}
