import { ReactElement } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useUnit } from 'effector-react/compat'
import { $primaryColor, $themeName } from '@/layout/store.ts'

export default function ThemeWrapper({ children }: { children: ReactElement }) {
  const [mode, primaryColor] = useUnit([$themeName, $primaryColor])

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
