import { Checkbox, Tooltip } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

const TableCheckboxEl = observer(function TableCheckboxEl({
  getChecked,
  getIntermediate,
  getOnChange,
}: {
  getChecked: () => boolean
  getIntermediate: () => boolean
  getOnChange: (param: boolean) => void
}) {
  const { t } = useTranslation()

  return (
    <Tooltip arrow placement="top" title={t('selectAll')}>
      <Checkbox
        size={'small'}
        checked={getChecked()}
        indeterminate={getIntermediate()}
        onChange={(e) => getOnChange(e.target.checked)}
      />
    </Tooltip>
  )
})

export default TableCheckboxEl
