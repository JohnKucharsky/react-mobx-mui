import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ButtonGroup } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useRootStore } from '@/stores/RootStore.tsx'

const DarkModePicker = observer(function DarkModePicker() {
  const { themeStore } = useRootStore()

  const { t } = useTranslation()

  const colorAndOpacity = (inputTheme: 'dark' | 'light') => {
    if (themeStore.themeName === inputTheme) {
      return {
        opacity: 1,
        color: 'primary',
      } as const
    }

    return {
      opacity: 0.2,
      color: 'inherit',
    } as const
  }

  return (
    <Box textAlign={'center'} mt={2}>
      <ButtonGroup>
        <Button
          onClick={() => themeStore.handleChangeThemeName('light')}
          color={colorAndOpacity('light').color}
          sx={{
            opacity: colorAndOpacity('light').opacity,
          }}
          startIcon={<LightModeIcon />}
        >
          {t('Light')}
        </Button>
        <Button
          onClick={() => themeStore.handleChangeThemeName('dark')}
          color={colorAndOpacity('dark').color}
          sx={{
            opacity: colorAndOpacity('dark').opacity,
          }}
          startIcon={<DarkModeOutlinedIcon />}
        >
          {t('Dark')}
        </Button>
      </ButtonGroup>
    </Box>
  )
})

export default DarkModePicker
