import { ReactElement } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ThemeStore } from '@/layout/store.ts'

const ThemeWrapper = observer(function ThemeWrapper({
  themeStore,
  children,
}: {
  themeStore: ThemeStore
  children: ReactElement
}) {
  const theme = createTheme({
    palette: {
      mode: themeStore.themeName,
      primary: {
        main: themeStore.primaryColor,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
})

export default ThemeWrapper
