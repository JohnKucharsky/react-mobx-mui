import CheckIcon from '@mui/icons-material/Check'
import { Box, Stack, Typography } from '@mui/material'
import * as muiColors from '@mui/material/colors'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useRootStore } from '@/stores/RootStore.tsx'
import { omit } from '@/utils/helpers.ts'

const colors = Object.entries(
  omit(muiColors, ['common', 'yellow', 'lime', 'red']),
).reduce(
  (acc, [name, shades]) => {
    acc[name] = shades['500']
    return acc
  },
  {} as Record<string, string>,
)

const shadeToName = Object.entries(omit(muiColors, ['common'])).reduce(
  (acc, [name, shades]) => {
    acc[shades['500']] = name
    return acc
  },
  {} as Record<string, string>,
)

const ColorPicker = observer(function ColorPicker() {
  const { themeStore } = useRootStore()

  const { t } = useTranslation()

  const handleClick = (color: string) => {
    themeStore.handleChangePrimaryColor(color)
  }

  return (
    <Box p={2} minWidth={'1rem'}>
      <Stack direction={'row'} spacing={0.5} alignItems={'flex-end'} mb={1}>
        <Typography lineHeight={1} variant="body1">
          {t('pickedColor')}:
        </Typography>
        <Typography
          lineHeight={1}
          fontWeight={'bold'}
          sx={{ color: themeStore.primaryColor }}
          variant="body2"
        >
          {shadeToName[themeStore.primaryColor]}
        </Typography>
      </Stack>

      <Box
        width={'12rem'}
        height={'12rem'}
        display={'grid'}
        sx={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
        }}
      >
        {Object.entries(colors).map(([colorName, shade]) => (
          <Box
            width={'100%'}
            height={'100%'}
            display={'grid'}
            key={colorName}
            sx={{
              backgroundColor: shade,
              cursor: 'pointer',
              placeContent: 'center',
            }}
            onClick={() => handleClick(shade)}
          >
            {colorName === shadeToName[themeStore.primaryColor] && (
              <CheckIcon sx={{ color: '#fff', fontSize: '2rem' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
})

export default ColorPicker
